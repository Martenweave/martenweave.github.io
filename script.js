// SPDX-License-Identifier: Apache-2.0

const header = document.querySelector("[data-header]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

for (const control of document.querySelectorAll("[data-share-controls]")) {
  const copyButton = control.querySelector("[data-copy-link]");
  const status = control.querySelector("[data-share-status]");
  if (!copyButton || !status) continue;

  copyButton.addEventListener("click", async () => {
    const link = copyButton.dataset.shareUrl;
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      status.textContent = "Link copied.";
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = link;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.append(fallback);
      fallback.select();
      const copied = document.execCommand("copy");
      fallback.remove();
      status.textContent = copied ? "Link copied." : "Copy the link from your browser address bar.";
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  for (const [index, item] of [...revealItems].entries()) {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 60}ms`;
    observer.observe(item);
  }
} else {
  for (const item of revealItems) {
    item.classList.add("in-view");
  }
}

// Goose ARWP Proof Mark dogfood. This is an evidence-linking surface, not a certification or score.
if (!document.querySelector('[data-goose-arwp-proof-mark="0.1"]')) {
  const footer = document.querySelector("footer") || document.body;
  const slot = document.createElement("div");
  slot.dataset.gooseArwpProofMarkSlot = "footer";
  slot.style.marginTop = "12px";
  slot.innerHTML = `<span data-goose-arwp-proof-mark="0.1" data-arwp-coverage="partial" role="group" aria-label="Goose ARWP Proof Mark: partial audit scope" title="ARWP evidence is present; whole-site audit scope remains incomplete." style="display:inline-flex;max-width:100%;min-height:38px;border:1px solid #080c0b;border-radius:4px;overflow:hidden;background:#fafaf7;color:#080c0b;font:10px/1.15 Arial,sans-serif;vertical-align:middle"><a href="https://dkharlanau.github.io/agent-ready-web-profile/product/" aria-label="Open Goose ARWP" style="padding:8px 9px;background:#080c0b;color:#fafaf7;text-decoration:none;border-right:4px solid #173bea;font-weight:700;letter-spacing:.06em">GOOSE ARWP</a><a href="https://github.com/dkharlanau/agent-ready-web-profile/blob/main/docs/PROOF-MARK.md" aria-label="Read Proof Mark contract: partial scope" style="padding:8px 9px;color:#080c0b;text-decoration:none"><strong>PARTIAL</strong> · <span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">scope incomplete</span></a></span>`;
  footer.append(slot);
}

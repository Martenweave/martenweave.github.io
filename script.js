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

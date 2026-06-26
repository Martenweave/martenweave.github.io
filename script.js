const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    }
  });
}

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (!prefersReducedMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      body.style.setProperty("--mouse-x", x.toFixed(3));
      body.style.setProperty("--mouse-y", y.toFixed(3));
    },
    { passive: true },
  );

  for (const item of document.querySelectorAll(".magnetic")) {
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      item.style.setProperty("--mx", x.toFixed(2));
      item.style.setProperty("--my", y.toFixed(2));
    });

    item.addEventListener("pointerleave", () => {
      item.style.setProperty("--mx", "0");
      item.style.setProperty("--my", "0");
    });
  }
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
    { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
  );

  for (const [index, item] of [...revealItems].entries()) {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    observer.observe(item);
  }
} else {
  for (const item of revealItems) {
    item.classList.add("in-view");
  }
}

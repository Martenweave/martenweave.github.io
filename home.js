(function () {
  "use strict";

  const form = document.querySelector(".search-form");
  const input = document.querySelector(".search-input");
  const resultsEl = document.querySelector(".search-results");
  const exampleButtons = document.querySelectorAll("[data-example]");

  if (!form || !input || !resultsEl) {
    return;
  }

  let docs = [];
  let activeIndex = -1;
  let results = [];

  fetch("/docs/search-index.json")
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error("fetch failed"))))
    .then((data) => {
      docs = Array.isArray(data) ? data : [];
    })
    .catch(() => {
      docs = [];
    });

  function tokenize(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((term) => term.length > 1);
  }

  function scoreDoc(doc, terms) {
    let score = 0;
    const title = (doc.title || "").toLowerCase();
    const category = (doc.category || "").toLowerCase();
    const excerpt = (doc.excerpt || "").toLowerCase();

    for (const term of terms) {
      if (title.includes(term)) score += 5;
      if (category.includes(term)) score += 3;
      if (excerpt.includes(term)) score += 1;
    }

    return score;
  }

  function renderResults(items) {
    resultsEl.hidden = false;
    activeIndex = -1;

    if (items.length === 0) {
      resultsEl.innerHTML =
        '<div class="search-results-empty">No results. Press Enter to browse docs.</div>';
      return;
    }

    const list = document.createElement("div");
    for (const item of items) {
      const a = document.createElement("a");
      a.href = item.url;
      a.className = "search-result";
      a.innerHTML = `
        <span class="search-result-title">${escapeHtml(item.title)}</span>
        <span class="search-result-category">${escapeHtml(item.category)}</span>
        <span class="search-result-excerpt">${escapeHtml(item.excerpt)}</span>
      `;
      list.appendChild(a);
    }

    resultsEl.innerHTML = "";
    resultsEl.appendChild(list);
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function hideResults() {
    resultsEl.hidden = true;
    resultsEl.innerHTML = "";
    activeIndex = -1;
    results = [];
  }

  function updateActive() {
    const links = resultsEl.querySelectorAll(".search-result");
    for (let i = 0; i < links.length; i++) {
      links[i].classList.toggle("is-active", i === activeIndex);
    }
  }

  function search(value) {
    const query = value.trim();
    if (query.length < 2) {
      hideResults();
      return;
    }

    const terms = tokenize(query);
    if (terms.length === 0) {
      hideResults();
      return;
    }

    results = docs
      .map((doc) => ({ doc, score: scoreDoc(doc, terms) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
      .slice(0, 6)
      .map((entry) => entry.doc);

    renderResults(results);
  }

  input.addEventListener("input", (event) => {
    search(event.target.value);
  });

  input.addEventListener("keydown", (event) => {
    const links = resultsEl.querySelectorAll(".search-result");

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, links.length - 1);
      updateActive();
      links[activeIndex]?.scrollIntoView({ block: "nearest" });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, -1);
      updateActive();
      if (activeIndex >= 0) {
        links[activeIndex]?.scrollIntoView({ block: "nearest" });
      }
      return;
    }

    if (event.key === "Escape") {
      hideResults();
      input.blur();
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      window.location.href = results[activeIndex].url;
    }
  });

  form.addEventListener("submit", (event) => {
    if (activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      window.location.href = results[activeIndex].url;
      return;
    }

    if (docs.length === 0) {
      return;
    }

    const query = input.value.trim();
    if (query.length < 2) {
      event.preventDefault();
      window.location.href = "/docs.html";
    }
  });

  for (const button of exampleButtons) {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-example") || "";
      input.value = value;
      input.focus();
      search(value);
    });
  }

  document.addEventListener("click", (event) => {
    if (!form.contains(event.target)) {
      hideResults();
    }
  });
})();

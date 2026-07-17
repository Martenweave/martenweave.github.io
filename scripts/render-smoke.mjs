import { spawn } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { once } from "node:events";
import { chromium } from "playwright";

const output = "output/render-smoke";
const port = 4187;
const server = spawn("python3", ["-m", "http.server", String(port)], { stdio: "pipe" });
let serverExited = false;
server.once("exit", () => {
  serverExited = true;
});
const pages = ["/", "/docs.html", "/blog/", "/blog/sap-mdg-implementation-knowledge.html"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      if (serverExited) throw new Error("Static preview exited before it became available.");
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Static preview did not start on port 4173.");
}

try {
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  await waitForServer();
  const browser = await chromium.launch();
  const failures = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    for (const route of pages) {
      const response = await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle" });
      const isBlogArticle = route.includes("/blog/") && route !== "/blog/";
      const label = `${viewport.name}-${route === "/" ? "home" : route === "/blog/" ? "blog" : isBlogArticle ? "article" : "docs"}`;
      const screenshot = `${output}/${label}.png`;
      await page.screenshot({ path: screenshot, fullPage: true });
      const heading = await page.locator("h1").first().textContent();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      const h1Size = await page.locator("h1").first().evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
      const maxH1 = route === "/" ? (viewport.name === "mobile" ? 42 : 68) : route === "/blog/" ? (viewport.name === "mobile" ? 42 : 70) : isBlogArticle ? (viewport.name === "mobile" ? 42 : 56) : Infinity;
      const tocClosed = isBlogArticle ? await page.locator("details.article-contents").evaluate((element) => !element.open) : true;
      const catalogueReady = route === "/blog/" ? await page.evaluate(() => {
        return document.querySelector("[data-blog-search]") !== null &&
          document.querySelectorAll("[data-blog-card]:not([hidden])").length === 12;
      }) : true;
      const atlasReady = route === "/" ? await page.locator(".atlas-hero__map img").evaluate((image) => {
        return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
      }) : true;
      const savingsReady = route === "/" ? await page.evaluate(() => {
        const fields = document.querySelectorAll("[data-savings-calculator] input");
        const result = document.querySelector("[data-savings-result]");
        return fields.length === 3 && result?.textContent?.includes("€");
      }) : true;
      if (!response?.ok() || !heading?.trim() || overflow || consoleErrors.length || h1Size > maxH1 || !tocClosed || !catalogueReady || !atlasReady || !savingsReady) {
        failures.push(`${label}: status=${response?.status()} h1=${Boolean(heading?.trim())} size=${h1Size}/${maxH1} tocClosed=${tocClosed} catalogueReady=${catalogueReady} atlasReady=${atlasReady} savingsReady=${savingsReady} overflow=${overflow} console=${consoleErrors.join(" | ")}`);
      }
    }
    await page.close();
  }
  await browser.close();
  if (failures.length) throw new Error(failures.join("\n"));
  rmSync(output, { recursive: true, force: true });
  console.log("Rendered site smoke check passed.");
} finally {
  if (!serverExited) {
    server.kill();
    await once(server, "exit").catch(() => undefined);
  }
}

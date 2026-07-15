import { spawn } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { once } from "node:events";
import { chromium } from "playwright";

const output = "output/render-smoke";
const server = spawn("python3", ["-m", "http.server", "4173"], { stdio: "pipe" });
const pages = ["/", "/docs.html"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:4173/");
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
      const response = await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: "networkidle" });
      const label = `${viewport.name}-${route === "/" ? "home" : "docs"}`;
      const screenshot = `${output}/${label}.png`;
      await page.screenshot({ path: screenshot, fullPage: true });
      const heading = await page.locator("h1").first().textContent();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (!response?.ok() || !heading?.trim() || overflow || consoleErrors.length) {
        failures.push(`${label}: status=${response?.status()} h1=${Boolean(heading?.trim())} overflow=${overflow} console=${consoleErrors.join(" | ")}`);
      }
    }
    await page.close();
  }
  await browser.close();
  if (failures.length) throw new Error(failures.join("\n"));
  rmSync(output, { recursive: true, force: true });
  console.log("Rendered site smoke check passed.");
} finally {
  server.kill();
  await once(server, "exit").catch(() => undefined);
}

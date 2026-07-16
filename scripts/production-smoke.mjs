import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const origin = process.env.MARTENWEAVE_PRODUCTION_ORIGIN ?? "https://martenweave.github.io";
const checks = [
  ["/", "index.html"],
  ["/blog/sap-mdg-implementation-knowledge.html", "blog/sap-mdg-implementation-knowledge.html"],
  ["/ai.json", "ai.json"],
  ["/sitemap.xml", "sitemap.xml"],
  ["/feed.xml", "feed.xml"],
];

const repository = "Martenweave/martenweave.github.io";

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

const responses = new Map();
for (const [route, file] of checks) {
  const response = await fetch(`${origin}${route}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`${route}: expected HTTP 200, received ${response.status}`);
  const deployed = await response.text();
  const local = readFileSync(resolve(root, file), "utf8");
  if (digest(deployed) !== digest(local)) {
    throw new Error(`${route}: deployed content does not match main (${digest(deployed)} != ${digest(local)})`);
  }
  responses.set(route, deployed);
}

const localCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
const commitResponse = await fetch(`https://api.github.com/repos/${repository}/commits/main`, {
  headers: { Accept: "application/vnd.github+json" },
});
if (!commitResponse.ok) {
  throw new Error(`Unable to resolve the deployed main commit: HTTP ${commitResponse.status}`);
}
const deployedCommit = (await commitResponse.json()).sha;
if (deployedCommit !== localCommit) {
  throw new Error(`Local checkout ${localCommit} is not GitHub main ${deployedCommit}.`);
}

const homepage = responses.get("/");
const article = responses.get("/blog/sap-mdg-implementation-knowledge.html");
const ai = JSON.parse(responses.get("/ai.json"));
if (!homepage.includes("Make every model decision explainable") || !homepage.includes("Apache 2.0 open source")) {
  throw new Error("Homepage is missing the current H1 or Apache-2.0 source status.");
}
if (!homepage.includes('name="martenweave-deployment-ref" content="main"')) {
  throw new Error("Homepage is missing the deployment branch marker.");
}
if (!article.includes('<link rel="canonical" href="https://martenweave.github.io/blog/sap-mdg-implementation-knowledge.html"')) {
  throw new Error("Article canonical URL is not current.");
}
if (ai.packageVersion !== "0.6.0" || ai.corePackage?.version !== "0.6.0") {
  throw new Error("ai.json does not identify Core source version 0.6.0.");
}
console.log(
  `Production parity passed for ${origin}; deployed homepage, article, ai.json, sitemap, and RSS ` +
    `match exact GitHub main commit ${deployedCommit}.`,
);

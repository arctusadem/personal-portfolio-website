import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = new URL(process.env.PORTFOLIO_BASE_URL || "http://localhost:3000");
const projects = JSON.parse(
  await readFile(
    new URL("../src/content/projects.json", import.meta.url),
    "utf8",
  ),
);
const articles = JSON.parse(
  await readFile(
    new URL("../src/content/articles.json", import.meta.url),
    "utf8",
  ),
);
const routes = [
  "/",
  "/about",
  "/experience",
  "/skills",
  "/contact",
  "/resume",
  "/projects",
  "/writing",
  "/privacy",
  ...projects.map((p) => "/projects/" + p.slug),
  ...articles.map((a) => "/writing/" + a.slug),
];
for (const path of routes) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff", path);
  const html = await response.text();
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    path + " needs exactly one h1",
  );
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] || "";
  assert.ok(title.includes("Bruno Salgado"), path + " title");
  assert.equal(
    title.split("Bruno Salgado").length,
    2,
    path + " duplicated name",
  );
  assert.ok(html.includes('rel="canonical"'), path + " canonical");
  assert.ok(html.includes('property="og:title"'), path + " Open Graph");
  assert.ok(html.includes('name="description"'), path + " description");
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/gs,
  ))
    JSON.parse(match[1]);
  console.log("PASS", path);
}
for (const project of projects) {
  const response = await fetch(
    new URL("/designs/" + project.directory + ".openapi.json", base),
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).openapi, "3.0.3");
}
for (const path of [
  "/missing-route-check",
  "/projects/missing-study",
  "/writing/missing-post",
]) {
  assert.equal((await fetch(new URL(path, base))).status, 404, path);
}
const image = await fetch(new URL("/opengraph-image", base));
assert.equal(image.status, 200);
const png = Buffer.from(await image.arrayBuffer());
assert.equal(png.subarray(1, 4).toString(), "PNG");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
assert.equal((await fetch(new URL("/sitemap.xml", base))).status, 200);
assert.equal((await fetch(new URL("/robots.txt", base))).status, 200);
console.log(
  "PASS contracts, not-found routes, social image, sitemap and robots",
);

import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const readJson = async (path) =>
  JSON.parse(await readFile(new URL("../" + path, import.meta.url), "utf8"));
const site = await readJson("src/content/site.json");
const projects = await readJson("src/content/projects.json");
const posts = await readJson("src/content/social-posts.json");
test("profile uses the verified social destinations", () => {
  assert.equal(site.profile.githubUrl, "https://github.com/arctusadem");
  assert.equal(
    site.profile.linkedinUrl,
    "https://www.linkedin.com/in/bruno-cesar-rocha-salgado/",
  );
  assert.equal(
    site.profile.siteUrl.replace(/\/$/, ""),
    "https://brunosalgado.dev",
  );
});
test("project URLs are unique and each study has source and a contract", async () => {
  assert.equal(projects.length, 3);
  assert.equal(new Set(projects.map((p) => p.slug)).size, 3);
  for (const project of projects) {
    await access(
      new URL(
        "../projects/" + project.directory + "/model.ts",
        import.meta.url,
      ),
    );
    const contract = await readJson(
      "public/designs/" + project.directory + ".openapi.json",
    );
    assert.equal(contract.openapi, "3.0.3");
    assert.ok(contract.paths[project.endpoint.split(" ")[1]].post);
    function checkRefs(value) {
      if (!value || typeof value !== "object") return;
      if (value.$ref) {
        assert.ok(value.$ref.startsWith("#/"));
        const target = value.$ref
          .slice(2)
          .split("/")
          .reduce((node, key) => node?.[key], contract);
        assert.ok(target, "Unresolved reference: " + value.$ref);
      }
      for (const child of Object.values(value)) checkRefs(child);
    }
    checkRefs(contract);
    assert.ok(project.demo.limitation);
    assert.ok(project.decisions.every((d) => d.choice && d.cost));
    JSON.parse(project.request);
  }
});
test("embedded posts point only to the intended LinkedIn embed origin", () => {
  assert.ok(posts.length > 0);
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
  assert.equal(new Set(posts.map((post) => post.embedUrl)).size, posts.length);
  assert.equal(new Set(posts.map((post) => post.sourceUrl)).size, posts.length);
  for (const post of posts) {
    const url = new URL(post.embedUrl);
    assert.equal(url.origin, "https://www.linkedin.com");
    assert.match(
      url.pathname,
      /^\/embed\/feed\/update\/urn:li:(share|ugcPost):\d+$/,
    );
    const source = new URL(post.sourceUrl);
    assert.equal(source.origin, "https://www.linkedin.com");
    assert.match(
      source.pathname,
      /^\/feed\/update\/urn:li:(activity|share|ugcPost):\d+\/$/,
    );
    assert.ok(post.title.trim());
    assert.ok(Number.isInteger(post.height));
    assert.ok(post.height >= 400 && post.height <= 3000);
  }
});
test("all listed roles have dates, geography and outcome copy", () => {
  assert.equal(site.experience.roles.length, 5);
  for (const role of site.experience.roles) {
    assert.ok(
      role.period && role.location && role.company && role.outcomes.length,
    );
    assert.ok(role.stack.length);
  }
});

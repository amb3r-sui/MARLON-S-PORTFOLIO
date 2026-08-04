import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.(css|ts|tsx)$/.test(entry.name) ? [target] : [];
  }));
  return files.flat();
}

test("the minimalist visual contract stays enforceable", async () => {
  const files = [...await sourceFiles(path.join(root, "app")), ...await sourceFiles(path.join(root, "src"))];
  const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");

  assert.doesNotMatch(source, /lucide-react/i);
  assert.doesNotMatch(source, /(?:linear|radial|conic)-gradient\s*\(/i);
  assert.doesNotMatch(source, /[\u2013\u2014]/u);
});

test("the published resume and editorial proof assets are real files", async () => {
  const resume = await readFile(path.join(root, "public/resume/marlon-magno-resume.pdf"));
  assert.equal(resume.subarray(0, 5).toString(), "%PDF-");

  for (const name of ["workflow-mapping.webp", "human-review.webp", "integration-workbench.webp"]) {
    const details = await stat(path.join(root, "public/images/editorial", name));
    assert.ok(details.size > 5_000, `${name} should be a substantive local asset`);
  }
});

test("the package manifest is portfolio-specific and free of unused starter data tooling", async () => {
  const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  assert.equal(manifest.name, "marlon-magno-portfolio");
  assert.equal(manifest.version, "1.0.0");
  assert.equal(manifest.dependencies["drizzle-orm"], undefined);
  assert.equal(manifest.devDependencies["drizzle-kit"], undefined);
  assert.equal(manifest.dependencies["lucide-react"], undefined);
});

test("the static export includes crawler files", async () => {
  const sitemap = await readFile(path.join(root, "dist/client/sitemap.xml"), "utf8");
  const robots = await readFile(path.join(root, "dist/client/robots.txt"), "utf8");

  assert.match(sitemap, /<loc>.*\/projects\/crm-data-operations<\/loc>/);
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Sitemap: .*\/sitemap\.xml$/m);
});

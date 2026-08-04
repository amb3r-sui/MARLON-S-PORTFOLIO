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
  const css = await readFile(path.join(root, "app/globals.css"), "utf8");

  assert.doesNotMatch(source, /lucide-react/i);
  assert.match(css, /--font-pixel:/);
  assert.match(css, /radial-gradient\(circle, var\(--halftone\)/);
  assert.match(css, /--sidebar:\s*14rem/);

  for (const color of css.match(/#[0-9a-f]{6}\b/gi) ?? []) {
    const [red, green, blue] = [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)].map((channel) => Number.parseInt(channel, 16));
    assert.equal(red, green, `${color} should stay neutral`);
    assert.ok(blue >= green && blue - green <= 8, `${color} should stay grayscale or use Bryl's slight blue cast`);
  }
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
  assert.match(manifest.dependencies.geist, /^\^1\./);
});

test("the static export includes crawler files", async () => {
  const sitemap = await readFile(path.join(root, "dist/client/sitemap.xml"), "utf8");
  const robots = await readFile(path.join(root, "dist/client/robots.txt"), "utf8");

  assert.match(sitemap, /<loc>.*\/projects\/crm-data-operations<\/loc>/);
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Sitemap: .*\/sitemap\.xml$/m);
});

test("Vercel serves the Vinext static export with clean routes", async () => {
  const config = JSON.parse(await readFile(path.join(root, "vercel.json"), "utf8"));

  assert.equal(config.framework, null);
  assert.equal(config.buildCommand, "pnpm build");
  assert.equal(config.outputDirectory, "dist/client");
  assert.equal(config.cleanUrls, true);

  for (const route of [
    "index.html",
    "about.html",
    "contact.html",
    "projects.html",
    "services.html",
    "projects/rana-ai-receptionist-system.html",
  ]) {
    const details = await stat(path.join(root, "dist/client", route));
    assert.ok(details.isFile(), `${route} should exist in the Vercel output directory`);
  }
});

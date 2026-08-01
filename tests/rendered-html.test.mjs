import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(path = "/") {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const pages = [
  ["/", "Reliable systems"],
  ["/projects", "Systems designed"],
  ["/about", "Automation should make work clearer"],
  ["/services", "Practical automation help"],
  ["/contact", "Tell me about the process"],
  ["/projects/rana-ai-receptionist-system", "RANA AI Receptionist"],
  ["/projects/inventory-rfq-automation", "Inventory Replenishment"],
  ["/projects/b2b-ai-lead-triage", "B2B AI Lead Triage"],
];

for (const [path, expected] of pages) {
  test(`server renders ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(await response.text(), new RegExp(expected, "i"));
  });
}

test("unknown project returns a not-found response", async () => {
  const response = await render("/projects/not-a-real-project");
  assert.equal(response.status, 404);
});

test("production metadata replaces the starter preview", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /Marlon Magno/);
  assert.match(html, /og-command-center\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("theme initialization supports saved preference and system preference", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /portfolio-theme/);
  assert.match(html, /prefers-color-scheme:\s*light/);
  assert.match(html, /document\.documentElement\.dataset\.theme/);
});

test("project simulations are explicitly sample-data only", async () => {
  const response = await render("/projects/rana-ai-receptionist-system");
  const html = await response.text();
  assert.match(html, /Isolated workflow simulation/i);
  assert.match(html, /No n8n instance, credential, token, webhook, private workflow export, or production system is connected/i);
  assert.match(html, /Rana 00 — AI Gateway and Abuse Protection/i);
  assert.match(html, /Visible structure/i);
  assert.match(html, /Node inspector/i);
  assert.match(html, /Try the automation in three steps/i);
  assert.match(html, /Configure sample input/i);
  assert.match(html, /Execute workflow/i);
  assert.match(html, /Fictional data only/i);
  assert.doesNotMatch(html, /127\.0\.0\.1:5678|localhost:5678|webhook\/[A-Za-z0-9_-]+/i);
});

test("real profile links are rendered safely", async () => {
  const response = await render("/contact");
  const html = await response.text();
  assert.match(html, /linkedin\.com\/in\/marlon-magno/);
  assert.match(html, /github\.com\/amb3r-sui/);
  assert.match(html, /marlonmagno322%40gmail\.com|marlonmagno322@gmail\.com/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /noopener noreferrer/);
});

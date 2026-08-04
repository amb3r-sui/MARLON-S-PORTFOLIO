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
  ["/", "Automation, built for trust"],
  ["/projects", "Automation you can inspect"],
  ["/about", "Practical automation, clearly explained"],
  ["/services", "Help for processes that should run better"],
  ["/contact", "What process needs to improve"],
  ["/projects/rana-ai-receptionist-system", "RANA AI Receptionist"],
  ["/projects/inventory-rfq-automation", "Inventory Replenishment"],
  ["/projects/b2b-ai-lead-triage", "B2B AI Lead Triage"],
  ["/projects/crm-data-operations", "CRM and Data Operations"],
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
  assert.match(html, /og-portfolio\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /schema\.org/);
  assert.match(html, /Automation Specialist|Automation &amp; Integration Specialist/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("each primary page publishes its own canonical URL", async () => {
  for (const path of ["/about", "/projects", "/services", "/contact"]) {
    const response = await render(path);
    const html = await response.text();
    assert.match(html, new RegExp(`<link rel="canonical" href="http://localhost:3000${path}"`));
  }
});

test("homepage leads into real projects instead of a generic dashboard", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /Systems with visible safeguards/i);
  assert.match(html, /safe sample run, failure paths, and current project scope/i);
  assert.match(html, /RANA AI Receptionist/i);
  assert.doesNotMatch(html, /Lead-to-CRM orchestration/i);
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
  assert.match(html, /Rana 00 - AI Gateway and Abuse Protection/i);
  assert.match(html, /Visible structure/i);
  assert.match(html, /Node inspector/i);
  assert.match(html, /Try the automation in three steps/i);
  assert.match(html, /Configure sample input/i);
  assert.match(html, /Execute workflow/i);
  assert.match(html, /Fictional data only/i);
  assert.match(html, /What a client would receive/i);
  assert.match(html, /View technical input payload/i);
  assert.match(html, /What is this payload/i);
  assert.match(html, /Technical input inspection/i);
  assert.match(html, /Browser memory only/i);
  assert.match(html, /Connected systems/i);
  assert.match(html, /Inspect the full n8n-style workflow/i);
  assert.doesNotMatch(html, /127\.0\.0\.1:5678|localhost:5678|webhook\/[A-Za-z0-9_-]+/i);
});

test("project index uses the audited workflow model totals", async () => {
  const response = await render("/projects");
  const html = await response.text();
  assert.match(html, /11[^<]*workflow models/i);
  assert.match(html, /163[^<]*documented nodes/i);
  assert.match(html, /170[^<]*Mapped connections/i);
  assert.match(html, /RANA AI Receptionist and Booking System/i);
  assert.match(html, /Inventory Replenishment and Draft RFQ Automation/i);
  assert.match(html, /B2B AI Lead Triage with Human Review/i);
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

test("resume-backed content is published without invented claims", async () => {
  const about = await render("/about");
  const aboutHtml = await about.text();
  assert.match(aboutHtml, /Automation &amp; Integration Specialist|Automation & Integration Specialist/);
  assert.match(aboutHtml, /Polytechnic University of the Philippines/i);

  const project = await render("/projects/crm-data-operations");
  const projectHtml = await project.text();
  assert.match(projectHtml, /Zoho CRM/i);
  assert.match(projectHtml, /Airtable/i);
  assert.match(projectHtml, /PostgreSQL/i);
  assert.doesNotMatch(projectHtml, /revenue increased|percent improvement|guaranteed results/i);
});

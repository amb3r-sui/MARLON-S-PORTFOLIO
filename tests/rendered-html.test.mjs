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
  ["/", "Automate Smarter"],
  ["/projects", "Systems designed"],
  ["/about", "Automation should make work clearer"],
  ["/services", "Practical automation help"],
  ["/contact", "Tell me about the process"],
  ["/projects/multilingual-ai-receptionist", "Multilingual AI Receptionist"],
  ["/projects/inventory-rfq-automation", "Inventory Replenishment"],
  ["/projects/crm-lead-to-quote", "CRM Lead-to-Quote"],
  ["/projects/airtable-data-sync", "Airtable Data Sync"],
  ["/projects/order-processing-quotation", "Order Processing"],
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
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

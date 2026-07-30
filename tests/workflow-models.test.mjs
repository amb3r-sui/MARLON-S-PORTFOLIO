import assert from "node:assert/strict";
import test from "node:test";
import { workflowsByProject } from "../src/data/workflows.ts";

const workflows = Object.values(workflowsByProject).flat();

test("all eleven sanitized portfolio workflows are modeled", () => {
  assert.equal(workflows.length, 11);
  assert.equal(workflowsByProject["rana-ai-receptionist-system"].length, 7);
  assert.equal(workflowsByProject["inventory-rfq-automation"].length, 3);
  assert.equal(workflowsByProject["b2b-ai-lead-triage"].length, 1);
});

test("the complete seven-workflow RANA node set is preserved", () => {
  const ranaWorkflows = workflowsByProject["rana-ai-receptionist-system"];
  assert.deepEqual(
    ranaWorkflows.map((workflow) => workflow.nodes.length),
    [25, 10, 21, 20, 21, 11, 17],
  );
  assert.equal(
    ranaWorkflows.reduce((total, workflow) => total + workflow.nodes.length, 0),
    125,
  );
  assert.deepEqual(
    ranaWorkflows.map((workflow) => workflow.edges.length),
    [25, 9, 25, 28, 23, 8, 16],
  );
  assert.deepEqual(
    ranaWorkflows.map((workflow) => workflow.notes?.length),
    [7, 5, 7, 6, 6, 5, 6],
  );
  assert.ok(ranaWorkflows.every((workflow) => workflow.initialZoom && workflow.initialZoom < 0.5));

  const ranaNodeLabels = ranaWorkflows.flatMap((workflow) =>
    workflow.nodes.map((node) => node.label),
  );
  assert.ok(ranaNodeLabels.includes("Rana AI Receptionist"));
  assert.ok(ranaNodeLabels.includes("Notify Reception Staff in Telegram"));
  assert.ok(ranaNodeLabels.includes("Generate Gemini Embeddings"));
  assert.equal(
    ranaWorkflows.flatMap((workflow) => workflow.nodes).filter((node) => node.disabled).length,
    3,
  );
});

for (const workflow of workflows) {
  test(`${workflow.id} has a valid visual graph`, () => {
    assert.ok(workflow.nodes.length >= 7, "workflow should show meaningful node detail");
    assert.ok(workflow.edges.length >= 6, "workflow should show meaningful connections");
    assert.ok(workflow.width > 0 && workflow.height > 0);

    const nodeIds = new Set(workflow.nodes.map((node) => node.id));
    assert.equal(nodeIds.size, workflow.nodes.length, "node ids must be unique");

    for (const edge of workflow.edges) {
      assert.ok(nodeIds.has(edge.from), `unknown source node ${edge.from}`);
      assert.ok(nodeIds.has(edge.to), `unknown target node ${edge.to}`);
    }

    for (const [outcome, path] of Object.entries(workflow.paths)) {
      assert.ok(path.length >= 2, `${outcome} path must contain multiple nodes`);
      for (const nodeId of path) assert.ok(nodeIds.has(nodeId), `${outcome} path references ${nodeId}`);
    }
  });
}

test("workflow models contain no private n8n or secret material", () => {
  const serialized = JSON.stringify(workflows);
  assert.doesNotMatch(serialized, /127\.0\.0\.1:5678|localhost:5678|TtgVLP600pJ0tWJX/i);
  assert.doesNotMatch(serialized, /https?:\/\/[^\s"']*webhook/i);
  assert.doesNotMatch(serialized, /(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]/i);
  assert.doesNotMatch(serialized, /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/i);
});

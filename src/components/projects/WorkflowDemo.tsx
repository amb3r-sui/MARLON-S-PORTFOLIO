"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  AlertTriangle,
  Braces,
  CheckCircle2,
  CircleStop,
  Clock3,
  Code2,
  Combine,
  GitBranch,
  Maximize2,
  Play,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  Split,
  Webhook,
  Workflow,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  siGmail,
  siGooglecalendar,
  siGooglegemini,
  siN8n,
  siOdoo,
  siPostgresql,
  type SimpleIcon,
} from "simple-icons";
import { workflowsByProject } from "@/data/workflows";
import type {
  DemoOutcome,
  Project,
  WorkflowExplorerDefinition,
  WorkflowExplorerNode,
  WorkflowNodeKind,
} from "@/types";

type DemoState = "idle" | "running" | DemoOutcome;

const NODE_WIDTH = 148;
const NODE_HEIGHT = 88;

const stateCopy: Record<DemoOutcome, string> = {
  success: "Simulation completed successfully.",
  "validation-error": "Validation stopped the workflow safely.",
  duplicate: "Duplicate protection stopped repeated processing.",
  "provider-failure": "A simulated provider failure triggered the fallback path.",
  "rate-limited": "A simulated rate limit queued a bounded retry.",
};

const brandNodes: Partial<Record<WorkflowNodeKind, SimpleIcon>> = {
  postgres: siPostgresql,
  gemini: siGooglegemini,
  calendar: siGooglecalendar,
  gmail: siGmail,
  odoo: siOdoo,
};

const conceptNodes = {
  manual: Play,
  schedule: Clock3,
  webhook: Webhook,
  execute: Workflow,
  code: Code2,
  condition: GitBranch,
  rag: Braces,
  parser: Braces,
  merge: Combine,
  wait: RefreshCcw,
  error: AlertTriangle,
  response: CircleStop,
} as const;

function BrandNodeIcon({ icon }: { icon: SimpleIcon }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={icon.path} /></svg>;
}

function NodeLogo({ kind }: { kind: WorkflowNodeKind }) {
  const brand = brandNodes[kind];
  if (brand) return <BrandNodeIcon icon={brand} />;
  const ConceptIcon = conceptNodes[kind as keyof typeof conceptNodes] ?? Split;
  return <ConceptIcon aria-hidden="true" />;
}

function edgePath(
  workflow: WorkflowExplorerDefinition,
  fromId: string,
  toId: string,
) {
  const from = workflow.nodes.find((item) => item.id === fromId);
  const to = workflow.nodes.find((item) => item.id === toId);
  if (!from || !to) return "";
  const x1 = from.x + NODE_WIDTH;
  const y1 = from.y + NODE_HEIGHT / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_HEIGHT / 2;
  const bend = Math.max(48, Math.abs(x2 - x1) * 0.46);
  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

function WorkflowCanvas({
  workflow,
  activePath,
  activeIndex,
  selectedNode,
  onSelectNode,
}: {
  workflow: WorkflowExplorerDefinition;
  activePath: string[];
  activeIndex: number;
  selectedNode: string;
  onSelectNode: (node: WorkflowExplorerNode) => void;
}) {
  const [zoom, setZoom] = useState(0.62);
  const visited = new Set(activePath.slice(0, activeIndex + 1));
  const current = activePath[activeIndex];

  return (
    <div className="workflow-explorer">
      <div className="workflow-toolbar">
        <div className="workflow-title">
          <span className="n8n-mark"><BrandNodeIcon icon={siN8n} /></span>
          <div><strong>{workflow.name}</strong><small>{workflow.trigger}</small></div>
        </div>
        <div className="zoom-controls" aria-label="Workflow zoom controls">
          <button type="button" onClick={() => setZoom((value) => Math.max(0.5, value - 0.1))} aria-label="Zoom out"><ZoomOut /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoom((value) => Math.min(1, value + 0.1))} aria-label="Zoom in"><ZoomIn /></button>
          <button type="button" onClick={() => setZoom(0.62)} aria-label="Reset zoom"><Maximize2 /></button>
        </div>
      </div>

      <div className="workflow-canvas-scroll" data-testid="workflow-canvas">
        <div className="workflow-canvas-stage" style={{ width: workflow.width * zoom, height: workflow.height * zoom }}>
          <div
            className="workflow-canvas"
            style={{
              width: workflow.width,
              height: workflow.height,
              transform: `scale(${zoom})`,
            }}
          >
            <svg className="workflow-connections" viewBox={`0 0 ${workflow.width} ${workflow.height}`} aria-hidden="true">
              <defs>
                <marker id={`arrow-${workflow.id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
              </defs>
              {workflow.edges.map((connection) => {
                const active = visited.has(connection.from) && visited.has(connection.to);
                const from = workflow.nodes.find((item) => item.id === connection.from);
                const to = workflow.nodes.find((item) => item.id === connection.to);
                return (
                  <g key={`${connection.from}-${connection.to}-${connection.label ?? ""}`} className={active ? "active" : ""}>
                    <path
                      className={connection.dashed ? "dashed" : ""}
                      d={edgePath(workflow, connection.from, connection.to)}
                      markerEnd={`url(#arrow-${workflow.id})`}
                    />
                    {connection.label && from && to && (
                      <text x={(from.x + NODE_WIDTH + to.x) / 2} y={(from.y + to.y) / 2 + NODE_HEIGHT / 2 - 8}>
                        {connection.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {workflow.nodes.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`explorer-node kind-${item.kind}${visited.has(item.id) ? " visited" : ""}${current === item.id ? " current" : ""}${selectedNode === item.id ? " selected" : ""}`}
                style={{ "--node-x": `${item.x}px`, "--node-y": `${item.y}px` } as CSSProperties}
                onClick={() => onSelectNode(item)}
                aria-label={`${item.label}. ${item.subtitle}. Select to inspect node.`}
                aria-pressed={selectedNode === item.id}
              >
                <span className="node-connector input" />
                <span className="node-logo"><NodeLogo kind={item.kind} /></span>
                <span className="node-copy"><strong>{item.label}</strong><small>{item.subtitle}</small></span>
                <span className="node-status">{visited.has(item.id) ? <CheckCircle2 /> : null}</span>
                <span className="node-connector output" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="canvas-help">Select any node to inspect it. Use the zoom controls or scroll horizontally to explore the full workflow.</p>
    </div>
  );
}

export function WorkflowDemo({ project }: { project: Project }) {
  const workflows = useMemo(() => workflowsByProject[project.slug] ?? [], [project.slug]);
  const [workflowId, setWorkflowId] = useState(workflows[0]?.id ?? "");
  const workflow = useMemo(
    () => workflows.find((item) => item.id === workflowId) ?? workflows[0],
    [workflowId, workflows],
  );
  const [scenarioId, setScenarioId] = useState(project.demoScenarios[0]?.id ?? "");
  const scenario = useMemo(
    () => project.demoScenarios.find((item) => item.id === scenarioId) ?? project.demoScenarios[0],
    [project.demoScenarios, scenarioId],
  );
  const [values, setValues] = useState<Record<string, string>>(scenario?.sampleInput ?? {});
  const [state, setState] = useState<DemoState>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [output, setOutput] = useState("");
  const [selectedNode, setSelectedNode] = useState(workflow?.nodes[0]?.id ?? "");
  const [resolvedOutcome, setResolvedOutcome] = useState<DemoOutcome>(scenario?.outcome ?? "success");

  const activePath = workflow?.paths[resolvedOutcome] ?? workflow?.paths.success ?? workflow?.nodes.map((item) => item.id) ?? [];
  const inspectedNode = workflow?.nodes.find((item) => item.id === selectedNode) ?? workflow?.nodes[0];

  useEffect(() => {
    if (state !== "running" || !workflow || !scenario) return;
    if (activeStep >= activePath.length - 1) {
      const timer = window.setTimeout(() => {
        const missing = Object.values(values).some((value) => !value.trim());
        const email = Object.entries(values).find(([key]) => key.toLowerCase().includes("email"))?.[1];
        const outcome: DemoOutcome = missing || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          ? "validation-error"
          : scenario.outcome;
        setResolvedOutcome(outcome);
        setState(outcome);
        setOutput(outcome === scenario.outcome ? scenario.sampleOutput : "Validation stopped: complete all required fields and use a valid email address.");
      }, 240);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setActiveStep((step) => step + 1), 300);
    return () => window.clearTimeout(timer);
  }, [activePath.length, activeStep, scenario, state, values, workflow]);

  function chooseWorkflow(id: string) {
    const selected = workflows.find((item) => item.id === id);
    if (!selected) return;
    setWorkflowId(id);
    setSelectedNode(selected.nodes[0]?.id ?? "");
    setState("idle");
    setActiveStep(-1);
    setOutput("");
  }

  function chooseScenario(id: string) {
    const selected = project.demoScenarios.find((item) => item.id === id);
    if (!selected) return;
    setScenarioId(id);
    setValues(selected.sampleInput);
    setResolvedOutcome(selected.outcome);
    setState("idle");
    setActiveStep(-1);
    setOutput("");
  }

  function runDemo() {
    if (!scenario) return;
    const missing = Object.values(values).some((value) => !value.trim());
    const email = Object.entries(values).find(([key]) => key.toLowerCase().includes("email"))?.[1];
    const outcome: DemoOutcome = missing || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      ? "validation-error"
      : scenario.outcome;
    setResolvedOutcome(outcome);
    setState("running");
    setActiveStep(0);
    setOutput("");
  }

  function resetDemo() {
    if (!scenario || !workflow) return;
    setValues(scenario.sampleInput);
    setResolvedOutcome(scenario.outcome);
    setState("idle");
    setActiveStep(-1);
    setOutput("");
    setSelectedNode(workflow.nodes[0]?.id ?? "");
  }

  if (!workflow || !scenario) return null;

  return (
    <div className="demo-shell" data-testid="workflow-demo">
      <div className="demo-notice">
        <ShieldCheck />
        <span>
          <strong>Isolated workflow simulation</strong>
          Recreated architecture with fictional sample data. No n8n instance, credential, token, webhook, private workflow export, or production system is connected.
        </span>
      </div>

      <div className="workflow-switcher" role="tablist" aria-label="Select a workflow to explore">
        {workflows.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={item.id === workflow.id}
            className={item.id === workflow.id ? "active" : ""}
            key={item.id}
            onClick={() => chooseWorkflow(item.id)}
            data-testid={`workflow-tab-${item.id}`}
          >
            {item.shortName}
          </button>
        ))}
      </div>

      <div className="workflow-summary">
        <div><span className="eyebrow">Selected workflow</span><h3>{workflow.name}</h3><p>{workflow.summary}</p></div>
        <div><small>Trigger</small><strong>{workflow.trigger}</strong><small>Visible structure</small><strong>{workflow.nodes.length} nodes · {workflow.edges.length} connections</strong></div>
      </div>

      <WorkflowCanvas
        workflow={workflow}
        activePath={activePath}
        activeIndex={activeStep}
        selectedNode={selectedNode}
        onSelectNode={(item) => setSelectedNode(item.id)}
      />

      {inspectedNode && (
        <div className="node-inspector" data-testid="node-inspector">
          <span className={`node-logo kind-${inspectedNode.kind}`}><NodeLogo kind={inspectedNode.kind} /></span>
          <div><span className="eyebrow">Node inspector</span><h3>{inspectedNode.label}</h3><p>{inspectedNode.details}</p></div>
          <dl><div><dt>Node type</dt><dd>{inspectedNode.subtitle}</dd></div><div><dt>Mode</dt><dd>Sanitized simulation</dd></div></dl>
        </div>
      )}

      <div className="demo-layout detailed">
        <section className="demo-panel" aria-labelledby="demo-input-title">
          <span className="eyebrow">Test with sample data</span>
          <h3 id="demo-input-title">Run the selected workflow</h3>
          <label>Scenario<select value={scenarioId} onChange={(event) => chooseScenario(event.target.value)} data-testid="demo-scenario">{project.demoScenarios.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
          <p className="demo-description">{scenario.description}</p>
          <div className="demo-fields">{Object.entries(values).map(([key, value]) => <label key={key}>{key}<input value={value} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} disabled={state === "running"} /></label>)}</div>
          <div className="button-row"><button className="button button-primary" type="button" onClick={runDemo} disabled={state === "running"} data-testid="run-demo"><Play size={16} />{state === "running" ? "Running…" : "Run sample"}</button><button className="button button-secondary" type="button" onClick={resetDemo} data-testid="reset-demo"><RotateCcw size={16} />Reset</button></div>
        </section>

        <section className="demo-panel" aria-labelledby="demo-progress-title">
          <span className="eyebrow">Active execution path</span>
          <h3 id="demo-progress-title">Simulated node trace</h3>
          <ol className="demo-progress">{activePath.map((nodeId, index) => {
            const item = workflow.nodes.find((candidate) => candidate.id === nodeId);
            if (!item) return null;
            return <li key={`${workflow.id}-${nodeId}`} className={index < activeStep || state !== "running" && activeStep === activePath.length - 1 ? "complete" : index === activeStep ? "active" : ""}><span>{index < activeStep ? <CheckCircle2 /> : index + 1}</span>{item.label}</li>;
          })}</ol>
        </section>

        <section className="demo-panel demo-output" aria-labelledby="demo-output-title" aria-live="polite">
          <span className="eyebrow">Sanitized output</span>
          <h3 id="demo-output-title">Simulation result</h3>
          {state === "idle" && <p>Choose a scenario and run the sample to animate the corresponding branch through this workflow.</p>}
          {state === "running" && <p className="demo-running">Processing fictional sample data…</p>}
          {!["idle", "running"].includes(state) && <div className={`demo-result ${state}`} data-testid="demo-result">{state === "success" ? <CheckCircle2 /> : <AlertTriangle />}<div><strong>{stateCopy[state as DemoOutcome]}</strong><p>{output}</p></div></div>}
          <small>Every provider action, message, database record, booking, RFQ, and notification shown here is simulated.</small>
        </section>
      </div>
    </div>
  );
}

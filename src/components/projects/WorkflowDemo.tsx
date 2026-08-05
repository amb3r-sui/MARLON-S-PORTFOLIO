"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Warning as AlertTriangle,
  BracketsCurly as Braces,
  Check,
  CheckCircle as CheckCircle2,
  XCircle as CircleX,
  StopCircle as CircleStop,
  Clock as Clock3,
  Intersect as Combine,
  GitBranch,
  Globe as Globe2,
  ArrowsOut as Maximize2,
  EnvelopeSimple as Mail,
  Mouse as MousePointerClick,
  Play,
  ArrowClockwise as RefreshCcw,
  ArrowCounterClockwise as RotateCcw,
  ShieldCheck,
  GitFork as Split,
  WebhooksLogo as Webhook,
  FlowArrow as Workflow,
  MagnifyingGlassPlus as ZoomIn,
  MagnifyingGlassMinus as ZoomOut,
} from "@phosphor-icons/react";
import {
  siGmail,
  siGooglecalendar,
  siGooglegemini,
  siN8n,
  siOdoo,
  siPostgresql,
  siTelegram,
  type SimpleIcon,
} from "simple-icons";
import { workflowsByProject } from "@/data/workflows";
import type {
  DemoOutcome,
  Project,
  WorkflowExplorerDefinition,
  WorkflowExplorerEdge,
  WorkflowExplorerNode,
  WorkflowNodeKind,
} from "@/types";

type DemoState = "idle" | "running" | DemoOutcome;

const NODE_WIDTH = 112;
const NODE_HEIGHT = 92;
const NODE_FACE_LEFT = 24;
const NODE_FACE_SIZE = 64;

const stateCopy: Record<DemoOutcome, string> = {
  success: "Simulation completed successfully.",
  "validation-error": "Validation stopped the workflow safely.",
  duplicate: "Duplicate protection stopped repeated processing.",
  "provider-failure": "A simulated provider failure triggered the fallback path.",
  "rate-limited": "A simulated rate limit queued a bounded retry.",
};

const outcomeCopy: Record<string, Record<DemoOutcome, string>> = {
  "rana-ai-receptionist-system": {
    success: "Booking inquiry prepared for controlled processing",
    "validation-error": "Invalid inquiry stopped before integrations",
    duplicate: "Repeated inquiry blocked before AI processing",
    "provider-failure": "Inquiry routed to a safe human-review fallback",
    "rate-limited": "Inquiry held for a bounded retry",
  },
  "inventory-rfq-automation": {
    success: "Replenishment recommendation ready for human review",
    "validation-error": "Incomplete purchasing data stopped safely",
    duplicate: "Duplicate draft request prevented",
    "provider-failure": "ERP failure recorded without creating a purchase",
    "rate-limited": "ERP request queued for a bounded retry",
  },
  "b2b-ai-lead-triage": {
    success: "Lead recommendation ready for salesperson review",
    "validation-error": "Invalid lead stopped before AI processing",
    duplicate: "Duplicate outreach prevented",
    "provider-failure": "Lead retained for manual review",
    "rate-limited": "Lead retained for a bounded retry",
  },
};

const safeguardCopy: Record<DemoOutcome, string> = {
  success: "Human decision boundary preserved",
  "validation-error": "Input validation",
  duplicate: "Duplicate protection",
  "provider-failure": "Provider fallback",
  "rate-limited": "Bounded retry policy",
};

const brandNodes: Partial<Record<WorkflowNodeKind, SimpleIcon>> = {
  postgres: siPostgresql,
  gemini: siGooglegemini,
  calendar: siGooglecalendar,
  gmail: siGmail,
  odoo: siOdoo,
  telegram: siTelegram,
};

const conceptNodes = {
  manual: MousePointerClick,
  schedule: Clock3,
  execute: Workflow,
  condition: GitBranch,
  rag: Braces,
  parser: Braces,
  merge: Combine,
  wait: RefreshCcw,
  error: CircleX,
  response: CircleStop,
  email: Mail,
} as const;

function BrandNodeIcon({ icon }: { icon: SimpleIcon }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={icon.path} /></svg>;
}

function N8nNativeNodeIcon({ kind }: { kind: "code" | "webhook" | "http" }) {
  if (kind === "code") {
    return (
      <svg className="n8n-native-icon" viewBox="0 0 512 512" aria-hidden="true">
        <path d="M170.3 48h26.2a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-26.2a80 80 0 0 0-80 80v96a56 56 0 0 1-56 56H23a12 12 0 0 0-12 12v24a12 12 0 0 0 12 12h11.3a56 56 0 0 1 56 56v104a72 72 0 0 0 72 72h34.2a12 12 0 0 0 12-12v-24a12 12 0 0 0-12-12h-34.2a24 24 0 0 1-24-24V336c0-27-10.3-51.6-27.1-70a15 15 0 0 1 0-20c16.8-18.4 27.1-43 27.1-70V80a32 32 0 0 1 32-32Zm171.7 0a32 32 0 0 1 33 32v96c0 27 10.2 51.6 27 70a15 15 0 0 1 0 20c-16.8 18.4-27 43-27 70v96a32 32 0 0 1-32 32h-26a12 12 0 0 0-12 12v24a12 12 0 0 0 12 12h26a80 80 0 0 0 80-80v-96a56 56 0 0 1 56-56h11a12 12 0 0 0 12-12v-24a12 12 0 0 0-12-12h-11a56 56 0 0 1-56-56V80a80 80 0 0 0-80-80h-26a12 12 0 0 0-12 12v24a12 12 0 0 0 12 12Z" />
      </svg>
    );
  }

  if (kind === "webhook") return <Webhook aria-hidden="true" weight="bold" />;
  return <Globe2 aria-hidden="true" weight="bold" />;
}

function NodeLogo({ kind }: { kind: WorkflowNodeKind }) {
  if (kind === "code" || kind === "webhook" || kind === "http") {
    return <N8nNativeNodeIcon kind={kind} />;
  }
  const brand = brandNodes[kind];
  if (brand) return <BrandNodeIcon icon={brand} />;
  const ConceptIcon = conceptNodes[kind as keyof typeof conceptNodes] ?? Split;
  return <ConceptIcon aria-hidden="true" weight="bold" />;
}

function edgePath(
  workflow: WorkflowExplorerDefinition,
  connection: WorkflowExplorerEdge,
) {
  const from = workflow.nodes.find((item) => item.id === connection.from);
  const to = workflow.nodes.find((item) => item.id === connection.to);
  if (!from || !to) return "";

  const aiConnection = /model|tool|parser|embedding|document|splitter/i.test(connection.label ?? "");
  if (aiConnection) {
    const fromIsBelow = from.y > to.y;
    const x1 = from.x + NODE_WIDTH / 2;
    const y1 = from.y + (fromIsBelow ? 18 : NODE_FACE_SIZE + 10);
    const x2 = to.x + NODE_WIDTH / 2;
    const y2 = to.y + (fromIsBelow ? NODE_FACE_SIZE + 10 : 18);
    const bend = Math.max(70, Math.abs(y2 - y1) * 0.46);
    return `M ${x1} ${y1} C ${x1} ${y1 + (fromIsBelow ? -bend : bend)}, ${x2} ${y2 + (fromIsBelow ? bend : -bend)}, ${x2} ${y2}`;
  }

  const x1 = from.x + NODE_FACE_LEFT + NODE_FACE_SIZE;
  const branchNumber = connection.label?.match(/^(\d)/)?.[1];
  const branchOffset = branchNumber
    ? 14 + Number(branchNumber) * 10
    : connection.label === "true"
      ? 20
      : connection.label === "false" || connection.label === "fallback"
        ? 54
        : NODE_FACE_SIZE / 2;
  const y1 = from.y + branchOffset;
  const x2 = to.x + NODE_FACE_LEFT;
  const y2 = to.y + NODE_FACE_SIZE / 2;
  const bend = Math.max(58, Math.abs(x2 - x1) * 0.46);
  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

function WorkflowCanvas({
  workflow,
  activePath,
  activeIndex,
  state,
  selectedNode,
  onSelectNode,
  onReset,
}: {
  workflow: WorkflowExplorerDefinition;
  activePath: string[];
  activeIndex: number;
  state: DemoState;
  selectedNode: string;
  onSelectNode: (node: WorkflowExplorerNode) => void;
  onReset: () => void;
}) {
  const [zoom, setZoom] = useState(workflow.initialZoom ?? 0.62);
  const visited = new Set(activePath.slice(0, activeIndex + 1));
  const current = activePath[activeIndex];

  return (
    <div className="workflow-explorer">
      <div className="workflow-toolbar">
        <div className="workflow-title">
          <span className="n8n-mark"><BrandNodeIcon icon={siN8n} /></span>
          <div><strong>{workflow.name}</strong><small>{workflow.trigger}</small></div>
        </div>
        <div className="workflow-toolbar-actions">
          <span className={`execution-status status-${state}`} aria-live="polite">
            <i />{state === "idle" ? "Ready" : state === "running" ? "Executing" : "Run complete"}
          </span>
          <button className="n8n-reset" type="button" onClick={onReset} disabled={state === "running"} aria-label="Reset mock execution"><RotateCcw /></button>
          <div className="zoom-controls" aria-label="Workflow zoom controls">
            <button type="button" onClick={() => setZoom((value) => Math.max(0.12, value - 0.05))} aria-label="Zoom out"><ZoomOut /></button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((value) => Math.min(1, value + 0.05))} aria-label="Zoom in"><ZoomIn /></button>
            <button type="button" onClick={() => setZoom(workflow.initialZoom ?? 0.62)} aria-label="Zoom to fit"><Maximize2 /></button>
          </div>
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
            {workflow.notes?.map((note) => (
              <article
                className={`workflow-note note-${note.color}`}
                key={note.id}
                style={{ left: note.x, top: note.y, width: note.width, height: note.height }}
                aria-label={`${note.title}. ${note.body}`}
              >
                <h4>{note.title}</h4>
                <p>{note.body}</p>
              </article>
            ))}

            <svg className="workflow-connections" viewBox={`0 0 ${workflow.width} ${workflow.height}`} aria-hidden="true">
              {workflow.edges.map((connection) => {
                const active = visited.has(connection.from) && visited.has(connection.to);
                const from = workflow.nodes.find((item) => item.id === connection.from);
                const to = workflow.nodes.find((item) => item.id === connection.to);
                const aiConnection = /model|tool|parser|embedding|document|splitter/i.test(connection.label ?? "");
                const edgeLabel = active
                  ? connection.label
                    ? `${connection.label} - 1 item`
                    : "1 item"
                  : connection.label;
                return (
                  <g key={`${connection.from}-${connection.to}-${connection.label ?? ""}`} className={`${active ? "active " : ""}${aiConnection ? "ai-connection" : ""}`}>
                    <path
                      className={connection.dashed ? "dashed" : ""}
                      d={edgePath(workflow, connection)}
                    />
                    {edgeLabel && from && to && (
                      <text x={(from.x + NODE_WIDTH + to.x) / 2} y={(from.y + to.y) / 2 + NODE_HEIGHT / 2 - 8}>
                        {edgeLabel}
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
                className={`explorer-node kind-${item.kind}${item.disabled ? " disabled" : ""}${visited.has(item.id) ? " visited" : ""}${current === item.id ? " current" : ""}${selectedNode === item.id ? " selected" : ""}`}
                style={{ "--node-x": `${item.x}px`, "--node-y": `${item.y}px` } as CSSProperties}
                onClick={() => onSelectNode(item)}
                aria-label={`${item.label}. ${item.subtitle}. Select to inspect node.`}
                aria-pressed={selectedNode === item.id}
              >
                <span className="node-connector input" />
                <span className="node-face">
                  <span className="node-logo"><NodeLogo kind={item.kind} /></span>
                  <span className="node-status">{visited.has(item.id) ? <Check /> : null}</span>
                </span>
                <span className="node-copy"><strong>{item.label}</strong><small>{item.subtitle}{item.disabled ? " - Disabled" : ""}</small></span>
                <span className="node-connector output" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="canvas-help">Select any node to inspect it. Colored sections, disabled nodes, branch placement, and connection routes mirror the audited n8n canvas.</p>
    </div>
  );
}

export function WorkflowDemo({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
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

  const mockPayload = JSON.stringify(values, null, 2);
  const finished = !["idle", "running"].includes(state);
  const finalOutcome = finished ? state as DemoOutcome : resolvedOutcome;
  const routeEnd = workflow.nodes.find((node) => node.id === activePath.at(-1))?.label ?? "Awaiting execution";
  const businessOutcome = outcomeCopy[project.slug]?.[finalOutcome] ?? stateCopy[finalOutcome];

  return (
    <div className="demo-shell" data-testid="workflow-demo">
      <div className="demo-notice">
        <ShieldCheck />
        <span>
          <strong>Isolated workflow simulation</strong>
          Recreated architecture with fictional sample data. No n8n instance, credential, token, webhook, private workflow export, or production system is connected.
        </span>
      </div>

      <section className="mock-workbench outcome-first" aria-labelledby="mock-workbench-title">
        <div className="mock-form">
          <div className="mock-heading">
            <div><span className="detail-label">Step 1 · Select a scenario</span><h3 id="mock-workbench-title">Choose the operating condition to test</h3></div>
          </div>
          <label>Test scenario<select value={scenarioId} onChange={(event) => chooseScenario(event.target.value)} data-testid="demo-scenario">{project.demoScenarios.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
          <p className="demo-description">{scenario.description}</p>
          <div className="scenario-expectation" aria-live="polite">
            <div><small>Expected simulated outcome</small><strong>{outcomeCopy[project.slug]?.[scenario.outcome] ?? stateCopy[scenario.outcome]}</strong></div>
            <div><small>Safeguard or boundary</small><strong>{safeguardCopy[scenario.outcome]}</strong></div>
          </div>
          <div className="mock-heading input-heading">
            <div><span className="detail-label">Step 2 · Review sample input</span><h3>Use or edit the fictional data</h3></div>
            <span className="safe-data-badge"><ShieldCheck /> Fictional data only</span>
          </div>
          <div className="demo-fields">{Object.entries(values).map(([key, value]) => <label key={key}>{key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}<input value={value} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} disabled={state === "running"} /></label>)}</div>
          <div className="button-row"><button className="button button-primary" type="button" onClick={runDemo} disabled={state === "running"} data-testid="run-demo"><Play size={16} />{state === "running" ? "Running demo…" : "Run demo"}</button><button className="button button-secondary" type="button" onClick={resetDemo} disabled={state === "running"} data-testid="reset-demo"><RotateCcw size={16} />Reset sample</button></div>
        </div>
      </section>

      <div className="demo-layout execution-layout">
        <section className="demo-panel" aria-labelledby="demo-progress-title">
          <span className="detail-label">Step 3 · Execution progress</span>
          <h3 id="demo-progress-title">What the automation is doing</h3>
          <ol className="demo-progress">{activePath.map((nodeId, index) => {
            const item = workflow.nodes.find((candidate) => candidate.id === nodeId);
            if (!item) return null;
            return <li key={`${workflow.id}-${nodeId}`} className={index < activeStep || state !== "running" && activeStep === activePath.length - 1 ? "complete" : index === activeStep ? "active" : ""}><span>{index < activeStep ? <CheckCircle2 /> : index + 1}</span>{item.label}</li>;
          })}</ol>
        </section>

        <section className="demo-panel demo-output" aria-labelledby="demo-output-title" aria-live="polite">
          <span className="detail-label">Step 4 · Business result</span>
          <h3 id="demo-output-title">Operational outcome</h3>
          {state === "idle" && <p>Choose a scenario and run the sample to animate the corresponding branch through this workflow.</p>}
          {state === "running" && <p className="demo-running">Processing fictional sample data…</p>}
          {finished && <><motion.div className={`demo-result ${state}`} data-testid="demo-result" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }}>{state === "success" ? <CheckCircle2 weight="fill" /> : <AlertTriangle weight="fill" />}<div><strong>{businessOutcome}</strong><p>{output}</p></div></motion.div><div className="outcome-card-grid"><div><small>Final route</small><strong>{routeEnd}</strong></div><div><small>Safeguard demonstrated</small><strong>{safeguardCopy[finalOutcome]}</strong></div><div><small>External systems</small><strong>Simulated, none contacted</strong></div><div><small>Selected path</small><strong>{activePath.length} documented nodes</strong></div></div></>}
          <small>Every provider action, message, database record, booking, RFQ, and notification shown here is simulated.</small>
        </section>
      </div>

      <details className="technical-payload">
        <summary><Braces /> View technical input payload <span>Technical details · optional JSON</span></summary>
        <div className="payload-explainer">
          <div><ShieldCheck /><span><strong>What is this payload?</strong><p>This fictional input object shows how customer or business data is structured before validation and workflow processing. It stays in your browser and is never sent to n8n, an API, or a production system.</p></span></div>
          <dl><div><dt>Purpose</dt><dd>Technical input inspection</dd></div><div><dt>Storage</dt><dd>Browser memory only</dd></div><div><dt>Connected systems</dt><dd>None</dd></div></dl>
        </div>
        <div className="mock-payload" aria-label="Mock payload preview"><div><strong>Input JSON</strong></div><pre>{mockPayload}</pre><small>Browser memory only. Cleared when you refresh.</small></div>
      </details>

      <details className="full-workflow-details">
        <summary><Workflow weight="bold" /> Inspect the full n8n-style workflow <span>{workflow.nodes.length} nodes, {workflow.edges.length} connections</span></summary>
        <div className="workflow-switcher" role="group" aria-label="Select a workflow to inspect">
          {workflows.map((item) => (
            <button
              type="button"
              aria-pressed={item.id === workflow.id}
              className={item.id === workflow.id ? "active" : ""}
              key={item.id}
              onClick={() => chooseWorkflow(item.id)}
              data-testid={`workflow-tab-${item.id}`}
            >
              {item.shortName}
            </button>
          ))}
        </div>
        <div className="workflow-summary"><div><span className="detail-label">Selected workflow</span><h3>{workflow.name}</h3><p>{workflow.summary}</p></div><div><small>Trigger</small><strong>{workflow.trigger}</strong><small>Visible structure</small><strong>{workflow.nodes.length} nodes, {workflow.edges.length} connections</strong></div></div>
        <WorkflowCanvas key={workflow.id} workflow={workflow} activePath={activePath} activeIndex={activeStep} state={state} selectedNode={selectedNode} onSelectNode={(item) => setSelectedNode(item.id)} onReset={resetDemo} />
        {inspectedNode && <div className="node-inspector" data-testid="node-inspector"><span className={`node-logo kind-${inspectedNode.kind}`}><NodeLogo kind={inspectedNode.kind} /></span><div><span className="detail-label">Node inspector</span><h3>{inspectedNode.label}</h3><p>{inspectedNode.details}</p></div><dl><div><dt>Node type</dt><dd>{inspectedNode.subtitle}</dd></div><div><dt>Mode</dt><dd>Sanitized simulation</dd></div></dl></div>}
      </details>
    </div>
  );
}

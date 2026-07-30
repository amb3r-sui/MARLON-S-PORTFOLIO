"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Play, RotateCcw, ShieldCheck } from "lucide-react";
import type { DemoOutcome, Project } from "@/types";

type DemoState = "idle" | "running" | DemoOutcome;

const stateCopy: Record<DemoOutcome, string> = {
  success: "Simulation completed successfully.",
  "validation-error": "Validation stopped the workflow safely.",
  duplicate: "Duplicate protection stopped repeated processing.",
  "provider-failure": "A simulated provider failure triggered the fallback path.",
  "rate-limited": "A simulated rate limit queued a bounded retry.",
};

export function WorkflowDemo({ project }: { project: Project }) {
  const [scenarioId, setScenarioId] = useState(project.demoScenarios[0]?.id ?? "");
  const scenario = useMemo(() => project.demoScenarios.find((item) => item.id === scenarioId) ?? project.demoScenarios[0], [project.demoScenarios, scenarioId]);
  const [values, setValues] = useState<Record<string, string>>(scenario?.sampleInput ?? {});
  const [state, setState] = useState<DemoState>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (state !== "running") return;
    if (activeStep >= project.architecture.length - 1) {
      const timer = window.setTimeout(() => {
        const missing = Object.values(values).some((value) => !value.trim());
        const email = Object.entries(values).find(([key]) => key.toLowerCase().includes("email"))?.[1];
        const outcome: DemoOutcome = missing || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ? "validation-error" : scenario.outcome;
        setState(outcome);
        setOutput(outcome === scenario.outcome ? scenario.sampleOutput : "Validation stopped: complete all required fields and use a valid email address.");
      }, 280);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setActiveStep((step) => step + 1), 340);
    return () => window.clearTimeout(timer);
  }, [activeStep, project.architecture.length, scenario, state, values]);

  function chooseScenario(id: string) {
    const selected = project.demoScenarios.find((item) => item.id === id);
    if (!selected) return;
    setScenarioId(id);
    setValues(selected.sampleInput);
    setState("idle");
    setActiveStep(-1);
    setOutput("");
  }

  function runDemo() {
    setState("running");
    setActiveStep(0);
    setOutput("");
  }

  function resetDemo() {
    setValues(scenario.sampleInput);
    setState("idle");
    setActiveStep(-1);
    setOutput("");
  }

  return (
    <div className="demo-shell" data-testid="workflow-demo">
      <div className="demo-notice"><ShieldCheck /><span><strong>Safe portfolio simulation</strong>Portfolio simulation using sample data. No real customer records or production systems are accessed.</span></div>
      <div className="demo-layout">
        <section className="demo-panel" aria-labelledby="demo-input-title">
          <span className="eyebrow">Try the demo</span>
          <h3 id="demo-input-title">Choose a sample scenario</h3>
          <label>Scenario<select value={scenarioId} onChange={(event) => chooseScenario(event.target.value)} data-testid="demo-scenario">{project.demoScenarios.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
          <p className="demo-description">{scenario.description}</p>
          <div className="demo-fields">{Object.entries(values).map(([key, value]) => <label key={key}>{key}<input value={value} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} disabled={state === "running"} /></label>)}</div>
          <div className="button-row"><button className="button button-primary" type="button" onClick={runDemo} disabled={state === "running"} data-testid="run-demo"><Play size={16} />{state === "running" ? "Running…" : "Run demo"}</button><button className="button button-secondary" type="button" onClick={resetDemo} data-testid="reset-demo"><RotateCcw size={16} />Reset</button></div>
        </section>
        <section className="demo-panel" aria-labelledby="demo-progress-title">
          <span className="eyebrow">Workflow progress</span>
          <h3 id="demo-progress-title">How it works</h3>
          <ol className="demo-progress">{project.architecture.map((step, index) => <li key={step} className={index < activeStep || state !== "running" && activeStep === project.architecture.length - 1 ? "complete" : index === activeStep ? "active" : ""}><span>{index < activeStep ? <CheckCircle2 /> : index + 1}</span>{step}</li>)}</ol>
        </section>
        <section className="demo-panel demo-output" aria-labelledby="demo-output-title" aria-live="polite">
          <span className="eyebrow">Sample output</span>
          <h3 id="demo-output-title">Result</h3>
          {state === "idle" && <p>Select a scenario and run the simulation to view a sanitized result.</p>}
          {state === "running" && <p className="demo-running">Processing sample data…</p>}
          {!["idle", "running"].includes(state) && <div className={`demo-result ${state}`} data-testid="demo-result">{state === "success" ? <CheckCircle2 /> : <AlertTriangle />}<div><strong>{stateCopy[state as DemoOutcome]}</strong><p>{output}</p></div></div>}
          <small>External-system actions, notifications, CRM updates, and records shown here are simulations only.</small>
        </section>
      </div>
    </div>
  );
}

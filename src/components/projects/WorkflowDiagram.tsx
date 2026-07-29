import { ArrowDown, ArrowRight, CheckCircle2, GitBranch, Radio, Send, Database, FileClock } from "lucide-react";

const icons = [Radio, CheckCircle2, GitBranch, Database, Send, FileClock];
export function WorkflowDiagram({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <div className={`workflow ${compact ? "compact" : ""}`} role="list" aria-label="Workflow steps">
      {steps.map((step, index) => {
        const Icon = icons[index % icons.length];
        return <div className="workflow-group" key={`${step}-${index}`}><div className="workflow-step" role="listitem"><span>{String(index + 1).padStart(2, "0")}</span><Icon /><strong>{step}</strong></div>{index < steps.length - 1 && <div className="workflow-arrow" aria-hidden="true"><ArrowRight className="arrow-horizontal" /><ArrowDown className="arrow-vertical" /></div>}</div>;
      })}
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight, Boxes, GitBranch, Play, Workflow } from "lucide-react";
import type { Project } from "@/types";
import { WorkflowDiagram } from "./WorkflowDiagram";
import { workflowsByProject } from "@/data/workflows";

export function ProjectCard({ project }: { project: Project }) {
  const workflows = workflowsByProject[project.slug] ?? [];
  const primaryWorkflow = workflows[0];
  const nodeCount = workflows.reduce((total, workflow) => total + workflow.nodes.length, 0);
  const connectionCount = workflows.reduce((total, workflow) => total + workflow.edges.length, 0);
  const previewSteps = primaryWorkflow
    ? (primaryWorkflow.paths.success ?? primaryWorkflow.nodes.map((node) => node.id))
        .map((id) => primaryWorkflow.nodes.find((node) => node.id === id)?.label)
        .filter((label): label is string => Boolean(label))
        .slice(0, 4)
    : project.workflow.slice(0, 4);

  return (
    <Link href={`/projects/${project.slug}`} className="project-card-shell" aria-label={`Explore ${project.title}`}>
      <article className="project-card">
        <div className="project-visual">
          <div className="visual-label"><span><Boxes size={16} /> {primaryWorkflow?.name ?? "System architecture"}</span><small>Interactive case study</small></div>
          <WorkflowDiagram steps={previewSteps} compact />
          <div className="workflow-card-facts" aria-label="Audited workflow structure">
            <span><Workflow size={13} />{workflows.length} {workflows.length === 1 ? "workflow" : "workflows"}</span>
            <span><Play size={13} />{nodeCount} nodes</span>
            <span><GitBranch size={13} />{connectionCount} connections</span>
          </div>
        </div>
        <div className="project-card-body">
          <div className="card-meta"><span>{project.category}</span><span className="status-dot">{project.status}</span></div>
          <h3>{project.title}</h3><p>{project.summary}</p>
          {primaryWorkflow && <div className="project-trigger"><span>Primary trigger</span><strong>{primaryWorkflow.trigger}</strong></div>}
          <div className="tag-row">{project.tools.slice(0, 4).map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
          <span className="project-card-link">Open workflow lab <ArrowUpRight size={17} /></span>
        </div>
      </article>
    </Link>
  );
}

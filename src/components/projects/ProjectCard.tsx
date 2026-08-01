import Link from "next/link";
import { ArrowUpRight, Boxes } from "lucide-react";
import type { Project } from "@/types";
import { WorkflowDiagram } from "./WorkflowDiagram";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-visual"><div className="visual-label"><span><Boxes size={16} /> System architecture</span><small>Interactive case study</small></div><WorkflowDiagram steps={project.workflow.slice(0, 4)} compact /></div>
      <div className="project-card-body">
        <div className="card-meta"><span>{project.category}</span><span className="status-dot">{project.status}</span></div>
        <h3>{project.title}</h3><p>{project.summary}</p>
        <div className="tag-row">{project.tools.slice(0, 4).map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
        <Link href={`/projects/${project.slug}`} className="project-card-link">Explore system <ArrowUpRight size={17} /></Link>
      </div>
    </article>
  );
}

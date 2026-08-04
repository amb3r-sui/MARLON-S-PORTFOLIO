import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlowArrow, GitBranch } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/types";
import { workflowsByProject } from "@/data/workflows";

export function ProjectCard({ project }: { project: Project }) {
  const workflows = workflowsByProject[project.slug] ?? [];
  const nodeCount = workflows.reduce((total, workflow) => total + workflow.nodes.length, 0);
  const image = project.screenshots[0];

  return (
    <Link href={`/projects/${project.slug}`} className="project-card-shell">
      <article className="project-card">
        <div className="project-visual">
          <Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 760px) 100vw, 42vw" />
        </div>
        <div className="project-card-body">
          <div className="card-meta"><span>{project.category}</span><span>{project.projectType}</span></div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          {workflows.length > 0 && (
            <div className="workflow-card-facts" aria-label="Documented workflow structure">
              <span><FlowArrow size={16} weight="bold" />{workflows.length} {workflows.length === 1 ? "workflow" : "workflows"}</span>
              <span><GitBranch size={16} weight="bold" />{nodeCount} nodes</span>
            </div>
          )}
          <div className="tag-row">{project.tools.slice(0, 4).map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
          <span className="project-card-link">Read case study <ArrowUpRight size={18} weight="bold" /></span>
        </div>
      </article>
    </Link>
  );
}

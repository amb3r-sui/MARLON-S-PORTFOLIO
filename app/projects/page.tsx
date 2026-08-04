import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { workflowsByProject } from "@/data/workflows";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Automation Projects", description: "Review Marlon Magno's n8n, AI, CRM, API, and data automation case studies.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  const workflows = Object.values(workflowsByProject).flat();
  const nodeCount = workflows.reduce((total, workflow) => total + workflow.nodes.length, 0);
  const connectionCount = workflows.reduce((total, workflow) => total + workflow.edges.length, 0);

  return (
    <>
      <section className="page-hero project-lab-page">
        <div className="container project-hero-grid">
          <div>
            <span className="eyebrow">Project portfolio</span>
            <h1>Automation you can inspect.</h1>
            <p>Each case study separates implemented logic, safe simulation, expected impact, and future production work.</p>
          </div>
          <div className="project-lab-status" aria-label="Project portfolio coverage">
            <div><strong>{projects.length}</strong><span>project families</span></div>
            <div><strong>{workflows.length}</strong><span>workflow models</span></div>
            <div><strong>{nodeCount}</strong><span>documented nodes</span></div>
            <div><strong>{connectionCount}</strong><span>mapped connections</span></div>
          </div>
        </div>
      </section>
      <section className="section no-top">
        <div className="container page-content"><ProjectFilters /></div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "AI Automation Projects", description: "Review AI agents, workflow automation, CRM operations, integrations, and human-review safeguards.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero project-lab-page">
        <div className="container project-hero-grid">
          <div>
            <span className="eyebrow">AI automation project portfolio</span>
            <h1>Systems designed around operational decisions.</h1>
            <p>Compare the business problem, intended outcome, current status, and safety boundary for each project. Interactive demonstrations use fictional sample data and do not contact production systems.</p>
          </div>
          <div className="project-lab-status project-lab-summary" aria-label="Portfolio scope">
            <div><strong>{projects.length}</strong><span>documented project families</span></div>
            <div><strong>{projects.filter((project) => project.demoMode === "simulation").length}</strong><span>client-safe demonstrations</span></div>
          </div>
        </div>
      </section>
      <section className="section no-top">
        <div className="container page-content"><ProjectFilters /></div>
      </section>
    </>
  );
}

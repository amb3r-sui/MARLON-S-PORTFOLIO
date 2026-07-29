"use client";
import { useState } from "react";
import { categories, projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilters() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = active === "All" ? projects : projects.filter((project) => project.category === active || (active === "n8n" && project.tools.includes("n8n")));
  return <><div className="filter-bar" role="group" aria-label="Filter projects">{categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => setActive(category)} aria-pressed={active === category}>{category}</button>)}</div>{filtered.length ? <div className="project-grid">{filtered.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="empty-state"><h3>No projects in this category yet.</h3><p>New case studies can be added from the structured project data file.</p></div>}</>;
}

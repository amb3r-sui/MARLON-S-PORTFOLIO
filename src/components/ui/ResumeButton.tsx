"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";

export function ResumeButton({ compact = false }: { compact?: boolean }) {
  const [missing, setMissing] = useState(false);
  async function downloadResume() {
    const response = await fetch(profile.resumePath, { method: "HEAD" });
    if (!response.ok || !response.headers.get("content-type")?.includes("pdf")) { setMissing(true); return; }
    const anchor = document.createElement("a");
    anchor.href = profile.resumePath;
    anchor.download = "marlon-magno-resume.pdf";
    anchor.click();
  }
  return <span className="resume-wrap"><button type="button" className={`button button-secondary ${compact ? "button-small" : ""}`} onClick={downloadResume}><Download size={compact ? 15 : 17} /> {compact ? "Resume" : "Download Resume"}</button>{missing && <span className="resume-missing" role="status">Resume coming soon</span>}</span>;
}

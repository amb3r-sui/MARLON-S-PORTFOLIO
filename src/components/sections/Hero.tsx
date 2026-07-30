"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Radio } from "lucide-react";
import { profile } from "@/data/profile";
import { WorkflowDiagram } from "@/components/projects/WorkflowDiagram";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="hero-copy">
          <div className="availability"><span /><>{profile.availability}</></div>
          <p className="kicker">{profile.name} · {profile.title}</p>
          <h1>Automate Smarter.<br /><span>Scale Faster.</span></h1>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="button-row"><Link href="/projects" className="button button-primary">View My Projects <ArrowRight size={18} /></Link><Link href="/contact" className="button button-secondary">Contact Me</Link></div>
          <div className="hero-links"><ResumeButton compact /><SocialLinks labels /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay: .1 }} className="workflow-console">
          <div className="console-top"><div><Radio size={16} /><span>Workflow monitor</span></div><span className="live">System ready</span></div>
          <div className="console-body"><div className="run-summary"><div><small>Automation</small><strong>Lead qualification</strong></div><CheckCircle2 /></div><WorkflowDiagram compact steps={["Lead Received", "Validate Data", "Process Workflow", "Update CRM", "Send Notification", "Log Result"]} /></div>
          <div className="console-footer"><span>n8n orchestration</span><span>Human review enabled</span></div>
        </motion.div>
      </div>
    </section>
  );
}

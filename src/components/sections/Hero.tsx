"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, CircleGauge, LockKeyhole, Radio, ShieldCheck, Sparkles } from "lucide-react";
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
          <p className="kicker">Automation systems · AI workflows · CRM operations</p>
          <h1>Reliable systems.<br /><span>Clear business impact.</span></h1>
          <p className="hero-intro">I design client-friendly automation systems that connect tools, validate data, keep critical decisions visible, and turn repetitive work into controlled operations.</p>
          <div className="button-row"><Link href="/projects" className="button button-primary">Explore the systems <ArrowRight size={18} /></Link><Link href="/contact" className="button button-secondary">Discuss a workflow</Link></div>
          <div className="hero-trust" aria-label="Portfolio safeguards"><span><ShieldCheck />Safe simulations</span><span><LockKeyhole />No exposed credentials</span><span><Check />Human review where needed</span></div>
          <div className="hero-links"><ResumeButton compact /><SocialLinks labels /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay: .1 }} className="workflow-console">
          <div className="console-top"><div><Radio size={16} /><span>Automation command center</span></div><span className="live"><i />System ready</span></div>
          <div className="command-stats">
            <div><CircleGauge /><span><small>Environment</small><strong>Portfolio sandbox</strong></span></div>
            <div><Sparkles /><span><small>Mode</small><strong>Client-safe demo</strong></span></div>
          </div>
          <div className="console-body">
            <div className="run-summary"><div><small>Active system</small><strong>Lead intake and qualification</strong></div><span className="run-chip"><i />Controlled</span></div>
            <WorkflowDiagram compact steps={["Lead Received", "Validate Data", "AI Triage", "Human Review"]} />
            <div className="execution-feed" aria-label="System controls">
              <span><i className="success" />Input validation enabled</span>
              <span><i className="success" />Failure path available</span>
              <span><i />External actions simulated</span>
            </div>
          </div>
          <div className="console-footer"><span>n8n-style orchestration</span><span>GHL-ready CRM architecture</span></div>
        </motion.div>
      </div>
    </section>
  );
}

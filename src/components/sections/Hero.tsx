"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Bot,
  Boxes,
  Check,
  CircleGauge,
  Database,
  GitBranch,
  LayoutDashboard,
  LockKeyhole,
  Radio,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { profile } from "@/data/profile";
import { WorkflowDiagram } from "@/components/projects/WorkflowDiagram";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { SocialLinks } from "@/components/ui/SocialLinks";

const deckNavigation = [
  [LayoutDashboard, "Overview", true],
  [Workflow, "n8n workflows", false],
  [Users, "CRM systems", false],
  [Bot, "AI agents", false],
] as const;

export function Hero() {
  return (
    <section className="hero hero-command">
      <div className="container">
        <div className="hero-lead-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .58 }}>
            <p className="kicker">AI automation · workflow architecture · CRM operations</p>
            <h1>Automation clients can<br /><span>see, test, and trust.</span></h1>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .58, delay: .08 }} className="hero-action-panel">
            <div className="availability"><span />{profile.availability}</div>
            <p>I build transparent automation systems with visible logic, safe testing, documented safeguards, and human review where decisions matter.</p>
            <div className="button-row"><Link href="/projects" className="button button-primary">Enter the project lab <ArrowRight /></Link><Link href="/contact" className="button button-secondary">Discuss a system</Link></div>
            <div className="hero-links"><ResumeButton compact /><SocialLinks labels /></div>
          </motion.aside>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay: .16 }} className="operations-deck">
          <div className="deck-topbar">
            <div className="deck-window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span className="deck-address">portfolio://automation-systems/overview</span>
            <span className="deck-live"><i />Sandbox online</span>
          </div>

          <div className="deck-body">
            <nav className="deck-sidebar" aria-label="System preview sections">
              <div className="deck-brand"><span>MM</span><div><strong>Operations Lab</strong><small>Client-safe environment</small></div></div>
              {deckNavigation.map(([Icon, label, active]) => <span className={active ? "active" : ""} key={label}><Icon />{label}</span>)}
              <div className="deck-security"><ShieldCheck /><div><strong>Protected demo</strong><small>No live credentials</small></div></div>
            </nav>

            <div className="deck-workspace">
              <div className="deck-heading">
                <div><span className="eyebrow">System topology</span><h2>Lead-to-CRM orchestration</h2></div>
                <span className="deck-mode"><Radio />Simulation mode</span>
              </div>
              <div className="deck-canvas">
                <WorkflowDiagram compact steps={["Lead Captured", "Validate Data", "AI Triage", "Human Review", "CRM Ready"]} />
              </div>
              <div className="deck-execution">
                <div><span className="execution-icon"><Activity /></span><div><small>Latest mock execution</small><strong>Qualified lead · human review required</strong></div></div>
                <span className="execution-complete"><Check />Completed safely</span>
              </div>
            </div>

            <aside className="deck-inspector">
              <div className="inspector-heading"><span>Run inspector</span><small>FICTIONAL DATA</small></div>
              <dl>
                <div><dt><CircleGauge />Environment</dt><dd>Portfolio sandbox</dd></div>
                <div><dt><Database />Data policy</dt><dd>Browser memory only</dd></div>
                <div><dt><GitBranch />Decision gate</dt><dd>Human approval</dd></div>
                <div><dt><LockKeyhole />Credentials</dt><dd>Not connected</dd></div>
              </dl>
              <div className="inspector-log"><span><i />Input validated</span><span><i />Fallback available</span><span><i />External action simulated</span></div>
            </aside>
          </div>

          <div className="deck-footer">
            <div><Boxes /><span><strong>3</strong><small>Documented systems</small></span></div>
            <div><Workflow /><span><strong>11</strong><small>Sanitized workflows</small></span></div>
            <div><ShieldCheck /><span><strong>100%</strong><small>Sample-data demos</small></span></div>
            <p>Architecture prepared to support future GoHighLevel CRM case studies.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

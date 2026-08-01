"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { SocialLinks } from "@/components/ui/SocialLinks";

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

      </div>
    </section>
  );
}

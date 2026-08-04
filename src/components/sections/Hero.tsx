"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker">{profile.title}</p>
          <h1>Automation, built for trust.</h1>
          <p className="hero-intro">Secure n8n workflows, AI automations, and integrations with clear safeguards and human review.</p>
          <div className="button-row">
            <Link href="/projects" className="button button-primary">View projects <ArrowRight size={18} /></Link>
            <a href={profile.resumePath} download="marlon-magno-resume.pdf" className="button button-secondary">Download CV <DownloadSimple size={18} /></a>
          </div>
        </motion.div>

        <motion.figure
          className="hero-figure"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/editorial/workflow-mapping.webp"
            alt="Hands arranging a paper workflow map on a quiet desk"
            fill
            unoptimized
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <figcaption>Workflow mapping before implementation.</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

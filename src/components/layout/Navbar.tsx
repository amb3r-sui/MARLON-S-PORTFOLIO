"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <nav className="container nav-wrap" aria-label="Primary navigation">
        <Link href="/" className="brand" prefetch={false}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-copy"><strong>{profile.name}</strong><small>AI Automation Specialist</small></span>
        </Link>

        <div className="desktop-nav">
          <span className="nav-section-label">Index</span>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className={isActive(item.href) ? "active" : ""} aria-current={isActive(item.href) ? "page" : undefined}>
              <span className="nav-arrow" aria-hidden="true">→</span>{item.label}
            </Link>
          ))}
          <div className="nav-utilities">
            <span className="nav-availability"><i aria-hidden="true" />{profile.workPreference}</span>
            <ThemeToggle />
            <ResumeButton compact />
          </div>
        </div>

        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={22} /> : <List size={22} />}
        </button>

        {open && (
          <div className="mobile-nav" id="mobile-menu">
            <span className="nav-section-label">Index</span>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} prefetch={false} onClick={() => setOpen(false)} className={isActive(item.href) ? "active" : ""} aria-current={isActive(item.href) ? "page" : undefined}>
                <span className="nav-arrow" aria-hidden="true">→</span>{item.label}
              </Link>
            ))}
            <div className="mobile-nav-actions"><ThemeToggle /><ResumeButton /></div>
          </div>
        )}
      </nav>
    </header>
  );
}

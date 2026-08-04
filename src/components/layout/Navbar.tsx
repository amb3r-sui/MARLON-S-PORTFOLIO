"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="container nav-wrap" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="Marlon Magno home">
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-copy"><strong>{profile.name}</strong><small>Automation & Integration</small></span>
        </Link>

        <div className="desktop-nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <ResumeButton compact />
        </div>

        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={22} /> : <List size={22} />}
        </button>

        {open && (
          <div className="mobile-nav" id="mobile-menu">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={pathname === item.href ? "active" : ""}>
                {item.label}
              </Link>
            ))}
            <div className="mobile-nav-actions"><ThemeToggle /><ResumeButton /></div>
          </div>
        )}
      </nav>
    </header>
  );
}

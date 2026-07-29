"use client";
import { ArrowUp } from "lucide-react";
export function BackToTop() {
  return <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={18} /></button>;
}

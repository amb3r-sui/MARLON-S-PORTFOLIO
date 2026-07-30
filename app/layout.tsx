import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: "Marlon Magno | AI Automation Specialist", template: "%s | Marlon Magno" },
  description: "Portfolio of Marlon Magno, an AI Automation Specialist building n8n workflows, CRM automations, AI agents, API integrations, and practical business systems.",
  alternates: { canonical: "/" },
  openGraph: { title: "Marlon Magno | AI Automation Specialist", description: profile.introduction, type: "website", siteName: "Marlon Magno Portfolio", images: [{ url: "/og.png", width: 1739, height: 909, alt: "Marlon Magno AI Automation Specialist portfolio" }] },
  twitter: { card: "summary_large_image", title: "Marlon Magno | AI Automation Specialist", description: profile.introduction, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(()=>{try{const saved=localStorage.getItem("portfolio-theme");const system=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=saved==="light"||saved==="dark"?saved:system}catch{document.documentElement.dataset.theme="dark"}})();`;
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><Footer /><BackToTop /></body></html>;
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: "Marlon Magno | Automation & Integration Specialist", template: "%s | Marlon Magno" },
  description: "Portfolio of Marlon Magno, an Automation & Integration Specialist building secure n8n workflows, AI automations, and connected business systems.",
  alternates: { canonical: "/" },
  openGraph: { title: "Marlon Magno | Automation & Integration Specialist", description: profile.introduction, type: "website", siteName: "Marlon Magno Portfolio", images: [{ url: "/og-operations-lab.png", width: 1731, height: 909, alt: "Marlon Magno automation and integration portfolio" }] },
  twitter: { card: "summary_large_image", title: "Marlon Magno | Automation & Integration Specialist", description: profile.introduction, images: ["/og-operations-lab.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(()=>{try{const saved=localStorage.getItem("portfolio-theme");const system=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=saved==="light"||saved==="dark"?saved:system}catch{document.documentElement.dataset.theme="dark"}})();`;
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className={`${geistSans.variable} ${geistMono.variable}`}><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><Footer /><BackToTop /></body></html>;
}

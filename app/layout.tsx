import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const geistPixel = localFont({
  src: "../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: "Marlon Magno | Automation & Integration Specialist", template: "%s | Marlon Magno" },
  description: "Portfolio of Marlon Magno, an Automation & Integration Specialist building secure n8n workflows, AI automations, and connected business systems.",
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  category: "technology",
  keywords: ["Marlon Magno", "automation specialist", "n8n developer", "AI automation", "API integration", "CRM automation", "Philippines"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: "Marlon Magno | Automation & Integration Specialist", description: profile.introduction, url: "/", locale: "en_US", type: "website", siteName: "Marlon Magno Portfolio", images: [{ url: "/og-portfolio.png", width: 1200, height: 630, alt: "Marlon Magno automation and integration portfolio" }] },
  twitter: { card: "summary_large_image", title: "Marlon Magno | Automation & Integration Specialist", description: profile.introduction, images: ["/og-portfolio.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(()=>{try{const saved=localStorage.getItem("portfolio-theme");const preference=saved==="light"||saved==="dark"?saved:"system";const system=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.themePreference=preference;document.documentElement.dataset.theme=preference==="system"?system:preference}catch{document.documentElement.dataset.themePreference="system";document.documentElement.dataset.theme="dark"}})();`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": `${profile.siteUrl}/#person`, name: profile.name, url: profile.siteUrl, jobTitle: profile.title, email: `mailto:${profile.email}`, telephone: profile.phone, address: { "@type": "PostalAddress", addressCountry: "PH" }, sameAs: [profile.linkedIn, profile.github], knowsAbout: ["n8n", "Workflow automation", "AI automation", "API integration", "CRM automation", "PostgreSQL", "Docker"] },
      { "@type": "WebSite", "@id": `${profile.siteUrl}/#website`, url: profile.siteUrl, name: "Marlon Magno Portfolio", description: profile.introduction, inLanguage: "en", author: { "@id": `${profile.siteUrl}/#person` } },
    ],
  };
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></head><body className={`${geistSans.variable} ${geistMono.variable} ${geistPixel.variable}`}><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">{children}</main><Footer /><BackToTop /></body></html>;
}

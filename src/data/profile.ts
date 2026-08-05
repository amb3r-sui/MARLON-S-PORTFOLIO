const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost.replace(/^https?:\/\//, "")}` : "http://localhost:3000");

export const profile = {
  name: "Marlon Magno",
  initials: "MM",
  title: "AI Automation Specialist",
  tagline: "Reliable workflows. Clear human control.",
  introduction:
    "I build reliable AI agents, workflow automations, and system integrations with validation, maintainable handoffs, and human review built in.",
  email: "marlonmagno322@gmail.com",
  phone: "+63 955 917 0110",
  location: "Philippines",
  workPreference: "Open to remote opportunities",
  linkedIn: "https://www.linkedin.com/in/marlon-magno/",
  github: "https://github.com/amb3r-sui",
  resumePath: "/resume/marlon-magno-resume.pdf",
  availability: "Available for automation projects and remote roles",
  siteUrl: siteUrl.replace(/\/$/, ""),
} as const;

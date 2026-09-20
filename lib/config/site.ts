/**
 * Central site configuration (Information Hiding - A Philosophy of Software Design)
 * Centralizes application identity, canonical URLs, contact email, and legal metadata.
 */
export const siteConfig = {
  name: "Oryo",
  tagline: "Freelance business suite: interactive PDF quotes, client CRM, and margin calculators.",
  description: "Modern open-source SaaS application for freelancers and agencies: PDF quote generator, profitability calculator, and product catalog.",
  url: (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, ""),
  contactEmail: process.env.CONTACT_EMAIL || "contact@example.com",
  legal: {
    companyName: "Oryo",
    representative: "Legal Representative",
    address: "123 Business Avenue, Suite 100",
    siret: "000 000 000 00000",
    hostingProvider: "Cloud Hosting Provider",
  },
  socials: {
    github: "https://github.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;

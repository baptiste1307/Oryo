import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CalculationProvider } from "@/context/CalculationContext";
import { QuoteProvider } from "@/context/QuoteContext";
import { ViewportProvider } from "@/context/ViewportContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { UIProvider } from "@/context/UIContext";
import SiteFooter from "@/components/global/footer/SiteFooter";
import AccountDeletedPopup from "@/components/account/AccountDeletedPopup";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <LanguageProvider>
          <UIProvider>
            <ViewportProvider>
              <AuthProvider>
                <CalculationProvider>
                  <QuoteProvider>{children}</QuoteProvider>
                </CalculationProvider>
              </AuthProvider>
            </ViewportProvider>
          </UIProvider>
          <AccountDeletedPopup />
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}

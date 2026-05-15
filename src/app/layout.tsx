import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language";
import LangToggle from "@/components/lang-toggle";
import CookieConsent from "@/components/cookie-consent";
import WhatsAppButton from "@/components/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LATAM Legal Compliance Scanner — TDE",
  description: "Scan your website and check data protection compliance in Latin America. Free, no installation needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-cookie-consent="true"
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <LangToggle />
          {children}
          <WhatsAppButton />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}

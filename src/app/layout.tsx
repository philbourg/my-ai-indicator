import "./globals.css";
import type { Metadata, Viewport } from "next";
import { WizardProvider } from "../contexts/WizardContext";
import { TranslationProvider } from "../contexts/TranslationContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Badge IA",
  description:
    "Évaluez votre niveau d'utilisation de l'IA dans vos créations musicales et textuelles",
  keywords: ["ia", "badge", "creative commons", "musique", "texte"],
  authors: [{ name: "Badge IA Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#121827",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-b from-surface-dark to-surface-card text-text-primary">
        <TranslationProvider>
          <WizardProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </WizardProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}

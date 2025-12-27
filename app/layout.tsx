import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SkipToContent, AccessibilityPanel } from "@/components/accessibility/a11y";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chordly | Learn Guitar Interactively",
  description: "Learn guitar with Chordly - the free, open-source platform with interactive lessons, real-time feedback, and a structured learning path.",
  keywords: ["guitar", "learn guitar", "chord", "lessons", "interactive", "music education", "chordly"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased min-h-screen`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <SkipToContent />
        <main id="main-content">
          {children}
        </main>
        <AccessibilityPanel />
      </body>
    </html>
  );
}

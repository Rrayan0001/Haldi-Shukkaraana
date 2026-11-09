import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Rabiya Sultana & Dr. Suhail Ahmed | Haldi & Shukrana",
  description:
    "Together with their families, Dr. Rabiya Sultana and Dr. Suhail Ahmed invite you to the Haldi & Shukrana celebrations on 26th & 27th November 2026 (evening) at our residence in Mulbagal, Kolar.",
  openGraph: {
    title: "Rabiya & Suhail — Haldi & Shukrana",
    description:
      "Turmeric, blessings and joy. Haldi & Shukrana · 26–27 November 2026 (Evening) · Mulbagal, Kolar.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3a2600",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${amiri.variable}`}
    >
      <body className="locked" suppressHydrationWarning>
        <link rel="preload" href="/assets/music.mp3" as="audio" type="audio/mpeg" fetchPriority="low" />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <noscript>
          <style>{`
            body { overflow-x: hidden !important; height: auto !important; touch-action: auto !important; }
            #intro-screen { display: none !important; }
            .invite-line, .bismillah-box, .hero-cta-box, .couple-ampersand { opacity: 1 !important; transform: none !important; }
            .hero-name-wipe, .section-title-wipe, .card-calligraphy-wrap { clip-path: none !important; }
            .event-btn-wrap, .date-char, .closing-word { opacity: 1 !important; transform: none !important; }
            #palace-fills { opacity: 1 !important; }
          `}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}

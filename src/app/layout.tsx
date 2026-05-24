import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL, SOCIAL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "AI infrastructure", "local AI", "LLM deployment", "RAG systems",
    "knowledge graphs", "AI consulting", "AI systems engineer",
    "private AI", "local-first AI", "Austin AI consultant",
  ],
  authors: [{ name: "Daniel Kliewer" }],
  creator: "Daniel Kliewer",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${SITE_NAME} — ${SITE_TAGLINE}`,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kliewerdaniel",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Kliewer",
  url: SITE_URL,
  sameAs: [SOCIAL.github, SOCIAL.twitter, SOCIAL.linkedin],
  jobTitle: "AI Systems Engineer",
  description: SITE_DESCRIPTION,
  knowsAbout: [
    "Artificial Intelligence", "Machine Learning", "AI Infrastructure",
    "Local LLMs", "RAG Systems", "Knowledge Graphs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
        <Providers>
          <Header />
          <main className="flex-1" id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://reducelink.arthurp.fr";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ReduceLink - Raccourcisseur de liens gratuit",
    template: "%s | ReduceLink",
  },
  description:
    "Raccourcissez vos liens gratuitement avec ReduceLink. Simple, rapide et sans inscription.",
  keywords: [
    "raccourcisseur de liens",
    "raccourcir url",
    "shortener",
    "url shortener",
    "liens courts",
    "QR code",
    "gratuit",
    "sans inscription",
  ],
  authors: [{ name: "ReduceLink", url: baseUrl }],
  creator: "ReduceLink",
  publisher: "ReduceLink",
  applicationName: "ReduceLink",
  generator: "Next.js",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "ReduceLink",
    title: "ReduceLink - Raccourcisseur de liens gratuit",
    description:
      "Raccourcissez vos liens gratuitement. Simple, rapide, sans inscription.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReduceLink - Raccourcisseur de liens gratuit",
    description:
      "Raccourcissez vos liens gratuitement. Simple, rapide, sans inscription.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: baseUrl,
  name: "ReduceLink",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* SEO JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Matomo propre (siteId 3) */}
        <Script id="matomo" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];

            // Privacy (no cookies)
            _paq.push(['disableCookies']);
            _paq.push(['setDoNotTrack', true]);

            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);

            (function() {
              var u="https://analytics.arthurp.fr/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '3']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      </head>

      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
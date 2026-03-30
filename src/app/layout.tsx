import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://reducelink.arthurp.fr";

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
    "Raccourcissez vos liens gratuitement avec ReduceLink. Simple, rapide et sans inscription. Créez des liens courts personnalisés avec QR Code, statistiques de clics et alias mémorables.",
  keywords: [
    "raccourcisseur de liens",
    "raccourcir url",
    "shortener",
    "url shortener",
    "liens courts",
    "réduire lien",
    "QR code",
    "gratuit",
    "sans inscription",
    "raccourcisseur gratuit",
    "lien court gratuit",
    "générateur QR code",
    "statistiques liens",
    "short link",
    "reducelink",
  ],
  authors: [{ name: "ReduceLink", url: baseUrl }],
  creator: "ReduceLink",
  publisher: "ReduceLink",
  applicationName: "ReduceLink",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
      "Raccourcissez vos liens gratuitement. Simple, rapide, sans inscription. QR Code et statistiques inclus.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReduceLink - Raccourcisseur de liens gratuit",
    description:
      "Raccourcissez vos liens gratuitement. Simple, rapide, sans inscription. QR Code et statistiques inclus.",
    creator: "@reducelink",
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
  category: "technology",
  classification: "URL Shortener",
  other: {
    "google-site-verification": "",
    "msvalidate.01": "",
  },
};

// JSON-LD structured data for the website
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "ReduceLink",
      description:
        "Raccourcissez vos liens gratuitement avec ReduceLink. Simple, rapide et sans inscription.",
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/liens?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "ReduceLink",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon-512.png`,
      },
      sameAs: [],
    },
    {
      "@type": "WebApplication",
      "@id": `${baseUrl}/#webapp`,
      name: "ReduceLink",
      url: baseUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description:
        "Service gratuit de raccourcissement de liens avec QR Code et statistiques de clics.",
      inLanguage: "fr-FR",
      featureList: [
        "Raccourcissement de liens",
        "Génération de QR Code",
        "Statistiques de clics",
        "Alias personnalisés",
        "Sans inscription",
        "100% gratuit",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

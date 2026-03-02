import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";
import ToastProvider from "@/components/ui/ToastProvider";
import CookieBanner from "@/components/ui/CookieBanner";
import FreeshippingBanner from "@/components/layout/FreeShippingBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://gurukrupanaturals.com"),
  title: {
    default: "GURUKRUPA NATURALS — Pure Organic Superfoods from Nature",
    template: "%s | GURUKRUPA NATURALS",
  },
  description:
    "Discover premium organic superfoods, black garlic, herbal teas and natural wellness products by GURUKRUPA NATURALS. Farm fresh, lab tested, no preservatives.",
  keywords: [
    "organic superfoods",
    "black garlic",
    "herbal products",
    "natural wellness",
    "GURUKRUPA NATURALS",
    "ayurvedic foods",
    "organic india",
    "farm fresh",
  ],
  authors: [{ name: "GURUKRUPA NATURALS" }],
  creator: "GURUKRUPA NATURALS",
  publisher: "GURUKRUPA NATURALS",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gurukrupanaturals.com",
    siteName: "GURUKRUPA NATURALS",
    title: "GURUKRUPA NATURALS — Pure Organic Superfoods from Nature",
    description:
      "Discover premium organic superfoods, black garlic, herbal teas and natural wellness products. Farm fresh, lab tested, no preservatives.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GURUKRUPA NATURALS — Organic Superfoods",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GURUKRUPA NATURALS — Pure Organic Superfoods",
    description: "Farm fresh organic superfoods. Lab tested. No preservatives.",
    images: ["/images/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://gurukrupanaturals.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GURUKRUPA NATURALS",
              url: "https://gurukrupanaturals.com",
              logo: "https://gurukrupanaturals.com/images/logo.png",
              description:
                "Premium organic superfoods and natural wellness products from GURUKRUPA NATURALS",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [
                "https://www.instagram.com/gurukrupanaturals",
                "https://www.facebook.com/gurukrupanaturals",
              ],
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ToastProvider>
          <FreeshippingBanner />
          <Navbar />
          <CartDrawer />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
          <CookieBanner />
        </ToastProvider>
      </body>
    </html>
  );
}

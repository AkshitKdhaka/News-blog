import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

// Load Nunito font with Latin subset
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito", // This allows us to use it as a CSS variable
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"], // Include all weights we might need
})

export const metadata: Metadata = {
  title: {
    template: "%s | Genius Labs Blog",
    default: "Genius Labs Blog - Educational Resources for Young Innovators",
  },
  description:
    "Discover educational resources, workshops, and learning opportunities for children. Genius Labs helps young minds explore STEM, arts, and creative thinking.",
  keywords:
    "genius labs, educational resources, STEM for kids, children's workshops, educational camps, learning projects, creative thinking",
  authors: [{ name: "Genius Labs", url: "https://geniuslabs.live/" }],
  creator: "Genius Labs",
  publisher: "Genius Labs",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://blog.geniuslabs.edu"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  category: "Education",
  openGraph: {
    title: "Genius Labs Blog - Educational Resources for Young Innovators",
    description:
      "Discover educational resources, workshops, and learning opportunities for children. Genius Labs helps young minds explore STEM, arts, and creative thinking.",
    url: "https://blog.geniuslabs.edu",
    siteName: "Genius Labs Blog",
    images: [
      {
        url: "https://picsum.photos/1200/630?random=og",
        width: 1200,
        height: 630,
        alt: "Genius Labs Blog - Educational Resources for Young Innovators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genius Labs Blog - Educational Resources for Young Innovators",
    description: "Discover educational resources, workshops, and learning opportunities for children",
    images: ["https://picsum.photos/1200/630?random=twitter"],
    creator: "@GeniusLabs",
    site: "@GeniusLabs",
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
    google: "google-site-verification-code", // Replace with your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={nunito.variable}>
      <body className="font-nunito">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Genius Labs",
              url: "https://geniuslabs.live/",
              logo: "https://blog.geniuslabs.edu/logo.png",
              sameAs: [
                "https://www.facebook.com/people/Genius-Labs/61551390680852/",
                "https://www.instagram.com/genius_labs.live/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 9468074074",
                contactType: "customer service",
                email: "info@geniuslabs.live",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "SkymarkOne, Ground Floor",
                addressLocality: "Sector 98, Noida",
                addressRegion: "Uttar Pradesh",
                postalCode: "201303",
                addressCountry: "IN",
              },
              description:
                "Genius Labs provides innovative educational programs and resources for children to explore STEM, arts, and creative thinking in a fun and engaging environment.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}

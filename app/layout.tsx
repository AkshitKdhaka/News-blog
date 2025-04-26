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
    template: "%s | Your Blog",
    default: "Your Blog - Educational Resources for Young Innovators",
  },
  description:
    "Discover educational resources, workshops, and learning opportunities for children. Your Company helps young minds explore STEM, arts, and creative thinking.",
  keywords:
    "your company, educational resources, STEM for kids, children's workshops, educational camps, learning projects, creative thinking",
  authors: [{ name: "Your Company", url: "https://example.com/" }],
  creator: "Your Company",
  publisher: "Your Company",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://blog.example.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  category: "Education",
  openGraph: {
    title: "Your Blog - Educational Resources for Young Innovators",
    description:
      "Discover educational resources, workshops, and learning opportunities for children. Your Company helps young minds explore STEM, arts, and creative thinking.",
    url: "https://blog.example.com",
    siteName: "Your Blog",
    images: [
      {
        url: "https://picsum.photos/1200/630?random=og",
        width: 1200,
        height: 630,
        alt: "Your Blog - Educational Resources for Young Innovators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Blog - Educational Resources for Young Innovators",
    description: "Discover educational resources, workshops, and learning opportunities for children",
    images: ["https://picsum.photos/1200/630?random=twitter"],
    creator: "@YourCompany",
    site: "@YourCompany",
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
              name: "Your Company",
              url: "https://example.com/",
              logo: "https://blog.example.com/logo.png",
              sameAs: ["https://www.facebook.com/your-company", "https://www.instagram.com/your_company/"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1 555-123-4567",
                contactType: "customer service",
                email: "info@example.com",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main Street",
                addressLocality: "Anytown",
                addressRegion: "State",
                postalCode: "12345",
                addressCountry: "US",
              },
              description:
                "Your Company provides innovative educational programs and resources for children to explore STEM, arts, and creative thinking in a fun and engaging environment.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}

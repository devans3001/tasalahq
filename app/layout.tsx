import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { business, locations } from "@/lib/data";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TasalaHQ — Healthy Hair Experts | Natural Hair Salon in Ikoyi & Lekki, Lagos",
  description:
    "Healthy hair, grown with intention. TasalaHQ is Lagos's natural-hair salon in Ikoyi & Lekki — 4.6 stars from 1,089 reviews. Treatments, silk press, colour, bridal & training. Book on WhatsApp.",
  openGraph: {
    title: "TasalaHQ — Healthy Hair Experts in Lagos",
    description:
      "Growth. Strength. Moisture. Care. 4.6 stars from 1,089 reviews. Book your appointment on WhatsApp.",
    type: "website",
    url: "https://tasalahq.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: business.name,
  slogan: "Healthy Hair Experts",
  url: business.website,
  email: business.email,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating,
    reviewCount: business.reviewCount,
  },
  location: locations.map((l) => ({
    "@type": "Place",
    name: `TasalaHQ ${l.label}`,
    address: l.address,
    telephone: l.phoneHref.replace("tel:", ""),
  })),
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:30", closes: "18:00" },
  ],
  priceRange: "₦₦",
  sameAs: [business.igUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

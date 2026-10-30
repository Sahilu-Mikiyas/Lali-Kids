import type { Metadata, Viewport } from "next";
import { Andika, Grandstander, Noto_Sans_Ethiopic } from "next/font/google";

import "./globals.css";

const grandstander = Grandstander({
  variable: "--font-grandstander",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const andika = Andika({
  variable: "--font-andika",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ethiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lali: read-along stories for kids in English and Amharic",
    template: "%s · Lali",
  },
  description:
    "Beautiful, narrated storybooks in English and Amharic for kids aged 3 to 9. Reading, counting and kindness, with a bedtime limit parents set. Made in Addis Ababa.",
};

export const viewport: Viewport = {
  themeColor: "#86d3ff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grandstander.variable} ${andika.variable} ${ethiopic.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-hidden">{children}</body>
    </html>
  );
}

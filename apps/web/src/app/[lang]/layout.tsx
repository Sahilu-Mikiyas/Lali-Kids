import type { Metadata, Viewport } from "next";
import { Andika, Grandstander, Noto_Sans_Ethiopic } from "next/font/google";

import { lang } from "next/root-params";

import { ErrorReporter } from "@/components/error-reporter";
import { LangProvider } from "@/i18n/provider";
import { isLang, LANGS } from "@/i18n/langs";
import "../globals.css";

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
  // 200 KB: not preloaded, so English pages on a slow phone don't wait for it. Amharic pages
  // still fetch it as soon as the page's text needs it (text shows at once with the fallback).
  preload: false,
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

export function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const l = await lang();
  const current = isLang(l) ? l : "en";
  return (
    <html lang={current} className={`${grandstander.variable} ${andika.variable} ${ethiopic.variable} antialiased`}>
      <head>
        {/* Fades the page in after a language switch (set by LangSwitch), before the first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("lali-lang-switch")){sessionStorage.removeItem("lali-lang-switch");document.documentElement.classList.add("lang-arriving")}}catch(e){}`,
          }}
        />
      </head>
      <body className={`min-h-dvh overflow-x-hidden ${current === "am" ? "lang-am" : ""}`}>
        <LangProvider lang={current}>{children}</LangProvider>
        <ErrorReporter />
      </body>
    </html>
  );
}

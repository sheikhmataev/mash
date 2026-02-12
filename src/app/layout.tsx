import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mash Partners AS | Digitalisering, AI & Automatisering",
  description:
    "Vi leverer skreddersydde løsninger innen digitalisering, generativ AI og automatisering for moderne bedrifter. Basert i Lillehammer, Norge.",
  keywords: [
    "digitalisering",
    "AI",
    "generativ AI",
    "automatisering",
    "konsulentselskap",
    "Norge",
    "Lillehammer",
  ],
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
  openGraph: {
    title: "Mash Partners AS | Fremtidens Teknologi. I Dag.",
    description:
      "Skreddersydde løsninger innen digitalisering, generativ AI og automatisering.",
    url: "https://mashpartners.no",
    siteName: "Mash Partners AS",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-mash-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import logo2 from "./Logo2.png";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mash Partners — Building Intelligent Digital Systems",
  description:
    "Technology partner building the future. AI systems, automation, generative technology, and premium digital experiences.",
  icons: {
    icon: logo2.src,
    shortcut: logo2.src,
    apple: logo2.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

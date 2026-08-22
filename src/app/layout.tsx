import type { Metadata } from "next";
import { Cormorant, Abril_Fatface, Oswald, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm",
  display: "swap",
});

import { Atmosphere } from "@/components/layout/Atmosphere";
import { ChaosWrapper } from "@/components/layout/ChaosWrapper";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LetterboxBottom, LetterboxTop } from "@/components/layout/Letterbox";
import { Navbar } from "@/components/layout/Navbar";
import { ProgressBar } from "@/components/layout/ProgressBar";

export const metadata: Metadata = {
  title: "MANISH CHANDRA MAITY — Dream Big",
  description: "Portfolio of Manish Chandra Maity — Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${abrilFatface.variable} ${oswald.variable} ${ibmPlexMono.variable}`}>
      <body>
        <Atmosphere />
        <CustomCursor />
        <ProgressBar />
        <LetterboxTop />
        <LetterboxBottom />
        <ChaosWrapper>
          <Navbar />
          {children}
        </ChaosWrapper>
      </body>
    </html>
  );
}

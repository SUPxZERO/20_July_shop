import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "20-July SHOP | Women's Fashion Boutique",
  description:
    "Discover elegant and feminine fashion at 20-July SHOP. Browse our curated collection of women's clothing, accessories, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full font-body antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

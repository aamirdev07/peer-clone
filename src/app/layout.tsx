import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kosmyk | Buy crypto with Venmo, Zelle and Bank Transfer",
  description:
    "Trustless P2P fiat-to-crypto marketplace powered by zero-knowledge proofs",
  icons: {
    icon: "/kosmyk-logo.png",
    apple: "/kosmyk-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
        <TooltipProvider>
          {/* <AnnouncementBanner /> */}
          <Navbar />
          <main className="pb-20 md:pb-0">{children}</main>
          <Toaster position="bottom-right" />
        </TooltipProvider>
      </body>
    </html>
  );
}

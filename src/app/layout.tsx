import type { Metadata } from "next";
// Import your Navbar and Footer components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindBridgeX Solutions",
  description: "Enterprise Technology Solutions That Drive Business Growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The Navbar stays at the top of every page */}
        <Navbar />
        
        {/* The main page content goes here */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* The Footer stays at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}

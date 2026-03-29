import type { Metadata, Viewport } from "next";
import { Outfit, DM_Serif_Display, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "PANORA — App Pembeli B2B",
  description: "Platform B2B untuk pembelian komoditas pertanian dengan transparansi rantai pasok",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${dmSerif.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F9FAFB] text-[#111827] overflow-x-hidden">
        <div className="mx-auto max-w-md min-h-screen relative">
          {/* Graph Paper Grid Background */}
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(156, 163, 175, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(156, 163, 175, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

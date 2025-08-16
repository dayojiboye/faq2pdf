import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AppLayout from "@/components/app-layout";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faq2Pdf",
  description:
    "Generate professional PDF documents from your FAQs using AI. Fast, accurate, and hassle-free.",
  verification: {
    other: {
      "google-site-verification": "xeU24CdlJRRatySLb_RswIgDnXrOil8jL8KWxVUzV4M",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <AppLayout>{children}</AppLayout>
            </main>
            <Footer />
          </div>
        </NuqsAdapter>
        <Toaster
          containerStyle={{
            zIndex: 99999,
          }}
          toastOptions={{
            style: {
              zIndex: 99999,
              fontSize: "14px",
            },
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}

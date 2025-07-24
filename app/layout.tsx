import type { Metadata } from "next";
import { Geist, Geist_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
	variable: "--font-luckiest-guy",
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FAQ 2 PDF",
	description:
		"Generate professional PDF documents from your FAQs using AI. Fast, accurate, and hassle-free.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} antialiased intel-regular`}
			>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AppLayout from "@/components/app-layout";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
				<NuqsAdapter>
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="flex-1">
							<AppLayout>{children}</AppLayout>
						</main>
						<Footer />
					</div>
				</NuqsAdapter>
			</body>
		</html>
	);
}

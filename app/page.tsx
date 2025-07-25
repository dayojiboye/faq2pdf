import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
	return (
		<>
			<Logo className="mx-auto text-5xl lg:text-5xl [&>span]:text-2xl lg:[&>span]:text-3xl" />
			<p className="mt-2 mx-auto text-center intel-medium">
				Generate professional PDF documents from your FAQs using AI. Fast, accurate, and
				hassle-free.
			</p>
			<div className="w-full mt-8 flex flex-col gap-4">
				<Button size={"lg"} asChild>
					<Link href="/app?mode=manual">Enter FAQs manually</Link>
				</Button>
				<Button size={"lg"} variant={"secondary"} asChild>
					<Link href="/app?mode=scrape">Scrape from website</Link>
				</Button>
			</div>
		</>
	);
}

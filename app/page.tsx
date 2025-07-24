import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Page() {
	return (
		<div className="container mx-auto px-4">
			<div className="w-full max-w-[420px] mx-auto py-20">
				<Logo className="mx-auto text-5xl lg:text-5xl [&>span]:text-2xl lg:[&>span]:text-3xl" />
				<p className="mt-2 mx-auto text-center intel-medium">
					Generate professional PDF documents from your FAQs using AI. Fast, accurate, and
					hassle-free.
				</p>
				<div className="w-full mt-8 flex flex-col gap-4">
					<Button size={"lg"}>Enter FAQs manually</Button>
					<Button size={"lg"} variant={"secondary"}>
						Scrape from website
					</Button>
				</div>
			</div>
		</div>
	);
}

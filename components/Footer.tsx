import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-auto w-full">
			<div className="container mx-auto px-4 py-3">
				<p className="inline text-sm">Made by</p>{" "}
				<Button asChild variant="link" size={"text"} className="whitespace-nowrap">
					<Link href="https://github.com/dayojiboye" target="_blank" referrerPolicy="no-referrer">
						Dee 👑
					</Link>
				</Button>
			</div>
		</footer>
	);
}

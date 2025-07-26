import React from "react";
import Logo from "./logo";
import Link from "next/link";

export default function Header() {
	return (
		<header className="w-full h-[70px] border-b border-b-gray-200">
			<div className="container mx-auto h-full px-4 flex items-center">
				<Link href="/" className="bg-red flex w-fit h-fit">
					<Logo />
				</Link>
			</div>
		</header>
	);
}

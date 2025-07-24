import React from "react";
import Logo from "./Logo";

export default function Header() {
	return (
		<header className="w-full h-[70px] border-b border-b-gray-200">
			<div className="container mx-auto h-full px-4 flex items-center">
				<Logo />
			</div>
		</header>
	);
}

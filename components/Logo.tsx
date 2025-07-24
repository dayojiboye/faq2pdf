import { cn } from "@/lib/utils";
import React from "react";

type LogoProps = {
	className?: string;
};

export default function Logo({ className }: LogoProps) {
	return (
		<div className={cn("font-luckiest-guy text-2xl lg:text-3xl select-none w-fit", className)}>
			FAQ<span className="text-lg lg:text-xl text-red-400 align-super">2</span>PDF
		</div>
	);
}

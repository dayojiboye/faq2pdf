import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container mx-auto px-4">
			<div className="w-full max-w-[420px] mx-auto py-[50px] sm:py-20">{children}</div>
		</div>
	);
}

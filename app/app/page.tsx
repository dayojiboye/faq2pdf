"use client";
import { useQueryState } from "nuqs";
import React from "react";
import ManualMode from "./sub-pages/manual-mode/manual-mode";
import ScrapeMode from "./sub-pages/scrape-mode/scrape-mode";

export default function AppPage() {
	const [mode, setMode] = useQueryState("mode");

	if (mode === "scrape") {
		return <ScrapeMode />;
	}

	return (
		<>
			<ManualMode />
		</>
	);
}

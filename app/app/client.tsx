"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import ManualMode from "./sub-pages/manual-mode/manual-mode";
import ScrapeMode from "./sub-pages/scrape-mode/scrape-mode";

const modeValues = ["manual", "scrape"] as const;

export default function AppPageClient() {
  const [mode] = useQueryState("mode", parseAsStringLiteral(modeValues));

  if (mode === "scrape") {
    return <ScrapeMode />;
  }

  return (
    <>
      <ManualMode />
    </>
  );
}

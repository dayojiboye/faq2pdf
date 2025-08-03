"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import ManualMode from "./sub-pages/manual-mode/manual-mode";
import ExtractMode from "./sub-pages/extract-mode/extract-mode";

const modeValues = ["manual", "extract"] as const;

export default function AppPageClient() {
  const [mode] = useQueryState("mode", parseAsStringLiteral(modeValues));

  if (mode === "extract") {
    return <ExtractMode />;
  }

  return (
    <>
      <ManualMode />
    </>
  );
}

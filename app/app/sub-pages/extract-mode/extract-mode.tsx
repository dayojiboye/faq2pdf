import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import Summary from "../shared/summary";
import ExtractForm from "./extract-form";

const viewValues = ["form", "summary"] as const;

export default function ExtractMode() {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(viewValues)
  );

  if (view === "summary") {
    return <Summary goBack={() => setView("form")} isExtract />;
  }

  return <ExtractForm goForward={() => setView("summary")} />;
}

import { parseAsStringLiteral, useQueryState } from "nuqs";
import React from "react";
import Summary from "../shared/summary";
import ScrapeForm from "./scrape-form";

const viewValues = ["form", "summary"] as const;

export default function ScrapeMode() {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(viewValues)
  );

  if (view === "summary") {
    return <Summary goBack={() => setView("form")} isScrape />;
  }

  return <ScrapeForm goForward={() => setView("summary")} />;
}

import React from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import Summary from "../shared/summary";
import FaqForm from "./faq-form";

const viewValues = ["form", "summary"] as const;

export default function ManualMode() {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(viewValues)
  );

  if (view === "summary") {
    return <Summary goBack={() => setView("form")} />;
  }

  return <FaqForm goForward={() => setView("summary")} />;
}

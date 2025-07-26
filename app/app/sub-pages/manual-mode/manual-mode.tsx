import React from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import FaqForm from "./faq-form";
import Summary from "../shared/summary";

const viewValues = ["form", "summary", "pdf-result"] as const;

export default function ManualMode() {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(viewValues)
  );

  if (view === "pdf-result") {
    return <></>;
  }

  if (view === "summary") {
    return (
      <Summary
        goForward={() => setView("pdf-result")}
        goBack={() => setView("form")}
      />
    );
  }

  return (
    <>
      <FaqForm goForward={() => setView("summary")} />
    </>
  );
}

import React from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import Summary from "../shared/summary";
import dynamic from "next/dynamic";

const FaqForm = dynamic(() => import("./faq-form"), {
  ssr: false,
  loading: () => <div></div>,
});

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

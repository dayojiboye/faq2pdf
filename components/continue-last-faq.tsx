"use client";

import { FAQ_FORM_DATA } from "@/lib/constants";
import { FAQForm } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ContinueLastFaq() {
  const [faqData, setFaqData] = React.useState<FAQForm>();
  const [_, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (typeof window !== "undefined") setIsLoading(false);
    }, 100);

    const savedData = localStorage.getItem(FAQ_FORM_DATA);
    if (savedData) {
      const parsedFAQData = JSON.parse(savedData) as FAQForm;
      setFaqData(parsedFAQData);
    }

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (faqData && faqData.faqs.length > 0) {
    return (
      <Button
        asChild
        variant={"link"}
        size="text"
        className="mx-auto block mt-6"
      >
        <Link href="/app?mode=manual&view=form">Continue from last FAQ</Link>
      </Button>
    );
  }

  return null;
}

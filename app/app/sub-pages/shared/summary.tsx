import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { FAQ_FORM_DATA } from "@/lib/constants";
import { FAQForm } from "@/lib/types";
import React from "react";

type SummaryProps = {
  goForward: () => void;
  goBack: () => void;
};

export default function Summary({ goForward, goBack }: SummaryProps) {
  const [faqData, setFaqData] = React.useState<FAQForm>();

  React.useEffect(() => {
    const savedData = localStorage.getItem(FAQ_FORM_DATA);
    if (savedData) setFaqData(JSON.parse(savedData));
  }, []);

  return (
    <>
      <PageHeader
        onBack={goBack}
        title="Review and Finalize Your FAQs"
        description="Here's a final look at your FAQs. Review the content below and make any last edits before generating your PDF."
      />

      <div className="mt-8">
        {!!faqData && faqData.faqs.length > 0 ? (
          <div className="space-y-6">
            {faqData.faqs.map((faq, index) => (
              <div key={index} className="space-y-4">
                <p className="font-bold text-lg">{faq.question}</p>
                <p>{faq.answer}</p>
              </div>
            ))}

            <Button size={"lg"} className="w-full mt-6">
              Generate PDF
            </Button>
          </div>
        ) : (
          <p className="font-medium text-gray-500">No FAQ has been added</p>
        )}
      </div>
    </>
  );
}

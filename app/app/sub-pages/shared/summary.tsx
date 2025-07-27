import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { FAQ_FORM_DATA } from "@/lib/constants";
import { FAQForm } from "@/lib/types";
import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "@/components/pdf-document";
import LoadingSpinner from "@/components/loading-spinner";
import { scrollToTop } from "@/lib/utils";

type SummaryProps = {
  goBack: () => void;
};

export default function Summary({ goBack }: SummaryProps) {
  const [faqData, setFaqData] = React.useState<FAQForm>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (typeof window !== "undefined") setIsLoading(false);
    }, 100);

    const savedData = localStorage.getItem(FAQ_FORM_DATA);
    if (savedData) setFaqData(JSON.parse(savedData));

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      <PageHeader
        onBack={goBack}
        title="Review and Finalize Your FAQs"
        description="Here’s a preview of your PDF. Review the content and generate your final version when you're ready."
      />

      <div className="mt-8">
        {isLoading ? (
          <div className="flex flex-row w-fit mx-auto gap-2 items-center">
            <LoadingSpinner className="size-4" />
            <p className="text-sm font-medium text-center">
              Generating PDF, please wait...
            </p>
          </div>
        ) : !!faqData && faqData.faqs.length > 0 ? (
          <>
            <PDFViewer style={{ width: "100%", height: "90vh" }}>
              <PdfDocument faqs={faqData.faqs} />
            </PDFViewer>

            <div className="flex mt-6 gap-3">
              <Button asChild size={"lg"} className="flex-1">
                <PDFDownloadLink
                  document={<PdfDocument faqs={faqData.faqs} />}
                  fileName="faqs.pdf"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {({ loading }) =>
                    loading ? "Generating PDF..." : "Download PDF"
                  }
                </PDFDownloadLink>
              </Button>

              <Button
                size="lg"
                variant={"ghost"}
                onClick={() => {
                  scrollToTop();
                  goBack();
                }}
              >
                Edit PDF
              </Button>
            </div>
          </>
        ) : (
          <p className="font-medium text-gray-500">No FAQ has been added</p>
        )}
      </div>
    </>
  );
}

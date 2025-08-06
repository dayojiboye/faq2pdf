import ClearFormStorage from "@/components/clear-form-storage";
import ContinueLastFaq from "@/components/continue-last-faq";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Image
        priority
        alt="FAQ2PDF"
        width={300}
        height={300}
        src="/logo.png"
        className="h-[50px] object-cover w-[180px] mx-auto"
      />
      <p className="mt-2 mx-auto text-center">
        Generate professional PDF documents from your FAQs using AI. Fast,
        accurate, and hassle-free.
      </p>
      <div className="w-full mt-8 space-y-4">
        <ClearFormStorage className="w-full">
          <Link href="/app?mode=manual">Enter FAQs manually</Link>
        </ClearFormStorage>
        <ClearFormStorage variant="secondary" className="w-full">
          <Link href="/app?mode=extract">Extract from web page</Link>
        </ClearFormStorage>
        <ContinueLastFaq />
      </div>
    </>
  );
}

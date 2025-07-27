import ClearFormStorage from "@/components/clear-form-storage";
import Logo from "@/components/logo";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Logo className="mx-auto text-5xl lg:text-5xl [&>span]:text-2xl lg:[&>span]:text-3xl" />
      <p className="mt-2 mx-auto text-center">
        Generate professional PDF documents from your FAQs using AI. Fast,
        accurate, and hassle-free.
      </p>
      <div className="w-full mt-8 space-y-4">
        <ClearFormStorage className="w-full">
          <Link href="/app?mode=manual">Enter FAQs manually</Link>
        </ClearFormStorage>
        <ClearFormStorage variant="secondary" className="w-full">
          <Link href="/app?mode=scrape">Scrape from web page</Link>
        </ClearFormStorage>
      </div>
    </>
  );
}

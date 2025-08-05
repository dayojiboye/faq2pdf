import ClearFormStorage from "@/components/clear-form-storage";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Image
        alt="FAQ2PDF"
        width={500}
        height={500}
        src="/logo.png"
        className="h-auto object-cover w-[180px] mx-auto"
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
        <Button
          asChild
          variant={"link"}
          size="text"
          className="mx-auto block mt-6"
        >
          <Link href="">Continue from last FAQ</Link>
        </Button>
      </div>
    </>
  );
}

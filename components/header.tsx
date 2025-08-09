import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-[70px] border-b border-b-gray-200">
      <div className="container mx-auto h-full px-4 flex items-center">
        <Link href="/" className="flex w-fit h-fit">
          <Image
            priority
            alt="FAQ2PDF"
            width={200}
            height={200}
            src="/logo.png"
            className="h-[27.7px] object-contain w-[100px]"
          />
        </Link>
      </div>
    </header>
  );
}

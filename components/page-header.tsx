"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/utils";

type PageHeaderProps = {
  title?: string;
  description?: string;
  onBack?: () => void;
};

export default function PageHeader({
  title,
  description,
  onBack,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full">
      <Button
        variant={"iconText"}
        size={"text"}
        className="mb-6"
        onClick={() => {
          scrollToTop();
          if (onBack) return onBack();
          router.back();
        }}
      >
        <ArrowLeft /> Back
      </Button>
      {title && <h1 className="text-xl font-bold">{title}</h1>}
      {description && <p className="mt-2 text-base">{description}</p>}
    </div>
  );
}

"use client";

import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import { FAQ_FORM_DATA } from "@/lib/constants";

type ClearFormStorageProps = {
  children: React.ReactNode;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export default function ClearFormStorage({
  children,
  ...props
}: ClearFormStorageProps) {
  return (
    <Button
      size={"lg"}
      asChild
      onClick={() => localStorage.removeItem(FAQ_FORM_DATA)}
      {...props}
    >
      {children}
    </Button>
  );
}

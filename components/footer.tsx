import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import GitHubLink from "./github-link";

export default function Footer() {
  return (
    <footer className="mt-auto w-full">
      <div className="container mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-center">
        <GitHubLink />

        <p className="w-fit text-sm">
          Powered by{" "}
          <Button
            asChild
            variant="link"
            size={"text"}
            className="whitespace-nowrap underline"
          >
            <Link
              href="https://ai.google.dev/"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Gemini
            </Link>
          </Button>{" "}
          &{" "}
          <Button
            asChild
            variant="link"
            size={"text"}
            className="whitespace-nowrap underline"
          >
            <Link
              href="https://pptr.dev/"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Puppeteer
            </Link>
          </Button>
        </p>
      </div>
    </footer>
  );
}

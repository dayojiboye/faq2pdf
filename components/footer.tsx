import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto w-full">
      <div className="container mx-auto px-4 py-3 flex flex-wrap gap-2 items-center justify-between">
        <div className="w-fit">
          <p className="inline text-sm">
            Made by{" "}
            <Button
              asChild
              variant="link"
              size={"text"}
              className="whitespace-nowrap"
            >
              <Link
                href="https://github.com/dayojiboye"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Dee 👑
              </Link>
            </Button>
          </p>
        </div>

        <p className="w-fit text-sm">
          Powered by{" "}
          <Button
            asChild
            variant="link"
            size={"text"}
            className="whitespace-nowrap"
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
            className="whitespace-nowrap"
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

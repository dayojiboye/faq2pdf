import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import { GoogleGenAI } from "@google/genai";
import dedent from "dedent";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getIp } from "@/lib/get-ip";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const geminiApiKey = process.env.GEMINI_API_KEY;

  const ipAddress = await getIp();

  console.log({
    REDIS_URL: process.env.UPSTASH_REDIS_REST_URL,
    REDIS_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    GEMINI_API_KEY: geminiApiKey,
  });

  if (
    !geminiApiKey ||
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return new Response(JSON.stringify({ message: "Missing API key(s)" }), {
      status: 500,
    });
  }

  if (!url) {
    return new Response(JSON.stringify({ message: "URL must not be empty" }), {
      status: 500,
    });
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(5, "1 h"), // 5 requests per 1 hour
    prefix: "faq2pdf",
  });

  if (!ratelimit) {
    return new Response(JSON.stringify({ message: "Redis error occurred" }), {
      status: 500,
    });
  }

  const { success, remaining, reset } = await ratelimit.limit(ipAddress);

  console.log("Rate Limit: ", { success, remaining, reset });

  if (!success) {
    return new Response(
      JSON.stringify({
        message: "You've reached the limit. Please try again in an hour.",
      }),
      { status: 429 }
    );
  }

  const ai = new GoogleGenAI({
    apiKey: geminiApiKey,
  });

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 },
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "load" });

  // Expand accordions, click toggles, unhide hidden content
  await page.evaluate(() => {
    const triggers = Array.from(
      document.querySelectorAll(
        "button, summary, [aria-expanded], [data-toggle], .accordion-toggle"
      )
    );

    triggers.forEach((el: any) => {
      try {
        if (
          el &&
          typeof el.click === "function" &&
          el.offsetParent !== null // not hidden
        ) {
          el.click();
        }
      } catch (err) {
        console.error("Click failed on element:", el);
      }
    });
  });

  // Wait for JS-based FAQ content to render
  await new Promise((resolve) => setTimeout(resolve, 8000));

  // Return full page HTML (cleaned)
  const html = await page.evaluate(() => {
    // Optional cleanup: remove scripts/sidebars if needed
    const clone = document.body.cloneNode(true) as HTMLElement;

    // Remove common non-content sections
    clone
      .querySelectorAll("script, style, nav, footer, header, aside")
      .forEach((el) => el.remove());

    return clone.innerHTML;
  });

  // Also grab innerText
  const text = await page.evaluate(() => {
    const clone = document.body.cloneNode(true) as HTMLElement;

    clone
      .querySelectorAll("script, style, nav, footer, header, aside")
      .forEach((el) => el.remove());

    return clone.innerText;
  });

  await browser.close();

  console.log("HTML: ", html);
  console.log("Text: ", text);

  // There's still room for improvement
  const prompt = dedent`
You are a helpful assistant extracting real FAQs from a webpage.
The following contains the content of a web page that may include FAQs. Your task is to extract real **question and answer pairs** and return them in valid JSON format like this:

[
  {
    "question": "...",
    "answer": "..."
  }
]

Only include **real FAQs** — ignore irrelevant content like menus, footers, headers, navigation, etc.
Return only 37 items.

## Page Text (visible to users):
"""
${text}
"""

## Raw HTML (structure and hidden context):
"""
${html}
"""

Return only the JSON array — no explanation, no markdown formatting.
  `;

  const aiRes = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log("AI response", aiRes);

  if (aiRes.promptFeedback?.blockReasonMessage) {
    return new Response(
      JSON.stringify({ message: aiRes.promptFeedback.blockReasonMessage }),
      { status: 500 }
    );
  }

  if (!aiRes.text) {
    return new Response(JSON.stringify({ message: "AI error occurred" }), {
      status: 500,
    });
  }

  const aiJson = aiRes.text;
  console.log("AI JSON", aiJson);
  const content = aiJson || "";

  console.log("Content: ", content);

  try {
    const match1 = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/); // Match content inside a Markdown-style code block (```json ... ```)
    const match2 = content.match(/\[\s*{[\s\S]+?}\s*]/); // Match a raw JSON array of objects directly in the text (e.g. [ { ... }, { ... } ])

    const jsonMatch = match1?.[1] ?? match2?.[0];

    console.log("JSONMatch: ", jsonMatch);

    // Return if AI's response doesn't match array block
    if (!jsonMatch) {
      return new Response(
        JSON.stringify({ message: "Unable to extract FAQ" }),
        {
          status: 500,
        }
      );
    }

    const objectRegex =
      /{[^}]*"question"\s*:\s*"[^"]+",[^}]*"answer"\s*:\s*"[^"]+"[^}]*}/g; // Regex to match individual JSON-like objects containing "question" and "answer" keys even if the object is incomplete

    const matches = jsonMatch.match(objectRegex); // Extract all valid "question"-"answer" objects from the JSON string

    console.log("Matches Regex: ", matches);

    if (!matches || matches.length === 0) {
      return new Response(
        JSON.stringify({ message: "No valid FAQ items found" }),
        { status: 500 }
      );
    }

    // Parse and clean each matched object, removing HTML tags and filtering out invalid JSON
    const faqs = matches
      .map((match) => {
        try {
          const parsed = JSON.parse(match);
          const clean = (str: string) => str.replace(/<[^>]+>/g, "").trim();
          return {
            question: clean(parsed.question),
            answer: clean(parsed.answer),
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return Response.json(faqs, { status: 200 });
  } catch (err) {
    console.error("Err:", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}

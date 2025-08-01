import { NextRequest } from "next/server";
import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";

// To-Do: Add rate limiter for AI request
export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  const togetherAiApiKey = process.env.TOGETHER_AI_API_KEY;

  if (!firecrawlApiKey || !togetherAiApiKey) {
    return new Response(JSON.stringify({ message: "Missing API key(s)" }), {
      status: 500,
    });
  }

  if (!url) {
    return new Response(JSON.stringify({ message: "URL must not be empty" }), {
      status: 500,
    });
  }

  const app = new FirecrawlApp({ apiKey: firecrawlApiKey });

  const scrapeResult = (await app
    .scrapeUrl(url, {
      formats: ["markdown", "html"],
    })
    .catch((err) => {
      console.log("Scrape Result Error:", err);
      return;
    })) as ScrapeResponse;

  if (!scrapeResult || !scrapeResult.success) {
    return new Response(
      JSON.stringify({
        message: !scrapeResult
          ? "Firecrawl error occurred"
          : `Failed to scrape: ${scrapeResult.error}`,
      }),
      {
        status: 500,
      }
    );
  }

  const cleanedText = scrapeResult.markdown
    ?.replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000); // Truncate to avoid token limit

  const prompt = `
The following is raw text from a website’s FAQ page. Extract the questions and answers as structured Q&A pairs.

Text:
"""
${cleanedText}
"""

Return only a JSON array like:
[
  {
    "question": "...",
    "answer": "..."
  }
]
`;

  const aiRes = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${togetherAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!aiRes.ok) {
    return new Response(
      JSON.stringify({ message: "TogetherAI error occurred" }),
      {
        status: 500,
      }
    );
  }

  const aiJson = await aiRes.json();
  const content = aiJson.choices?.[0]?.message?.content || "";

  try {
    const jsonMatch = content.match(/\[\s*{[\s\S]*}\s*]/); // capture array block
    // const jsonText = jsonMatch ? jsonMatch[0] : content;
    // Return if AI's response doesn't match array block
    if (!jsonMatch) {
      return new Response(
        JSON.stringify({ message: "Unable to extract FAQ" }),
        {
          status: 500,
        }
      );
    }

    return Response.json(jsonMatch[0], { status: 200 });
  } catch (err) {
    console.error("Err:", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}

import { streamText } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req) {
  console.log("✅ API route /api/resume called");

  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { prompt } = body;

    if (!prompt) {
      console.error("❌ No prompt received in request body");
      return new Response(
        JSON.stringify({ error: "No prompt received" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY");
      return new Response(
        JSON.stringify({ error: "Missing API key" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ✅ Create stream
    const result = await streamText({
      model: "gpt-4o-mini",
      prompt: `
CONTEXT: You are an expert at predicting the dollar worth of resumes.

TASK:
- Analyze the given resume.
- Estimate its value in USD.
- Give 4 bullet points explaining key strengths.
- Give 4 bullet points suggesting improvements.

OUTPUT FORMAT:
<Estimated Worth>$...</Estimated Worth>
<Explanation>
<ul>
<li>...</li>
<li>...</li>
</ul>
</Explanation>
<Improvements>
<ul>
<li>...</li>
<li>...</li>
</ul>
</Improvements>

RESUME:
${prompt}
      `,
      temperature: 1,
      stream: true,
    });

    // ✅ Convert stream to Response object (important!)
    return result.toResponse();

  } catch (error) {
    console.error("💥 API POST error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

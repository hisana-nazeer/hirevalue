import { streamText } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req) {
  console.log("API route /api/resume called");

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const { prompt } = await req.json();   // FRONTEND SENDS ONLY TEXT
    if (!prompt) {
      throw new Error("No resume text received");
    }

    const openai = new OpenAI({ apiKey });

    const systemPrompt = `
You are an expert HR analyst.
Your job is to analyse a resume and estimate its worth in USD.
Output must strictly follow the XML-like format:

<Estimated Worth>$...</Estimated Worth>
<Explanation>
   <ul>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
   </ul>
</Explanation>
<Improvements>
   <ul>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
   </ul>
</Improvements>
`;

    const finalPrompt = `${systemPrompt}\n\nRESUME:\n${prompt}`;
console.log("Final prompt length:", finalPrompt.length);

    return streamText({
      model: "gpt-4o-mini",
      provider: openai,
      prompt: finalPrompt,
      stream: true
    });

  } catch (error) {
    console.error("Resume Worth API Error:", error);

    // ❗ Correct error response for Edge runtime
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

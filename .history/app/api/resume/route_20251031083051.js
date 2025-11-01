// app/api/resume/route.js (Next.js 15+)

import OpenAI from 'openai';
import { streamText } from "ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json(); // ✅ expect prompt, not messages

    const result = await streamText({
      model: openai("gpt-4o-mini"), // or another OpenAI model
      prompt
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Resume API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

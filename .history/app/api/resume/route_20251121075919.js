// app/api/resume/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Optional: can be 'edge' or 'node'; keep it simple first.
export const runtime = "node";

export async function POST(request) {
  try {
    // 1. Read JSON body sent from useCompletion()
    const body = await request.json();
    const prompt = typeof body === "string" ? body : body.prompt;

    if (!prompt || prompt.trim().length < 20) {
      return NextResponse.json(
        { error: "Prompt (resume text) is too short or missing." },
        { status: 400 }
      );
    }

    // 2. Call OpenAI (simple non‑streaming)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or any chat model enabled for your key
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume reviewer. " +
            "Given the candidate's full resume text, estimate a hiring 'worth' number and give feedback. " +
            "Return the result ONLY in this XML-ish format:\n" +
            "<Estimated Worth>...</Estimated Worth>\n" +
            "<Explanation>...</Explanation>\n" +
            "<Improvements>...</Improvements>",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 600,
      temperature: 0.6,
    });

    const text = completion.choices?.[0]?.message?.content ?? "";

    // 3. Response format for useCompletion
    // useCompletion expects plain text (string), not { text: ... }
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Error in /api/resume:", err);
    return NextResponse.json(
      { error: "Failed to analyse resume." },
      { status: 500 }
    );
  }
}

import { streamText, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt received" }),
        { status: 400 }
      );
    }

    const finalPrompt = `
CONTEXT: You are an expert at predicting the dollar worth of resumes...
${prompt}
    `;

    const stream = await streamText({
      model: "openai:gpt-4o-mini",
      messages: [
        { role: "user", content: finalPrompt }
      ],
    });

    return new StreamingTextResponse(stream);

  } catch (err) {
    console.error("Resume Worth API Error:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

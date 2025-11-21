import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { prompt  = await req.json();
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt received" }),
        { status: 400 }
      );
    }

    const finalPrompt = `
CONTEXT: You are an expert at predicting the dollar worth of resumes.Tell the 
user the estimated dollar worth of the resume provided based on current market trends.
RESUME TEXT:
${prompt}
    `;

    // ai@5.x returns a native ReadableStream
    const stream = await streamText({
      model: "openai:gpt-4o-mini",
      messages: [{ role: "user", content: finalPrompt }],
    });

    // Wrap the stream in a Response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
    console.log("Response sent successfully.");

  } catch (err) {
    console.error("Resume Worth API Error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

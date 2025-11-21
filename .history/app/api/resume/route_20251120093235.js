import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req) {
  console.log("🔥 API route called");

  try {
    const { prompt } = await req.json();
    console.log("🔥 Received prompt length:", prompt?.length);

    if (!prompt) throw new Error("No resume text received");

    const systemPrompt = `
You are an expert HR analyst.
Analyse the resume and estimate its worth in USD.
Follow this format:
<Estimated Worth>$...</Estimated Worth>
<Explanation><ul><li>...</li></ul></Explanation>
<Improvements><ul><li>...</li></ul></Improvements>
`;

    const finalPrompt = `${systemPrompt}\n\nRESUME:\n${prompt}`;
    console.log("🔥 Final prompt length:", finalPrompt.length);

    const stream = await streamText({
      model: "gpt-4o-mini",
      prompt: finalPrompt,
      stream: true
    });

    // ✅ MUST RETURN A Response
    return new Response(stream.toAIStream(), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });

  } catch (err) {
    console.error("🔥 FULL API ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

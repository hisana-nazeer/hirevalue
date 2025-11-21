import { streamText, StreamingTextResponse } from "ai";
import OpenAI from "openai";

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

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // The whole prompt goes to model as a single text block
    const finalPrompt = `
CONTEXT: You are an expert at predicting the dollar worth of resumes.
You speak in a fun, witty mentor tone.
If the user is male → speak like a motivating big brother.
If female → speak in a sweet, funny, hype-up tone.

TASK:
- Analyze the resume below and estimate a single USD dollar worth.
- Give 4 short bullets explaining your reasoning.
- Give 4 short bullets for improvement.
- Keep bullets < 80 characters.
- Add 1–2 funny metaphors.
- Always speak directly to the candidate as "you".

RESUME:
${prompt}

OUTPUT FORMAT: 
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

    // Streaming from GPT
    const stream = await streamText({
      model: "gpt-4o-mini",
      prompt: finalPrompt,
      provider: openai,
      stream: true,
    });
console.log("api called")
console.log("prompt length", finalPrompt)
    return new StreamingTextResponse(stream);

  } catch (err) {
    console.error("Resume Worth API Error:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

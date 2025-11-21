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

    const { prompt } = await req.json();   // FRONTEND WILL SEND ONLY TEXT

    const openai = new OpenAI({ apiKey });

    // SYSTEM PROMPT MOVED HERE
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

    // Combine system prompt + user resume
    const finalPrompt = `${systemPrompt}\n\nRESUME:\n${prompt}`;

    return streamText({
      model: "gpt-4o-mini",
      prompt: finalPrompt,    // <-- NOT MESSAGES
      stream: true,
      provider: openai
    });

  } 
  catch (error) {
  console.error("Resume Worth API Error:", error.message, error.response?.data);
  res.status(500).json({ error: error.message });
}

}

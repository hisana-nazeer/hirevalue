import { streamText } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req) {
  console.log("API route /api/resume called");
  const body = await req.json();
console.log("raw body:", body);
const { input } = body;

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const openai = new OpenAI({ apiKey });

    const { input } = await req.json(); // useCompletion sends "input", not "messages"

    console.log("api called, input received:", input);

    return streamText({
      model: "gpt-4o-mini",
      provider: openai,
      messages: [
        {
          role: "system",
          content: `
CONTEXT: You are an expert at predicting the dollar worth of resumes.
-------
TASK: 
- You will receive a resume from a user as a test input.
- Analyze the resume and provide an estimated worth in US dollars.
- Provide 4 short bullet points explaining the key factors contributing to the assessment,
  and 4 tips on how they can improve their worth. Each bullet point should be less than 1 line.
-------
OUTPUT FORMAT: 
<Estimated Worth>$...</Estimated Worth>
<Explanation>
   <ul>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      ...
   </ul>
</Explanation>
<Improvements>
   <ul>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      ...
   </ul>
</Improvements>`,
        },
        {
          role: "user",
          content: input, // now we send the resume text here
        },
      ],
      stream: true,
      temperature: 1,
    });
  } catch (error) {
    console.error("API POST error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

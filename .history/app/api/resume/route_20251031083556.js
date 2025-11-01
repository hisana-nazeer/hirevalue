import { OpenAI } from "openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req) {
    const apiKey = process.env.OPENAI_API_KEY;
  const { messages } = await req.json();

  const openai = new OpenAI({apiKey});

  // Use streamText for Next.js 15 edge API routes
  return streamText({
    model: 
    messages: [
      {
        role: "system",
        content:
          `CONTEXT: You are an expert at predicting the dollar worth of resumes.
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
      ...messages,
    ],
    stream: true,
    temperature: 1,
  });
}

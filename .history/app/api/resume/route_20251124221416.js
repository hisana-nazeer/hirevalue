

import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const text = await req.text();
    console.log("Received:", text.length);
    
    const prompt = `
CONTEXT: You are an expert at predicting the dollar worth of resumes.
-------
TASK:
- You will receive a resume from a user as a test input.
- Analyze the resume and provide an estimated worth in US dollars.
- Provide 4 short bullet points explaining the key factors contributing to the assessment,
  and 4 tips on how they can improve their worth. Each bullet point must be less than 1 line.
-------
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

-------
RESUME INPUT:
${text}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const result = response.choices[0]?.message?.content || "No result";
  console.log("AI Result:", result);
    return new Response(result, {
  status: 200,
  headers: { "Content-Type": "text/plain" }
});


  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

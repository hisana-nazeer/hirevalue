import { NextResponse } from "next/server";

// Assuming you use OpenAI, import your OpenAI client setup
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Set your API key in env variable
});
consolelog("api key")
export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt (resume text) is required." }, { status: 400 });
    }

    // Call OpenAI Chat Completion with a prompt tailored to evaluate resumes
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or your preferred model
      messages: [
        {
          role: "system",
          content: "You are an expert resume reviewer. Analyze the resume text provided and return the estimated worth, explanation, and improvements sections in this XML format: <Estimated Worth>...</Estimated Worth><Explanation>...</Explanation><Improvements>...</Improvements>."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const responseText = completion.choices[0].message.content;

    return NextResponse.json(responseText);

  } catch (error) {
    console.error("Error in /api/resume:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

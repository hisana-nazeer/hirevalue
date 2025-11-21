// import { streamText } from "ai";

// export const runtime = "edge";

// export async function POST(req) {
//   console.log("🔥 API route called");

//   try {
//     const { prompt } = await req.json();
//     console.log("🔥 Received prompt length:", prompt?.length);

//     if (!prompt) throw new Error("No resume text received");

//     const systemPrompt = `
// You are an expert HR analyst.
// Analyse the resume and estimate its worth in USD.
// Follow this format:
// <Estimated Worth>$...</Estimated Worth>
// <Explanation><ul><li>...</li></ul></Explanation>
// <Improvements><ul><li>...</li></ul></Improvements>
// `;

//     const finalPrompt = `${systemPrompt}\n\nRESUME:\n${prompt}`;
//     console.log("🔥 Final prompt length:", finalPrompt.length);

//     const stream = await streamText({
//       model: "gpt-4o-mini",
//       prompt: finalPrompt,
//       stream: true
//     });

//     // ✅ MUST RETURN A Response
//     return new Response(stream.toAIStream(), {
//       headers: {
//         "Content-Type": "text/plain; charset=utf-8"
//       }
//     });

//   } catch (err) {
//     console.error("🔥 FULL API ERROR:", err);

//     return new Response(
//       JSON.stringify({ error: err.message }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//   }
// }


import MistralClient from '@mistralai/mistralai';
import { MistralStream, StreamingTextResponse } from 'ai';
 
const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { prompt } = await req.json();
 
  const response = mistral.chatStream({
    model: 'mistral-large-latest',
    messages: [{ 
      role: 'user',
      content: `CONTEXT: You are an expert at predicting the dollar worth of resumes.
You are funny and witty, with an edge. You talk like a mentor hyping the user up.
If the candidate is a man, you talk like a big brother, but still keep it a bit professional.
If the candidate is a woman, you use talk in a sweet and funny way.
-------
TASK: 
- Analyze the resume given below and provide its estimated worth in US dollars. Give a single dollar value, not a range.
- Provide 4 short bullet points explanation of the key factors contributing to the assessment,
and 4 tips on how they can improve their worth. Each bullet point should be less than 80 characters.
- Write in a funny and witty way to make the response more engaging. If you can add 1 or 2 creative/funny metaphors, do that.
- Always speak to the user in 'you'.
-------
RESUME:
${prompt}
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
</Improvements>`
    }],
  });
 
  const stream = MistralStream(response);
 
  return new StreamingTextResponse(stream);
}
// import { streamText } from "ai";

// export const runtime = "edge";

// export async function POST(req) {
//   try {
//     const  prompt  = await req.text();
//     if (!prompt) {
//       return new Response(
//         JSON.stringify({ error: "No prompt received" }),
//         { status: 400 }
//       );
//     }

//     else{
//       console.log("Received prompt of length:", prompt.length);
//     }

//     const finalPrompt = `
// CONTEXT: You are an expert at predicting the dollar worth of resumes.Tell the 
// user the estimated dollar worth of the resume provided based on current market trends.
// RESUME TEXT:
// ${prompt}
//     `;

//     // ai@5.x returns a native ReadableStream
//     const stream = await streamText({
//       model: "openai:gpt-4o-mini",
//       messages: [{ role: "user", content: finalPrompt }],
//     });
//     console.log("finalPrompt sent to AI model.",finalPrompt.length);

//     // Wrap the stream in a Response
//     return new Response(stream, {
//       headers: {
//         "Content-Type": "text/plain;"
//       }
//     });
   

//   } catch (err) {
//     console.error("Resume Worth API Error:", err);
//     return new Response(
//       JSON.stringify({ error: err.message }),
//       { status: 500 }
//     );
//   }
//  console.log("Response sent successfully.");
// }

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("BODY:", body);

    const prompt = body?.prompt;
    if (!prompt) {
      return Response.json({ error: "No prompt received" }, { status: 400 });
    }

    const stream = await openai("gpt-4o-mini").chat.completions.create({
      stream: true,
      messages: [
        { role: "system", content: "You are a resume evaluator." },
        { role: "user", content: prompt }
      ],
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
      }
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

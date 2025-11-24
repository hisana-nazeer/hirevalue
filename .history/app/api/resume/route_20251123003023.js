// import { streamText, UIMessage, convertToModelMessages } from 'ai';

// const API_KEY = process.env.OPENAI_API_KEY;
// console.log("API Key loaded:", API_KEY ? "Yes" : "No");
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
//       model: 'openai/gpt-5.1',
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

//check what is being passed from resumeanalyser.js and write the gpt integrating code referring docs

//resume text is being passed..

// import { OpenAI } from 'openai';

// import { NextRequest, NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// export async function POST(req) {
//   try{
//     const {text} = await req.text();
//     console.log("Received resume text of length:", text.length);

//     const chatResponse = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert at predicting the dollar worth of resumes. Tell the user the estimated dollar worth of the resume provided based on current market trends."
//         },
//         {role: "user", content: `RESUME TEXT:\n${text}`}  // Pass resume text here
//       ]
//     })
//     console.log("Chat response received from OpenAI.", chatResponse);
//     const res = chatResponse.choices[0]?.message?.content ||'No response from AI model.';
//     return NextResponse.json({ result: res });
//     } catch(err){
//       console.error("api error:", err);
//       return NextResponse.json(
//         { error: "failed to fetch reply" },
//         { status: 500 }
//       );
//     }
//   }


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
${resumeText}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert at predicting the dollar worth of resumes."
        },
        {
          role: "user",
          content: text
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

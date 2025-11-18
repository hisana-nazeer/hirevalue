// import { streamText } from "ai";

// export const runtime = "edge";

// export async function POST(req) {
//   console.log("API route /api/resume called");

//   try {
//     const body = await req.json();
//     console.log("BODY RECEIVED:", body);

//     const { prompt } = body;

//     if (!prompt) {
//       console.error("No prompt received in request body");
//       return new Response(
//         JSON.stringify({ error: "No prompt received" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Check API key presence
//     if (!process.env.OPENAI_API_KEY) {
//       console.error("OPENAI_API_KEY is missing!");
//       return new Response(
//         JSON.stringify({ error: "Missing API key" }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Use streamText for response
//     return streamText({
//       model: "gpt-4o-mini", // or "gpt-4" if you prefer
//       prompt: `
// CONTEXT: You are an expert at predicting the dollar worth of resumes.
// -------
// TASK: 
// - You will receive a resume from a user as a test input.
// - Analyze the resume and provide an estimated worth in US dollars.
// - Provide 4 short bullet points explaining the key factors contributing to the assessment,
//   and 4 tips on how they can improve their worth. Each bullet point should be less than 1 line.
// -------
// OUTPUT FORMAT: 
// <Estimated Worth>$...</Estimated Worth>
// <Explanation>
//    <ul>
//       <li>...</li>
//       <li>...</li>
//       <li>...</li>
//       ...
//    </ul>
// </Explanation>
// <Improvements>
//    <ul>
//       <li>...</li>
//       <li>...</li>
//       <li>...</li>
//       ...
//    </ul>
// </Improvements>
// -------
// RESUME:
// ${prompt}
//       `,
//       stream: true,
//       temperature: 1,
//     });

//   } catch (error) {
//     console.error("API POST error:", error);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

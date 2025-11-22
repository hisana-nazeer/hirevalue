import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const runtime = "edge";
API_KEY = process.env.OPENAI_API_KEY;
C
export async function POST(req) {
  try {
    const  prompt  = await req.text();
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt received" }),
        { status: 400 }
      );
    }

    else{
      console.log("Received prompt of length:", prompt.length);
    }

    const finalPrompt = `
CONTEXT: You are an expert at predicting the dollar worth of resumes.Tell the 
user the estimated dollar worth of the resume provided based on current market trends.
RESUME TEXT:
${prompt}
    `;

    // ai@5.x returns a native ReadableStream
    const stream = await streamText({
      model: 'openai/gpt-5.1',
      messages: [{ role: "user", content: finalPrompt }],
    });
    console.log("finalPrompt sent to AI model.",finalPrompt.length);

    // Wrap the stream in a Response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain;"
      }
    });
   

  } catch (err) {
    console.error("Resume Worth API Error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
 console.log("Response sent successfully.");
}

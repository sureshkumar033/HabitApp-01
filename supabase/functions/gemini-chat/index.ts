// Gemini chat edge function — tries multiple model names for compatibility
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are HealthyMate, a friendly wellness and healthy routine assistant for students and young people.

Your role:
- Provide general, practical healthy habit suggestions
- Cover topics like sleep, hydration, nutrition, exercise, stress management, and study habits
- Be encouraging, warm, and easy to understand
- Keep responses concise but helpful — use short paragraphs and bullet points when appropriate

Important rules:
- Do NOT provide medical diagnosis or medical treatment advice
- Do NOT prescribe or recommend medications, dosages, or specific treatments
- If a user asks about a serious medical condition, medication, eating disorder, mental health crisis, or any other medical issue, do NOT give medical instructions. Instead, respond with care and recommend that they talk to a qualified healthcare professional, school counselor, or a trusted medical provider. Share general wellness context only if appropriate, but make clear that professional help is the right step.
- Keep the tone supportive and non-judgmental

Always remind users that your suggestions are general wellness tips, not medical advice, when the topic touches on health concerns.`;

const MODEL_CANDIDATES = [
  "gemini-2.0-flash",
  "gemini-flash-latest",
  "gemini-1.5-flash",
  "gemini-2.0-flash-001",
  "gemini-1.5-flash-002",
  "gemini-1.5-flash-001",
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured. Please add your Gemini API key." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });

    let lastError = "";

    for (const model of MODEL_CANDIDATES) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        },
      );

      if (geminiResponse.ok) {
        const geminiData = await geminiResponse.json();
        const replyText =
          geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
          "I'm sorry, I couldn't generate a response right now. Please try again.";

        return new Response(
          JSON.stringify({ reply: replyText }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      lastError = await geminiResponse.text();
      const parsed = JSON.parse(lastError);
      if (parsed?.error?.status !== "NOT_FOUND") {
        break;
      }
    }

    return new Response(
      JSON.stringify({
        error: "AI service error: could not find an available model",
        details: lastError,
      }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

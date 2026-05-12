// Lovable AI-powered RizzAI reply generator
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODES: Record<string, string> = {
  smart: "Generate 3 smart, natural, context-aware texting replies. Keep them short, casual, and human.",
  flirty: "Generate 3 flirty, charming replies with confident rizz. Playful, teasing, never cringe. Gen Z energy.",
  funny: "Generate 3 hilarious, witty replies. Dry humor, clever, punchy.",
  savage: "Generate 3 savage comeback replies. Confident, sharp, unbothered. Not mean — iconic.",
  romantic: "Generate 3 romantic, emotionally warm replies. Sincere, soft, attractive.",
  grammar: "Fix grammar and clarity while preserving the user's slang, emojis, tone and Gen Z personality. Return 1 corrected version.",
  pickup: "Generate 3 creative pickup lines. Smooth, original, not corny.",
  apology: "Generate 3 sincere apology messages. Mature, honest, no over-explaining.",
  comeback: "Generate 3 sharp comebacks. Confident, witty, lethal.",
  goodnight: "Generate 3 cute good night/morning texts. Sweet, personal, non-cringe.",
};

const SCORE_PROMPT = `Analyze the conversation and return ONLY a JSON object (no markdown) with these numeric fields 0-100:
{ "rizz": number, "confidence": number, "humor": number, "emotionalIntelligence": number, "flirting": number, "cringe": number, "vibe": "one short Gen Z phrase describing the chat", "redFlags": ["..."], "greenFlags": ["..."], "advice": "one sentence coaching tip" }`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode = "smart", context = "", personality = "Gen Z", action = "reply" } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    let system = "";
    let user = "";

    if (action === "score") {
      system = "You are RizzAI's analyzer. " + SCORE_PROMPT;
      user = `Conversation:\n${context}`;
    } else {
      const modeInstr = MODES[mode] ?? MODES.smart;
      system = `You are RizzAI — a futuristic Gen Z texting assistant. ${modeInstr}
Persona voice: ${personality}.
Rules: no quotation marks, no numbering, return EXACTLY one reply per line. Keep replies under 25 words unless the user requests long. Use natural lowercase, sparing emojis, zero cringe.`;
      user = context?.trim()
        ? `Conversation context (most recent last):\n${context}\n\nGenerate replies I should send next.`
        : `Generate example replies showcasing your style.`;
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit hit, slow down a sec." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits depleted. Add credits in Settings → Workspace → Usage." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content: string = data.choices?.[0]?.message?.content ?? "";

    if (action === "score") {
      const match = content.match(/\{[\s\S]*\}/);
      const score = match ? JSON.parse(match[0]) : null;
      return new Response(JSON.stringify({ score }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const replies = content.split("\n").map(l => l.replace(/^[\-\*\d\.\)\s"']+/, "").replace(/["']+$/, "").trim()).filter(Boolean).slice(0, 5);
    return new Response(JSON.stringify({ replies }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("rizz-generate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

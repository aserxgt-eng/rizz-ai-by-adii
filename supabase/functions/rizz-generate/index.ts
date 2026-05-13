// Lovable AI-powered RizzAI reply generator
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MODES: Record<string, string> = {
  smart: "Generate {N} smart, natural, context-aware texting replies. Keep them short, casual, and human.",
  flirty: "Generate {N} flirty, charming replies with confident rizz. Playful, teasing, never cringe. Gen Z energy.",
  funny: "Generate {N} hilarious, witty replies. Dry humor, clever, punchy.",
  savage: "Generate {N} savage comeback replies. Confident, sharp, unbothered. Not mean — iconic.",
  romantic: "Generate {N} romantic, emotionally warm replies. Sincere, soft, attractive.",
  emotional: "Generate {N} emotionally deep, heartfelt replies. Vulnerable, sincere, moving.",
  stylish: "Generate {N} stylish, aesthetic replies with elite vibes. Confident, polished, magnetic.",
  casual: "Generate {N} casual, chill replies. Easy-going, friendly, low effort cool.",
  grammar: "Fix grammar and clarity while preserving the user's slang, emojis, tone and personality. Return 1 corrected version.",
  pickup: "Generate {N} creative pickup lines. Smooth, original, not corny.",
  apology: "Generate {N} sincere apology messages. Mature, honest, no over-explaining.",
  comeback: "Generate {N} sharp comebacks. Confident, witty, lethal.",
  goodnight: "Generate {N} cute good night/morning texts. Sweet, personal, non-cringe.",
  bio: "Generate {N} short social media bios. Distinctive, witty, scroll-stopping.",
  caption: "Generate {N} social media captions. Punchy, aesthetic, post-ready.",
  roast: "Generate {N} clever roasts. Sharp, playful, never crossing the line.",
  comment: "Generate {N} cool social media comments. Engaging, on-trend, brief.",
  emoji: "Generate {N} expressive emoji-rich replies. Creative emoji combos that read like a vibe.",
};

const LANG_NAMES: Record<string, string> = {
  en: "English", hi: "Hindi", mr: "Marathi", es: "Spanish", fr: "French", de: "German",
  ja: "Japanese", ko: "Korean", ru: "Russian", ar: "Arabic", pt: "Portuguese",
  ta: "Tamil", te: "Telugu", bn: "Bengali", pa: "Punjabi", ur: "Urdu",
  hinglish: "Hinglish (Hindi written in English/Latin alphabets, casual Indian Gen Z code-mix of Hindi + English words, e.g. 'bhai tu kya kar raha hai bro')",
  "roman-hi": "Romanized Hindi (Hindi pronunciation written using ONLY English/Latin alphabets — NO Devanagari script, NO English translation, e.g. 'kya haal hai dost')",
  "roman-mr": "Romanized Marathi (Marathi pronunciation written using ONLY English/Latin alphabets — NO Devanagari script, NO English translation, e.g. 'kasa kay mitra, kay challay')",
  auto: "AUTO-DETECT",
};

const SCORE_PROMPT = `Analyze the conversation and return ONLY a JSON object (no markdown) with these numeric fields 0-100:
{ "rizz": number, "confidence": number, "humor": number, "emotionalIntelligence": number, "flirting": number, "cringe": number, "vibe": "one short Gen Z phrase describing the chat", "redFlags": ["..."], "greenFlags": ["..."], "advice": "one sentence coaching tip" }`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode = "smart", context = "", personality = "Gen Z", action = "reply", language = "en", count = 3 } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const langName = LANG_NAMES[language] || "English";
    const n = Math.max(1, Math.min(5, Number(count) || 3));

    let system = "";
    let user = "";

    if (action === "score") {
      system = "You are RizzAI's analyzer. " + SCORE_PROMPT;
      user = `Conversation:\n${context}`;
    } else {
      const modeInstr = (MODES[mode] ?? MODES.smart).replace(/\{N\}/g, String(n));
      system = `You are RizzAI — a futuristic Gen Z texting assistant. ${modeInstr}
Persona voice: ${personality}.
OUTPUT LANGUAGE: ${langName} (${language}). Write the replies natively in ${langName} using its proper script and natural idioms — do NOT transliterate, do NOT add translations, do NOT mix English unless the language naturally code-switches. Preserve the requested emotion and tone after translating intent. Use correct Unicode and grammar.
Rules: no quotation marks, no numbering, return EXACTLY one reply per line. Keep replies under 25 words unless the user requests long. Sparing emojis, zero cringe.`;
      user = context?.trim()
        ? `Conversation context (most recent last):\n${context}\n\nGenerate replies I should send next, in ${langName}.`
        : `Generate example replies in ${langName} showcasing your style.`;
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

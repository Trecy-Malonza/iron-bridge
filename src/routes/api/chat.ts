import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the IronBridge Industrial Group assistant. IronBridge handles industrial land sales, warehouse leasing, property management, investment advisory, site selection and build-to-suit development across Kenya (Maai Mahiu, Naivasha, Nakuru, Athi River and Nairobi).
Useful facts: Grade A warehouse lease rates typically start around KES 55 per sqm per month and depend on size, spec and location. Units range from 2,000 sqm warehouses to 20,000 sqm facilities, plus industrial land from 2 acres. Site visits run Monday to Friday, 8am-5pm. Contact: info@ironbridge.co.ke, +254 700 000 000.
Answer briefly (2-4 sentences), warmly and professionally. If you don't know something, invite the visitor to submit the enquiry form or call the team.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages : null;
        if (!messages) return new Response("messages are required", { status: 400 });

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("AI is not configured", { status: 500 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: "google/gemini-3.7-flash",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.slice(-20).map((m) => ({ role: m.role, content: String(m.content) })),
            ],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          return new Response(JSON.stringify({ error: text || "AI request failed" }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that.";
        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

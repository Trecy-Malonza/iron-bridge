import { MessageSquare, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

const QUICK = [
  "What do you do?",
  "Where are your properties?",
  "What does it cost?",
  "How do I book a site visit?",
  "Do you build to suit?",
];

function answer(qRaw: string): string {
  const q = qRaw.toLowerCase();
  if (/(what.*do|who.*are|about|services)/.test(q))
    return "IronBridge Industrial Group handles industrial land sales, warehouse leasing, property management, investment advisory, site selection and build-to-suit development across Kenya.";
  if (/(where|location|area|map)/.test(q))
    return "Our properties sit along Kenya's fastest growing corridors — Maai Mahiu, Naivasha, Nakuru, Athi River and Nairobi. You can see exact pins on the Properties page map.";
  if (/(price|cost|rent|budget|lease rate|how much)/.test(q))
    return "Lease rates depend on size, spec and location. Grade A warehousing typically starts around KES 55 per sqm per month — share your requirement in the form and we'll send exact pricing.";
  if (/(visit|tour|viewing|book|appointment)/.test(q))
    return "Site visits run Monday to Friday, 8am-5pm. Submit the enquiry form or call +254 700 000 000 and we'll confirm a slot within 24 hours.";
  if (/(build|btс|build-to-suit|construct|develop)/.test(q))
    return "Yes — we design and build to your specification on our serviced industrial land, from single warehouses to full logistics campuses.";
  if (/(size|sqm|acre|space)/.test(q))
    return "Available units range from 2,000 sqm warehouses up to 20,000 sqm facilities, plus industrial land parcels from 2 acres upwards.";
  if (/(contact|email|phone|call|reach)/.test(q))
    return "Reach us at info@ironbridge.co.ke or +254 700 000 000. Our team replies within one business day.";
  if (/(hi|hello|hey|thanks|thank you)/.test(q))
    return "Happy to help! Ask me about our services, locations, pricing or booking a site visit.";
  return "Good question. Our team can answer that in detail — drop it in the enquiry form or ask me about our services, locations, pricing, site visits or build-to-suit projects.";
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm the IronBridge assistant. Ask me anything about what we do." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }, { from: "bot", text: answer(t) }]);
    setInput("");
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-navy">
        <MessageSquare className="h-4 w-4 text-primary" /> Chat with us
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Quick answers about our properties and services.</p>

      <div ref={scrollRef} className="mt-3 max-h-56 space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                m.from === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="rounded-full border border-input bg-card px-3 py-1.5 text-[0.7rem] text-navy hover:border-primary hover:text-primary"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Type your question..."
          className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="button"
          aria-label="Send message"
          onClick={() => send(input)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary-dark"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

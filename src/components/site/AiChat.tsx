import { Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What do you do?",
  "Where are your properties?",
  "What does leasing cost?",
  "How do I book a site visit?",
];

export function AiChat({ className = "", height = "h-72" }: { className?: string; height?: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the IronBridge AI assistant. Ask me anything about our industrial land, warehouses or services.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;
    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(
          res.status === 429
            ? "Too many requests right now — please try again in a moment."
            : res.status === 402
              ? "The assistant is temporarily unavailable. Please use the enquiry form."
              : detail || "Something went wrong.",
        );
      }
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "" }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div ref={scrollRef} className={`${height} space-y-3 overflow-y-auto pr-1`}>
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground/80"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...
          </p>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      {messages.length <= 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-input bg-card px-3 py-1.5 text-[0.7rem] text-foreground/80 hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground transition hover:bg-primary-dark disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

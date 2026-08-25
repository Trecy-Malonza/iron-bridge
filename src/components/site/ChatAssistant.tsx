import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

export function ChatAssistant() {
  return (
    <Link
      to="/chat"
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
    >
      <MessageCircle className="h-4 w-4" /> WeChat — Chat with us
    </Link>
  );
}

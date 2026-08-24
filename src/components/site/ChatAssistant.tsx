import { Link } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [chatUrl, setChatUrl] = useState("/chat");

  useEffect(() => {
    setChatUrl(`${window.location.origin}/chat`);
  }, []);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(chatUrl)}`;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
      >
        <MessageCircle className="h-4 w-4" /> WeChat — Scan to chat
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center shadow-float">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-navy">
              <MessageCircle className="h-4 w-4 text-primary" /> WeChat
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Scan this QR code with your phone to open our chat assistant.
            </p>

            <div className="mx-auto mt-4 w-fit rounded-lg border border-border bg-card p-3">
              <img src={qrSrc} alt="QR code linking to the IronBridge chat assistant" width={220} height={220} />
            </div>

            <Link
              to="/chat"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
            >
              Or open the chat here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const CHAT_URL = "https://iron-bridge.lovable.app/chat";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(CHAT_URL)}`;

export function ChatAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-surface px-4 py-2.5 text-[0.85rem] text-navy transition hover:border-primary"
      >
        <MessageCircle className="h-4 w-4 text-muted-foreground" /> WeChat
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/60 p-4 backdrop-blur-sm">
          <div className="relative rounded-xl border border-border bg-card p-6 shadow-float">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={QR_SRC}
              alt="WeChat QR code"
              width={220}
              height={220}
              className="mt-4 h-[220px] w-[220px] rounded-lg bg-card"
            />
          </div>
        </div>
      )}
    </>
  );
}

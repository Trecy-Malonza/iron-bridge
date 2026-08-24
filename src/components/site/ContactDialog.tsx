import { Link } from "@tanstack/react-router";
import { Bot, CheckCircle2, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { AiChat } from "./AiChat";

export function ContactDialog({
  open,
  onClose,
  trigger,
}: {
  open?: boolean;
  onClose?: () => void;
  trigger?: ReactNode;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const close = () => (isControlled ? onClose?.() : setInternalOpen(false));

  const [sent, setSent] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {trigger && (
        <span onClick={() => setInternalOpen(true)} className="contents">
          {trigger}
        </span>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-deep/60 p-4 backdrop-blur-sm sm:items-center">
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-float">
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-lg font-bold text-navy">Contact Us</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us how to reach you and what you need — we reply within one business day.
            </p>

            {sent ? (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-navy">Thank you — message received.</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Our team will be in touch shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-5 space-y-3"
              >
                <input
                  required
                  name="fullName"
                  placeholder="Full name"
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                />
                <textarea
                  required
                  name="description"
                  rows={4}
                  placeholder="Description — tell us what you're looking for"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
                >
                  Send Message
                </button>
              </form>
            )}

            <div className="mt-5 border-t border-border pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowChat((v) => !v)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <Bot className="h-4 w-4" /> Chat with us
                </button>
                <Link
                  to="/chat"
                  onClick={close}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  Open full chat page
                </Link>
              </div>
              {showChat && (
                <div className="mt-3 rounded-lg border border-border bg-card p-3">
                  <AiChat height="h-56" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

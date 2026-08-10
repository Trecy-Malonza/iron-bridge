import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "light" }) {
  return (
    <p className={`eyebrow ${tone === "light" ? "text-primary-foreground/80" : ""}`}>{children}</p>
  );
}

export function CenteredEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-primary/40" />
      <p className="eyebrow">{children}</p>
      <span className="h-px w-10 bg-primary/40" />
    </div>
  );
}
import mark from "@/assets/ironbridge-mark.png";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-3">
      <img src={mark} alt="IronBridge Industrial Group logo" width={44} height={44} className="h-9 w-9 shrink-0 object-contain" />
      <span className="leading-none">
        <span
          className={`block font-display text-lg font-extrabold tracking-tight ${
            variant === "light" ? "text-navy-foreground" : "text-navy"
          }`}
        >
          IRONBRIDGE
        </span>
        <span
          className={`block text-[0.6rem] font-medium tracking-[0.28em] ${
            variant === "light" ? "text-navy-foreground/70" : "text-muted-foreground"
          }`}
        >
          INDUSTRIAL GROUP
        </span>
      </span>
    </span>
  );
}
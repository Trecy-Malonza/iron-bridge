import logoAsset from "@/assets/ironbridge-logo.png";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <img
      src={logoAsset}
      alt="IronBridge Industrial Group logo"
      width={1129}
      height={186}
      className={`h-9 w-auto object-contain sm:h-10 ${variant === "light" ? "brightness-0 invert" : ""}`}
    />
  );
}

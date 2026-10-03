import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password | IronBridge Industrial Group" },
      { name: "description", content: "Set a new password for your IronBridge account." },
      { property: "og:title", content: "Reset Password | IronBridge Industrial Group" },
      { property: "og:description", content: "Set a new password for your IronBridge account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw !== pw2) return setMsg("Passwords do not match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setMsg(error.message);
    await supabase.auth.signOut();
    sessionStorage.removeItem("ib-admin-verified");
    navigate({ to: "/admin" });
  }

  const input = "mt-1 h-10 w-full rounded-md border border-input bg-card px-3 text-sm";
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <form onSubmit={submit} className="w-full max-w-[368px] space-y-3 rounded-[14px] bg-card p-8 shadow-float">
        <h1 className="text-lg font-bold text-foreground">Set a new password</h1>
        <input type="password" required minLength={6} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" className={input} />
        <input type="password" required minLength={6} value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Confirm new password" className={input} />
        {msg && <p className="text-sm text-destructive">{msg}</p>}
        <Button type="submit" disabled={busy} className="w-full">{busy ? "Saving…" : "Save password"}</Button>
      </form>
    </main>
  );
}

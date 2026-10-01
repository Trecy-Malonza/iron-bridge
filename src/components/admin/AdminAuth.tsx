import { Link } from "@tanstack/react-router";
import { Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Logo } from "@/components/site/Logo";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

const FLAG = "ib-admin-verified";

type Status = "loading" | "signed-out" | "no-access" | "admin";

export function AdminAuth({ children }: { children: () => ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  async function check() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) { sessionStorage.removeItem(FLAG); return setStatus("signed-out"); }
    setUserEmail(data.user.email ?? "");
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) return setStatus("no-access");
    // Require a fresh sign-in on this dashboard for every browser session.
    const verified = sessionStorage.getItem(FLAG) === data.user.id || sessionStorage.getItem(FLAG) === "pending";
    if (!verified) {
      await supabase.auth.signOut();
      return setStatus("signed-out");
    }
    sessionStorage.setItem(FLAG, data.user.id);
    setStatus("admin");
  }

  useEffect(() => {
    check();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") check();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    if (mode === "login") {
      sessionStorage.setItem(FLAG, "pending");
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); sessionStorage.removeItem(FLAG); }
    } else {
      sessionStorage.setItem(FLAG, "pending");
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin`, data: { full_name: name } },
      });
      if (err) setError(err.message);
      else if (!data.session) setNotice("Account created. Check your email to confirm, then log in.");
    }
    setBusy(false);
  }

  async function google() {
    setError(null);
    setBusy(true);
    sessionStorage.setItem(FLAG, "pending");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin` });
    if (result.error) {
      setBusy(false);
      setError("Google sign-in failed. Please try again.");
    }
  }

  if (status === "admin") return <>{children()}</>;

  const shell = (body: ReactNode) => (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-float sm:p-10">
        <Link to="/" className="flex justify-center">
          <Logo />
        </Link>
        {body}
      </div>
    </main>
  );

  if (status === "loading") return shell(<p className="mt-8 text-center text-sm text-muted-foreground">Loading…</p>);

  if (status === "no-access")
    return shell(
      <div className="mt-8 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
        <h1 className="mt-4 text-xl font-bold text-navy">Admin access required</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You're signed in as <strong>{userEmail}</strong>, but this account hasn't been given admin access yet. Ask an existing admin to grant it.
        </p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="mt-6 w-full rounded-md border border-input py-3 text-sm font-medium hover:bg-accent"
        >
          Sign in with a different account
        </button>
      </div>,
    );

  const field = "mt-2 flex items-center rounded-md border border-input px-3 focus-within:border-primary";
  const input = "w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground";

  return shell(
    <>
      <h1 className="mt-6 text-center text-2xl font-bold text-navy">Admin Dashboard</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        {mode === "login" ? "Log in to manage IronBridge" : "Create an admin account"}
      </p>
      <div className="mt-6 grid grid-cols-2 rounded-md bg-muted p-1 text-sm font-medium">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(null); setNotice(null); }}
            className={`rounded py-2 ${mode === m ? "bg-card text-navy shadow-sm" : "text-muted-foreground"}`}
          >
            {m === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        {mode === "signup" && (
          <div>
            <label htmlFor="admin-name" className="text-sm font-medium text-navy">Full Name</label>
            <div className={field}>
              <UserRound className="h-4 w-4 text-muted-foreground" />
              <input id="admin-name" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={input} />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="admin-email" className="text-sm font-medium text-navy">Email Address</label>
          <div className={field}>
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input id="admin-email" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={input} />
          </div>
        </div>
        <div>
          <label htmlFor="admin-password" className="text-sm font-medium text-navy">Password</label>
          <div className={field}>
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input id="admin-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" className={input} />
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {notice && <p className="text-sm text-primary">{notice}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-60">
          {busy ? "Please wait…" : mode === "login" ? "Log In" : "Sign Up"}
        </button>
        <button type="button" onClick={google} disabled={busy} className="flex w-full items-center justify-center gap-3 rounded-md border border-input py-3 text-sm font-medium hover:bg-accent disabled:opacity-60">
          <span className="font-bold text-primary">G</span> Continue with Google
        </button>
      </form>
    </>,
  );
}

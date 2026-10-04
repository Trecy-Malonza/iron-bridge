import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const FLAG = "ib-admin-verified";
const NEW = "ib-admin-new-account";

type Status = "loading" | "signed-out" | "no-access" | "admin";

export function AdminAuth({ children }: { children: () => ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jobRole, setJobRole] = useState("Super Admin");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const signingUp = useRef(false);

  async function check() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) { sessionStorage.removeItem(FLAG); return setStatus("signed-out"); }
    // Fresh sign-ups are sent to the Log In tab instead of being kept signed in.
    if (signingUp.current || sessionStorage.getItem(NEW) === data.user.email) {
      await supabase.auth.signOut();
      return setStatus("signed-out");
    }
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
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (email.trim().toLowerCase() !== "admin@ironbridge.co.ke" || password !== "admin@ironbridge1") {
      setError("Only the authorized IronBridge admin email and password can be used.");
      return;
    }
    setBusy(true);
    if (mode === "login") {
      sessionStorage.setItem(FLAG, "pending");
      sessionStorage.removeItem(NEW);
      signingUp.current = false;
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); sessionStorage.removeItem(FLAG); }
    } else {
      sessionStorage.removeItem(FLAG);
      signingUp.current = true;
      sessionStorage.setItem(NEW, email);
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin`, data: { full_name: name, job_role: jobRole } },
      });
      if (err) { setError(err.message); signingUp.current = false; sessionStorage.removeItem(NEW); }
      else {
        // Always send new accounts to the Log In tab to sign in with email and password.
        if (data.session) await supabase.auth.signOut();
        setStatus("signed-out");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
        setNotice("Please log in with your email and password.");
      }
    }
    setBusy(false);
  }

  if (status === "admin") return <>{children()}</>;

  const shell = (body: ReactNode) => (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-2 py-4 sm:px-4 sm:py-8">
      <div className="w-full max-w-[368px] rounded-[14px] bg-card px-7 py-8 shadow-float sm:px-8">
        <Link to="/" className="inline-flex" aria-label="Go to home page">
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

  const input = "mt-1.5 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary";

  function switchMode(nextMode: "login" | "signup") {
    setMode(nextMode);
    setError(null);
    setNotice(null);
    setPassword("");
    setConfirmPassword("");
  }

  return shell(
    <>
      <h1 className="mt-7 text-xl font-bold text-foreground">
        {mode === "login" ? "Admin Sign In" : "Create Admin Account"}
      </h1>
      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
        {mode === "login" ? "Access the property management dashboard." : "Set up access to the property management dashboard."}
      </p>
      <form className="mt-5 space-y-3.5" onSubmit={submit}>
        {mode === "signup" && (
          <div>
            <label htmlFor="admin-name" className="text-xs font-semibold text-foreground">Full Name</label>
            <input id="admin-name" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Wanjiku" className={input} />
          </div>
        )}
        <div>
          <label htmlFor="admin-email" className="text-xs font-semibold text-foreground">Email</label>
          <input id="admin-email" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@ironbridge.co.ke" className={input} />
        </div>
        {mode === "signup" && (
          <div>
            <label htmlFor="admin-role" className="text-xs font-semibold text-foreground">Role</label>
            <select id="admin-role" value={jobRole} onChange={(e) => setJobRole(e.target.value)} className={`${input} appearance-auto bg-card text-foreground`}>
              <option>Super Admin</option>
              <option>Sales Manager</option>
              <option>Operator</option>
              <option>Content Creator</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="admin-password" className="text-xs font-semibold text-foreground">Password</label>
          <input id="admin-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "login" ? "Your password" : "At least 6 characters"} className={input} />
        </div>
        {mode === "signup" && (
          <div>
            <label htmlFor="admin-confirm-password" className="text-xs font-semibold text-foreground">Confirm Password</label>
            <input id="admin-confirm-password" type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" className={input} />
          </div>
        )}
        {mode === "login" && (
          <button type="button" className="text-[11px] font-semibold text-primary hover:underline" onClick={async () => {
            setError(null);
            if (!email) { setError("Enter your email first, then click Forgot password."); return; }
            const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
            if (err) setError(err.message); else setNotice("A password reset link has been sent to your email.");
          }}>Forgot password?</button>
        )}
        {error && <p className="text-sm text-destructive">{error === "Invalid login credentials" ? "Incorrect password for this email. Use “Forgot password?” to reset it." : error}</p>}
        {notice && <p className="text-xs text-primary">{notice}</p>}
        <Button type="submit" disabled={busy} className="h-10 w-full text-xs font-semibold">
          {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>
      <p className="mt-2.5 text-center text-[10px] text-muted-foreground">
        {mode === "login" ? "No account yet? " : "Already have an account? "}
        <button type="button" onClick={() => switchMode(mode === "login" ? "signup" : "login")} className="font-semibold text-primary hover:underline">
          {mode === "login" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </>,
  );
}

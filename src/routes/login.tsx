import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

import warehouseDusk from "@/assets/warehouse-exterior.jpg";
import { Logo } from "@/components/site/Logo";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In | IronBridge Industrial Group" },
      {
        name: "description",
        content:
          "Log in to your IronBridge Industrial Group account to manage leads, properties and client relationships.",
      },
      { property: "og:title", content: "Log In | IronBridge Industrial Group" },
      {
        property: "og:description",
        content: "Sign in to access your IronBridge dashboard for industrial property management.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate({ to: "/", hash: "find-space" });
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      setError("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/", hash: "find-space" });
  }


  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-12">
      <h1 className="sr-only">Log in to your IronBridge account</h1>
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-float lg:grid-cols-2">
        <div className="relative hidden min-h-[560px] lg:block">
          <img
            src={warehouseDusk}
            alt="IronBridge warehouse at dusk"
            width={1200}
            height={912}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-navy/10" />
          <div className="relative flex h-full flex-col justify-between p-8">
            <Link to="/">
              <Logo variant="light" />
            </Link>
            <div className="text-navy-foreground">
              <h2 className="text-3xl font-bold">Welcome Back</h2>
              <p className="mt-2 max-w-sm text-sm text-navy-foreground/80">
                Sign in to access your dashboard, manage leads, properties, and client relationships.
              </p>
              <p className="mt-8 flex items-start gap-2 text-xs text-navy-foreground/70">
                <ShieldCheck className="mt-0.5 h-4 w-4" />
                <span>
                  Your data is secure with us.
                  <br />
                  Enterprise-grade security &amp; privacy protection.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="mx-auto w-full max-w-sm">
            <h2 className="text-center text-2xl font-bold text-navy">Log In to Your Account</h2>
            <p className="mt-1 text-center text-sm text-muted-foreground">Enter your credentials to continue</p>

            <form className="mt-8 space-y-5" onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/", hash: "find-space" });
              }}>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-navy">Email Address</label>
                <div className="mt-2 flex items-center rounded-md border border-input px-3 focus-within:border-primary">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-navy">Password</label>
                <div className="mt-2 flex items-center rounded-md border border-input px-3 focus-within:border-primary">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button type="button" aria-label="Show password" onClick={() => setShow((v) => !v)}>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-foreground/80">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                  Remember me
                </label>
                <span className="text-primary">Forgot Password?</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Log In
              </button>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-md border border-input py-3 text-sm font-medium hover:bg-accent"
              >
                <span className="font-bold text-primary">G</span> Log in with Google
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-primary">Sign Up</Link>
              </p>
            </form>

            <div className="mt-10 flex flex-col gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
              <span>© 2026 IronBridge Industrial Group Ltd. All rights reserved.</span>
              <span>Privacy Policy | Terms of Use</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
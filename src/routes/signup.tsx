import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Lock, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

import warehouseDusk from "@/assets/warehouse-grade-a.jpg";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account | IronBridge Industrial Group" },
      {
        name: "description",
        content:
          "Create an IronBridge Industrial Group account to save industrial properties, track enquiries and work with our team.",
      },
      { property: "og:title", content: "Create Account | IronBridge Industrial Group" },
      {
        property: "og:description",
        content: "Join IronBridge to access premium industrial land, warehouses and logistics facilities in Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

const fields = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", Icon: UserRound },
  { id: "company", label: "Company / Organization", type: "text", placeholder: "Company name", Icon: Building2 },
  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com", Icon: Mail },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+254 7XX XXX XXX", Icon: Phone },
  { id: "password", label: "Password", type: "password", placeholder: "Create a password", Icon: Lock },
];

function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-12">
      <h1 className="sr-only">Create your IronBridge account</h1>
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-float lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="mx-auto w-full max-w-sm">
            <h2 className="text-center text-2xl font-bold text-navy">Create Your Account</h2>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Join IronBridge and start your industrial search
            </p>

            <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              {fields.map(({ id, label, type, placeholder, Icon }) => (
                <div key={id}>
                  <label htmlFor={id} className="text-sm font-medium text-navy">{label}</label>
                  <div className="mt-2 flex items-center rounded-md border border-input px-3 focus-within:border-primary">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Sign Up
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary">Log In</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="relative hidden min-h-[560px] lg:block">
          <img
            src={warehouseDusk}
            alt="Grade A warehouse at IronBridge Business Park"
            width={1200}
            height={800}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/40 to-navy/10" />
          <div className="relative flex h-full flex-col justify-between p-8">
            <Logo variant="light" />
            <div className="text-navy-foreground">
              <h2 className="text-3xl font-bold">Build With Us</h2>
              <p className="mt-2 max-w-sm text-sm text-navy-foreground/80">
                Premium industrial spaces in strategic locations. Built for today. Designed for tomorrow.
              </p>
              <p className="mt-8 flex items-start gap-2 text-xs text-navy-foreground/70">
                <ShieldCheck className="mt-0.5 h-4 w-4" />
                Enterprise-grade security &amp; privacy protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
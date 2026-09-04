import { Link } from "@tanstack/react-router";
import { Menu, Shield, UserPlus, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

import { ContactDialog } from "./ContactDialog";
import { Logo } from "./Logo";

const links: { label: string; to: "/" | "/blog" | "/careers"; hash?: string }[] = [
  { label: "Who We Are", to: "/", hash: "who-we-are" },
  { label: "Find Industrial Space", to: "/", hash: "find-space" },
  { label: "Our Services", to: "/", hash: "services" },
  { label: "Our Team", to: "/", hash: "team" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
];

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);


  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur"
      }
    >
      <nav className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-4 lg:px-10">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo variant={transparent ? "light" : "dark"} />
        </Link>

        <ul className="ml-auto hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                className={`text-sm transition-colors ${
                  transparent
                    ? "text-navy-foreground/85 hover:text-navy-foreground"
                    : "text-foreground/75 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className={`text-sm transition-colors ${
                transparent
                  ? "text-navy-foreground/85 hover:text-navy-foreground"
                  : "text-foreground/75 hover:text-primary"
              }`}
            >
              Contact Us
            </button>
          </li>
        </ul>


        <div className="ml-auto flex items-center gap-3 xl:ml-0">
          <Link
            to="/login"
            className={`hidden items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors sm:inline-flex ${
              transparent
                ? "border-navy-foreground/40 text-navy-foreground hover:bg-navy-foreground/10"
                : "border-border text-foreground hover:bg-accent"
            }`}
          >
            <UserRound className="h-4 w-4" /> Log In
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            <UserPlus className="h-4 w-4" /> Sign Up
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`xl:hidden ${transparent ? "text-navy-foreground" : "text-foreground"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 pt-2 xl:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 text-sm text-foreground/80"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setContactOpen(true);
                }}
                className="block w-full border-b border-border/60 py-3 text-left text-sm text-foreground/80"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      )}

      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );

}
import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-5 max-w-[16rem] text-sm text-navy-foreground/70">
              Unlocking the potential of industrialization in Kenya.
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-foreground/10 text-navy-foreground/80"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/70">QUICK LINKS</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/" hash="who-we-are">About Us</Link></li>
              <li><Link to="/" hash="services">Our Services</Link></li>
              <li><Link to="/" hash="find-space">Find Industrial Space</Link></li>
              <li><Link to="/" hash="contact">Partner With Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/70">RESOURCES</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/blog">News &amp; Insights</Link></li>
              <li><Link to="/" hash="team">Our Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/70">OFFICE HOURS</h4>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
              <li className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <span>Monday – Friday<br />8:30 AM – 5:30 PM</span>
              </li>
              <li>Saturday<br />9:00 AM – 1:00 PM</li>
              <li>Sunday &amp; Public Holidays<br />Closed</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/70">CONTACT US</h4>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                +254 700 000 000
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                info@ironbridge.co.ke
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                IronBridge Business Park, Maai Mahiu, Nakuru County, Kenya.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-navy-foreground/15 pt-6 text-xs text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 IronBridge Industrial Group Limited. All Rights Reserved.</p>
          <p className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
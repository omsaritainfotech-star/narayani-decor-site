"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  // prevent background scroll when menu is open
  React.useEffect(() => {
    const root = document.documentElement;
    if (open) {
      const prev = root.style.overflow;
      root.style.overflow = "hidden";
      return () => { root.style.overflow = prev; };
    }
  }, [open]);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/services/wallpapers-and-panels", label: "Services" },
    { href: "/products/charcoal-louver-panels", label: "Products" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg md:text-xl">Narayani Decor</Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--brand-accent)] transition">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="hamburger-icon" aria-hidden="true">
            <span className={`line ${open ? "rotate-45 translate-y-[6px]" : ""}`}></span>
            <span className={`line ${open ? "opacity-0" : ""}`}></span>
            <span className={`line ${open ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
          </span>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile dropdown panel */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-14 inset-x-0 origin-top transition-transform duration-200 ${open ? "scale-y-100" : "scale-y-0"} `}
        style={{ transformOrigin: "top" }}
      >
        <div className="mx-2 rounded-2xl bg-white shadow-lg border">
          <nav className="flex flex-col p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base hover:bg-zinc-50 active:bg-zinc-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

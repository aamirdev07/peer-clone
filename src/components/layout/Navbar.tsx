"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MoreMenu from "./MoreMenu";
import LoginButton from "@/components/shared/LoginButton";

const NAV_ITEMS = [
  { label: "BUY & SELL", href: "/swap" },
  { label: "DEPOSITS", href: "/deposits" },
  { label: "LIQUIDITY", href: "/liquidity" },
  { label: "LEADERBOARD", href: "/leaderboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg-base border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/swap" className="flex items-center gap-2.5 shrink-0">
          <span className="font-satoshi font-black text-2xl text-text-primary tracking-tight">
            peer
          </span>
          <span className="text-[10px] uppercase tracking-wider text-text-secondary border border-border-subtle rounded-full px-2 py-0.5 font-medium">
            BETA
          </span>
        </Link>

        {/* Center: Nav pills (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-accent-purple-muted text-accent-purple border border-accent-purple"
                    : "bg-bg-surface-raised text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover border border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <MoreMenu />
        </div>

        {/* Right: Login + mobile hamburger */}
        <div className="flex items-center gap-3">
          <LoginButton variant="nav" className="hidden sm:block" />
          <button
            className="md:hidden text-text-primary p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-subtle bg-bg-base px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-full px-5 py-2 text-sm font-medium uppercase tracking-wide whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-accent-purple-muted text-accent-purple border border-accent-purple"
                      : "bg-bg-surface-raised text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover border border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <MoreMenu />
          </div>
          <div className="sm:hidden pt-2">
            <LoginButton variant="nav" />
          </div>
        </div>
      )}
    </nav>
  );
}

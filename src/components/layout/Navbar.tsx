"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MoreMenu from "./MoreMenu";
import UserProfileSheet from "./UserProfileSheet";

const NAV_ITEMS = [
  { label: "BUY & SELL", href: "/swap" },
  { label: "DEPOSITS", href: "/deposits" },
  { label: "LIQUIDITY", href: "/liquidity" },
  { label: "LEADERBOARD", href: "/leaderboard" },
];

const MOCK_USER = {
  email: "AAMIRDEVELOPER07@GMAIL.COM",
  balance: "0",
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-bg-base">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/swap" className="flex items-center shrink-0">
            <Image
              src="/kosmyk-logo.png"
              alt="Kosmyk"
              width={1920}
              height={689}
              className="h-12 w-auto"
              priority
            />
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
                      ? "bg-bg-surface-raised text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-raised"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <MoreMenu />
          </div>

          {/* Right: User profile + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* USDC balance badge */}
            <div className="hidden md:flex items-center gap-1.5 text-sm">
              <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                U
              </div>
              <span className="text-text-primary font-medium tabular-nums">
                {MOCK_USER.balance}
              </span>
            </div>

            {/* Privy/points icon placeholder */}
            <div className="hidden md:flex items-center">
              <div className="w-7 h-7 rounded-full bg-accent-purple/20 flex items-center justify-center">
                <span className="text-accent-purple text-[10px] font-bold">
                  P
                </span>
              </div>
            </div>

            {/* User email button */}
            <button
              onClick={() => setProfileOpen(true)}
              className="hidden md:flex items-center gap-2 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full pl-2 pr-4 py-1.5 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-bold">U</span>
              </div>
              <span className="text-text-primary text-xs font-medium truncate max-w-[180px]">
                {MOCK_USER.email}
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-text-primary p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-bg-base px-4 pb-4">
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
                        ? "bg-bg-surface-raised text-text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-raised"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <MoreMenu />
            </div>
            {/* Mobile user button */}
            <button
              onClick={() => {
                setProfileOpen(true);
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-2.5 bg-bg-surface-raised rounded-xl px-4 py-3 mt-2"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">U</span>
              </div>
              <span className="text-text-primary text-sm font-medium truncate">
                {MOCK_USER.email}
              </span>
            </button>
          </div>
        )}
      </nav>

      {/* User Profile Sheet */}
      <UserProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}

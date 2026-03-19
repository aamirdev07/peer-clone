"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeftRight, Download, DollarSign, BarChart3, Flag } from "lucide-react";
import MoreMenu from "./MoreMenu";
import UserProfileSheet from "./UserProfileSheet";

const NAV_ITEMS = [
  { label: "BUY & SELL", href: "/swap" },
  { label: "DEPOSITS", href: "/deposits" },
  { label: "LIQUIDITY", href: "/liquidity" },
  { label: "LEADERBOARD", href: "/leaderboard" },
];

const BOTTOM_NAV_ITEMS = [
  { label: "Swap", href: "/swap", icon: ArrowLeftRight },
  { label: "Deposits", href: "/deposits", icon: Download },
  { label: "Liquidity", href: "/liquidity", icon: DollarSign },
  { label: "Stats", href: "/leaderboard", icon: BarChart3 },
  { label: "More", href: "#more", icon: Flag },
];

const MOCK_USER = {
  email: "cryptodev@gmai...",
  balance: "0",
};

export default function Navbar() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      {/* Top navbar */}
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

          {/* Right: User profile (desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            {/* USDC balance badge */}
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                U
              </div>
              <span className="text-text-primary font-medium tabular-nums">
                {MOCK_USER.balance}
              </span>
            </div>

            {/* Privy/points icon placeholder */}
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-accent-purple/20 flex items-center justify-center">
                <span className="text-accent-purple text-[10px] font-bold">
                  P
                </span>
              </div>
            </div>

            {/* User email button */}
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full pl-2 pr-4 py-1.5 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-bold">U</span>
              </div>
              <span className="text-text-primary text-xs font-medium truncate max-w-[120px] lg:max-w-[180px]">
                {MOCK_USER.email}
              </span>
            </button>
          </div>

          {/* Mobile: user avatar only */}
          <button
            onClick={() => setProfileOpen(true)}
            className="md:hidden w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0"
          >
            <span className="text-white text-xs font-bold">U</span>
          </button>
        </div>
      </nav>

      {/* Mobile bottom app bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-base border-t border-border-subtle">
        <div className="flex items-center justify-around h-16 px-2">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isMore = item.href === "#more";
            const isActive = !isMore && pathname === item.href;
            const Icon = item.icon;

            if (isMore) {
              return (
                <MoreMenu key={item.label} variant="bottom-bar" />
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-accent-purple"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
        {/* Safe area spacer for devices with home indicator */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>

      {/* User Profile Sheet */}
      <UserProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}

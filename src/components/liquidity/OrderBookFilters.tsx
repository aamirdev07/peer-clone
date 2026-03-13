"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Filter, RefreshCw, MoreHorizontal } from "lucide-react";
import { CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";

interface OrderBookFiltersProps {
  currency: string;
  onCurrencyChange: (code: string) => void;
  platform: string;
  onPlatformChange: (id: string) => void;
}

export default function OrderBookFilters({
  currency,
  onCurrencyChange,
  platform,
  onPlatformChange,
}: OrderBookFiltersProps) {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false);
      if (platformRef.current && !platformRef.current.contains(e.target as Node)) setPlatformOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <span className="text-text-secondary text-sm font-medium uppercase tracking-wider">Amount</span>

      {/* Token badge */}
      <div className="flex items-center gap-1.5 bg-bg-surface-raised rounded-full px-3 py-1.5">
        <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[8px] font-bold">U</div>
        <span className="text-sm font-medium text-text-primary">USDC</span>
      </div>

      {/* Currency dropdown */}
      <div className="relative" ref={currencyRef}>
        <button
          onClick={() => setCurrencyOpen(!currencyOpen)}
          className="flex items-center gap-2 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full px-3 py-1.5 transition-all duration-200"
        >
          <span className="text-lg leading-none">{selectedCurrency.flag}</span>
          <span className="text-sm font-medium text-text-primary">{selectedCurrency.code}</span>
          <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
        </button>
        {currencyOpen && (
          <div className="absolute left-0 top-full mt-2 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 min-w-[180px] shadow-xl shadow-black/40">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  onCurrencyChange(c.code);
                  setCurrencyOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                  c.code === currency ? "text-accent-purple" : "text-text-primary"
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <span className="font-medium">{c.code}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Platform dropdown */}
      <div className="relative" ref={platformRef}>
        <button
          onClick={() => setPlatformOpen(!platformOpen)}
          className="flex items-center gap-2 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full px-3 py-1.5 transition-all duration-200"
        >
          <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">Platform</span>
          <span className="text-sm font-medium text-text-primary">
            {platform === "all" ? "All" : PAYMENT_METHODS.find((p) => p.id === platform)?.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
        </button>
        {platformOpen && (
          <div className="absolute left-0 top-full mt-2 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 min-w-[180px] shadow-xl shadow-black/40">
            <button
              onClick={() => {
                onPlatformChange("all");
                setPlatformOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                platform === "all" ? "text-accent-purple" : "text-text-primary"
              }`}
            >
              <span className="font-medium">All platforms</span>
            </button>
            {PAYMENT_METHODS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onPlatformChange(p.id);
                  setPlatformOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                  p.id === platform ? "text-accent-purple" : "text-text-primary"
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                  style={{ backgroundColor: p.color }}
                >
                  {p.letter}
                </div>
                <span className="font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Display button */}
      <button className="flex items-center gap-1.5 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full px-3 py-1.5 text-text-secondary text-sm transition-all duration-200">
        <MoreHorizontal className="w-4 h-4" />
        <span className="font-medium">DISPLAY</span>
      </button>

      {/* Filter icon */}
      <button className="w-8 h-8 rounded-full bg-bg-surface-raised hover:bg-bg-surface-hover flex items-center justify-center text-text-secondary transition-all duration-200">
        <Filter className="w-4 h-4" />
      </button>

      {/* Refresh icon */}
      <button className="w-8 h-8 rounded-full bg-bg-surface-raised hover:bg-bg-surface-hover flex items-center justify-center text-text-secondary transition-all duration-200">
        <RefreshCw className="w-4 h-4" />
      </button>

      {/* Add Liquidity */}
      <button className="ml-auto bg-accent-purple hover:bg-accent-purple-hover text-white rounded-lg px-5 py-2 font-semibold text-sm transition-all duration-200">
        ADD LIQUIDITY
      </button>
    </div>
  );
}

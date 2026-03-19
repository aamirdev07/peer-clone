"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Filter, RefreshCw, MoreHorizontal, LayoutList, Table2 } from "lucide-react";
import { CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import CountryFlag from "@/components/shared/CountryFlag";
import Image from "next/image";

interface OrderBookFiltersProps {
  currency: string;
  onCurrencyChange: (code: string) => void;
  platform: string;
  onPlatformChange: (id: string) => void;
  viewMode: "orderbook" | "table";
  onViewModeChange: (mode: "orderbook" | "table") => void;
  showLowLiquidity: boolean;
  onShowLowLiquidityChange: (v: boolean) => void;
  showExtremeSpreads: boolean;
  onShowExtremeSpreadsChange: (v: boolean) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  filtersActive: boolean;
}

export default function OrderBookFilters({
  currency,
  onCurrencyChange,
  platform,
  onPlatformChange,
  viewMode,
  onViewModeChange,
  showLowLiquidity,
  onShowLowLiquidityChange,
  showExtremeSpreads,
  onShowExtremeSpreadsChange,
  onRefresh,
  isRefreshing,
  filtersActive,
}: OrderBookFiltersProps) {
  const router = useRouter();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false);
      if (platformRef.current && !platformRef.current.contains(e.target as Node)) setPlatformOpen(false);
      if (displayRef.current && !displayRef.current.contains(e.target as Node)) setDisplayOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
      <span className="hidden sm:inline text-text-secondary text-sm font-medium uppercase tracking-wider">Amount</span>

      {/* Token badge */}
      <div className="flex items-center gap-1.5 bg-bg-surface-raised rounded-full px-3 py-1.5">
        <img src="https://coin-images.coingecko.com/coins/images/6319/large/usdc.png" alt="USDC" className="w-5 h-5 rounded-full object-cover" />
        <span className="text-sm font-medium text-text-primary">USDC</span>
      </div>

      {/* Currency dropdown */}
      <div className="relative" ref={currencyRef}>
        <button
          onClick={() => setCurrencyOpen(!currencyOpen)}
          className="flex items-center gap-2 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full px-3 py-1.5 transition-all duration-200"
        >
          <CountryFlag currency={selectedCurrency.code} size={20} />
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
                <CountryFlag currency={c.code} size={20} />
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
                {"logo" in p && p.logo ? (
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image src={p.logo} alt={p.name} width={20} height={20} className="w-full h-full object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ backgroundColor: p.color }}>
                    {p.letter}
                  </div>
                )}
                <span className="font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Display button + dropdown */}
      <div className="relative" ref={displayRef}>
        <button
          onClick={() => setDisplayOpen(!displayOpen)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200 ${
            displayOpen
              ? "bg-bg-surface-hover text-text-primary"
              : "bg-bg-surface-raised hover:bg-bg-surface-hover text-text-secondary"
          }`}
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="font-medium">DISPLAY</span>
        </button>
        {displayOpen && (
          <div className="absolute left-0 top-full mt-2 bg-bg-surface border border-border-subtle rounded-xl p-4 z-50 min-w-[260px] shadow-xl shadow-black/40 space-y-4">
            {/* View toggle */}
            <div>
              <span className="text-text-tertiary text-[10px] uppercase tracking-wider font-medium">View</span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onViewModeChange("orderbook")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "orderbook"
                      ? "bg-bg-surface-raised text-text-primary border border-border-hover"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-raised border border-transparent"
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                  ORDER BOOK
                </button>
                <button
                  onClick={() => onViewModeChange("table")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "table"
                      ? "bg-bg-surface-raised text-text-primary border border-border-hover"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-raised border border-transparent"
                  }`}
                >
                  <Table2 className="w-4 h-4" />
                  TABLE
                </button>
              </div>
            </div>

            {/* Filters */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                <span className="text-text-tertiary text-[10px] uppercase tracking-wider font-medium">Filters</span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showLowLiquidity}
                    onChange={(e) => onShowLowLiquidityChange(e.target.checked)}
                    className="w-4 h-4 rounded border-border-subtle bg-bg-input accent-accent-purple"
                  />
                  <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                    Show Low Liquidity Deposits
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showExtremeSpreads}
                    onChange={(e) => onShowExtremeSpreadsChange(e.target.checked)}
                    className="w-4 h-4 rounded border-border-subtle bg-bg-input accent-accent-purple"
                  />
                  <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                    Show Extreme Spreads (+100%)
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter icon - toggles display panel (same as DISPLAY) */}
      <button
        onClick={() => setDisplayOpen(!displayOpen)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 relative ${
          filtersActive
            ? "bg-accent-purple-muted text-accent-purple"
            : "bg-bg-surface-raised hover:bg-bg-surface-hover text-text-secondary"
        }`}
      >
        <Filter className="w-4 h-4" />
        {filtersActive && (
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent-purple border-2 border-bg-base" />
        )}
      </button>

      {/* Refresh icon */}
      <button
        onClick={onRefresh}
        className="w-8 h-8 rounded-full bg-bg-surface-raised hover:bg-bg-surface-hover flex items-center justify-center text-text-secondary transition-all duration-200"
      >
        <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
      </button>

      {/* Add Liquidity */}
      <button
        onClick={() => router.push("/deposits")}
        className="ml-auto bg-accent-purple hover:bg-accent-purple-hover text-white rounded-lg px-3 sm:px-5 py-2 font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap"
      >
        ADD LIQUIDITY
      </button>
    </div>
  );
}

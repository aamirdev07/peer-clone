"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { LiquidityRow, PAYMENT_METHODS, CURRENCIES } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

interface BuyPanelProps {
  row: LiquidityRow;
  onClose: () => void;
}

export default function BuyPanel({ row, onClose }: BuyPanelProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(row.providers[0]);
  const [platformOpen, setPlatformOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const platform = PAYMENT_METHODS.find((p) => p.id === selectedProvider);
  const currency = CURRENCIES.find((c) => c.code === row.currency) || CURRENCIES[0];

  // Reset provider when row changes
  useEffect(() => {
    setSelectedProvider(row.providers[0]);
    setSliderValue(0);
    setPlatformOpen(false);
  }, [row]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPlatformOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Mock available amounts per provider
  const providerAmounts = useMemo(() => {
    const total = row.amount;
    const count = row.providers.length;
    return row.providers.map((id, i) => {
      // Distribute amount unevenly for realism
      const share = i === 0 ? 0.6 : 0.4 / (count - 1 || 1);
      return {
        id,
        platform: PAYMENT_METHODS.find((p) => p.id === id),
        available: Math.round(total * share * 100) / 100,
      };
    });
  }, [row]);

  const selectedProviderData = providerAmounts.find((p) => p.id === selectedProvider) || providerAmounts[0];
  const maxOrder = selectedProviderData?.available || row.amount;
  const minOrder = Math.min(maxOrder * 0.1, 50);

  const receiveAmount = useMemo(() => {
    return (sliderValue / 100) * maxOrder;
  }, [sliderValue, maxOrder]);

  const sendAmount = useMemo(() => {
    return receiveAmount * row.price;
  }, [receiveAmount, row.price]);

  return (
    <div className="w-[340px] shrink-0 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-text-primary text-xl font-bold">Buy USDC</h3>
      </div>

      {/* Details */}
      <div className="space-y-3">
        {/* Platform dropdown */}
        <div className="flex items-start justify-between" ref={dropdownRef}>
          <span className="text-text-secondary text-sm pt-1">Platform</span>
          <div className="relative">
            <button
              onClick={() => setPlatformOpen(!platformOpen)}
              className="flex items-center gap-2 text-text-primary text-sm font-medium hover:text-accent-purple transition-colors"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                style={{ backgroundColor: platform?.color }}
              >
                {platform?.letter}
              </div>
              {platform?.name}
              {platformOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-text-secondary" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
              )}
            </button>
            {platformOpen && (
              <div className="absolute right-0 top-full mt-2 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 min-w-[220px] shadow-xl shadow-black/40">
                {providerAmounts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProvider(p.id);
                      setPlatformOpen(false);
                      setSliderValue(0);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-surface-hover transition-colors ${
                      p.id === selectedProvider ? "bg-bg-surface-hover" : ""
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: p.platform?.color }}
                    >
                      {p.platform?.letter}
                    </div>
                    <div className="text-left">
                      <span className="text-text-primary font-medium block">{p.platform?.name}</span>
                      <span className="text-text-tertiary text-xs">{formatNumber(p.available, 0)} USDC available</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Price</span>
          <span className="text-text-primary text-sm font-medium tabular-nums">
            {formatNumber(row.price, 4)} {currency.code}/USDC
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Available</span>
          <span className="text-text-primary text-sm font-medium tabular-nums">
            {formatNumber(selectedProviderData?.available || row.amount, 2)} USDC
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Limits</span>
          <span className="text-text-primary text-sm font-medium tabular-nums">
            {formatNumber(minOrder, 2)} - {formatNumber(maxOrder, 2)} USDC
          </span>
        </div>
      </div>

      {/* Slider */}
      <div>
        <div className="flex items-center justify-end mb-1">
          <span className="text-text-secondary text-xs">Max</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full h-1 bg-bg-surface-raised rounded-full appearance-none cursor-pointer accent-accent-purple"
        />
        <div className="flex items-center justify-between mt-1">
          <span className="text-text-tertiary text-xs">0%</span>
          <span className="text-text-tertiary text-xs">100%</span>
        </div>
      </div>

      {/* You Receive */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You Receive</label>
        <div className="flex items-center justify-between">
          <span className="text-text-primary text-xl font-semibold tabular-nums">
            {formatNumber(receiveAmount, 2)}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[8px] font-bold">U</div>
            <span className="text-text-primary text-sm font-medium">USDC</span>
          </div>
        </div>
      </div>

      {/* Swap arrow */}
      <div className="flex justify-center">
        <div className="w-8 h-8 rounded-full bg-bg-surface-raised flex items-center justify-center text-text-secondary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* You Send */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You Send</label>
        <div className="flex items-center justify-between">
          <span className="text-text-primary text-xl font-semibold tabular-nums">
            {formatNumber(sendAmount, 2)}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{currency.flag}</span>
            <span className="text-text-primary text-sm font-medium">{currency.code}</span>
          </div>
        </div>
      </div>

      {/* Create Order */}
      <button
        onClick={() => toast.success(`Order created!`, { description: `You'd receive ${formatNumber(receiveAmount, 2)} USDC for ${currency.symbol}${formatNumber(sendAmount, 2)} via ${platform?.name}.` })}
        className="w-full rounded-xl py-3.5 text-base font-semibold bg-bg-surface-raised text-text-primary hover:bg-bg-surface-hover transition-all duration-200 uppercase tracking-wide border border-border-subtle"
      >
        CREATE ORDER
      </button>

      {/* Helper text */}
      <p className="text-text-tertiary text-xs text-center leading-relaxed">
        After creating the order, you&apos;ll be redirected to complete the payment via {platform?.name}.
      </p>
    </div>
  );
}

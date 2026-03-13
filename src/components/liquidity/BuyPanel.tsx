"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { LiquidityRow, PAYMENT_METHODS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";
import LoginButton from "@/components/shared/LoginButton";

interface BuyPanelProps {
  row: LiquidityRow;
  onClose: () => void;
}

export default function BuyPanel({ row, onClose }: BuyPanelProps) {
  const [amount, setAmount] = useState("");
  const primaryProvider = row.providers[0];
  const platform = PAYMENT_METHODS.find((p) => p.id === primaryProvider);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[400px] bg-bg-surface border-l border-border-subtle h-full overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-text-primary">Buy USDC</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-surface-hover transition-colors text-text-secondary hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Platform */}
          <div className="bg-bg-input rounded-xl p-4">
            <label className="text-text-secondary text-sm block mb-2">Platform</label>
            <div className="flex items-center gap-2">
              <PlatformBadge platformId={primaryProvider} size="md" />
              <span className="text-text-primary font-medium">{platform?.name}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-bg-input rounded-xl p-4">
            <label className="text-text-secondary text-sm block mb-2">Price</label>
            <span className="text-text-primary text-lg font-semibold">
              {formatNumber(row.price, 4)} USD/USDC
            </span>
          </div>

          {/* Spread */}
          <div className="bg-bg-input rounded-xl p-4">
            <label className="text-text-secondary text-sm block mb-2">Spread</label>
            <span
              className={`text-lg font-semibold ${
                row.spread < 0
                  ? "text-accent-red"
                  : row.spread > 0
                  ? "text-accent-green"
                  : "text-text-secondary"
              }`}
            >
              {row.spread > 0 ? "+" : ""}
              {formatNumber(row.spread, 2)}%
            </span>
          </div>

          {/* Available */}
          <div className="bg-bg-input rounded-xl p-4">
            <label className="text-text-secondary text-sm block mb-2">Available</label>
            <span className="text-text-primary text-lg font-semibold">
              {formatNumber(row.amount, 0)} USDC
            </span>
          </div>

          {/* Amount input */}
          <div className="bg-bg-input rounded-xl p-4">
            <label className="text-text-secondary text-sm block mb-2">Amount (USD)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || /^\d*\.?\d{0,2}$/.test(v)) setAmount(v);
              }}
              placeholder="0.00"
              className="text-2xl font-semibold text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
            />
          </div>

          {/* Start Order */}
          <LoginButton variant="cta" />
        </div>
      </div>
    </div>
  );
}

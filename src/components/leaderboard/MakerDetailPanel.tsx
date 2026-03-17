"use client";

import { ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";
import { LeaderboardRow, PAYMENT_METHODS } from "@/lib/constants";
import { formatUSD, formatNumber } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";

interface MakerDetailPanelProps {
  maker: LeaderboardRow;
}

export default function MakerDetailPanel({ maker }: MakerDetailPanelProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(maker.address);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-text-primary text-lg font-bold font-mono">{maker.address}</h3>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-bg-surface-hover transition-colors"
            title="Copy address"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => toast.info("Opening Peerlytics...", { description: "View detailed analytics for this maker." })}
            className="text-text-secondary text-xs hover:text-accent-purple transition-colors flex items-center gap-1"
          >
            Peerlytics <ExternalLink className="w-3 h-3" />
          </button>
          <button
            onClick={() => toast.info("Opening BaseScan...", { description: "View on-chain activity for this address." })}
            className="text-text-secondary text-xs hover:text-accent-purple transition-colors flex items-center gap-1"
          >
            BaseScan <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-bg-input rounded-lg p-3">
          <span className="text-text-secondary text-[10px] uppercase tracking-wider font-medium">Filled Volume</span>
          <p className="text-text-primary text-base font-bold mt-1 tabular-nums">{formatUSD(maker.filledVolume)}</p>
        </div>
        <div className="bg-bg-input rounded-lg p-3">
          <span className="text-text-secondary text-[10px] uppercase tracking-wider font-medium">Realized Profit</span>
          <p className="text-accent-green text-base font-bold mt-1 tabular-nums">{formatUSD(maker.realizedProfit)}</p>
        </div>
        <div className="bg-bg-input rounded-lg p-3">
          <span className="text-text-secondary text-[10px] uppercase tracking-wider font-medium">Gross Deposited</span>
          <p className="text-text-primary text-base font-bold mt-1 tabular-nums">{formatUSD(maker.grossDeposited)}</p>
        </div>
        <div className="bg-bg-input rounded-lg p-3">
          <span className="text-text-secondary text-[10px] uppercase tracking-wider font-medium">Active Deposits</span>
          <p className="text-text-primary text-base font-bold mt-1 tabular-nums">{maker.activeDeposits}</p>
        </div>
      </div>

      {/* Total deposits */}
      <div className="bg-bg-input rounded-lg p-3">
        <span className="text-text-secondary text-[10px] uppercase tracking-wider font-medium">Total Deposits</span>
        <p className="text-text-primary text-base font-bold mt-1 tabular-nums">{maker.totalDeposits}</p>
      </div>

      {/* Platforms */}
      <div>
        <h4 className="text-text-primary text-sm font-bold uppercase tracking-wider">Platforms</h4>
        <p className="text-text-secondary text-xs mt-0.5">Rails this maker actively manages liquidity on</p>

        <div className="mt-4 space-y-3">
          {maker.platforms.map((ps) => {
            const platform = PAYMENT_METHODS.find((p) => p.id === ps.platformId);
            if (!platform) return null;
            return (
              <div key={ps.platformId} className="flex items-center gap-3">
                <PlatformBadge platformId={ps.platformId} size="md" />
                <div className="flex-1 min-w-0">
                  <span className="text-text-primary text-sm font-semibold">{platform.name}</span>
                  <p className="text-text-tertiary text-xs">
                    {formatNumber(ps.fulfillments, 0)} fulfillments {ps.manual > 0 ? `\u00B7 ${ps.manual} manual` : ""}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-text-primary text-sm font-semibold tabular-nums">{formatUSD(ps.volume)}</span>
                  <p className="text-accent-green text-xs tabular-nums">{formatUSD(ps.profit)} profit</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { LIQUIDITY_DATA, LiquidityRow, CURRENCIES } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";
import OrderBookFilters from "./OrderBookFilters";
import BuyPanel from "./BuyPanel";

export default function OrderBookTable() {
  const [currency, setCurrency] = useState("USD");
  const [platform, setPlatform] = useState("all");
  const [selectedRow, setSelectedRow] = useState<LiquidityRow | null>(null);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  const filteredData = useMemo(() => {
    let data = LIQUIDITY_DATA.filter((row) => row.currency === currency);
    if (platform !== "all") {
      data = data.filter((row) => row.providers.includes(platform));
    }
    // Recalculate running totals after filtering
    let runningTotal = 0;
    return data.map((row) => {
      runningTotal += row.amount;
      return { ...row, total: runningTotal };
    });
  }, [currency, platform]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-text-primary uppercase mb-5">Liquidity</h2>

      <OrderBookFilters
        currency={currency}
        onCurrencyChange={setCurrency}
        platform={platform}
        onPlatformChange={setPlatform}
      />

      <div className="bg-bg-surface rounded-xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                  Price
                </th>
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                  Spread
                </th>
                <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                  Amount
                </th>
                <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                  Total
                </th>
                <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                  <span className="inline-flex items-center gap-1">
                    APR <Info className="w-3 h-3" />
                  </span>
                </th>
                <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                  Providers
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedRow(row)}
                    className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-sm font-mono font-medium tabular-nums ${
                          row.price < 1 ? "text-accent-green" : "text-text-primary"
                        }`}
                      >
                        {formatNumber(row.price, 4)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-sm font-medium tabular-nums ${
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
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-text-primary tabular-nums">
                        {formatNumber(row.amount, 0)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-text-primary tabular-nums">
                        {formatNumber(row.total, 0)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm text-text-primary tabular-nums">
                        {row.apr !== null ? `${formatNumber(row.apr, 1)}%` : "-"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        {row.providers.map((p) => (
                          <PlatformBadge key={p} platformId={p} />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-text-secondary text-sm">
                    No liquidity found for {currency} {platform !== "all" ? `on ${platform}` : ""}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Market rate indicator */}
        <div className="text-center py-3 text-text-secondary text-sm border-t border-border-subtle">
          Market: {formatNumber(selectedCurrency.usdRate, 4)} {currency}
        </div>
      </div>

      {/* Buy Panel */}
      {selectedRow && (
        <BuyPanel row={selectedRow} onClose={() => setSelectedRow(null)} />
      )}
    </div>
  );
}

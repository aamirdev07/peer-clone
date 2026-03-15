"use client";

import { useState, useMemo, useCallback } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LIQUIDITY_DATA, LiquidityRow, CURRENCIES } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";
import OrderBookFilters from "./OrderBookFilters";
import BuyPanel from "./BuyPanel";

export default function OrderBookTable() {
  const [currency, setCurrency] = useState("USD");
  const [platform, setPlatform] = useState("all");
  const [selectedRow, setSelectedRow] = useState<LiquidityRow | null>(null);
  const [viewMode, setViewMode] = useState<"orderbook" | "table">("orderbook");
  const [showLowLiquidity, setShowLowLiquidity] = useState(false);
  const [showExtremeSpreads, setShowExtremeSpreads] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  const filtersActive = showLowLiquidity || showExtremeSpreads || platform !== "all";

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  const filteredData = useMemo(() => {
    let data = LIQUIDITY_DATA.filter((row) => row.currency === currency);
    if (platform !== "all") {
      data = data.filter((row) => row.providers.includes(platform));
    }
    if (!showLowLiquidity) {
      data = data.filter((row) => row.amount >= 100);
    }
    if (!showExtremeSpreads) {
      data = data.filter((row) => Math.abs(row.spread) <= 100);
    }
    // Recalculate running totals after filtering
    let runningTotal = 0;
    return data.map((row) => {
      runningTotal += row.amount;
      return { ...row, total: runningTotal };
    });
  }, [currency, platform, showLowLiquidity, showExtremeSpreads]);

  // Best available price
  const bestPrice = filteredData.length > 0
    ? Math.min(...filteredData.map((r) => r.price))
    : null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-text-primary uppercase mb-5">Liquidity</h2>

      <OrderBookFilters
        currency={currency}
        onCurrencyChange={setCurrency}
        platform={platform}
        onPlatformChange={setPlatform}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showLowLiquidity={showLowLiquidity}
        onShowLowLiquidityChange={setShowLowLiquidity}
        showExtremeSpreads={showExtremeSpreads}
        onShowExtremeSpreadsChange={setShowExtremeSpreads}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        filtersActive={filtersActive}
      />

      {/* Side-by-side: table + right panel */}
      <div className="flex gap-4">
        {/* Order book / Table */}
        <div className={`bg-bg-surface rounded-xl border border-border-subtle overflow-hidden ${selectedRow ? "flex-1" : "w-full"} transition-all`}>
          <div className="overflow-x-auto">
            {viewMode === "orderbook" ? (
              /* ORDER BOOK VIEW - compact price levels with bar visualization */
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Price</th>
                    <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Spread</th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Amount</th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Total</th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                      <span className="inline-flex items-center gap-1">APR
                        <Tooltip>
                          <TooltipTrigger asChild><span className="cursor-help"><Info className="w-3 h-3" /></span></TooltipTrigger>
                          <TooltipContent side="top" className="bg-bg-surface-raised text-text-primary text-xs border border-border-subtle rounded-lg px-3 py-2 max-w-[200px] shadow-xl">
                            Annualized return from spread earned on filled orders.
                          </TooltipContent>
                        </Tooltip>
                      </span>
                    </th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Providers</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, i) => {
                      const maxAmount = Math.max(...filteredData.map((r) => r.amount));
                      const barWidth = (row.amount / maxAmount) * 100;
                      return (
                        <tr
                          key={i}
                          onClick={() => setSelectedRow(row)}
                          className={`border-b border-border-subtle hover:bg-bg-surface-hover transition-colors cursor-pointer relative ${
                            selectedRow === row ? "bg-bg-surface-hover" : ""
                          }`}
                        >
                          <td className="px-5 py-3.5 relative">
                            <div
                              className="absolute left-0 top-0 bottom-0 opacity-15"
                              style={{
                                width: `${barWidth}%`,
                                backgroundColor: row.spread >= 0 ? "var(--accent-green)" : "var(--accent-amber)",
                              }}
                            />
                            <span className={`text-sm font-mono font-medium tabular-nums relative z-10 ${
                              row.price < 1 ? "text-accent-green" : "text-text-primary"
                            }`}>
                              {formatNumber(row.price, 4)}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-sm font-medium tabular-nums ${
                              row.spread < 0 ? "text-accent-red" : row.spread > 0 ? "text-accent-green" : "text-text-secondary"
                            }`}>
                              {row.spread > 0 ? "+" : ""}{formatNumber(row.spread, 2)}%
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span className="text-sm text-text-primary tabular-nums">{formatNumber(row.amount, 0)}</span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <span className="text-sm text-text-primary tabular-nums">{formatNumber(row.total, 0)}</span>
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
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-text-secondary text-sm">
                        No liquidity found for {currency} {platform !== "all" ? `on ${platform}` : ""}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              /* TABLE VIEW - flat, simpler rows */
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">#</th>
                    <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Price</th>
                    <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Spread</th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Amount (USDC)</th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Cumulative</th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                      <span className="inline-flex items-center gap-1">APR
                        <Tooltip>
                          <TooltipTrigger asChild><span className="cursor-help"><Info className="w-3 h-3" /></span></TooltipTrigger>
                          <TooltipContent side="top" className="bg-bg-surface-raised text-text-primary text-xs border border-border-subtle rounded-lg px-3 py-2 max-w-[200px] shadow-xl">
                            Annualized return from spread earned on filled orders.
                          </TooltipContent>
                        </Tooltip>
                      </span>
                    </th>
                    <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">Providers</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, i) => (
                      <tr
                        key={i}
                        onClick={() => setSelectedRow(row)}
                        className={`border-b border-border-subtle hover:bg-bg-surface-hover transition-colors cursor-pointer ${
                          selectedRow === row ? "bg-bg-surface-hover" : ""
                        }`}
                      >
                        <td className="px-5 py-3.5 text-text-secondary text-sm">{i + 1}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-mono font-medium tabular-nums ${
                            row.price < 1 ? "text-accent-green" : "text-text-primary"
                          }`}>
                            {formatNumber(row.price, 4)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-medium tabular-nums ${
                            row.spread < 0 ? "text-accent-red" : row.spread > 0 ? "text-accent-green" : "text-text-secondary"
                          }`}>
                            {row.spread > 0 ? "+" : ""}{formatNumber(row.spread, 2)}%
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-sm text-text-primary tabular-nums">{formatNumber(row.amount, 2)}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-sm text-text-primary tabular-nums">{formatNumber(row.total, 2)}</span>
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
                      <td colSpan={7} className="px-5 py-8 text-center text-text-secondary text-sm">
                        No liquidity found for {currency} {platform !== "all" ? `on ${platform}` : ""}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Market rate indicator */}
          <div className="text-center py-3 text-text-secondary text-sm border-t border-border-subtle">
            Market: {formatNumber(selectedCurrency.usdRate, 4)} {currency}
          </div>
        </div>

        {/* Right panel: Select an Order placeholder OR Buy panel inline */}
        <div className="hidden lg:block">
          {selectedRow ? (
            <BuyPanel row={selectedRow} onClose={() => setSelectedRow(null)} />
          ) : (
            <div className="w-[340px] shrink-0 bg-bg-surface rounded-xl border border-border-subtle flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
              <h3 className="text-text-primary text-lg font-bold mb-2">Select an Order</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Click on any price level in the order book to view details and create a buy order
              </p>
              {bestPrice !== null && (
                <p className="text-text-secondary text-sm mt-6">
                  Best available price: <span className="text-text-primary font-semibold">{formatNumber(bestPrice, 4)}</span> {currency}/USDC
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Buy Panel (slide-over) */}
      {selectedRow && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedRow(null)} />
          <div className="relative w-full max-w-[400px] bg-bg-surface border-l border-border-subtle h-full overflow-y-auto p-6">
            <BuyPanel row={selectedRow} onClose={() => setSelectedRow(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

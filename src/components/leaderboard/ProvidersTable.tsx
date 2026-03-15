"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Info, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LEADERBOARD_DATA } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

type SortKey = "filledVolume" | "realizedProfit" | "profitPct" | "grossDeposited";
type SortDir = "asc" | "desc";

const COLUMN_TOOLTIPS: Record<SortKey, string> = {
  filledVolume: "Total volume of orders filled by this maker across all deposits.",
  realizedProfit: "Total profit earned from spread on completed orders.",
  profitPct: "Realized profit as a percentage of filled volume.",
  grossDeposited: "Total USDC deposited across all active and closed deposits.",
};

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
        <span className="inline-flex cursor-help">
          <Info className="w-3 h-3" />
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-bg-surface-raised text-text-primary text-xs border border-border-subtle rounded-lg px-3 py-2 max-w-[220px] shadow-xl"
      >
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

export default function ProvidersTable() {
  const [sortKey, setSortKey] = useState<SortKey>("realizedProfit");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = LEADERBOARD_DATA.filter((row) =>
    row.address.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const mul = sortDir === "desc" ? -1 : 1;
    return (a[sortKey] - b[sortKey]) * mul;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortDir === "desc" ? (
      <ArrowDown className="w-3 h-3 inline ml-0.5" />
    ) : (
      <ArrowUp className="w-3 h-3 inline ml-0.5" />
    );
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Liquidity providers</h3>
          <p className="text-text-secondary text-sm mt-0.5">
            Protocol maker stats by volume and profitability.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search e.g. 0x1234...abcd"
            className="bg-bg-input border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-hover w-full sm:w-[280px] transition-colors"
          />
        </div>
      </div>

      <div className="bg-bg-surface rounded-xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5 w-10">
                  #
                </th>
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5">
                  Maker
                </th>
                <th
                  className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5 cursor-pointer hover:text-text-primary transition-colors select-none"
                  onClick={() => handleSort("filledVolume")}
                >
                  <span className="inline-flex items-center gap-1">
                    Filled volume <InfoTip text={COLUMN_TOOLTIPS.filledVolume} />
                    <SortIcon col="filledVolume" />
                  </span>
                </th>
                <th
                  className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5 cursor-pointer hover:text-text-primary transition-colors select-none"
                  onClick={() => handleSort("realizedProfit")}
                >
                  <span className="inline-flex items-center gap-1">
                    Realized profit <InfoTip text={COLUMN_TOOLTIPS.realizedProfit} />
                    <SortIcon col="realizedProfit" />
                  </span>
                </th>
                <th
                  className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5 cursor-pointer hover:text-text-primary transition-colors select-none"
                  onClick={() => handleSort("profitPct")}
                >
                  <span className="inline-flex items-center gap-1">
                    Profit % <InfoTip text={COLUMN_TOOLTIPS.profitPct} />
                    <SortIcon col="profitPct" />
                  </span>
                </th>
                <th
                  className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-5 py-3.5 cursor-pointer hover:text-text-primary transition-colors select-none"
                  onClick={() => handleSort("grossDeposited")}
                >
                  <span className="inline-flex items-center gap-1">
                    Gross deposited <InfoTip text={COLUMN_TOOLTIPS.grossDeposited} />
                    <SortIcon col="grossDeposited" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr
                  key={row.address}
                  className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors"
                >
                  <td className="px-5 py-4 text-text-secondary text-sm">{i + 1}</td>
                  <td className="px-5 py-4">
                    <div>
                      <span className="font-mono text-sm text-text-primary">{row.address}</span>
                      <p className="text-text-secondary text-xs mt-0.5">
                        {row.activeDeposits} active · {row.totalDeposits} total deposits
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm text-text-primary tabular-nums">
                      {formatUSD(row.filledVolume)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm text-accent-green tabular-nums">
                      {formatUSD(row.realizedProfit)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm text-accent-green tabular-nums">
                      {row.profitPct.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm text-text-primary tabular-nums">
                      {formatUSD(row.grossDeposited)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { LEADERBOARD_STATS } from "@/lib/constants";
import { formatUSD, formatNumber } from "@/lib/utils";

export default function StatCards() {
  const stats = [
    {
      label: "UNIQUE MAKERS",
      value: formatNumber(LEADERBOARD_STATS.uniqueMakers, 0),
      color: "text-text-primary",
    },
    {
      label: "TOTAL GROSS DEPOSITED",
      value: formatUSD(LEADERBOARD_STATS.totalGrossDeposited),
      color: "text-text-primary",
    },
    {
      label: "TOTAL REALIZED PROFIT",
      value: formatUSD(LEADERBOARD_STATS.totalRealizedProfit),
      color: "text-accent-green",
    },
    {
      label: "TOTAL FILLED VOLUME",
      value: formatUSD(LEADERBOARD_STATS.totalFilledVolume),
      color: "text-text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-bg-surface rounded-xl p-5 border border-border-subtle"
        >
          <p className="text-text-secondary text-xs uppercase tracking-wider font-medium">
            {stat.label}
          </p>
          <p className={`text-2xl font-bold mt-2 tabular-nums ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

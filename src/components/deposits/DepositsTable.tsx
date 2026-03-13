"use client";

import { DEPOSITS_DATA } from "@/lib/constants";
import PlatformBadge from "@/components/shared/PlatformBadge";
import { formatNumber } from "@/lib/utils";

export default function DepositsTable() {
  return (
    <div className="bg-bg-surface rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Status</th>
              <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Amount</th>
              <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Remaining</th>
              <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Platforms</th>
              <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Spread</th>
              <th className="text-right text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {DEPOSITS_DATA.map((deposit) => (
              <tr
                key={deposit.id}
                className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors"
              >
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                      deposit.status === "active"
                        ? "text-accent-green"
                        : deposit.status === "paused"
                        ? "text-accent-amber"
                        : "text-text-secondary"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{
                      backgroundColor: deposit.status === "active" ? "var(--accent-green)" : deposit.status === "paused" ? "var(--accent-amber)" : "var(--text-secondary)"
                    }} />
                    {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-primary text-sm font-medium">
                  {formatNumber(deposit.amount)} USDC
                </td>
                <td className="px-6 py-4 text-text-primary text-sm">
                  {formatNumber(deposit.remaining)} USDC
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {deposit.platforms.map((p) => (
                      <PlatformBadge key={p} platformId={p} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-accent-green text-sm font-medium">
                  +{deposit.spread}%
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-sm text-accent-purple hover:text-accent-purple-hover transition-colors font-medium">
                      {deposit.status === "paused" ? "Resume" : "Edit"}
                    </button>
                    <span className="text-text-tertiary">·</span>
                    <button className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
                      Withdraw
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

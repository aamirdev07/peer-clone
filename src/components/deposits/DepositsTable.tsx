"use client";

import { DepositRow } from "@/lib/constants";
import PlatformBadge from "@/components/shared/PlatformBadge";
import { formatNumber } from "@/lib/utils";

interface DepositsTableProps {
  deposits: DepositRow[];
}

export default function DepositsTable({ deposits }: DepositsTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-bg-surface rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Status</th>
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Amount</th>
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Remaining</th>
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Platforms</th>
                <th className="text-left text-text-secondary text-xs uppercase tracking-wider font-medium px-6 py-4">Spread</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id} className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors">
                  <td className="px-6 py-4">
                    <StatusBadge status={deposit.status} />
                  </td>
                  <td className="px-6 py-4 text-text-primary text-sm font-medium tabular-nums">
                    {formatNumber(deposit.amount)} USDC
                  </td>
                  <td className="px-6 py-4 text-text-primary text-sm tabular-nums">
                    {formatNumber(deposit.remaining)} USDC
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {deposit.platforms.map((p) => (
                        <PlatformBadge key={p} platformId={p} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-accent-green text-sm font-medium tabular-nums">+{deposit.spread}%</span>
                  </td>
                </tr>
              ))}
              {deposits.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-secondary text-sm">No deposits to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {deposits.map((deposit) => (
          <div key={deposit.id} className="bg-bg-surface rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <StatusBadge status={deposit.status} />
              <span className="text-accent-green text-sm font-medium tabular-nums">+{deposit.spread}%</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-text-tertiary text-xs uppercase tracking-wider mb-1">Amount</p>
                <p className="text-text-primary text-sm font-medium tabular-nums">{formatNumber(deposit.amount)} USDC</p>
              </div>
              <div>
                <p className="text-text-tertiary text-xs uppercase tracking-wider mb-1">Remaining</p>
                <p className="text-text-primary text-sm tabular-nums">{formatNumber(deposit.remaining)} USDC</p>
              </div>
            </div>
            <div className="flex items-center pt-2 border-t border-border-subtle">
              <div className="flex items-center gap-1">
                {deposit.platforms.map((p) => (
                  <PlatformBadge key={p} platformId={p} />
                ))}
              </div>
            </div>
          </div>
        ))}
        {deposits.length === 0 && (
          <div className="bg-bg-surface rounded-xl p-8 text-center text-text-secondary text-sm">No deposits to show.</div>
        )}
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = status === "active" ? "var(--accent-green)" : status === "paused" ? "var(--accent-amber)" : "var(--text-secondary)";
  const textClass = status === "active" ? "text-accent-green" : status === "paused" ? "text-accent-amber" : "text-text-secondary";
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${textClass}`}>
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

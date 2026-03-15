"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { DepositRow, PAYMENT_METHODS } from "@/lib/constants";
import PlatformBadge from "@/components/shared/PlatformBadge";
import { formatNumber } from "@/lib/utils";

interface DepositsTableProps {
  deposits: DepositRow[];
}

export default function DepositsTable({ deposits: initialDeposits }: DepositsTableProps) {
  const [deposits, setDeposits] = useState(initialDeposits);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSpread, setEditSpread] = useState("");
  const [withdrawConfirmId, setWithdrawConfirmId] = useState<string | null>(null);

  const handleEdit = (deposit: DepositRow) => {
    setEditingId(deposit.id);
    setEditSpread(deposit.spread.toString());
  };

  const handleSaveEdit = (id: string) => {
    setDeposits(deposits.map((d) =>
      d.id === id ? { ...d, spread: parseFloat(editSpread) || d.spread } : d
    ));
    setEditingId(null);
  };

  const handleResume = (id: string) => {
    setDeposits(deposits.map((d) =>
      d.id === id ? { ...d, status: "active" as const } : d
    ));
  };

  const handlePause = (id: string) => {
    setDeposits(deposits.map((d) =>
      d.id === id ? { ...d, status: "paused" as const } : d
    ));
  };

  const handleWithdraw = (id: string) => {
    setDeposits(deposits.filter((d) => d.id !== id));
    setWithdrawConfirmId(null);
  };

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
            {deposits.map((deposit) => (
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
                  {editingId === deposit.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editSpread}
                        onChange={(e) => setEditSpread(e.target.value)}
                        className="w-16 bg-bg-input border border-border-subtle rounded px-2 py-1 text-sm text-text-primary tabular-nums outline-none focus:border-accent-purple"
                        autoFocus
                      />
                      <span className="text-text-secondary text-sm">%</span>
                    </div>
                  ) : (
                    <span className="text-accent-green text-sm font-medium tabular-nums">
                      +{deposit.spread}%
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {withdrawConfirmId === deposit.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-accent-red text-xs">Confirm?</span>
                      <button
                        onClick={() => handleWithdraw(deposit.id)}
                        className="text-sm text-accent-red hover:text-red-300 transition-colors font-medium"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setWithdrawConfirmId(null)}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
                      >
                        No
                      </button>
                    </div>
                  ) : editingId === deposit.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSaveEdit(deposit.id)}
                        className="text-sm text-accent-green hover:text-green-300 transition-colors font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      {deposit.status === "paused" ? (
                        <button
                          onClick={() => handleResume(deposit.id)}
                          className="text-sm text-accent-purple hover:text-accent-purple-hover transition-colors font-medium"
                        >
                          Resume
                        </button>
                      ) : deposit.status === "active" ? (
                        <>
                          <button
                            onClick={() => handleEdit(deposit)}
                            className="text-sm text-accent-purple hover:text-accent-purple-hover transition-colors font-medium"
                          >
                            Edit
                          </button>
                          <span className="text-text-tertiary">·</span>
                          <button
                            onClick={() => handlePause(deposit.id)}
                            className="text-sm text-accent-amber hover:text-yellow-300 transition-colors font-medium"
                          >
                            Pause
                          </button>
                        </>
                      ) : null}
                      {deposit.status !== "closed" && (
                        <>
                          <span className="text-text-tertiary">·</span>
                          <button
                            onClick={() => setWithdrawConfirmId(deposit.id)}
                            className="text-sm text-text-secondary hover:text-accent-red transition-colors font-medium"
                          >
                            Withdraw
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {deposits.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-text-secondary text-sm">
                  No deposits to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

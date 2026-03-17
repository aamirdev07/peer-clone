"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import DepositsTable from "@/components/deposits/DepositsTable";
import EmptyState from "@/components/deposits/EmptyState";
import NewDepositForm from "@/components/deposits/NewDepositForm";
import { DEPOSITS_DATA } from "@/lib/constants";

export default function DepositsPage() {
  const [tab, setTab] = useState<"active" | "closed">("active");
  const [showNewDeposit, setShowNewDeposit] = useState(false);

  const activeDeposits = DEPOSITS_DATA.filter((d) => d.status !== "closed");
  const closedDeposits = DEPOSITS_DATA.filter((d) => d.status === "closed");

  if (showNewDeposit) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-[1200px] mx-auto px-6 py-8"
      >
        <button
          onClick={() => setShowNewDeposit(false)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to deposits
        </button>
        <NewDepositForm onClose={() => setShowNewDeposit(false)} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto px-6 py-8"
    >
      <h1 className="text-3xl font-bold tracking-tight text-text-primary uppercase">
        Deposits
      </h1>
      <p className="text-text-secondary text-base mt-2">
        Create and manage USDC liquidity deposits for fiat off-ramp orders.
      </p>

      {/* Tabs + New Deposit button */}
      <div className="flex items-center justify-between mt-6 mb-6">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === "active"
                ? "bg-bg-surface-raised text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            ACTIVE
          </button>
          <button
            onClick={() => setTab("closed")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === "closed"
                ? "bg-bg-surface-raised text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            CLOSED
          </button>
        </div>
        <button
          onClick={() => setShowNewDeposit(true)}
          className="bg-accent-purple hover:bg-accent-purple-hover text-white rounded-lg px-5 py-2 font-semibold text-sm transition-all duration-200 uppercase tracking-wide"
        >
          New Deposit
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "active" ? (
            activeDeposits.length > 0 ? (
              <DepositsTable deposits={activeDeposits} />
            ) : (
              <EmptyState />
            )
          ) : closedDeposits.length > 0 ? (
            <DepositsTable deposits={closedDeposits} />
          ) : (
            <EmptyState message="Your closed deposits will appear here." />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DepositsTable from "@/components/deposits/DepositsTable";
import EmptyState from "@/components/deposits/EmptyState";
import { DEPOSITS_DATA } from "@/lib/constants";

export default function DepositsPage() {
  const [tab, setTab] = useState<"active" | "closed">("active");

  const activeDeposits = DEPOSITS_DATA.filter((d) => d.status !== "closed");
  const closedDeposits = DEPOSITS_DATA.filter((d) => d.status === "closed");

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

      {/* Tabs */}
      <div className="flex items-center gap-1 mt-6 mb-6">
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

      {/* Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EmptyState from "@/components/deposits/EmptyState";
import DepositsTable from "@/components/deposits/DepositsTable";

export default function DepositsPage() {
  const [tab, setTab] = useState<"active" | "closed">("active");
  const [showMockData, setShowMockData] = useState(false);

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
      <div className="flex items-center gap-4 mt-6 mb-6">
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

        {/* Toggle mock data */}
        {tab === "active" && (
          <button
            onClick={() => setShowMockData(!showMockData)}
            className="ml-auto text-xs text-text-tertiary border border-border-subtle rounded-lg px-3 py-1.5 hover:border-border-hover hover:text-text-secondary transition-all duration-200"
          >
            {showMockData ? "Show empty state" : "Preview logged-in view"}
          </button>
        )}
      </div>

      {/* Content */}
      <motion.div
        key={`${tab}-${showMockData}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {tab === "active" ? (
          showMockData ? (
            <DepositsTable />
          ) : (
            <EmptyState />
          )
        ) : (
          <EmptyState message="Your closed deposits will appear here." />
        )}
      </motion.div>
    </motion.div>
  );
}

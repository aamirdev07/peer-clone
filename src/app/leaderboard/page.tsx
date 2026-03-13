"use client";

import { motion } from "framer-motion";
import StatCards from "@/components/leaderboard/StatCards";
import ProvidersTable from "@/components/leaderboard/ProvidersTable";

export default function LeaderboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto px-6 py-8"
    >
      <h1 className="text-3xl font-bold tracking-tight text-text-primary uppercase mb-6">
        Leaderboard
      </h1>

      <StatCards />
      <ProvidersTable />
    </motion.div>
  );
}

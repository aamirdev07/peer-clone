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
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary uppercase mb-4 sm:mb-6">
        Leaderboard
      </h1>

      <StatCards />
      <ProvidersTable />
    </motion.div>
  );
}

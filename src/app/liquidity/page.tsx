"use client";

import { motion } from "framer-motion";
import LiquidityChart from "@/components/liquidity/LiquidityChart";
import VolumeChart from "@/components/liquidity/VolumeChart";
import OrderBookTable from "@/components/liquidity/OrderBookTable";

export default function LiquidityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8"
    >
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <LiquidityChart />
        <VolumeChart />
      </div>

      {/* Order Book */}
      <OrderBookTable />
    </motion.div>
  );
}

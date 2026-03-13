"use client";

import { useState } from "react";
import { Clock, Settings } from "lucide-react";
import { motion } from "framer-motion";
import BuyTab from "@/components/swap/BuyTab";
import SellTab from "@/components/swap/SellTab";
import SendTab from "@/components/swap/SendTab";

const TABS = ["BUY", "SELL", "SEND"] as const;
type Tab = (typeof TABS)[number];

export default function SwapPage() {
  const [activeTab, setActiveTab] = useState<Tab>("BUY");

  return (
    <div className="flex justify-center px-4 mt-12 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[520px]"
      >
        <div className="bg-bg-surface rounded-2xl p-6">
          {/* Sub-tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-bg-surface-raised text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded-lg hover:bg-bg-surface-raised"
                title="Order history"
              >
                <Clock className="w-5 h-5" />
              </button>
              {activeTab === "SELL" && (
                <button
                  className="text-text-secondary hover:text-text-primary transition-colors p-2 rounded-lg hover:bg-bg-surface-raised"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "BUY" && <BuyTab />}
            {activeTab === "SELL" && <SellTab />}
            {activeTab === "SEND" && <SendTab />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Clock, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BuyTab from "@/components/swap/BuyTab";
import SellTab from "@/components/swap/SellTab";
import SendTab from "@/components/swap/SendTab";

const TABS = ["BUY", "SELL", "SEND"] as const;
type Tab = (typeof TABS)[number];

const MOCK_HISTORY = [
  { id: 1, type: "Buy", amount: "100.00 USDC", via: "Venmo", status: "Completed", date: "Mar 14, 2026" },
  { id: 2, type: "Sell", amount: "250.00 USDC", via: "Revolut", status: "Completed", date: "Mar 12, 2026" },
  { id: 3, type: "Buy", amount: "50.00 USDC", via: "PayPal", status: "Pending", date: "Mar 10, 2026" },
  { id: 4, type: "Send", amount: "0.5 ETH", via: "Base", status: "Completed", date: "Mar 8, 2026" },
  { id: 5, type: "Buy", amount: "500.00 USDC", via: "Wise", status: "Completed", date: "Mar 5, 2026" },
];

export default function SwapPage() {
  const [activeTab, setActiveTab] = useState<Tab>("BUY");
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
                onClick={() => { setShowHistory(!showHistory); setShowSettings(false); }}
                className={`transition-colors p-2 rounded-lg ${
                  showHistory
                    ? "text-accent-purple bg-accent-purple-muted"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-raised"
                }`}
                title="Order history"
              >
                <Clock className="w-5 h-5" />
              </button>
              {activeTab === "SELL" && (
                <button
                  onClick={() => { setShowSettings(!showSettings); setShowHistory(false); }}
                  className={`transition-colors p-2 rounded-lg ${
                    showSettings
                      ? "text-accent-purple bg-accent-purple-muted"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-surface-raised"
                  }`}
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* History panel */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="bg-bg-input rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-text-primary text-sm font-semibold">Order History</span>
                    <button onClick={() => setShowHistory(false)} className="text-text-tertiary hover:text-text-secondary transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {MOCK_HISTORY.map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                        <div>
                          <span className="text-text-primary text-sm font-medium">{order.type} {order.amount}</span>
                          <p className="text-text-tertiary text-xs">via {order.via} · {order.date}</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          order.status === "Completed"
                            ? "bg-accent-green/15 text-accent-green"
                            : "bg-accent-amber/15 text-accent-amber"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab content */}
          <motion.div
            key={`${activeTab}-${showSettings}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "BUY" && <BuyTab />}
            {activeTab === "SELL" && <SellTab advancedMode={showSettings} />}
            {activeTab === "SEND" && <SendTab />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

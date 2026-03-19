"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import BuyTab from "@/components/swap/BuyTab";
import SellTab from "@/components/swap/SellTab";
import SendTab from "@/components/swap/SendTab";

const TABS = ["BUY", "SELL", "SEND"] as const;
type Tab = (typeof TABS)[number];

type HistoryFilter = "ALL" | "ACTIVE" | "COMPLETED" | "CANCELLED";

const MOCK_HISTORY = [
  { id: 1, type: "Buy", amount: "100.00 USDC", via: "Venmo", status: "Completed", date: "Mar 14, 2026" },
  { id: 2, type: "Sell", amount: "250.00 USDC", via: "Revolut", status: "Active", date: "Mar 13, 2026" },
  { id: 3, type: "Buy", amount: "50.00 USDC", via: "PayPal", status: "Completed", date: "Mar 10, 2026" },
  { id: 4, type: "Send", amount: "0.5 ETH", via: "Base", status: "Completed", date: "Mar 8, 2026" },
  { id: 5, type: "Buy", amount: "500.00 USDC", via: "Wise", status: "Cancelled", date: "Mar 5, 2026" },
  { id: 6, type: "Sell", amount: "1,000.00 USDC", via: "Zelle", status: "Completed", date: "Mar 3, 2026" },
  { id: 7, type: "Buy", amount: "200.00 USDC", via: "Cash App", status: "Active", date: "Mar 1, 2026" },
];

export default function SwapPage() {
  return (
    <Suspense>
      <SwapPageInner />
    </Suspense>
  );
}

function SwapPageInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("BUY");
  const [showHistory, setShowHistory] = useState(false);
  const [advancedSell, setAdvancedSell] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("ALL");

  // Handle query params from profile sheet links
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "send") setActiveTab("SEND");
    else if (tab === "sell") setActiveTab("SELL");
    else if (tab === "history") setShowHistory(true);
  }, [searchParams]);

  const isWide = activeTab === "SELL" && advancedSell;

  const filteredHistory = MOCK_HISTORY.filter((order) => {
    if (historyFilter === "ALL") return true;
    return order.status.toUpperCase() === historyFilter;
  });

  const HISTORY_TABS: HistoryFilter[] = ["ALL", "ACTIVE", "COMPLETED", "CANCELLED"];

  return (
    <div className="flex justify-center px-3 sm:px-4 mt-6 sm:mt-12 mb-6 sm:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full transition-all duration-300 ${isWide ? "max-w-[1050px]" : "max-w-[520px]"}`}
      >
        <div className="bg-bg-surface rounded-2xl p-4 sm:p-6">
          {/* Sub-tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); if (tab !== "SELL") setAdvancedSell(false); }}
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHistory(true)}
                className="transition-colors p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface-raised"
                title="Order history"
              >
                <Clock className="w-5 h-5" />
              </button>
              {activeTab === "SELL" && (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="text-text-secondary text-sm font-medium">Advanced</span>
                  <button
                    onClick={() => setAdvancedSell(!advancedSell)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${advancedSell ? "bg-accent-purple" : "bg-bg-surface-raised"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${advancedSell ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </label>
              )}
            </div>
          </div>

          {/* Tab content */}
          <motion.div
            key={`${activeTab}-${advancedSell}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "BUY" && <BuyTab />}
            {activeTab === "SELL" && <SellTab advancedMode={advancedSell} />}
            {activeTab === "SEND" && <SendTab />}
          </motion.div>
        </div>
      </motion.div>

      {/* Order History Sheet */}
      <Sheet open={showHistory} onOpenChange={setShowHistory}>
        <SheetContent
          side="right"
          className="bg-bg-surface border-l border-border-subtle p-6 overflow-y-auto sm:max-w-[420px]"
        >
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-text-secondary" />
              <h3 className="text-text-primary text-lg font-bold">Order History</h3>
            </div>
            <p className="text-text-secondary text-sm">
              See your recent onramp orders and jump back into any active ones.
            </p>

            {/* Filter tabs */}
            <div className="flex items-center gap-1">
              {HISTORY_TABS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setHistoryFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wide transition-all ${
                    historyFilter === filter
                      ? "bg-bg-surface-raised text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Orders list */}
            {filteredHistory.length > 0 ? (
              <div className="space-y-1">
                {filteredHistory.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-bg-surface-hover transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-text-primary text-sm font-medium">
                        {order.type} {order.amount}
                      </span>
                      <p className="text-text-tertiary text-xs mt-0.5">
                        via {order.via} · {order.date}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        order.status === "Completed"
                          ? "bg-accent-green/15 text-accent-green"
                          : order.status === "Active"
                          ? "bg-accent-blue/15 text-accent-blue"
                          : order.status === "Cancelled"
                          ? "bg-accent-red/15 text-accent-red"
                          : "bg-accent-amber/15 text-accent-amber"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="w-10 h-10 text-text-tertiary mb-4" />
                <h4 className="text-text-primary text-base font-semibold">No past orders found</h4>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                  Your onramp orders will appear here. Create one from the Buy tab.
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

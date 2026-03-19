"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  ExternalLink,
  Send,
  Clock,
  CircleDot,
  Upload,
  ChevronDown,
  Share2,
  AlertTriangle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const MOCK_USER = {
  email: "cryptodev@gmail.com",
  address: "0x6f3cdCB555e522f01e7c85f2A691aCE5723608De",
  shortAddress: "0x6f3c...08De",
  balance: 0.0,
  tier: "Kosmyk Peasant",
  tierRange: "$0 - $500 volume",
  tierColor: "#F59E0B",
};

interface UserProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserProfileSheet({
  open,
  onOpenChange,
}: UserProfileSheetProps) {
  const router = useRouter();
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [exportWalletOpen, setExportWalletOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_USER.address);
    toast.success("Address copied to clipboard");
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText("0x" + "a".repeat(64));
    toast.success("Private key copied to clipboard");
  };

  const navigateTo = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="bg-bg-surface border-l border-border-subtle p-6 overflow-y-auto sm:max-w-[420px]"
        >
          <div className="space-y-6">
            {/* User header */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">U</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary text-base font-semibold truncate">
                    {MOCK_USER.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-text-tertiary text-xs font-mono truncate">
                      {MOCK_USER.address}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-text-tertiary hover:text-text-secondary transition-colors shrink-0"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() =>
                    toast.info("Opening Basescan...", {
                      description: "View wallet activity on Base network.",
                    })
                  }
                  className="text-text-secondary text-xs hover:text-accent-purple transition-colors flex items-center gap-1"
                >
                  Basescan <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  onClick={() =>
                    toast.info("Opening Kosmyklytics...", {
                      description: "View detailed analytics for this wallet.",
                    })
                  }
                  className="text-text-secondary text-xs hover:text-accent-purple transition-colors flex items-center gap-1"
                >
                  Kosmyklytics <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Wallet Balance */}
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-text-primary text-sm font-bold uppercase tracking-wider">
                  Wallet Balance
                </h4>
                <div className="w-5 h-5 rounded-full bg-accent-blue flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">B</span>
                </div>
              </div>
              <p className="text-text-secondary text-xs mt-0.5">
                Top up via bridge or direct transfer
              </p>
              <div className="flex items-center gap-3 mt-3">
                <img src="https://coin-images.coingecko.com/coins/images/6319/large/usdc.png" alt="USDC" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-text-primary text-2xl font-bold tabular-nums">
                  {MOCK_USER.balance.toFixed(2)}
                </span>
                <span className="text-text-primary text-sm font-medium">
                  USDC
                </span>
              </div>
            </div>

            {/* Add Funds */}
            <button
              onClick={() => setAddFundsOpen(!addFundsOpen)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-border-subtle hover:bg-bg-surface-hover transition-colors"
            >
              <div className="flex items-center gap-3">
                <CircleDot className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary text-sm font-medium">
                  Add Funds
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-text-secondary transition-transform ${addFundsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {addFundsOpen && (
              <div className="bg-bg-input rounded-xl p-4 -mt-4 space-y-3">
                <p className="text-text-secondary text-xs">
                  Send USDC to your wallet address on Base network:
                </p>
                <div className="flex items-center gap-2 bg-bg-surface rounded-lg p-3 border border-border-subtle">
                  <span className="text-text-primary text-xs font-mono truncate flex-1">
                    {MOCK_USER.address}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-text-tertiary hover:text-text-primary transition-colors shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Protocol Tier */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-text-primary text-sm font-bold uppercase tracking-wider">
                    Protocol Tier
                  </h4>
                  <p className="text-text-secondary text-xs mt-0.5">
                    Your reputation level
                  </p>
                </div>
                <button className="text-text-tertiary hover:text-text-secondary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3 bg-bg-input rounded-xl p-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: MOCK_USER.tierColor + "20",
                    border: `2px solid ${MOCK_USER.tierColor}`,
                  }}
                >
                  <span
                    className="font-bold text-sm"
                    style={{ color: MOCK_USER.tierColor }}
                  >
                    P
                  </span>
                </div>
                <div>
                  <span className="text-text-primary text-sm font-semibold">
                    {MOCK_USER.tier}
                  </span>
                  <p className="text-accent-amber text-xs">
                    {MOCK_USER.tierRange}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              <button
                onClick={() => navigateTo("/swap?tab=send")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-bg-surface-hover transition-colors"
              >
                <Send className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary text-sm font-medium">
                  Send
                </span>
              </button>
              <button
                onClick={() => navigateTo("/swap?tab=history")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-bg-surface-hover transition-colors"
              >
                <Clock className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary text-sm font-medium">
                  Order History
                </span>
              </button>
              <button
                onClick={() => navigateTo("/deposits")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-bg-surface-hover transition-colors"
              >
                <CircleDot className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary text-sm font-medium">
                  My Deposits
                </span>
              </button>
              <button
                onClick={() => setExportWalletOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-bg-surface-hover transition-colors"
              >
                <Upload className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary text-sm font-medium">
                  Export Wallet
                </span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Export Wallet Dialog */}
      {exportWalletOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setExportWalletOpen(false)}
          />
          <div className="relative bg-bg-surface rounded-2xl p-6 max-w-[440px] w-full mx-4 shadow-2xl border border-border-subtle">
            <button
              onClick={() => setExportWalletOpen(false)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <h3 className="text-text-primary text-lg font-bold">
                Export wallet
              </h3>
              <p className="text-text-secondary text-sm mt-2">
                Copy either your private key or seed phrase to export your
                wallet. Learn more
              </p>
            </div>

            {/* Warning */}
            <div className="bg-accent-amber/10 border border-accent-amber/20 rounded-xl p-4 flex items-start gap-3 mb-5">
              <AlertTriangle className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
              <p className="text-text-primary text-sm">
                Never share your private key or seed phrase with anyone.
              </p>
            </div>

            {/* Your wallet */}
            <div className="mb-4">
              <label className="text-text-secondary text-xs block mb-2">
                Your wallet
              </label>
              <div className="flex items-center justify-between bg-bg-input rounded-xl px-4 py-3 border border-border-subtle">
                <span className="text-text-primary text-sm font-mono">
                  {MOCK_USER.shortAddress}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-accent-purple text-xs font-semibold border border-accent-purple/30 rounded-lg px-3 py-1.5 hover:bg-accent-purple/10 transition-colors"
                >
                  Copy <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Copy key button */}
            <button
              onClick={handleCopyKey}
              className="w-full flex items-center justify-center gap-2 bg-accent-red hover:bg-red-600 text-white rounded-xl py-3.5 font-semibold transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy key
            </button>

            {/* Protected by privy */}
            <p className="text-text-tertiary text-xs text-center mt-4 flex items-center justify-center gap-1.5">
              Protected by
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-text-tertiary" />
                <span className="font-semibold text-text-secondary">privy</span>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

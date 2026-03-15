"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import TokenSelector from "./TokenSelector";
import { TOKENS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

// Mock wallet balances
const MOCK_BALANCES: Record<string, number> = {
  USDC: 1250.0,
  ETH: 0.45,
  SOL: 12.8,
  USDT: 500.0,
  WBTC: 0.0021,
};

export default function SendTab() {
  const [amount, setAmount] = useState("");
  const [sendToken, setSendToken] = useState("USDC");
  const [receiveToken, setReceiveToken] = useState("USDC");
  const [recipient, setRecipient] = useState("");

  const sendTokenData = TOKENS.find((t) => t.symbol === sendToken) || TOKENS[0];
  const receiveTokenData = TOKENS.find((t) => t.symbol === receiveToken) || TOKENS[0];

  const maxBalance = MOCK_BALANCES[sendToken] || 0;

  // Convert between tokens via USD price
  const receiveAmount = useMemo(() => {
    if (!amount || parseFloat(amount) === 0) return "";
    const usdValue = parseFloat(amount) * sendTokenData.usdPrice;
    const received = usdValue / receiveTokenData.usdPrice;
    if (receiveTokenData.usdPrice >= 1000) return formatNumber(received, 6);
    if (receiveTokenData.usdPrice >= 10) return formatNumber(received, 4);
    return formatNumber(received, 2);
  }, [amount, sendTokenData, receiveTokenData]);

  const handleMax = () => {
    const decimals = sendTokenData.usdPrice >= 1000 ? 6 : sendTokenData.usdPrice >= 10 ? 4 : 2;
    setAmount(maxBalance.toFixed(decimals));
  };

  return (
    <div className="space-y-3">
      {/* You send */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You send</label>
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d{0,6}$/.test(v)) setAmount(v);
            }}
            placeholder="0"
            className="text-3xl font-semibold text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary tabular-nums"
          />
          <TokenSelector value={sendToken} onChange={setSendToken} />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-text-tertiary text-xs tabular-nums">
            Balance: {formatNumber(maxBalance, maxBalance < 1 ? 6 : 2)} {sendToken}
          </span>
          <button
            onClick={handleMax}
            className="text-sm text-accent-purple hover:text-accent-purple-hover transition-colors font-medium"
          >
            Max
          </button>
        </div>
      </div>

      {/* To */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">To</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Wallet address, ENS, or .peer name"
          className="text-base text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
        />
      </div>

      {/* You receive */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You receive</label>
        <div className="flex items-center justify-between gap-3">
          <span className={`text-3xl font-semibold tabular-nums ${receiveAmount ? "text-text-primary" : "text-text-tertiary"}`}>
            {receiveAmount || "0"}
          </span>
          <TokenSelector value={receiveToken} onChange={setReceiveToken} />
        </div>
        {amount && receiveAmount && sendToken !== receiveToken && (
          <p className="text-text-tertiary text-xs mt-2">
            1 {sendTokenData.symbol} ≈ {formatNumber(sendTokenData.usdPrice / receiveTokenData.usdPrice, receiveTokenData.usdPrice >= 1000 ? 6 : 4)} {receiveTokenData.symbol}
          </p>
        )}
      </div>

      {/* Login CTA */}
      <button
        onClick={() => toast.info("Connect your wallet to get started!", { description: "Login functionality is mocked in this demo." })}
        className="w-full rounded-xl py-3.5 text-base font-semibold bg-accent-purple hover:bg-accent-purple-hover text-white transition-all duration-200"
      >
        LOG IN
      </button>
    </div>
  );
}

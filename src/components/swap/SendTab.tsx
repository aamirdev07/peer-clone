"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TokenSelector from "./TokenSelector";
import LoginButton from "@/components/shared/LoginButton";
import { CHAINS } from "@/lib/constants";

export default function SendTab() {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("USDC");
  const [recipient, setRecipient] = useState("");
  const [chain, setChain] = useState("Base");
  const [chainOpen, setChainOpen] = useState(false);

  const selectedChain = CHAINS.find((c) => c.name === chain) || CHAINS[0];

  return (
    <div className="space-y-3">
      {/* Token + Amount */}
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
            placeholder="0.00"
            className="text-3xl font-semibold text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
          />
          <TokenSelector value={token} onChange={setToken} />
        </div>
      </div>

      {/* Recipient */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">Recipient</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Wallet address or ENS"
          className="text-base text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary font-mono"
        />
      </div>

      {/* Chain selector */}
      <div className="bg-bg-input rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Network</span>
          <div className="relative">
            <button
              onClick={() => setChainOpen(!chainOpen)}
              className="flex items-center gap-2 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full px-3 py-1.5 transition-all duration-200"
            >
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: selectedChain.color }}
              />
              <span className="text-sm font-semibold text-text-primary">{chain}</span>
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </button>
            {chainOpen && (
              <div className="absolute right-0 top-full mt-2 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 min-w-[160px] shadow-xl shadow-black/40">
                {CHAINS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setChain(c.name);
                      setChainOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                      c.name === chain ? "text-accent-purple" : "text-text-primary"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login CTA */}
      <LoginButton variant="cta" />
    </div>
  );
}

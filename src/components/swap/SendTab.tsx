"use client";

import { useState } from "react";
import TokenSelector from "./TokenSelector";
import LoginButton from "@/components/shared/LoginButton";

export default function SendTab() {
  const [amount, setAmount] = useState("");
  const [sendToken, setSendToken] = useState("USDC");
  const [receiveToken, setReceiveToken] = useState("USDC");
  const [recipient, setRecipient] = useState("");

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
        <div className="flex justify-end mt-1">
          <button className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
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
          <span className="text-3xl font-semibold text-text-tertiary tabular-nums">
            {amount || "0"}
          </span>
          <TokenSelector value={receiveToken} onChange={setReceiveToken} />
        </div>
      </div>

      {/* Login CTA */}
      <LoginButton variant="cta" />
    </div>
  );
}

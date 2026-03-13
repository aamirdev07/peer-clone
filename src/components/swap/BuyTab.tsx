"use client";

import { useState } from "react";
import CurrencySelector from "./CurrencySelector";
import PaymentMethodSelector from "./PaymentMethodSelector";
import TokenSelector from "./TokenSelector";
import LoginButton from "@/components/shared/LoginButton";

export default function BuyTab() {
  const [sendAmount, setSendAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("venmo");
  const [token, setToken] = useState("USDC");

  const receiveAmount = sendAmount ? (parseFloat(sendAmount) * 0.998).toFixed(2) : "";

  return (
    <div className="space-y-3">
      {/* You send */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You send</label>
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={sendAmount}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d{0,2}$/.test(v)) setSendAmount(v);
            }}
            placeholder="0.00"
            className="text-3xl font-semibold text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
          />
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>
      </div>

      {/* Paying using */}
      <div className="bg-bg-input rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Paying using</span>
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
        </div>
      </div>

      {/* You receive */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You receive</label>
        <div className="flex items-center justify-between gap-3">
          <span className="text-3xl font-semibold text-text-primary">
            {receiveAmount || "0.00"}
          </span>
          <TokenSelector value={token} onChange={setToken} />
        </div>
      </div>

      {/* Add custom recipient */}
      <button className="text-sm text-text-secondary border border-border-subtle rounded-lg px-4 py-2 hover:border-border-hover transition-all duration-200 w-full">
        + ADD CUSTOM RECIPIENT
      </button>

      {/* Login CTA */}
      <LoginButton variant="cta" />
    </div>
  );
}

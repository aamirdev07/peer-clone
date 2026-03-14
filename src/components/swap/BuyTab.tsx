"use client";

import { useState, useMemo } from "react";
import CurrencySelector from "./CurrencySelector";
import PaymentMethodSelector from "./PaymentMethodSelector";
import TokenSelector from "./TokenSelector";
import { TOKENS, CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export default function BuyTab() {
  const [sendAmount, setSendAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("venmo");
  const [token, setToken] = useState("USDC");

  const selectedToken = TOKENS.find((t) => t.symbol === token) || TOKENS[0];
  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  // Calculate receive amount: fiat → USD → token, with 0.2% spread
  const receiveAmount = useMemo(() => {
    if (!sendAmount || parseFloat(sendAmount) === 0) return "";
    const fiatInUsd = parseFloat(sendAmount) / selectedCurrency.usdRate;
    const tokenAmount = (fiatInUsd / selectedToken.usdPrice) * 0.998;
    if (selectedToken.usdPrice >= 1000) return formatNumber(tokenAmount, 6);
    if (selectedToken.usdPrice >= 10) return formatNumber(tokenAmount, 4);
    return formatNumber(tokenAmount, 2);
  }, [sendAmount, selectedCurrency, selectedToken]);

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    const methods = PAYMENT_METHODS.filter((p) => p.currencies.includes(code));
    if (!methods.find((p) => p.id === paymentMethod) && methods.length > 0) {
      setPaymentMethod(methods[0].id);
    }
  };

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
            className="text-3xl font-semibold text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary tabular-nums"
          />
          <CurrencySelector value={currency} onChange={handleCurrencyChange} />
        </div>
      </div>

      {/* Paying using */}
      <div className="bg-bg-input rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Paying using</span>
          <PaymentMethodSelector
            value={paymentMethod}
            onChange={setPaymentMethod}
            filterByCurrency={currency}
          />
        </div>
      </div>

      {/* You receive */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You receive</label>
        <div className="flex items-center justify-between gap-3">
          <span className="text-3xl font-semibold text-text-primary tabular-nums">
            {receiveAmount || "0.00"}
          </span>
          <TokenSelector value={token} onChange={setToken} />
        </div>
        {sendAmount && receiveAmount && (
          <p className="text-text-tertiary text-xs mt-2">
            1 {selectedToken.symbol} ≈ {selectedCurrency.symbol}
            {formatNumber(selectedToken.usdPrice * selectedCurrency.usdRate, 2)} {currency}
          </p>
        )}
      </div>

      {/* Add custom recipient */}
      <button className="text-sm text-text-secondary border border-border-subtle rounded-lg px-4 py-2 hover:border-border-hover transition-all duration-200 w-full">
        + ADD CUSTOM RECIPIENT
      </button>

      {/* Login CTA */}
      <button
        onClick={() => alert("Login functionality is mocked. Connect your wallet to get started!")}
        className="w-full rounded-xl py-3.5 text-base font-semibold bg-accent-purple hover:bg-accent-purple-hover text-white transition-all duration-200"
      >
        LOG IN
      </button>
    </div>
  );
}

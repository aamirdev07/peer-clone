"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCIES, PAYMENT_METHODS, TOKENS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export default function SellTab() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("venmo");
  const [username, setUsername] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const usdcToken = TOKENS[0]; // USDC

  // Filter platforms by selected currency
  const availablePlatforms = useMemo(
    () => PAYMENT_METHODS.filter((p) => p.currencies.includes(currency)),
    [currency]
  );

  const selectedPlatform = availablePlatforms.find((p) => p.id === paymentMethod) || availablePlatforms[0] || PAYMENT_METHODS[0];

  // Calculate receive amount: USDC → USD → fiat, with 0.2% spread
  const receiveAmount = useMemo(() => {
    if (!amount || parseFloat(amount) === 0) return "";
    const usdValue = parseFloat(amount) * usdcToken.usdPrice;
    const fiatAmount = usdValue * selectedCurrency.usdRate * 0.998;
    return formatNumber(fiatAmount, 2);
  }, [amount, selectedCurrency, usdcToken]);

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    setCurrencyOpen(false);
    const methods = PAYMENT_METHODS.filter((p) => p.currencies.includes(code));
    if (!methods.find((p) => p.id === paymentMethod) && methods.length > 0) {
      setPaymentMethod(methods[0].id);
    }
  };

  return (
    <div className="space-y-3">
      {/* Amount */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">Amount</label>
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d{0,2}$/.test(v)) setAmount(v);
            }}
            placeholder="0.00"
            className="text-3xl font-semibold text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary tabular-nums"
          />
          <span className="text-text-primary text-lg font-semibold shrink-0">USDC</span>
        </div>
      </div>

      {/* Platform + Currency side by side */}
      <div className="grid grid-cols-2 gap-3">
        {/* Platform dropdown */}
        <div className="relative">
          <label className="text-text-secondary text-xs uppercase tracking-wider font-medium block mb-2">
            Platform
          </label>
          <button
            onClick={() => { setPlatformOpen(!platformOpen); setCurrencyOpen(false); }}
            className="w-full flex items-center gap-2.5 bg-bg-input rounded-xl px-4 py-3 transition-all duration-200 hover:bg-bg-surface-hover"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ backgroundColor: selectedPlatform.color }}
            >
              {selectedPlatform.letter}
            </div>
            <span className="text-sm font-medium text-text-primary truncate">{selectedPlatform.name}</span>
            <ChevronDown className="w-4 h-4 text-text-secondary ml-auto shrink-0" />
          </button>
          {platformOpen && (
            <div className="absolute left-0 top-full mt-1 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 w-full shadow-xl shadow-black/40">
              {availablePlatforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPaymentMethod(p.id); setPlatformOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                    p.id === paymentMethod ? "text-accent-purple" : "text-text-primary"
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.letter}
                  </div>
                  <span className="font-medium">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Currency dropdown */}
        <div className="relative">
          <label className="text-text-secondary text-xs uppercase tracking-wider font-medium block mb-2">
            Currency
          </label>
          <button
            onClick={() => { setCurrencyOpen(!currencyOpen); setPlatformOpen(false); }}
            className="w-full flex items-center gap-2.5 bg-bg-input rounded-xl px-4 py-3 transition-all duration-200 hover:bg-bg-surface-hover"
          >
            <span className="text-lg">{selectedCurrency.flag}</span>
            <span className="text-sm font-medium text-text-primary">{selectedCurrency.code}</span>
            <ChevronDown className="w-4 h-4 text-text-secondary ml-auto" />
          </button>
          {currencyOpen && (
            <div className="absolute right-0 top-full mt-1 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 w-full shadow-xl shadow-black/40">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => handleCurrencyChange(c.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                    c.code === currency ? "text-accent-purple" : "text-text-primary"
                  }`}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="font-medium">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Platform Username */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">
          {selectedPlatform.name} Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={`Enter your ${selectedPlatform.name} username`}
          className="text-base text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
        />
      </div>

      {/* You receive */}
      {amount && receiveAmount && (
        <div className="bg-bg-input rounded-xl p-4">
          <label className="text-text-secondary text-sm block mb-2">You receive</label>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-text-primary tabular-nums">
              {selectedCurrency.symbol}{receiveAmount}
            </span>
            <span className="text-sm text-text-secondary">{currency}</span>
          </div>
          <p className="text-text-tertiary text-xs mt-2">
            1 USDC ≈ {selectedCurrency.symbol}{formatNumber(selectedCurrency.usdRate, 2)} {currency}
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        className={`w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 uppercase tracking-wide ${
          amount && parseFloat(amount) > 0
            ? "bg-accent-purple hover:bg-accent-purple-hover text-white cursor-pointer"
            : "bg-bg-surface-raised text-text-secondary cursor-not-allowed"
        }`}
        onClick={() => {
          if (amount && parseFloat(amount) > 0) {
            alert("Login functionality is mocked. Connect your wallet to get started!");
          }
        }}
      >
        {amount && parseFloat(amount) > 0 ? "LOG IN" : "Enter an amount"}
      </button>
    </div>
  );
}

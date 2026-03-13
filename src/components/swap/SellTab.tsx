"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";

export default function SellTab() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("venmo");
  const [username, setUsername] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const selectedPlatform = PAYMENT_METHODS.find((p) => p.id === paymentMethod) || PAYMENT_METHODS[0];

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
            <span className="text-sm font-medium text-text-primary">{selectedPlatform.name}</span>
            <ChevronDown className="w-4 h-4 text-text-secondary ml-auto" />
          </button>
          {platformOpen && (
            <div className="absolute left-0 top-full mt-1 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 w-full shadow-xl shadow-black/40">
              {PAYMENT_METHODS.map((p) => (
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
                  onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
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

      {/* Venmo Username */}
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

      {/* Enter an Amount CTA */}
      <button className="w-full rounded-xl py-3.5 text-base font-semibold bg-bg-surface-raised text-text-secondary cursor-not-allowed transition-all duration-200 uppercase tracking-wide">
        Enter an amount
      </button>
    </div>
  );
}

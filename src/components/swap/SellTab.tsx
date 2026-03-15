"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, X, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { CURRENCIES, PAYMENT_METHODS, TOKENS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

interface AddedPlatform {
  id: string;
  expanded: boolean;
}

interface SellTabProps {
  advancedMode?: boolean;
}

export default function SellTab({ advancedMode = false }: SellTabProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("venmo");
  const [username, setUsername] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  // Advanced mode state
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [addedPlatforms, setAddedPlatforms] = useState<AddedPlatform[]>([
    { id: "venmo", expanded: false },
  ]);
  const [orderSettingsOpen, setOrderSettingsOpen] = useState(false);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const usdcToken = TOKENS[0];

  const availablePaymentMethods = useMemo(
    () => PAYMENT_METHODS.filter((p) => p.currencies.includes(currency)),
    [currency]
  );

  const selectedPlatform = availablePaymentMethods.find((p) => p.id === paymentMethod) || availablePaymentMethods[0] || PAYMENT_METHODS[0];

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

  // Advanced mode helpers
  const availableToAdd = PAYMENT_METHODS.filter(
    (p) => !addedPlatforms.find((ap) => ap.id === p.id)
  );

  const addPlatform = (id: string) => {
    setAddedPlatforms([...addedPlatforms, { id, expanded: false }]);
    setPlatformDropdownOpen(false);
  };

  const removePlatform = (id: string) => {
    setAddedPlatforms(addedPlatforms.filter((p) => p.id !== id));
  };

  const togglePlatformExpanded = (id: string) => {
    setAddedPlatforms(
      addedPlatforms.map((p) =>
        p.id === id ? { ...p, expanded: !p.expanded } : p
      )
    );
  };

  // ── ADVANCED MODE (settings icon clicked) ──
  if (advancedMode) {
    return (
      <div className="space-y-4">
        {/* Amount */}
        <div className="bg-bg-input rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-text-secondary text-sm">Amount</label>
            <span className="text-accent-green text-[10px] font-semibold uppercase tracking-wider">Advanced mode</span>
          </div>
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

        {/* Platforms section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-text-secondary text-xs uppercase tracking-wider font-medium">
              Platforms
            </span>
            <div className="relative">
              <button
                onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                className="flex items-center gap-1.5 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary transition-all duration-200"
              >
                PLATFORM
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {platformDropdownOpen && availableToAdd.length > 0 && (
                <div className="absolute right-0 top-full mt-1 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 min-w-[180px] shadow-xl shadow-black/40">
                  {availableToAdd.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addPlatform(p.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors text-text-primary"
                    >
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0"
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
          </div>

          {/* Added platform cards */}
          <div className="space-y-2">
            {addedPlatforms.map((ap) => {
              const platform = PAYMENT_METHODS.find((p) => p.id === ap.id);
              if (!platform) return null;
              return (
                <div key={ap.id} className="border border-border-subtle rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.letter}
                    </div>
                    <span className="text-text-primary text-sm font-semibold">{platform.name}</span>
                    <span className="inline-flex items-center gap-1 bg-accent-green/15 text-accent-green text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      <Check className="w-3 h-3" /> Rates
                    </span>
                    <span className="inline-flex items-center gap-1 bg-accent-amber/15 text-accent-amber text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      <AlertCircle className="w-3 h-3" /> Setup Required
                    </span>
                    <div className="ml-auto flex items-center gap-1">
                      <button
                        onClick={() => togglePlatformExpanded(ap.id)}
                        className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover transition-colors"
                      >
                        {ap.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => removePlatform(ap.id)}
                        className="p-1.5 rounded-lg text-text-secondary hover:text-accent-red hover:bg-bg-surface-hover transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {ap.expanded && (
                    <div className="border-t border-border-subtle p-3 space-y-3 bg-bg-input">
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary text-xs uppercase tracking-wider">Rate</span>
                        <span className="text-text-primary text-sm font-medium tabular-nums">1 USDC = $1.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary text-xs uppercase tracking-wider">Min Order</span>
                        <span className="text-text-primary text-sm font-medium tabular-nums">$10.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary text-xs uppercase tracking-wider">Max Order</span>
                        <span className="text-text-primary text-sm font-medium tabular-nums">$500.00</span>
                      </div>
                      <div>
                        <label className="text-text-secondary text-xs uppercase tracking-wider block mb-1.5">
                          {platform.name} Username
                        </label>
                        <input
                          type="text"
                          placeholder={`Enter your ${platform.name} username`}
                          className="w-full bg-bg-surface rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none border border-border-subtle focus:border-border-hover transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Settings */}
        <div className="border border-border-subtle rounded-xl">
          <button
            onClick={() => setOrderSettingsOpen(!orderSettingsOpen)}
            className="w-full flex items-center justify-between p-4 text-text-secondary text-sm font-medium uppercase tracking-wider hover:text-text-primary transition-colors"
          >
            Order Settings
            {orderSettingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {orderSettingsOpen && (
            <div className="border-t border-border-subtle p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Deposit Spread</span>
                <span className="text-text-primary text-sm font-medium">+0.50%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Auto-refill</span>
                <div className="w-9 h-5 rounded-full bg-bg-surface-raised relative cursor-pointer">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-text-tertiary" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Expiry</span>
                <span className="text-text-primary text-sm font-medium">Never</span>
              </div>
            </div>
          )}
        </div>

        {/* Review Deposit CTA */}
        <button
          className={`w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 uppercase tracking-wide ${
            amount && parseFloat(amount) > 0
              ? "bg-accent-purple hover:bg-accent-purple-hover text-white cursor-pointer"
              : "bg-bg-surface-raised text-text-secondary cursor-not-allowed"
          }`}
          onClick={() => {
            if (amount && parseFloat(amount) > 0) {
              toast.info("Connect your wallet to create a deposit!", { description: "Deposit review is mocked in this demo." });
            }
          }}
        >
          {amount && parseFloat(amount) > 0 ? "REVIEW DEPOSIT" : "ENTER AN AMOUNT"}
        </button>
      </div>
    );
  }

  // ── DEFAULT SIMPLE MODE ──
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
              {availablePaymentMethods.map((p) => (
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

      {/* You receive - always visible */}
      <div className="bg-bg-input rounded-xl p-4">
        <label className="text-text-secondary text-sm block mb-2">You receive</label>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-text-primary tabular-nums">
            {receiveAmount ? `${selectedCurrency.symbol}${receiveAmount}` : `${selectedCurrency.symbol}0.00`}
          </span>
          <span className="text-sm text-text-secondary">{currency}</span>
        </div>
        <p className="text-text-tertiary text-xs mt-2">
          1 USDC ≈ {selectedCurrency.symbol}{formatNumber(selectedCurrency.usdRate, 2)} {currency}
        </p>
      </div>

      {/* CTA */}
      <button
        className={`w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 uppercase tracking-wide ${
          amount && parseFloat(amount) > 0
            ? "bg-accent-purple hover:bg-accent-purple-hover text-white cursor-pointer"
            : "bg-bg-surface-raised text-text-secondary cursor-not-allowed"
        }`}
        onClick={() => {
          if (amount && parseFloat(amount) > 0) {
            toast.info("Connect your wallet to get started!", { description: "Login functionality is mocked in this demo." });
          }
        }}
      >
        {amount && parseFloat(amount) > 0 ? "LOG IN" : "ENTER AN AMOUNT"}
      </button>
    </div>
  );
}

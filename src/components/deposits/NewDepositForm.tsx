"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, X, AlertCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

interface NewDepositFormProps {
  onClose: () => void;
}

// Deterministic bar heights for the chart
const BAR_HEIGHTS = [2,4,8,5,3,6,12,18,25,35,50,70,90,100,85,60,40,28,15,10,7,5,3,8,14,22,35,45,30,18,10,5,3,2,4,8,20,38,55,40];

export default function NewDepositForm({ onClose }: NewDepositFormProps) {
  const [advanced, setAdvanced] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("venmo");
  const [username, setUsername] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  // Advanced state
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [addedPlatforms, setAddedPlatforms] = useState([
    { id: "venmo", expanded: true },
  ]);
  const [orderSettingsOpen, setOrderSettingsOpen] = useState(false);
  const [spreadValue, setSpreadValue] = useState(50); // 0-100, maps to -5.0% to +5.0%
  const [floorEnabled, setFloorEnabled] = useState(false);
  const [floorValue, setFloorValue] = useState("");
  const [minOrder, setMinOrder] = useState("0.1");
  const [maxOrder, setMaxOrder] = useState("0");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [retainOnEmpty, setRetainOnEmpty] = useState(true);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const availablePaymentMethods = useMemo(
    () => PAYMENT_METHODS.filter((p) => p.currencies.includes(currency)),
    [currency]
  );
  const selectedPlatform = availablePaymentMethods.find((p) => p.id === paymentMethod) || availablePaymentMethods[0] || PAYMENT_METHODS[0];

  const spreadPct = ((spreadValue - 50) / 10);
  const spreadPctDisplay = `${spreadPct >= 0 ? "+" : ""}${spreadPct.toFixed(1)}%`;
  const rateValue = 1 + spreadPct / 100;
  const rateDisplay = rateValue.toFixed(4);
  const floorRate = rateValue.toFixed(3);

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    setCurrencyOpen(false);
    const methods = PAYMENT_METHODS.filter((p) => p.currencies.includes(code));
    if (!methods.find((p) => p.id === paymentMethod) && methods.length > 0) {
      setPaymentMethod(methods[0].id);
    }
  };

  const availableToAdd = PAYMENT_METHODS.filter(
    (p) => !addedPlatforms.find((ap) => ap.id === p.id)
  );

  const handleSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      toast.success("Deposit created!", { description: `${amount} USDC deposit submitted for review.` });
      onClose();
    }
  };

  // Bar position based on spread
  const barActiveIdx = Math.round((spreadValue / 100) * (BAR_HEIGHTS.length - 1));

  return (
    <div className={advanced ? "max-w-[1100px] mx-auto" : "max-w-[520px] mx-auto"}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary uppercase">Sell USDC</h2>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-text-secondary text-sm font-medium">Advanced</span>
          <button
            onClick={() => setAdvanced(!advanced)}
            className={`w-10 h-5 rounded-full relative transition-colors ${advanced ? "bg-accent-purple" : "bg-bg-surface-raised"}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${advanced ? "right-0.5" : "left-0.5"}`} />
          </button>
        </label>
      </div>

      <div className={`${advanced ? "grid grid-cols-1 lg:grid-cols-2 gap-0 bg-bg-surface rounded-2xl overflow-hidden" : ""}`}>
        {/* Left / Main card */}
        <div className={advanced ? "p-6 space-y-4" : "bg-bg-surface rounded-2xl p-6 space-y-4"}>
          {/* Amount */}
          <div className="bg-bg-input rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-text-secondary text-sm">Amount</label>
              <span className="text-text-tertiary text-xs">Balance: 0.00</span>
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

          {advanced ? (
            <>
              {/* Platform section - advanced */}
              <div>
                <div className="flex items-center justify-end mb-3">
                  <div className="relative">
                    <button
                      onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                      className="flex items-center gap-1.5 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary transition-all"
                    >
                      PLATFORM <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {platformDropdownOpen && availableToAdd.length > 0 && (
                      <div className="absolute right-0 top-full mt-1 bg-bg-surface-raised border border-border-subtle rounded-xl py-1 z-50 min-w-[180px] shadow-xl shadow-black/40">
                        {availableToAdd.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setAddedPlatforms([...addedPlatforms, { id: p.id, expanded: false }]);
                              setPlatformDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors text-text-primary"
                          >
                            <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: p.color }}>
                              {p.letter}
                            </div>
                            <span className="font-medium">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {addedPlatforms.map((ap) => {
                  const platform = PAYMENT_METHODS.find((p) => p.id === ap.id);
                  if (!platform) return null;
                  return (
                    <div key={ap.id} className="border border-border-subtle rounded-xl overflow-hidden mb-2">
                      <div className="flex items-center gap-3 p-3">
                        <div className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: platform.color }}>
                          {platform.letter}
                        </div>
                        <span className="text-text-primary text-sm font-semibold">{platform.name}</span>
                        <span className="inline-flex items-center gap-1 bg-accent-amber/15 text-accent-amber text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          <AlertCircle className="w-3 h-3" /> Setup Required
                        </span>
                        <div className="ml-auto flex items-center gap-1">
                          <button
                            onClick={() => setAddedPlatforms(addedPlatforms.map((p) => p.id === ap.id ? { ...p, expanded: !p.expanded } : p))}
                            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover transition-colors"
                          >
                            {ap.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => setAddedPlatforms(addedPlatforms.filter((p) => p.id !== ap.id))}
                            className="p-1.5 rounded-lg text-text-secondary hover:text-accent-red hover:bg-bg-surface-hover transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {ap.expanded && (
                        <div className="border-t border-border-subtle p-4 bg-bg-input space-y-4">
                          <div>
                            <span className="text-text-secondary text-xs uppercase tracking-wider font-medium">Account Details</span>
                            <div className="mt-2 bg-bg-surface rounded-lg border border-border-subtle p-4">
                              <label className="text-text-secondary text-xs block mb-1.5">{platform.name} Username</label>
                              <input
                                type="text"
                                placeholder={`Enter your ${platform.name} username`}
                                className="w-full text-base text-text-primary bg-transparent outline-none placeholder:text-text-tertiary"
                              />
                            </div>
                          </div>
                          <div>
                            <span className="text-text-secondary text-xs uppercase tracking-wider font-medium">Configured Rates</span>
                            <div className="mt-2 flex items-center justify-between bg-bg-surface rounded-lg px-3 py-2.5 border border-border-subtle">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{selectedCurrency.flag}</span>
                                <span className="text-text-primary text-sm font-medium">{currency}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-text-primary text-xs">Spread vs market {spreadPctDisplay}</span>
                                <p className="text-text-tertiary text-xs">Floor: {floorEnabled ? `${floorValue || floorRate} ${currency} / USDC` : "Not set"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Order Settings - advanced */}
              <div className="border border-border-subtle rounded-xl">
                <button
                  onClick={() => setOrderSettingsOpen(!orderSettingsOpen)}
                  className="w-full flex items-center justify-between p-4 text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
                >
                  Order Settings
                  {orderSettingsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {orderSettingsOpen && (
                  <div className="border-t border-border-subtle p-4 space-y-4">
                    <p className="text-text-tertiary text-xs leading-relaxed">
                      Set min and max order sizes. Tighter limits improve consistency; wider limits increase the chance your orders get filled.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-bg-input rounded-lg p-3">
                        <label className="text-text-secondary text-xs block mb-1">Min Per Order</label>
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={minOrder}
                            onChange={(e) => setMinOrder(e.target.value)}
                            className="text-xl font-semibold text-text-primary bg-transparent outline-none w-full tabular-nums"
                          />
                          <span className="text-text-secondary text-xs shrink-0">USDC</span>
                        </div>
                      </div>
                      <div className="bg-bg-input rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-text-secondary text-xs">Max Per Order</label>
                          <button className="text-accent-purple text-[10px] font-bold">Max</button>
                        </div>
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={maxOrder}
                            onChange={(e) => setMaxOrder(e.target.value)}
                            className="text-xl font-semibold text-text-primary bg-transparent outline-none w-full tabular-nums"
                          />
                          <span className="text-text-secondary text-xs shrink-0">USDC</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-bg-input rounded-lg p-3">
                      <label className="text-text-secondary text-xs block mb-1.5">Telegram Username (Optional)</label>
                      <input
                        type="text"
                        value={telegramUsername}
                        onChange={(e) => setTelegramUsername(e.target.value)}
                        placeholder="@username"
                        className="text-base text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-text-secondary text-sm">Retain on Empty</span>
                        <HelpCircle className="w-3.5 h-3.5 text-text-tertiary" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setRetainOnEmpty(!retainOnEmpty)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${retainOnEmpty ? "bg-accent-purple" : "bg-bg-surface-raised"}`}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${retainOnEmpty ? "right-0.5" : "left-0.5"}`} />
                        </button>
                        <span className={`text-xs font-semibold uppercase ${retainOnEmpty ? "text-accent-green" : "text-text-tertiary"}`}>
                          {retainOnEmpty ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Simple mode: Platform + Currency */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="text-text-secondary text-xs uppercase tracking-wider font-medium block mb-2">Platform</label>
                  <button
                    onClick={() => { setPlatformOpen(!platformOpen); setCurrencyOpen(false); }}
                    className="w-full flex items-center gap-2.5 bg-bg-input rounded-xl px-4 py-3 transition-all hover:bg-bg-surface-hover"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: selectedPlatform.color }}>
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
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${p.id === paymentMethod ? "text-accent-purple" : "text-text-primary"}`}
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: p.color }}>
                            {p.letter}
                          </div>
                          <span className="font-medium">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="text-text-secondary text-xs uppercase tracking-wider font-medium block mb-2">Currency</label>
                  <button
                    onClick={() => { setCurrencyOpen(!currencyOpen); setPlatformOpen(false); }}
                    className="w-full flex items-center gap-2.5 bg-bg-input rounded-xl px-4 py-3 transition-all hover:bg-bg-surface-hover"
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
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${c.code === currency ? "text-accent-purple" : "text-text-primary"}`}
                        >
                          <span className="text-lg">{c.flag}</span>
                          <span className="font-medium">{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Simple mode: Username */}
              <div className="bg-bg-input rounded-xl p-4">
                <label className="text-text-secondary text-sm block mb-2">{selectedPlatform.name} Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={`Enter your ${selectedPlatform.name} username`}
                  className="text-base text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
                />
              </div>
            </>
          )}

          {/* CTA - only in simple mode (advanced has it at bottom-right) */}
          {!advanced && (
            <button
              onClick={handleSubmit}
              className={`w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 uppercase tracking-wide ${
                amount && parseFloat(amount) > 0
                  ? "bg-accent-purple hover:bg-accent-purple-hover text-white cursor-pointer"
                  : "bg-bg-surface-raised text-text-secondary cursor-not-allowed"
              }`}
            >
              {amount && parseFloat(amount) > 0 ? "REVIEW DEPOSIT" : "ENTER AN AMOUNT"}
            </button>
          )}
        </div>

        {/* Right column - Rate config (advanced only) */}
        {advanced && (
          <div className="border-l border-border-subtle p-6 space-y-5">
            <p className="text-text-secondary text-sm leading-relaxed">
              Set the price buyers pay for your USDC. Your rate can track the market, and you can add a market spread to earn a premium on each trade.
            </p>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-bg-surface-raised rounded-full px-3 py-1.5">
                <span className="text-lg">{selectedCurrency.flag}</span>
                <span className="text-text-primary text-sm font-medium">{currency}</span>
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-text-secondary text-xs uppercase tracking-wider">Selected Rate</span>
                <p className="text-text-primary font-bold mt-0.5">{rateDisplay} {currency}/USDC</p>
              </div>
              <div>
                <span className="text-text-secondary text-xs uppercase tracking-wider">Market Rate</span>
                <p className="text-text-primary font-bold mt-0.5">1.0000 {currency}/USDC</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-bg-input rounded-xl p-4 h-[200px] relative">
              <div className="absolute bottom-4 left-4 right-4 flex items-end gap-[2px] h-[160px]">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === barActiveIdx ? "var(--accent-amber)" : "var(--border-subtle)",
                    }}
                  />
                ))}
              </div>
              {/* "You" marker */}
              <div
                className="absolute bottom-4 h-[160px] w-px bg-accent-amber transition-all"
                style={{ left: `calc(${(barActiveIdx / BAR_HEIGHTS.length) * 100}% + 1rem)` }}
              />
              <span
                className="absolute top-1 text-accent-amber text-[10px] font-bold transition-all"
                style={{ left: `calc(${(barActiveIdx / BAR_HEIGHTS.length) * 100}% + 0.5rem)` }}
              >
                You
              </span>
            </div>

            {/* Rate controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-primary text-sm font-medium">1 USDC = {rateDisplay} {currency}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSpreadValue(Math.max(0, spreadValue - 1))}
                    className="w-7 h-7 rounded-lg bg-bg-surface-raised text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors text-lg"
                  >
                    -
                  </button>
                  <span className="text-text-primary text-xs font-semibold px-2.5 bg-bg-surface-raised rounded-lg py-1.5 tabular-nums">
                    {spreadValue === 50 ? "MARKET RATE" : spreadPctDisplay}
                  </span>
                  <button
                    onClick={() => setSpreadValue(Math.min(100, spreadValue + 1))}
                    className="w-7 h-7 rounded-lg bg-bg-surface-raised text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={spreadValue}
                onChange={(e) => setSpreadValue(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--accent-red) 0%, var(--accent-amber) 50%, var(--accent-green) 100%)`,
                }}
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-text-tertiary text-xs">-5.0%</span>
                <span className="text-text-tertiary text-xs">+5.0%</span>
              </div>
            </div>

            {/* Floor */}
            <div>
              <span className="text-text-primary text-sm font-bold uppercase">Floor</span>
              <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                Orders below this rate are not accepted, even if market prices drop. This protects you during volatility.
              </p>
              <div className="flex items-center justify-end gap-2 mt-3">
                {floorEnabled && (
                  <div className="flex items-center gap-1.5 bg-bg-input rounded-lg px-3 py-1.5 border border-border-subtle">
                    <input
                      type="text"
                      value={floorValue || floorRate}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "" || /^\d*\.?\d{0,4}$/.test(v)) setFloorValue(v);
                      }}
                      className="w-16 text-text-primary text-sm font-medium bg-transparent outline-none tabular-nums text-right"
                    />
                    <span className="text-text-secondary text-xs">{currency}</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    setFloorEnabled(!floorEnabled);
                    if (!floorEnabled) setFloorValue(floorRate);
                  }}
                  className={`w-10 h-5 rounded-full relative transition-colors ${floorEnabled ? "bg-accent-purple" : "bg-bg-surface-raised"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${floorEnabled ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
            </div>

            {/* Review Deposit CTA */}
            <button
              onClick={handleSubmit}
              className={`w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 uppercase tracking-wide ${
                amount && parseFloat(amount) > 0
                  ? "bg-accent-purple hover:bg-accent-purple-hover text-white cursor-pointer"
                  : "bg-bg-surface-raised text-text-secondary cursor-not-allowed"
              }`}
            >
              {amount && parseFloat(amount) > 0 ? "REVIEW DEPOSIT" : "ENTER AN AMOUNT"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

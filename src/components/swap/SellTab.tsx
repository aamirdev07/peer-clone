"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp, X, AlertCircle, HelpCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { CURRENCIES, PAYMENT_METHODS, TOKENS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import CountryFlag from "@/components/shared/CountryFlag";
import Image from "next/image";

interface AddedPlatform {
  id: string;
  expanded: boolean;
}

interface RateConfig {
  spread: number; // 0-100, maps to -5% to +5%
  floorEnabled: boolean;
  floorValue: string;
}

interface SellTabProps {
  advancedMode?: boolean;
}

const BAR_HEIGHTS = [2,4,8,5,3,6,12,18,25,35,50,70,90,100,85,60,40,28,15,10,7,5,3,8,14,22,35,45,30,18,10,5,3,2,4,8,20,38,55,40];

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
    { id: "venmo", expanded: true },
  ]);
  const [orderSettingsOpen, setOrderSettingsOpen] = useState(false);
  const [minOrder, setMinOrder] = useState("0.1");
  const [maxOrder, setMaxOrder] = useState("0");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [retainOnEmpty, setRetainOnEmpty] = useState(true);
  const [simpleSpread, setSimpleSpread] = useState(0); // -50 to 50, maps to -5.0% to +5.0%

  // Per-platform currency configs
  const [platformCurrencies, setPlatformCurrencies] = useState<Record<string, string[]>>({
    venmo: ["USD"],
  });
  const [rateConfigs, setRateConfigs] = useState<Record<string, RateConfig>>({
    "venmo-USD": { spread: 50, floorEnabled: false, floorValue: "" },
  });
  const [activePlatformTab, setActivePlatformTab] = useState("venmo");
  const [activeCurrencyTab, setActiveCurrencyTab] = useState("USD");
  const [currencyAddOpen, setCurrencyAddOpen] = useState(false);
  const [platformSearch, setPlatformSearch] = useState("");

  // Click-outside refs for dropdowns
  const platformDropdownRef = useClickOutside<HTMLDivElement>(useCallback(() => setPlatformDropdownOpen(false), []), platformDropdownOpen);
  const currencyAddRef = useClickOutside<HTMLDivElement>(useCallback(() => setCurrencyAddOpen(false), []), currencyAddOpen);
  const simplePlatformRef = useClickOutside<HTMLDivElement>(useCallback(() => setPlatformOpen(false), []), platformOpen);
  const simpleCurrencyRef = useClickOutside<HTMLDivElement>(useCallback(() => setCurrencyOpen(false), []), currencyOpen);

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const usdcToken = TOKENS[0];

  const availablePaymentMethods = useMemo(
    () => PAYMENT_METHODS.filter((p) => p.currencies.includes(currency)),
    [currency]
  );

  const selectedPlatform = availablePaymentMethods.find((p) => p.id === paymentMethod) || availablePaymentMethods[0] || PAYMENT_METHODS[0];

  const simpleSpreadPct = simpleSpread / 10; // percentage
  const simpleRateValue = selectedCurrency.usdRate * (1 + simpleSpreadPct / 100);

  const receiveAmount = useMemo(() => {
    if (!amount || parseFloat(amount) === 0) return "";
    const usdValue = parseFloat(amount) * usdcToken.usdPrice;
    const fiatAmount = usdValue * simpleRateValue;
    return formatNumber(fiatAmount, 2);
  }, [amount, usdcToken, simpleRateValue]);

  // Active rate config for right column
  const activeConfigKey = `${activePlatformTab}-${activeCurrencyTab}`;
  const activeConfig = rateConfigs[activeConfigKey] || { spread: 50, floorEnabled: false, floorValue: "" };
  const spreadValue = activeConfig.spread;
  const spreadPct = ((spreadValue - 50) / 10);
  const spreadPctDisplay = `${spreadPct >= 0 ? "+" : ""}${spreadPct.toFixed(1)}%`;
  const activeCurrencyData = CURRENCIES.find((c) => c.code === activeCurrencyTab) || CURRENCIES[0];
  const rateValue = activeCurrencyData.usdRate * (1 + spreadPct / 100);
  const rateDisplay = formatNumber(rateValue, rateValue >= 100 ? 2 : 4);
  const marketRateDisplay = formatNumber(activeCurrencyData.usdRate, activeCurrencyData.usdRate >= 100 ? 2 : 4);
  const floorRate = rateValue.toFixed(3);
  const barActiveIdx = Math.round((spreadValue / 100) * (BAR_HEIGHTS.length - 1));

  const updateRateConfig = (key: string, updates: Partial<RateConfig>) => {
    setRateConfigs((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || { spread: 50, floorEnabled: false, floorValue: "" }), ...updates },
    }));
  };

  // Currencies available to add for the active platform tab
  const activePlatformData = PAYMENT_METHODS.find((p) => p.id === activePlatformTab);
  const activePlatformConfiguredCurrencies = platformCurrencies[activePlatformTab] || [];
  const currenciesAvailableToAdd = activePlatformData
    ? activePlatformData.currencies.filter((c) => !activePlatformConfiguredCurrencies.includes(c))
    : [];

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

  // ── ADVANCED MODE ──
  if (advancedMode) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left column */}
        <div className="space-y-4">
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

          {/* Platform dropdown */}
          <div className="flex items-center justify-end">
            <div className="relative" ref={platformDropdownRef}>
              <button
                onClick={() => { setPlatformDropdownOpen(!platformDropdownOpen); setPlatformSearch(""); }}
                className="flex items-center gap-1.5 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary transition-all"
              >
                PLATFORM <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {platformDropdownOpen && availableToAdd.length > 0 && (
                <div className="absolute right-0 top-full mt-1 bg-bg-surface-raised border border-border-subtle rounded-xl z-50 min-w-[260px] shadow-xl shadow-black/40 overflow-hidden">
                  {/* Search */}
                  <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border-subtle">
                    <Search className="w-4 h-4 text-text-tertiary shrink-0" />
                    <input
                      type="text"
                      value={platformSearch}
                      onChange={(e) => setPlatformSearch(e.target.value)}
                      placeholder="Search platform"
                      className="w-full text-sm text-text-primary bg-transparent outline-none placeholder:text-text-tertiary"
                      autoFocus
                    />
                  </div>
                  {/* All Platforms label */}
                  <div className="px-4 py-2 text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
                    All Platforms
                  </div>
                  {/* Platform list */}
                  <div className="max-h-[280px] overflow-y-auto py-1">
                    {availableToAdd
                      .filter((p) => p.name.toLowerCase().includes(platformSearch.toLowerCase()))
                      .map((p) => {
                        const currencyList = p.currencies.join(", ");
                        const maxDisplay = 20;
                        const truncated = currencyList.length > maxDisplay ? currencyList.slice(0, maxDisplay) + "..." : currencyList;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              setAddedPlatforms([...addedPlatforms, { id: p.id, expanded: false }]);
                              const firstCurrency = p.currencies[0] || "USD";
                              setPlatformCurrencies((prev) => ({ ...prev, [p.id]: [firstCurrency] }));
                              const newKey = `${p.id}-${firstCurrency}`;
                              if (!rateConfigs[newKey]) {
                                updateRateConfig(newKey, { spread: 50, floorEnabled: false, floorValue: "" });
                              }
                              setActivePlatformTab(p.id);
                              setActiveCurrencyTab(firstCurrency);
                              setPlatformDropdownOpen(false);
                              setPlatformSearch("");
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors"
                          >
                            {"logo" in p && p.logo ? (
                              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
                                <Image src={p.logo} alt={p.name} width={28} height={28} className="w-full h-full object-cover" unoptimized />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: p.color }}>
                                {p.letter}
                              </div>
                            )}
                            <div className="flex flex-col items-start min-w-0">
                              <span className="font-medium text-text-primary">{p.name}</span>
                              <span className="text-text-tertiary text-xs">{truncated}</span>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Platform cards */}
          {addedPlatforms.map((ap) => {
            const platform = PAYMENT_METHODS.find((p) => p.id === ap.id);
            if (!platform) return null;
            return (
              <div key={ap.id} className="border border-border-subtle rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 p-3">
                  {"logo" in platform && platform.logo ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <Image src={platform.logo} alt={platform.name} width={32} height={32} className="w-full h-full object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: platform.color }}>
                      {platform.letter}
                    </div>
                  )}
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
                      onClick={() => {
                        const remaining = addedPlatforms.filter((p) => p.id !== ap.id);
                        setAddedPlatforms(remaining);
                        if (activePlatformTab === ap.id && remaining.length > 0) {
                          setActivePlatformTab(remaining[0].id);
                          const currs = platformCurrencies[remaining[0].id] || [];
                          if (currs.length > 0) setActiveCurrencyTab(currs[0]);
                        }
                      }}
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
                      {(platformCurrencies[ap.id] || []).map((cc) => {
                        const rc = rateConfigs[`${ap.id}-${cc}`] || { spread: 50, floorEnabled: false, floorValue: "" };
                        const pctVal = ((rc.spread - 50) / 10);
                        const pctStr = `${pctVal >= 0 ? "+" : ""}${pctVal.toFixed(1)}%`;
                        const cData = CURRENCIES.find((c) => c.code === cc) || CURRENCIES[0];
                        const rv = cData.usdRate * (1 + pctVal / 100);
                        return (
                          <button
                            key={cc}
                            onClick={() => { setActivePlatformTab(ap.id); setActiveCurrencyTab(cc); }}
                            className={`mt-2 w-full flex items-center justify-between bg-bg-surface rounded-lg px-3 py-2.5 border transition-colors ${
                              activePlatformTab === ap.id && activeCurrencyTab === cc ? "border-accent-purple" : "border-border-subtle hover:border-border-subtle/80"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <CountryFlag currency={cc} size={20} />
                              <span className="text-text-primary text-sm font-medium">{cc}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-text-primary text-xs">Spread vs market {pctStr}</span>
                              <p className="text-text-tertiary text-xs">Floor: {rc.floorEnabled ? `${rc.floorValue || rv.toFixed(3)} ${cc} / USDC` : "Not set"}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Order Settings */}
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
                      <input type="text" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} className="text-xl font-semibold text-text-primary bg-transparent outline-none w-full tabular-nums" />
                      <span className="text-text-secondary text-xs shrink-0">USDC</span>
                    </div>
                  </div>
                  <div className="bg-bg-input rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-text-secondary text-xs">Max Per Order</label>
                      <button className="text-accent-purple text-[10px] font-bold">Max</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <input type="text" value={maxOrder} onChange={(e) => setMaxOrder(e.target.value)} className="text-xl font-semibold text-text-primary bg-transparent outline-none w-full tabular-nums" />
                      <span className="text-text-secondary text-xs shrink-0">USDC</span>
                    </div>
                  </div>
                </div>
                <div className="bg-bg-input rounded-lg p-3">
                  <label className="text-text-secondary text-xs block mb-1.5">Telegram Username (Optional)</label>
                  <input type="text" value={telegramUsername} onChange={(e) => setTelegramUsername(e.target.value)} placeholder="@username" className="text-base text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary" />
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
        </div>

        {/* Right column - Rate configuration */}
        <div className="lg:border-l border-border-subtle lg:pl-6 space-y-5 mt-4 lg:mt-0">
          <p className="text-text-secondary text-sm leading-relaxed">
            Set the price buyers pay for your USDC. Your rate can track the market, and you can add a market spread to earn a premium on each trade.
          </p>

          {/* Platform tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {addedPlatforms.map((ap) => {
              const plat = PAYMENT_METHODS.find((p) => p.id === ap.id);
              if (!plat) return null;
              const isActive = activePlatformTab === ap.id;
              return (
                <button
                  key={ap.id}
                  onClick={() => {
                    setActivePlatformTab(ap.id);
                    const currs = platformCurrencies[ap.id] || [];
                    if (currs.length > 0 && !currs.includes(activeCurrencyTab)) {
                      setActiveCurrencyTab(currs[0]);
                    }
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    isActive ? "bg-accent-purple/15 text-accent-purple border border-accent-purple/30" : "bg-bg-surface-raised text-text-secondary hover:text-text-primary border border-transparent"
                  }`}
                >
                  {"logo" in plat && plat.logo ? (
                    <div className="w-4 h-4 rounded-full overflow-hidden shrink-0">
                      <Image src={plat.logo} alt={plat.name} width={16} height={16} className="w-full h-full object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[7px] font-bold shrink-0" style={{ backgroundColor: plat.color }}>
                      {plat.letter}
                    </div>
                  )}
                  {plat.name}
                </button>
              );
            })}
          </div>

          {/* Currency tabs + Add */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {activePlatformConfiguredCurrencies.map((cc) => {
              const cData = CURRENCIES.find((c) => c.code === cc);
              const isActive = activeCurrencyTab === cc;
              const canRemove = activePlatformConfiguredCurrencies.length > 1;
              return (
                <div
                  key={cc}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                    isActive ? "bg-bg-surface-raised text-text-primary ring-1 ring-accent-purple/50" : "bg-bg-surface-raised/50 text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setActiveCurrencyTab(cc)}
                >
                  {cData && <CountryFlag currency={cData.code} size={16} />}
                  {cc}
                  {canRemove && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = activePlatformConfiguredCurrencies.filter((c) => c !== cc);
                        setPlatformCurrencies((prev) => ({ ...prev, [activePlatformTab]: updated }));
                        if (activeCurrencyTab === cc && updated.length > 0) {
                          setActiveCurrencyTab(updated[0]);
                        }
                      }}
                      className="ml-0.5 p-0.5 rounded-full hover:bg-bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
            {currenciesAvailableToAdd.length > 0 && (
              <div className="relative" ref={currencyAddRef}>
                <button
                  onClick={() => setCurrencyAddOpen(!currencyAddOpen)}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium bg-bg-surface-raised/50 text-text-tertiary hover:text-text-secondary transition-all"
                >
                  Add
                </button>
                {currencyAddOpen && (
                  <div className="absolute left-0 top-full mt-1 bg-bg-surface-raised border border-border-subtle rounded-xl py-1 z-50 min-w-[140px] shadow-xl shadow-black/40">
                    {currenciesAvailableToAdd.map((cc) => {
                      const cData = CURRENCIES.find((c) => c.code === cc);
                      return (
                        <button
                          key={cc}
                          onClick={() => {
                            setPlatformCurrencies((prev) => ({
                              ...prev,
                              [activePlatformTab]: [...(prev[activePlatformTab] || []), cc],
                            }));
                            const newKey = `${activePlatformTab}-${cc}`;
                            if (!rateConfigs[newKey]) {
                              updateRateConfig(newKey, { spread: 50, floorEnabled: false, floorValue: "" });
                            }
                            setActiveCurrencyTab(cc);
                            setCurrencyAddOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors text-text-primary"
                        >
                          {cData && <CountryFlag currency={cData.code} size={18} />}
                          <span className="font-medium">{cc}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-text-secondary text-xs uppercase tracking-wider">Selected Rate</span>
              <p className="text-text-primary font-bold mt-0.5">{rateDisplay} {activeCurrencyTab}/USDC</p>
            </div>
            <div>
              <span className="text-text-secondary text-xs uppercase tracking-wider">Market Rate</span>
              <p className="text-text-primary font-bold mt-0.5">{marketRateDisplay} {activeCurrencyTab}/USDC</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-bg-input rounded-xl p-4 h-[200px] relative">
            <div className="absolute bottom-4 left-4 right-4 flex items-end gap-[2px] h-[160px]">
              {BAR_HEIGHTS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i === barActiveIdx ? "var(--accent-amber)" : "var(--border-subtle)" }} />
              ))}
            </div>
            <div className="absolute bottom-4 h-[160px] w-px bg-accent-amber transition-all" style={{ left: `calc(${(barActiveIdx / BAR_HEIGHTS.length) * 100}% + 1rem)` }} />
            <span className="absolute top-1 text-accent-amber text-[10px] font-bold transition-all" style={{ left: `calc(${(barActiveIdx / BAR_HEIGHTS.length) * 100}% + 0.5rem)` }}>You</span>
          </div>

          {/* Rate controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-primary text-sm font-medium">1 USDC = {rateDisplay} {activeCurrencyTab}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => updateRateConfig(activeConfigKey, { spread: Math.max(0, spreadValue - 1) })} className="w-7 h-7 rounded-lg bg-bg-surface-raised text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors text-lg">-</button>
                <span className="text-text-primary text-xs font-semibold px-2.5 bg-bg-surface-raised rounded-lg py-1.5 tabular-nums">
                  {spreadValue === 50 ? "MARKET RATE" : spreadPctDisplay}
                </span>
                <button onClick={() => updateRateConfig(activeConfigKey, { spread: Math.min(100, spreadValue + 1) })} className="w-7 h-7 rounded-lg bg-bg-surface-raised text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors text-lg">+</button>
              </div>
            </div>
            <input
              type="range" min="0" max="100" value={spreadValue}
              onChange={(e) => updateRateConfig(activeConfigKey, { spread: Number(e.target.value) })}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, var(--accent-red) 0%, var(--accent-amber) 50%, var(--accent-green) 100%)` }}
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
              {activeConfig.floorEnabled && (
                <div className="flex items-center gap-1.5 bg-bg-input rounded-lg px-3 py-1.5 border border-border-subtle">
                  <input
                    type="text" value={activeConfig.floorValue || floorRate}
                    onChange={(e) => { if (e.target.value === "" || /^\d*\.?\d{0,4}$/.test(e.target.value)) updateRateConfig(activeConfigKey, { floorValue: e.target.value }); }}
                    className="w-16 text-text-primary text-sm font-medium bg-transparent outline-none tabular-nums text-right"
                  />
                  <span className="text-text-secondary text-xs">{activeCurrencyTab}</span>
                </div>
              )}
              <button
                onClick={() => {
                  const newEnabled = !activeConfig.floorEnabled;
                  updateRateConfig(activeConfigKey, { floorEnabled: newEnabled, floorValue: newEnabled ? floorRate : "" });
                }}
                className={`w-10 h-5 rounded-full relative transition-colors ${activeConfig.floorEnabled ? "bg-accent-purple" : "bg-bg-surface-raised"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${activeConfig.floorEnabled ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          </div>

          {/* Review Deposit CTA */}
          <button
            onClick={() => {
              if (amount && parseFloat(amount) > 0) {
                toast.success("Deposit submitted for review!", { description: `${amount} USDC deposit created.` });
              }
            }}
            className={`w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 uppercase tracking-wide ${
              amount && parseFloat(amount) > 0
                ? "bg-accent-purple hover:bg-accent-purple-hover text-white cursor-pointer"
                : "bg-bg-surface-raised text-text-secondary cursor-not-allowed"
            }`}
          >
            {amount && parseFloat(amount) > 0 ? "REVIEW DEPOSIT" : "ENTER AN AMOUNT"}
          </button>
        </div>
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
        <div className="relative" ref={simplePlatformRef}>
          <label className="text-text-secondary text-xs uppercase tracking-wider font-medium block mb-2">Platform</label>
          <button
            onClick={() => { setPlatformOpen(!platformOpen); setCurrencyOpen(false); }}
            className="w-full flex items-center gap-2.5 bg-bg-input rounded-xl px-4 py-3 transition-all hover:bg-bg-surface-hover"
          >
            {"logo" in selectedPlatform && selectedPlatform.logo ? (
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                <Image src={selectedPlatform.logo} alt={selectedPlatform.name} width={24} height={24} className="w-full h-full object-cover" unoptimized />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: selectedPlatform.color }}>
                {selectedPlatform.letter}
              </div>
            )}
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
                  {"logo" in p && p.logo ? (
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                      <Image src={p.logo} alt={p.name} width={24} height={24} className="w-full h-full object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: p.color }}>
                      {p.letter}
                    </div>
                  )}
                  <span className="font-medium">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={simpleCurrencyRef}>
          <label className="text-text-secondary text-xs uppercase tracking-wider font-medium block mb-2">Currency</label>
          <button
            onClick={() => { setCurrencyOpen(!currencyOpen); setPlatformOpen(false); }}
            className="w-full flex items-center gap-2.5 bg-bg-input rounded-xl px-4 py-3 transition-all hover:bg-bg-surface-hover"
          >
            <CountryFlag currency={selectedCurrency.code} size={20} />
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
                  <CountryFlag currency={c.code} size={20} />
                  <span className="font-medium">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Platform Username */}
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

      {/* You'll receive + rate indicator */}
      <div className="space-y-2 px-1">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">You&apos;ll receive</span>
          <span className="text-text-primary text-sm font-semibold tabular-nums">
            ~{selectedCurrency.symbol}{receiveAmount || "0.00"} {currency}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CountryFlag currency={selectedCurrency.code} size={20} />
            <span className="text-text-primary text-sm">1 USDC = {formatNumber(simpleRateValue, simpleRateValue >= 100 ? 2 : 4)} {currency}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-text-tertiary text-[10px] uppercase tracking-wider font-medium">Spread</span>
            <button
              onClick={() => setSimpleSpread(Math.max(-50, simpleSpread - 1))}
              className="w-6 h-6 rounded-md bg-bg-surface-raised text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors text-sm"
            >
              -
            </button>
            <span className="text-text-primary text-[11px] font-semibold px-2 py-1 bg-bg-surface-raised rounded-md tabular-nums min-w-[70px] text-center">
              {simpleSpread === 0 ? "Market rate" : `${simpleSpread > 0 ? "+" : ""}${(simpleSpread / 10).toFixed(1)}%`}
            </span>
            <button
              onClick={() => setSimpleSpread(Math.min(50, simpleSpread + 1))}
              className="w-6 h-6 rounded-md bg-bg-surface-raised text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors text-sm"
            >
              +
            </button>
          </div>
        </div>
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
            toast.success("Sell order submitted!", { description: `Selling ${amount} USDC for ${selectedCurrency.symbol}${receiveAmount} via ${selectedPlatform.name}.` });
          }
        }}
      >
        {amount && parseFloat(amount) > 0 ? "SELL USDC" : "ENTER AN AMOUNT"}
      </button>
    </div>
  );
}

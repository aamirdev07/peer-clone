"use client";

import { useState, useMemo } from "react";
import { Check, Clock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import CurrencySelector from "./CurrencySelector";
import PaymentMethodSelector from "./PaymentMethodSelector";
import TokenSelector from "./TokenSelector";
import { TOKENS, CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

interface Quote {
  amount: string;
  rateLabel: string;
  provider: string;
  providerColor: string;
  providerLetter: string;
  best?: boolean;
}

export default function BuyTab() {
  const [sendAmount, setSendAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("venmo");
  const [token, setToken] = useState("USDC");
  const [showRecipient, setShowRecipient] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [showQuotes, setShowQuotes] = useState(false);
  const [selectedQuoteIdx, setSelectedQuoteIdx] = useState(0);

  const selectedToken = TOKENS.find((t) => t.symbol === token) || TOKENS[0];
  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  const decimals = selectedToken.usdPrice >= 1000 ? 6 : selectedToken.usdPrice >= 10 ? 4 : 2;

  // Calculate receive amount: fiat -> USD -> token, with 0.2% spread
  const receiveAmount = useMemo(() => {
    if (!sendAmount || parseFloat(sendAmount) === 0) return "";
    const fiatInUsd = parseFloat(sendAmount) / selectedCurrency.usdRate;
    const tokenAmount = (fiatInUsd / selectedToken.usdPrice) * 0.998;
    return formatNumber(tokenAmount, decimals);
  }, [sendAmount, selectedCurrency, selectedToken, decimals]);

  // Mock quotes from different providers
  const quotes: Quote[] = useMemo(() => {
    if (!sendAmount || parseFloat(sendAmount) === 0) return [];
    const fiatInUsd = parseFloat(sendAmount) / selectedCurrency.usdRate;
    const baseAmount = fiatInUsd / selectedToken.usdPrice;

    const spreads = [0.998, 0.998, 0.991, 0.99];
    const rateMultipliers = [1, 1, 1.009, 1.01];
    const providerIds = [paymentMethod, "revolut", "wise", "paypal"];
    const usedIds = new Set<string>();

    const providers = providerIds.map((id) => {
      if (usedIds.has(id)) {
        const fallback = PAYMENT_METHODS.find((p) => !usedIds.has(p.id));
        if (fallback) { usedIds.add(fallback.id); return fallback; }
      }
      usedIds.add(id);
      return PAYMENT_METHODS.find((p) => p.id === id) || PAYMENT_METHODS[0];
    });

    const ratePerToken = selectedToken.usdPrice * selectedCurrency.usdRate;

    return spreads.map((spread, i) => {
      const amt = baseAmount * spread;
      const effectiveRate = ratePerToken * rateMultipliers[i];
      return {
        amount: formatNumber(amt, decimals),
        rateLabel: `${selectedCurrency.symbol}${formatNumber(parseFloat(sendAmount), 2)} · ${formatNumber(effectiveRate, effectiveRate >= 100 ? 2 : 3)} ${currency} / ${selectedToken.symbol}`,
        provider: providers[i].name,
        providerColor: providers[i].color,
        providerLetter: providers[i].letter,
        best: i === 0,
      };
    });
  }, [sendAmount, selectedCurrency, selectedToken, paymentMethod, currency, decimals]);

  // Rate display for the tag
  const rateDisplay = useMemo(() => {
    const rateInFiat = selectedToken.usdPrice * selectedCurrency.usdRate;
    if (selectedToken.symbol === "USDC" || selectedToken.symbol === "USDT") {
      return `1 ${selectedToken.symbol} = ${formatNumber(rateInFiat, 2)} ${currency}`;
    }
    return `1 ${selectedToken.symbol} = ${selectedCurrency.symbol}${formatNumber(rateInFiat, 2)} ${currency}`;
  }, [selectedToken, selectedCurrency, currency]);

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
          <div>
            <span className="text-3xl font-semibold text-text-primary tabular-nums">
              {receiveAmount || "0.00"}
            </span>
            {sendAmount && receiveAmount && (
              <p className="text-text-tertiary text-xs mt-1">
                {selectedCurrency.symbol}{formatNumber(parseFloat(sendAmount), 2)}
              </p>
            )}
          </div>
          <TokenSelector value={token} onChange={setToken} />
        </div>
      </div>

      {/* Rate tag + timer */}
      {sendAmount && receiveAmount && (
        <div className="bg-bg-input rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-text-primary text-sm font-medium">{rateDisplay}</span>
            <span className="inline-flex items-center gap-1 bg-accent-green/15 text-accent-green text-xs font-semibold px-2 py-0.5 rounded-full">
              <Check className="w-3 h-3" /> BEST
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-text-tertiary text-xs shrink-0">
            <Clock className="w-3 h-3" /> ~60s
          </span>
        </div>
      )}

      {/* View all quotes link */}
      {sendAmount && receiveAmount && (
        <button
          onClick={() => setShowQuotes(!showQuotes)}
          className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center justify-end gap-1"
        >
          View all quotes <ChevronRight className={`w-4 h-4 transition-transform ${showQuotes ? "rotate-90" : ""}`} />
        </button>
      )}

      {/* Select a Quote panel */}
      {showQuotes && quotes.length > 0 && (
        <div className="bg-bg-surface-raised rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-text-primary text-sm font-semibold">Select a Quote (Top {quotes.length})</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-md bg-bg-surface-hover flex items-center justify-center text-text-primary text-[10px] font-bold border border-border-subtle">
                All
              </button>
              {quotes.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedQuoteIdx(i)}
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold transition-all ${
                    selectedQuoteIdx === i ? "ring-2 ring-accent-purple" : ""
                  }`}
                  style={{ backgroundColor: q.providerColor }}
                >
                  {q.providerLetter}
                </button>
              ))}
            </div>
          </div>
          {quotes.map((q, i) => (
            <button
              key={i}
              onClick={() => setSelectedQuoteIdx(i)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                selectedQuoteIdx === i
                  ? "bg-bg-surface-hover border border-border-hover"
                  : "hover:bg-bg-surface-hover border border-transparent"
              }`}
            >
              <div className="text-left">
                <span className="text-text-primary text-sm font-semibold">{q.amount} {selectedToken.symbol}</span>
                <p className="text-text-tertiary text-xs mt-0.5">= {q.rateLabel}</p>
              </div>
              {q.best && (
                <Check className="w-5 h-5 text-accent-green shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Add custom recipient */}
      {!showRecipient ? (
        <button
          onClick={() => setShowRecipient(true)}
          className="text-sm text-text-secondary border border-border-subtle rounded-lg px-4 py-2 hover:border-border-hover transition-all duration-200 w-full"
        >
          + ADD CUSTOM RECIPIENT
        </button>
      ) : (
        <div className="bg-bg-input rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-text-secondary text-sm">Custom Recipient</label>
            <button
              onClick={() => { setShowRecipient(false); setRecipientAddress(""); }}
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Wallet address, ENS, or .peer name"
            className="text-base text-text-primary bg-transparent outline-none w-full placeholder:text-text-tertiary"
          />
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => {
          if (sendAmount && parseFloat(sendAmount) > 0) {
            toast.success("Order submitted!", { description: `Buying ${receiveAmount} ${token} for ${selectedCurrency.symbol}${sendAmount} via ${PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}.` });
          }
        }}
        className={`w-full rounded-xl py-3.5 text-base font-semibold transition-all duration-200 uppercase tracking-wide ${
          sendAmount && parseFloat(sendAmount) > 0
            ? "bg-accent-purple hover:bg-accent-purple-hover text-white cursor-pointer"
            : "bg-bg-surface-raised text-text-secondary cursor-not-allowed"
        }`}
      >
        {sendAmount && parseFloat(sendAmount) > 0 ? "BUY " + token : `INPUT ${currency} AMOUNT`}
      </button>
    </div>
  );
}

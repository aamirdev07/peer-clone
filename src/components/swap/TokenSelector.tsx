"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { TOKENS } from "@/lib/constants";

interface TokenSelectorProps {
  value: string;
  onChange: (symbol: string) => void;
}

export default function TokenSelector({ value, onChange }: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = TOKENS.find((t) => t.symbol === value) || TOKENS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-bg-surface-raised hover:bg-bg-surface-hover rounded-full px-3 py-1.5 transition-all duration-200"
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
          style={{ backgroundColor: selected.color }}
        >
          {selected.symbol.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-text-primary">{selected.symbol}</span>
        <ChevronDown className="w-4 h-4 text-text-secondary" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 min-w-[180px] shadow-xl shadow-black/40">
          {TOKENS.map((t) => (
            <button
              key={t.symbol}
              onClick={() => {
                onChange(t.symbol);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                t.symbol === value ? "text-accent-purple" : "text-text-primary"
              }`}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ backgroundColor: t.color }}
              >
                {t.symbol.charAt(0)}
              </div>
              <span className="font-medium">{t.symbol}</span>
              <span className="text-text-secondary text-xs ml-auto">{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

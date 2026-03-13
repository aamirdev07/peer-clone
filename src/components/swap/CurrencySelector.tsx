"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCIES } from "@/lib/constants";

interface CurrencySelectorProps {
  value: string;
  onChange: (code: string) => void;
}

export default function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = CURRENCIES.find((c) => c.code === value) || CURRENCIES[0];

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
        <span className="text-lg">{selected.flag}</span>
        <span className="text-sm font-semibold text-text-primary">{selected.code}</span>
        <ChevronDown className="w-4 h-4 text-text-secondary" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-bg-surface border border-border-subtle rounded-xl py-1 z-50 min-w-[180px] shadow-xl shadow-black/40">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-bg-surface-hover transition-colors ${
                c.code === value ? "text-accent-purple" : "text-text-primary"
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span className="font-medium">{c.code}</span>
              <span className="text-text-secondary text-xs ml-auto">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

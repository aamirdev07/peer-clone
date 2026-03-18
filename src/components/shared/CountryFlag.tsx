"use client";

/* eslint-disable @next/next/no-img-element */

const COUNTRY_CODES: Record<string, string> = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  ARS: "ar",
  BRL: "br",
  INR: "in",
  MXN: "mx",
  NGN: "ng",
  TRY: "tr",
};

interface CountryFlagProps {
  currency: string;
  size?: number;
  className?: string;
}

export default function CountryFlag({ currency, size = 20, className = "" }: CountryFlagProps) {
  const countryCode = COUNTRY_CODES[currency];
  if (!countryCode) return null;

  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={currency}
      className={`inline-block rounded-sm object-cover ${className}`}
      style={{ width: size, height: Math.round(size * 0.75) }}
    />
  );
}

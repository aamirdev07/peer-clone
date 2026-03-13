"use client";

import { PAYMENT_METHODS } from "@/lib/constants";

interface PlatformBadgeProps {
  platformId: string;
  size?: "sm" | "md";
}

export default function PlatformBadge({ platformId, size = "sm" }: PlatformBadgeProps) {
  const platform = PAYMENT_METHODS.find((p) => p.id === platformId);
  if (!platform) return null;

  const sizeClasses = size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs";

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{ backgroundColor: platform.color }}
      title={platform.name}
    >
      {platform.letter}
    </div>
  );
}

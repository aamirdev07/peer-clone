"use client";

import { PAYMENT_METHODS } from "@/lib/constants";
import Image from "next/image";

interface PlatformBadgeProps {
  platformId: string;
  size?: "sm" | "md";
}

export default function PlatformBadge({ platformId, size = "sm" }: PlatformBadgeProps) {
  const platform = PAYMENT_METHODS.find((p) => p.id === platformId);
  if (!platform) return null;

  const sizeClasses = size === "sm" ? "w-6 h-6" : "w-8 h-8";
  const imgSize = size === "sm" ? 24 : 32;

  if ("logo" in platform && platform.logo) {
    return (
      <div className={`${sizeClasses} rounded-full overflow-hidden shrink-0`} title={platform.name}>
        <Image
          src={platform.logo}
          alt={platform.name}
          width={imgSize}
          height={imgSize}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    );
  }

  const textSize = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <div
      className={`${sizeClasses} ${textSize} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{ backgroundColor: platform.color }}
      title={platform.name}
    >
      {platform.letter}
    </div>
  );
}

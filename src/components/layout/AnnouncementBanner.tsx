"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-accent-amber text-black text-center py-2 text-sm font-medium relative select-none">
      <span>
        ZKP2P is now Kosmyk.{" "}
        <button
          onClick={() =>
            toast.info("ZKP2P has rebranded to Kosmyk!", {
              description:
                "Same protocol, new name. All features and liquidity remain unchanged.",
            })
          }
          className="underline hover:no-underline font-semibold"
        >
          Read more →
        </button>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

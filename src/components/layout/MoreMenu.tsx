"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-bg-surface-raised text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover flex items-center justify-center transition-all duration-200 text-lg tracking-widest">
          •••
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white border-none rounded-xl p-2 min-w-[220px] shadow-xl"
      >
        <DropdownMenuItem asChild className="rounded-lg px-4 py-3 text-black hover:bg-gray-100 cursor-pointer font-medium text-sm tracking-wide focus:bg-gray-100 focus:text-black">
          <Link href="/tos">TERMS OF SERVICE</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-lg px-4 py-3 text-black hover:bg-gray-100 cursor-pointer font-medium text-sm tracking-wide focus:bg-gray-100 focus:text-black">
          <Link href="/privacy">PRIVACY POLICY</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

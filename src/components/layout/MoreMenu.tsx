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
        className="bg-bg-surface border-border-subtle rounded-xl p-1 min-w-[180px]"
      >
        <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover cursor-pointer">
          <Link href="/tos">Terms of Service</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover cursor-pointer">
          <Link href="/privacy">Privacy Policy</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

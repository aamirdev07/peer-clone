"use client";

import { Archive } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "Your active deposits will appear here." }: EmptyStateProps) {
  return (
    <div className="bg-bg-surface rounded-2xl p-12 flex flex-col items-center justify-center text-center">
      <Archive className="w-12 h-12 text-text-tertiary mb-4" />
      <p className="text-text-secondary text-lg">{message}</p>
    </div>
  );
}

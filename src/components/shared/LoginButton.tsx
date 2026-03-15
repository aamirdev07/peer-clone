"use client";

import { toast } from "sonner";

interface LoginButtonProps {
  variant?: "nav" | "cta" | "outline";
  className?: string;
}

export default function LoginButton({ variant = "nav", className = "" }: LoginButtonProps) {
  const handleClick = () => {
    toast.info("Connect your wallet to get started!", {
      description: "Login functionality is mocked in this demo.",
    });
  };

  const baseClasses = "font-semibold transition-all duration-200 cursor-pointer";

  const variantClasses = {
    nav: "rounded-full border border-text-primary text-text-primary px-6 py-2 hover:bg-white hover:text-black text-sm",
    cta: "w-full rounded-xl py-3.5 text-base bg-accent-purple hover:bg-accent-purple-hover text-white",
    outline: "rounded-full border border-text-primary text-text-primary px-6 py-2.5 hover:bg-white hover:text-black",
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      LOG IN
    </button>
  );
}

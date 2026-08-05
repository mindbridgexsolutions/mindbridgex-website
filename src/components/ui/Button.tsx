import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-[#E65100] text-white hover:bg-[#FF8F00] shadow-md shadow-[#E65100]/20",
  secondary: "bg-[#D4AF37] text-white hover:bg-[#c29f2f] shadow-md shadow-[#D4AF37]/20",
  outline: "border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7]",
  dark: "bg-[#1d1d1f] text-white hover:bg-[#E65100]",
  ghost: "bg-transparent text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
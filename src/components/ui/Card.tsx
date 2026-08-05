import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({ children, className, hoverEffect = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl border border-[#d2d2d7]/30 p-8 shadow-sm transition-all duration-300",
        hoverEffect && "hover:shadow-xl hover:-translate-y-1 hover:border-[#E65100]/30",
        className
      )}
    >
      {children}
    </div>
  );
}
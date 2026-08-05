import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 mb-16 ${centered ? "text-center max-w-3xl mx-auto" : "text-left"}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#E65100]/10 text-[#E65100] text-xs font-semibold tracking-wider uppercase">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f]">
        {title}
      </h2>
      {description && (
        <p className="text-base text-[#86868b] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
import Card from "@/components/ui/Card";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  review: string;
  service: string;
  rating?: number;
}

export default function TestimonialCard({
  name,
  location,
  review,
  service,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <Card className="relative flex flex-col justify-between h-full bg-[#f5f5f7]/50 border-none shadow-none hover:bg-white hover:shadow-xl transition-all">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#D4AF37]">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-[#E65100]/20" />
        </div>

        <p className="text-sm text-[#1d1d1f] italic leading-relaxed">
          &ldquo;{review}&rdquo;
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-[#d2d2d7]/30 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm text-[#1d1d1f]">{name}</h4>
          <span className="text-xs text-[#86868b]">{location}</span>
        </div>
        <span className="text-xs font-semibold text-[#E65100] bg-[#E65100]/10 px-2.5 py-1 rounded-full">
          {service}
        </span>
      </div>
    </Card>
  );
}

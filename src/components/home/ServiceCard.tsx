import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Clock, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  category: string;
}

export default function ServiceCard({
  id,
  title,
  description,
  duration,
  price,
  category,
}: ServiceCardProps) {
  return (
    <Card className="flex flex-col justify-between h-full group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#E65100] bg-[#E65100]/10 px-3 py-1 rounded-full uppercase tracking-wider">
            {category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#86868b] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#E65100]" />
            {duration}
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-[#E65100] transition">
          {title}
        </h3>

        <p className="text-sm text-[#86868b] line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-[#d2d2d7]/30 flex items-center justify-between">
        <div>
          <span className="text-xs text-[#86868b] block">Starting from</span>
          <span className="text-lg font-bold text-[#1d1d1f]">{price}</span>
        </div>

        <Link href={`/services/${id}`}>
          <Button variant="outline" size="sm" className="group-hover:bg-[#E65100] group-hover:text-white group-hover:border-[#E65100] transition">
            Book Puja <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
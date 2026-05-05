import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeywordChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  variant?: "indigo" | "slate";
}

export function KeywordChip({ 
  label, 
  onRemove, 
  className, 
  variant = "indigo" 
}: KeywordChipProps) {
  const variants = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-default",
      variants[variant],
      className
    )}>
      {label}
      {onRemove && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-black/5 rounded-full p-0.5 transition-colors"
        >
          <XCircle className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

import { Smile, Meh, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentChipProps {
  sentiment: "Positive" | "Neutral" | "Negative";
  score?: number;
  className?: string;
}

const sentimentConfigs = {
  Positive: { icon: Smile, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  Neutral: { icon: Meh, color: "bg-slate-50 text-slate-700 border-slate-100" },
  Negative: { icon: Frown, color: "bg-rose-50 text-rose-700 border-rose-100" },
};

export function SentimentChip({ sentiment, score, className }: SentimentChipProps) {
  const config = sentimentConfigs[sentiment];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
      config.color,
      className
    )}>
      <Icon className="w-3 h-3" />
      {sentiment}
      {score !== undefined && <span className="opacity-60 ml-0.5">({score})</span>}
    </span>
  );
}

import { cn } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number; // 0 to 100
  className?: string;
}

export function ConfidenceScore({ score, className }: ConfidenceScoreProps) {
  const getColorClass = (val: number) => {
    if (val >= 90) return "bg-emerald-500";
    if (val >= 70) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getBgClass = (val: number) => {
    if (val >= 90) return "bg-emerald-50";
    if (val >= 70) return "bg-amber-50";
    return "bg-rose-50";
  };

  const getTextClass = (val: number) => {
    if (val >= 90) return "text-emerald-700";
    if (val >= 70) return "text-amber-700";
    return "text-rose-700";
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex-1 h-1.5 rounded-full overflow-hidden", getBgClass(score))}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500", getColorClass(score))}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn("text-[10px] font-bold tabular-nums w-8", getTextClass(score))}>
        {score}%
      </span>
    </div>
  );
}

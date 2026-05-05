import { Globe, MessageCircle, Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceType } from "@/lib/types";

interface SourceBadgeProps {
  source: SourceType;
  showIcon?: boolean;
  className?: string;
}

const sourceConfigs = {
  X: { icon: Globe, color: "bg-sky-50 text-sky-700 border-sky-100", label: "X (Globe)" },
  Reddit: { icon: MessageCircle, color: "bg-orange-50 text-orange-700 border-orange-100", label: "Reddit" },
  Quora: { icon: Globe, color: "bg-rose-50 text-rose-700 border-rose-100", label: "Quora" },
  Forums: { icon: Rss, color: "bg-teal-50 text-teal-700 border-teal-100", label: "Forums" },
  RSS: { icon: Rss, color: "bg-indigo-50 text-indigo-700 border-indigo-100", label: "RSS Feed" },
};

export function SourceBadge({ source, showIcon = true, className }: SourceBadgeProps) {
  const config = sourceConfigs[source];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
      config.color,
      className
    )}>
      {showIcon && Icon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
}

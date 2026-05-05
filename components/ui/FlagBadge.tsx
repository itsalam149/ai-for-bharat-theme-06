import { ShieldAlert, AlertTriangle, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlagType } from "@/lib/types";

interface FlagBadgeProps {
  type: FlagType;
  className?: string;
}

const flagConfigs = {
  "Adverse Event": { icon: ShieldAlert, color: "bg-rose-50 text-rose-700 border-rose-200 shadow-sm shadow-rose-100/50" },
  "PII Detected": { icon: EyeOff, color: "bg-amber-50 text-amber-700 border-amber-200" },
  "PHI Detected": { icon: Lock, color: "bg-amber-50 text-amber-700 border-amber-200" },
  "Safety Signal": { icon: AlertTriangle, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  "Medical Advice": { icon: AlertTriangle, color: "bg-slate-50 text-slate-700 border-slate-200" },
};

export function FlagBadge({ type, className }: FlagBadgeProps) {
  const config = flagConfigs[type];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-200",
      config.color,
      className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {type}
    </span>
  );
}

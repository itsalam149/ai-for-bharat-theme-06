import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Active" | "Paused" | "Draft" | "Reviewing" | "Resolved";
  className?: string;
}

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Paused: "bg-amber-50 text-amber-700 border-amber-100",
  Draft: "bg-slate-50 text-slate-600 border-slate-100",
  Reviewing: "bg-indigo-50 text-indigo-700 border-indigo-100",
  Resolved: "bg-blue-50 text-blue-700 border-blue-100",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
      statusStyles[status],
      className
    )}>
      {status}
    </span>
  );
}

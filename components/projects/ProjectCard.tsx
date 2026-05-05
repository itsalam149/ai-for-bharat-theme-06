"use client";

import { 
  MoreHorizontal, 
  Globe, 
  MessageCircle, 
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KeywordChip } from "@/components/ui/KeywordChip";
import { MiniSparkline } from "@/components/ui/MiniSparkline";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-premium p-6 relative group">
      <button className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-base font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
          {project.name}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm text-slate-500 line-clamp-2 mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.keywords.slice(0, 3).map((kw) => (
          <KeywordChip key={kw} label={kw} />
        ))}
        {project.keywords.length > 3 && (
          <span className="text-[10px] text-slate-400 font-medium self-center">
            +{project.keywords.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex -space-x-2">
          {project.sources.map((source) => {
            const Icon = source === "X" ? Globe : source === "Reddit" ? MessageCircle : Globe;
            return (
              <div 
                key={source} 
                className={cn(
                  "w-7 h-7 rounded-full border-2 border-white flex items-center justify-center bg-slate-50 text-slate-400 shadow-sm ring-1 ring-slate-100",
                  source === "X" && "text-sky-500",
                  source === "Reddit" && "text-orange-500"
                )}
                title={source}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            );
          })}
        </div>
        <span className="text-xs text-slate-400 font-medium">Monitoring {project.sources.length} sources</span>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-50">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Signals</span>
          <span className="text-sm font-bold text-slate-800">{project.stats.signals7d.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Alerts</span>
          <span className="text-sm font-bold text-rose-600">{project.stats.alerts}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">7d Trend</span>
          <MiniSparkline data={project.stats.trend} width={60} height={20} />
        </div>
      </div>

      <Link 
        href={`/projects/${project.id}`}
        className="mt-6 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200"
      >
        View Project <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

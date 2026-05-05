"use client";

import { Plus, Search, Filter, Calendar } from "lucide-react";
import Link from "next/link";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Monitoring Projects</h1>
          <p className="text-slate-500 mt-1">Manage and track your social listening initiatives.</p>
        </div>
        <Link 
          href="/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by project name or keywords..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/40 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {["All Status", "Active", "Paused", "Draft"].map((status, i) => (
              <button 
                key={status}
                className={i === 0 
                  ? "px-4 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-lg shadow-sm"
                  : "px-4 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-lg"
                }
              >
                {status}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <Filter className="w-3.5 h-3.5" />
            Sources
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <Calendar className="w-3.5 h-3.5" />
            Date Range
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

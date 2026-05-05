"use client";

import { Search, Command, Bell, HelpCircle, ChevronRight } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400">Projects</span>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <span className="text-slate-400">Ozempic Monitor</span>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <span className="text-slate-800 font-medium">Analysis</span>
      </div>

      <div className="flex-1 max-w-md mx-8 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search signals, projects, or alerts..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-sm pointer-events-none">
          <Command className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] font-semibold text-slate-400">K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-700">All systems operational</span>
        </div>

        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>

        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

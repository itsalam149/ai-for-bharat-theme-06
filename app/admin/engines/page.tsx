"use client";

import { useState } from "react";
import { 
  Globe,
  MessageCircle, 
  Activity,
  Plus,
  ArrowRight,
  Sparkles,
  Link as LinkIcon,
  Lock,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";

const engines = [
  {
    name: "X Stream Scraper",
    type: "Scraper",
    icon: Globe,
    iconColor: "text-sky-500",
    status: "Active",
    signals: "1.2M",
    successRate: 98.4,
    lastUsed: "2 mins ago",
    config: { baseUrl: "api.twitter.com/v2", rateLimit: "180/15m" }
  },
  {
    name: "Reddit API Engine",
    type: "API",
    icon: MessageCircle,
    iconColor: "text-orange-500",
    status: "Active",
    signals: "840K",
    successRate: 99.1,
    lastUsed: "5 mins ago",
    config: { baseUrl: "oauth.reddit.com", rateLimit: "60/m" }
  },
  {
    name: "Oncology Forum Crawler",
    type: "Scraper",
    icon: Globe,
    iconColor: "text-rose-500",
    status: "Inactive",
    signals: "120K",
    successRate: 85.2,
    lastUsed: "12 hours ago",
    config: { baseUrl: "oncology.org/forums", rateLimit: "5/m" }
  },
];

export default function EngineManagementPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Data Source Engines</h1>
          <p className="text-slate-500 mt-1">Manage crawlers, scrapers, and API connections for signal acquisition.</p>
        </div>
        <button 
          onClick={() => setIsRegistering(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Register New Engine
        </button>
      </div>

      {isRegistering ? (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-8 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Register New Engine</h2>
            <button onClick={() => setIsRegistering(false)} className="text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
          </div>

          <div className="space-y-8">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:bg-indigo-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-indigo-700">Let AI configure this source</h3>
                  <p className="text-xs text-indigo-500 mt-0.5">Paste a URL and our agent will auto-generate the engine config.</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Engine Name</label>
                <input type="text" placeholder="e.g., PharmaForum Scraper" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all appearance-none">
                  <option>API Connection</option>
                  <option>Web Scraper</option>
                  <option>RSS Feed</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base URL / Endpoint</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="https://api.source.com/v1" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Auth Strategy</label>
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1">
                  {["None", "API Key", "OAuth"].map((a, i) => (
                    <button key={a} className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", i === 1 ? "bg-white shadow-sm text-indigo-600" : "text-slate-500")}>{a}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">API Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="password" placeholder="••••••••••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-indigo-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
                <Code className="w-4 h-4" /> Test Connection
              </button>
              <button className="px-10 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                Save & Register
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engines.map((engine) => (
            <div key={engine.name} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-premium group relative">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center transition-colors group-hover:bg-indigo-50", engine.iconColor)}>
                    <engine.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{engine.name}</h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">{engine.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-11 h-6 rounded-full relative transition-colors cursor-pointer",
                    engine.status === "Active" ? "bg-emerald-500" : "bg-slate-300"
                  )}>
                    <div className={cn(
                      "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                      engine.status === "Active" ? "translate-x-5" : "translate-x-0"
                    )} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Signals</span>
                  <span className="text-sm font-bold text-slate-800">{engine.signals}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Success Rate</span>
                  <span className="text-sm font-bold text-emerald-600">{engine.successRate}%</span>
                  <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${engine.successRate}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Endpoint:</span>
                  <span className="text-slate-600 font-mono text-[10px] truncate max-w-[150px]">{engine.config.baseUrl}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rate Limit:</span>
                  <span className="text-slate-600 font-medium">{engine.config.rateLimit}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Last Active:</span>
                  <span className="text-slate-600 font-medium">{engine.lastUsed}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">Configure</button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" /> Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

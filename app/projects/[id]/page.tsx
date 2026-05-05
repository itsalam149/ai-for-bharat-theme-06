"use client";

import { useState, Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Pause, 
  Settings as SettingsIcon, 
  Download, 
  Trash2, 
  ExternalLink,
  Search,
  Bookmark,
  MoreHorizontal,
  ShieldAlert,
  Cpu,
  RefreshCw,
  Clock,
  XCircle,
  Activity
} from "lucide-react";
import { MOCK_PROJECTS, MOCK_SIGNALS } from "@/lib/mock-data";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { SentimentChip } from "@/components/ui/SentimentChip";
import { FlagBadge } from "@/components/ui/FlagBadge";
import { ConfidenceScore } from "@/components/ui/ConfidenceScore";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500 font-medium">Loading project details...</div>}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

function ProjectDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "Overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];

  const tabs = ["Overview", "Live Feed", "Analysis", "Settings"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Project Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Created {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              Last crawl: 5 mins ago
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            <Pause className="w-4 h-4" /> Pause
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-semibold transition-all relative",
                activeTab === tab 
                  ? "text-indigo-600" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "Overview" && <OverviewTab project={project} />}
        {activeTab === "Live Feed" && <LiveFeedTab />}
        {activeTab === "Analysis" && <AnalysisTab />}
        {activeTab === "Settings" && <SettingsTab project={project} />}
      </div>
    </div>
  );
}

function OverviewTab({ project }: { project: Project }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Signals" value={project.stats.signals7d} icon={RefreshCw} color="indigo" />
        <KPICard title="Detected Entities" value={84} icon={Cpu} color="blue" />
        <KPICard title="Safety Alerts" value={project.stats.alerts} icon={ShieldAlert} color="rose" />
        <KPICard title="Avg. Sentiment" value={project.stats.avgSentiment + "%"} icon={Activity} color="emerald" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h3 className="text-base font-semibold text-slate-800">Source Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Crawl</th>
                <th className="px-6 py-4">Signals Today</th>
                <th className="px-6 py-4">Error Rate</th>
                <th className="px-6 py-4">Latency</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
              {project.sources.map((source) => (
                <tr key={source} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4"><SourceBadge source={source} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="font-medium text-slate-700">Healthy</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">2 mins ago</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">420</td>
                  <td className="px-6 py-4 text-slate-500">0.02%</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">Real-time</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><RefreshCw className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><SettingsIcon className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LiveFeedTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Filter Feed</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Content</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs" placeholder="Filter signals..." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sources</label>
              <div className="space-y-2">
                {["X", "Reddit", "Forums"].map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sentiment</label>
              <div className="flex flex-wrap gap-2">
                {["Positive", "Neutral", "Negative"].map((s) => (
                  <button key={s} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-500 hover:bg-white hover:text-indigo-600 transition-all">{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-4">
        {MOCK_SIGNALS.map((signal) => (
          <div key={signal.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:border-indigo-200 transition-premium group relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <SourceBadge source={signal.source} />
                <span className="text-xs font-bold text-slate-700">{signal.author}</span>
                <span className="text-xs text-slate-400">• {new Date(signal.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Bookmark className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><ExternalLink className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-slate-800 text-sm leading-relaxed">
                {signal.content.split(/(Ozempic|nausea|shortage)/gi).map((part, i) => (
                  part.match(/Ozempic|nausea|shortage/i) 
                    ? <mark key={i} className="bg-indigo-50 text-indigo-700 font-semibold rounded px-0.5">{part}</mark>
                    : part
                ))}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {signal.entities.map((e, i) => (
                <div key={i} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-medium text-slate-600">
                  <span className="text-slate-400 uppercase tracking-tighter mr-1">{e.type}:</span> {e.text}
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SentimentChip sentiment={signal.sentiment} score={signal.sentimentScore} />
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Analysis Confidence:</span>
                  <ConfidenceScore score={signal.confidence} className="w-24" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {signal.flags.map((f) => (
                  <FlagBadge key={f} type={f} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisTab() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
        <Activity className="w-10 h-10 text-indigo-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-800">Advanced Analysis Dashboard</h3>
      <p className="text-slate-500 max-w-md mt-2">Comprehensive sentiment trends, entity clustering, and safety heatmaps are being generated for this project.</p>
      <button className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
        Generate Full Report
      </button>
    </div>
  );
}

function SettingsTab({ project }: { project: Project }) {
  return (
    <div className="max-w-2xl animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Project Configuration</h3>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Name</label>
              <input type="text" defaultValue={project.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 transition-all outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Keywords</label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                {project.keywords.map(kw => (
                  <span key={kw} className="px-2 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-700 flex items-center gap-1">
                    {kw} <XCircle className="w-3 h-3 text-slate-400" />
                  </span>
                ))}
                <button className="text-xs text-indigo-600 font-bold ml-1">+ Add</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Data Sourcing</h3>
          <div className="space-y-3">
            {project.sources.map(s => (
              <div key={s} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <SourceBadge source={s} />
                  <span className="text-xs text-slate-500">Crawling every 15 minutes</span>
                </div>
                <button className="text-xs text-indigo-600 font-bold hover:underline">Configure</button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex justify-end gap-3">
          <button className="px-6 py-2 text-slate-600 text-sm font-bold hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
          <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'indigo' | 'blue' | 'rose' | 'emerald';
}

function KPICard({ title, value, icon: Icon, color }: KPICardProps) {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50",
    blue: "text-blue-600 bg-blue-50",
    rose: "text-rose-600 bg-rose-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", colors[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h4>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}


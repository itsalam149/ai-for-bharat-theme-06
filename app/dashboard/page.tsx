"use client";

import { 
  FolderOpen, 
  Rss, 
  ShieldAlert, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { MOCK_ALERTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { SourceBadge } from "@/components/ui/SourceBadge";

const timelineData = [
  { date: "May 01", X: 45, Reddit: 32, Quora: 12, Forums: 20 },
  { date: "May 02", X: 52, Reddit: 38, Quora: 15, Forums: 25 },
  { date: "May 03", X: 48, Reddit: 42, Quora: 18, Forums: 22 },
  { date: "May 04", X: 61, Reddit: 45, Quora: 22, Forums: 28 },
  { date: "May 05", X: 55, Reddit: 50, Quora: 20, Forums: 30 },
  { date: "May 06", X: 70, Reddit: 55, Quora: 25, Forums: 35 },
  { date: "May 07", X: 65, Reddit: 60, Quora: 28, Forums: 40 },
];

const sentimentData = [
  { name: "Positive", value: 65, color: "#10b981" },
  { name: "Neutral", value: 25, color: "#94a3b8" },
  { name: "Negative", value: 10, color: "#f43f5e" },
];

const trendingKeywords = [
  { name: "Shortage", count: 450, trend: 12, positive: true },
  { name: "Nausea", count: 380, trend: 8, positive: false },
  { name: "Weight Loss", count: 320, trend: 15, positive: true },
  { name: "Insurance", count: 290, trend: -3, positive: false },
  { name: "Dosage", count: 210, trend: 5, positive: true },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Good morning, Dr. Chen 👋</h1>
        <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening across your monitoring projects today.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Active Projects" 
          value="12" 
          trend="+2 this week" 
          trendType="positive"
          icon={FolderOpen}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <KPICard 
          title="Signals Captured (24h)" 
          value="2,840" 
          trend="▲ 14% vs yesterday" 
          trendType="positive"
          icon={Rss}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <KPICard 
          title="Safety Alerts" 
          value="8" 
          trend="3 new today" 
          trendType="negative"
          icon={ShieldAlert}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
          valueColor="text-rose-600"
        />
        <KPICard 
          title="PII Flags" 
          value="24" 
          trend="Amber status" 
          trendType="warning"
          icon={AlertTriangle}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          valueColor="text-amber-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-semibold text-slate-800">Signal Volume Over Time</h3>
            <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1">
              {["All", "X", "Reddit", "Quora", "Forums"].map((source) => (
                <button 
                  key={source}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                    source === "All" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorX" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReddit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    borderRadius: "12px", 
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="X" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorX)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="Reddit" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorReddit)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-8">Sentiment Breakdown</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">2.8k</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-slate-800">{item.value}%</span>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${item.value}%`, backgroundColor: item.color }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-rose-500 text-lg">🚨</span> Recent Safety Alerts
            </h3>
            <button className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            {MOCK_ALERTS.map((alert) => (
              <div 
                key={alert.id}
                className="group p-4 bg-slate-50 hover:bg-indigo-50/30 border-l-4 border-rose-500 rounded-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SourceBadge source={alert.source} className="scale-90 origin-left" />
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded uppercase">
                      {alert.severity}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">2h ago</span>
                </div>
                <p className="text-sm text-slate-700 line-clamp-2 mb-3">
                  &quot;{alert.contentExcerpt}&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white border border-slate-200 text-slate-500 rounded-full px-2 py-0.5">
                      Confidence: {alert.confidence}%
                    </span>
                    <span className="text-[10px] text-slate-400 italic">#{alert.keyword}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Keywords */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-8">
            <span className="text-indigo-500 text-lg">🔥</span> Top Trending Keywords
          </h3>
          <div className="space-y-6">
            {trendingKeywords.map((kw) => (
              <div key={kw.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">{kw.name}</span>
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                      kw.positive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                    )}>
                      {kw.positive ? "▲" : "▼"} {Math.abs(kw.trend)}%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{kw.count} mentions</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${(kw.count / 500) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendType: 'positive' | 'negative' | 'warning';
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  valueColor?: string;
}

function KPICard({ title, value, trend, trendType, icon: Icon, iconBg, iconColor, valueColor }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-premium group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2 rounded-lg transition-colors", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold",
          trendType === "positive" ? "bg-emerald-50 text-emerald-600" : 
          trendType === "negative" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
        )}>
          {trend}
        </div>
      </div>
      <div>
        <h4 className="text-sm text-slate-500 font-medium">{title}</h4>
        <p className={cn("text-3xl font-bold mt-1 tracking-tight", valueColor || "text-slate-800")}>{value}</p>
      </div>
    </div>
  );
}

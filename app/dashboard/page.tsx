"use client";

import React, { useState, useEffect } from "react";
import { 
  Network, 
  Cpu, 
  ShieldCheck, 
  BrainCircuit, 
  Activity,
  AlertTriangle,
  Search,
  Eye,
  Lock,
  Zap,
  Globe,
  Share2,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const propagationData = [
  { time: "00:00", DarkWeb: 10, Forums: 5, Surface: 2 },
  { time: "04:00", DarkWeb: 25, Forums: 12, Surface: 5 },
  { time: "08:00", DarkWeb: 40, Forums: 28, Surface: 15 },
  { time: "12:00", DarkWeb: 35, Forums: 45, Surface: 40 },
  { time: "16:00", DarkWeb: 20, Forums: 60, Surface: 85 },
  { time: "20:00", DarkWeb: 15, Forums: 40, Surface: 110 },
  { time: "24:00", DarkWeb: 8, Forums: 25, Surface: 95 },
];

const consensusData = [
  { name: "Optimist", confidence: 92, status: "Critical Flag" },
  { name: "Pessimist", confidence: 15, status: "Noise Filtered" },
  { name: "Skeptic", confidence: 88, status: "Evidence Verified" },
];

const activeAgents = [
  { id: "DISC-01", type: "Discovery", activity: "Identifying new threads in r/medicine", status: "Active" },
  { id: "ING-04", type: "Ingestion", activity: "Collecting darknet signal hash #88A", status: "Stealth" },
  { id: "ANA-09", type: "Analysis", activity: "Medical NER processing (Ozempic)", status: "Active" },
  { id: "VER-03", type: "Verification", activity: "Consensus debate in progress", status: "Active" },
];

export default function NeuralHiveDashboard() {
  const [pulseColor, setPulseColor] = useState("text-emerald-500");

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseColor(prev => prev === "text-emerald-500" ? "text-emerald-400" : "text-emerald-500");
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header with Swarm Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Swarm Intelligence Monitor</h1>
             <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full bg-emerald-500 transition-colors duration-1000 animate-pulse")} />
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Neural Hive Active</span>
             </div>
          </div>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl">
            Autonomous multi-agent social listening swarm identifying weak patient safety signals across Surface and Dark Web ecosystems.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Agents</div>
            <div className="text-xl font-bold text-slate-800">124 Swarm Nodes</div>
          </div>
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
            <Network className="text-indigo-600" size={24} />
          </div>
        </div>
      </div>

      {/* KPI Agent Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AgentStatCard 
          title="Autonomous Discovery"
          value="42"
          unit="New Sources"
          icon={Search}
          color="indigo"
          detail="Targeting gated forums"
        />
        <AgentStatCard 
          title="Signals Verified"
          value="1,284"
          unit="Signals"
          icon={ShieldCheck}
          color="emerald"
          detail="98.2% Confidence Avg"
        />
        <AgentStatCard 
          title="Redaction Engine"
          value="8.4k"
          unit="PHI Records"
          icon={Lock}
          color="amber"
          detail="Context-aware filtering"
        />
        <AgentStatCard 
          title="Prediction Drift"
          value="0.12"
          unit="σ"
          icon={BrainCircuit}
          color="rose"
          detail="Early warning threshold"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Signal Propagation Graph */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Signal Propagation Modeling</h2>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Temporal Graph Network Output</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-indigo-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Surface</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Dark Web</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={propagationData}>
                <defs>
                  <linearGradient id="colorSurface" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="Surface" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSurface)" />
                <Area type="monotone" dataKey="DarkWeb" stroke="#475569" strokeWidth={2} fillOpacity={1} fill="url(#colorDark)" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Early Warning Annotation */}
            <div className="absolute top-[30%] left-[25%] flex flex-col items-center">
               <div className="bg-rose-500 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg animate-bounce">
                  WEAK SIGNAL DETECTED
               </div>
               <div className="w-[1px] h-32 bg-rose-500/30" />
            </div>
          </div>
        </div>

        {/* Multi-Agent Consensus Panel */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <BrainCircuit className="text-emerald-400" size={24} />
            <h2 className="text-lg font-bold">Verification Swarm</h2>
          </div>
          
          <div className="space-y-8 flex-1">
            {consensusData.map((agent, i) => (
              <div key={agent.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      i === 0 ? "bg-emerald-400" : i === 1 ? "bg-rose-400" : "bg-indigo-400"
                    )} />
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">{agent.name} Agent</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{agent.confidence}% Confidence</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${agent.confidence}%` }}
                     transition={{ duration: 1.5, delay: i * 0.2 }}
                     className={cn(
                        "h-full rounded-full",
                        i === 0 ? "bg-emerald-400" : i === 1 ? "bg-rose-400" : "bg-indigo-400"
                     )}
                   />
                </div>
                <div className="text-[10px] font-mono text-white/40">{agent.status}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
             <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Consensus Achieved</span>
             </div>
             <p className="text-[10px] text-white/60 leading-relaxed font-mono">
                &gt; HIGH_RELIABILITY_SIGNAL identified. Origin: Niche_Forum_04. Propagating to r/Biohacking.
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Activity Live Stream */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-indigo-600" size={20} />
              Live Swarm Activity
            </h3>
            <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">Full Log &rarr;</button>
          </div>
          <div className="space-y-4">
             {activeAgents.map((agent, i) => (
                <motion.div 
                  key={agent.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-all"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                         {agent.type === "Discovery" && <Search size={18} className="text-indigo-600" />}
                         {agent.type === "Ingestion" && <Lock size={18} className="text-amber-600" />}
                         {agent.type === "Analysis" && <Cpu size={18} className="text-indigo-600" />}
                         {agent.type === "Verification" && <BrainCircuit size={18} className="text-emerald-600" />}
                      </div>
                      <div>
                         <div className="text-xs font-bold text-slate-800">{agent.id} <span className="text-[10px] font-normal text-slate-400">({agent.type})</span></div>
                         <div className="text-[11px] text-slate-500 mt-0.5">{agent.activity}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                        agent.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-200 text-slate-600"
                      )}>{agent.status}</span>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                   </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* Patient Safety Feed (Redacted) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
           <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Eye className="text-rose-500" size={20} />
              Redacted Safety Feed
            </h3>
            <div className="flex items-center gap-2 px-2 py-1 bg-amber-50 border border-amber-100 rounded text-[9px] font-bold text-amber-700 uppercase tracking-widest">
               <Lock size={10} /> PHI Redaction Active
            </div>
          </div>
          <div className="space-y-6">
             {[
               { id: 1, source: "Forum-X", text: "Patient reported severe [REDACTED] after taking 2mg [REDACTED]. History of [REDACTED].", severity: "High" },
               { id: 2, source: "r/Ozempic", text: "Discussion rising about insurance [REDACTED] and supply [REDACTED] in NYC area.", severity: "Medium" },
               { id: 3, source: "DarkNet-T", text: "Counterfeit [REDACTED] distribution detected originating from [REDACTED] nodes.", severity: "Critical" },
             ].map((report, i) => (
                <div key={report.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                   {report.severity === "Critical" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />}
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.source}</span>
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded uppercase",
                        report.severity === "Critical" ? "bg-rose-500 text-white" : 
                        report.severity === "High" ? "bg-rose-100 text-rose-600" : "bg-slate-200 text-slate-600"
                      )}>{report.severity}</span>
                   </div>
                   <p className="text-xs text-slate-600 italic leading-relaxed">
                      &quot;{report.text}&quot;
                   </p>
                </div>
             ))}
          </div>
          <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
             <div className="flex items-center gap-3 text-indigo-700 mb-2">
                <Globe size={18} />
                <span className="text-xs font-bold">Cross-Layer Correlation</span>
             </div>
             <p className="text-[10px] text-indigo-600/80 leading-relaxed">
                Neural Hive has correlated these 3 independent signals to identify a single emerging counterfeit drug cluster. <span className="font-bold underline cursor-pointer">Explore Cluster Graph &rarr;</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AgentStatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ElementType;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
  detail: string;
}

function AgentStatCard({ title, value, unit, icon: Icon, color, detail }: AgentStatCardProps) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-lg border", colors[color])}>
           <Icon size={20} />
        </div>
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">Status: Nominal</div>
      </div>
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</div>
        <div className="flex items-baseline gap-2">
           <span className="text-3xl font-bold text-slate-800">{value}</span>
           <span className="text-xs font-medium text-slate-400">{unit}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
           <span className="text-[10px] text-slate-500 font-medium">{detail}</span>
           <Zap size={14} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", colors[color].split(" ")[1])} />
        </div>
      </div>
    </motion.div>
  );
}

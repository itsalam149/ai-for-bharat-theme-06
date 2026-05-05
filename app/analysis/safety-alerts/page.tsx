"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  MoreHorizontal,
  ArrowRight,
  Clock,
  XCircle,
  ShieldCheck,
  Zap,
  User,
  Activity
} from "lucide-react";
import { MOCK_ALERTS } from "@/lib/mock-data";
import type { Alert } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { ConfidenceScore } from "@/components/ui/ConfidenceScore";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function SafetyAlertsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openDrawer = (alert: Alert) => {
    setSelectedAlert(alert);
    setDrawerOpen(true);
  };

  const severityColors = {
    Critical: "bg-rose-100 text-rose-700 border-rose-200",
    High: "bg-orange-100 text-orange-700 border-orange-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Safety Alerts Analysis</h1>
          <p className="text-slate-500 mt-1">Investigate and triage high-priority patient safety signals.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {["All", "Critical", "High", "Medium", "Low"].map((sev, i) => (
              <button 
                key={sev}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-lg transition-all",
                  i === 0 ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-500 hover:text-slate-800"
                )}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 backdrop-blur-sm text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-5 w-10"></th>
                <th className="px-6 py-5">Severity</th>
                <th className="px-6 py-5">Signal Type</th>
                <th className="px-6 py-5">Project</th>
                <th className="px-6 py-5">Source</th>
                <th className="px-6 py-5">Confidence</th>
                <th className="px-6 py-5">Timestamp</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_ALERTS.map((alert) => (
                <React.Fragment key={alert.id}>
                  <tr 
                    className={cn(
                      "hover:bg-slate-50/50 transition-colors cursor-pointer group",
                      expandedId === alert.id && "bg-slate-50/80"
                    )}
                    onClick={() => toggleExpand(alert.id)}
                  >
                    <td className="px-6 py-5">
                      {expandedId === alert.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border", severityColors[alert.severity])}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-800 text-sm">
                      {alert.signalType}
                      <span className="block text-[10px] font-medium text-slate-400 mt-0.5">Trigger: {alert.keyword}</span>
                    </td>
                    <td className="px-6 py-5 text-slate-600 text-xs font-medium">{alert.projectName}</td>
                    <td className="px-6 py-5"><SourceBadge source={alert.source} /></td>
                    <td className="px-6 py-5 w-32">
                      <ConfidenceScore score={alert.confidence} />
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-xs">
                      {new Date(alert.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="px-6 py-5"><StatusBadge status={alert.status} /></td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); openDrawer(alert); }}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all shadow-none hover:shadow-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Inline Detail Panel */}
                  {expandedId === alert.id && (
                    <tr className="bg-slate-50/80">
                      <td colSpan={9} className="px-12 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-top-2 duration-300">
                          <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Flagged Content</h4>
                              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <p className="text-slate-800 text-sm leading-relaxed italic">
                                  &quot;{alert.contentExcerpt} Has anyone else noticed severe nausea when switching from 0.5mg to 1mg of Ozempic? It&apos;s been 3 days and I can barely eat. Should I go back down or push through?&quot;
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                  <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-slate-800">Model Explanation</h5>
                                  <p className="text-[11px] text-slate-500 mt-1">High confidence adverse event detected. Pattern matches GI toxicity profile associated with GLP-1 agonists.</p>
                                </div>
                              </div>
                              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                                  <Zap className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-slate-800">Cluster Analysis</h5>
                                  <p className="text-[11px] text-slate-500 mt-1">This is the 12th similar mention in this region over the last 48 hours.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Actions</h4>
                              <div className="space-y-2">
                                <button className="w-full flex items-center justify-between px-4 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                                  Mark Reviewed & Escalate <ArrowRight className="w-4 h-4" />
                                </button>
                                <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                                  Dismiss as False Positive
                                </button>
                              </div>
                            </div>
                            <div className="pt-6 border-t border-slate-200 space-y-4">
                              <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-slate-400">Traceability ID:</span>
                                <span className="text-slate-600 font-mono">AE-948-X21</span>
                              </div>
                              <button className="text-xs font-bold text-indigo-600 hover:underline">View Trace Log →</button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Drawer */}
      {drawerOpen && selectedAlert && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl z-50 animate-in slide-in-from-right duration-300 border-l border-slate-100 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", severityColors[selectedAlert.severity])}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Alert Details</h3>
                  <p className="text-xs text-slate-400 font-medium">ID: {selectedAlert.id.toUpperCase()}</p>
                </div>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Primary Information</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-medium">Project</span>
                    <p className="text-sm font-bold text-slate-800">{selectedAlert.projectName}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-medium">Signal Type</span>
                    <p className="text-sm font-bold text-slate-800">{selectedAlert.signalType}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-medium">Source</span>
                    <SourceBadge source={selectedAlert.source} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-medium">Timestamp</span>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(selectedAlert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Content Analysis</h4>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-slate-800 text-sm leading-relaxed">
                    {selectedAlert.contentExcerpt}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Detection Confidence</span>
                    <ConfidenceScore score={selectedAlert.confidence} className="w-32" />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Audit Trail</h4>
                <div className="space-y-6">
                  <AuditItem 
                    icon={Activity} 
                    title="Signal Captured" 
                    time="10:30 AM" 
                    desc="Data acquired from Reddit API via Engine v2.4" 
                    isLast 
                  />
                  <AuditItem 
                    icon={Zap} 
                    title="Model Inference" 
                    time="10:31 AM" 
                    desc="Safety Signal Model (v4) flagged Adverse Event" 
                  />
                  <AuditItem 
                    icon={User} 
                    title="System Notification" 
                    time="10:32 AM" 
                    desc="High priority alert dispatched to Safety Lead" 
                  />
                </div>
              </section>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                Escalate Alert
              </button>
              <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
                Dismiss
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface AuditItemProps {
  icon: React.ElementType;
  title: string;
  time: string;
  desc: string;
  isLast?: boolean;
}

function AuditItem({ icon: Icon, title, time, desc, isLast }: AuditItemProps) {
  return (
    <div className="flex gap-4 relative">
      {!isLast && <div className="absolute left-[15px] top-8 w-0.5 h-10 bg-slate-100" />}
      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 z-10">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800">{title}</span>
          <span className="text-[10px] text-slate-400 font-medium">• {time}</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-normal">{desc}</p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Sparkles, 
  Globe,
  MessageCircle, 
  Rss,
  Info,
  Zap,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { KeywordChip } from "@/components/ui/KeywordChip";

const steps = [
  { id: 1, name: "Project Basics", description: "Name and description" },
  { id: 2, name: "Keywords", description: "Monitor terms" },
  { id: 3, name: "Sources", description: "Data acquisition" },
  { id: 4, name: "Review", description: "Launch project" },
];

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [keywords, setKeywords] = useState(["Ozempic", "Wegovy", "side effects"]);
  const [newKeyword, setNewKeyword] = useState("");

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Create Monitoring Project</h1>
        <p className="text-slate-500">Follow the steps below to configure your new social listening workspace.</p>
      </div>

      {/* Step Indicator */}
      <div className="relative">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-100 -z-10" />
        <div 
          className="absolute top-4 left-0 h-0.5 bg-indigo-600 transition-all duration-500 -z-10" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        <div className="flex justify-between items-start">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center space-y-2">
              <div 
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ring-4 ring-white",
                  currentStep > step.id ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" :
                  currentStep === step.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110" :
                  "bg-slate-100 text-slate-400"
                )}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <div className="space-y-0.5">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider block",
                  currentStep === step.id ? "text-indigo-600" : "text-slate-400"
                )}>
                  Step {step.id}
                </span>
                <span className={cn(
                  "text-xs font-semibold block",
                  currentStep === step.id ? "text-slate-800" : "text-slate-400"
                )}>
                  {step.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 min-h-[500px] flex flex-col">
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Project Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Ozempic Patient Sentiment Monitor"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea 
                  rows={4}
                  placeholder="What is the primary goal of this monitoring project?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Project Category</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all appearance-none">
                    <option>Drug Monitoring</option>
                    <option>Symptom Tracking</option>
                    <option>Condition Awareness</option>
                    <option>General Research</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Visibility</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button className="flex-1 px-4 py-2 bg-white rounded-lg text-xs font-bold text-indigo-600 shadow-sm">Internal</button>
                    <button className="flex-1 px-4 py-2 text-xs font-bold text-slate-500">Shared</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Configure Keywords to Monitor</h3>
              <p className="text-sm text-slate-500">These terms will be used to filter signals from all selected sources.</p>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                  placeholder="Add a keyword (e.g., dosage, nausea, fatigue)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                />
              </div>
              <button 
                onClick={addKeyword}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 p-6 bg-slate-50 rounded-2xl border border-slate-100 min-h-[100px]">
              {keywords.map((kw) => (
                <KeywordChip 
                  key={kw} 
                  label={kw} 
                  onRemove={() => removeKeyword(kw)} 
                  className="bg-white"
                />
              ))}
              {keywords.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center text-slate-400 space-y-2 italic">
                  <Info className="w-5 h-5 opacity-50" />
                  <span className="text-xs">No keywords added yet</span>
                </div>
              )}
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Sparkles className="w-4 h-4" /> AI-suggested related terms
              </div>
              <div className="flex flex-wrap gap-2">
                {["Semaglutide", "Mounjaro", "Vomiting", "Insurance coverage", "Supply", "Availability"].map((suggest) => (
                  <button 
                    key={suggest}
                    onClick={() => !keywords.includes(suggest) && setKeywords([...keywords, suggest])}
                    className="px-3 py-1 bg-white border border-indigo-200 rounded-full text-xs text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                  >
                    + {suggest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
              <SourceConfigCard 
                name="X (Globe)" 
                icon={Globe} 
                iconColor="text-sky-500"
                defaultEnabled 
              />
              <SourceConfigCard 
                name="Reddit" 
                icon={MessageCircle} 
                iconColor="text-orange-500"
                defaultEnabled 
              />
              <SourceConfigCard 
                name="Quora" 
                icon={Globe} 
                iconColor="text-rose-500" 
              />
              <SourceConfigCard 
                name="Specialized Forums" 
                icon={Rss} 
                iconColor="text-teal-500" 
              />
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-slate-400 group-hover:text-indigo-600">Add Custom Source</span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">Project Summary</h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">Ready to Launch</span>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Name</span>
                    <p className="text-sm font-semibold text-slate-700">Ozempic Patient Sentiment Monitor</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Keywords</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {keywords.slice(0, 5).map(kw => (
                        <span key={kw} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600 font-medium">{kw}</span>
                      ))}
                      {keywords.length > 5 && <span className="text-[10px] text-slate-400">+{keywords.length - 5} more</span>}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sources</span>
                    <p className="text-sm font-semibold text-slate-700">X (Globe), Reddit</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Volume</span>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <p className="text-sm font-bold text-slate-700">~1,200 signals/day</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-600">Model Insights</p>
                  <p className="text-[11px] text-slate-500">Sentiment analysis and safety extraction will run with 94% target confidence.</p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-base font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:translate-y-[-2px] transition-all active:scale-[0.98]">
              Launch Project
            </button>
          </div>
        )}

        <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-50">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              currentStep === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            )}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          {currentStep < steps.length && (
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SourceConfigCardProps {
  name: string;
  icon: React.ElementType;
  iconColor: string;
  defaultEnabled?: boolean;
}

function SourceConfigCard({ name, icon: Icon, iconColor, defaultEnabled = false }: SourceConfigCardProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <div className={cn(
      "border rounded-2xl p-6 transition-all duration-300",
      enabled ? "bg-white border-indigo-200 shadow-md ring-1 ring-indigo-50" : "bg-slate-50 border-slate-200 opacity-60"
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center", iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800">{name}</span>
        </div>
        <button 
          onClick={() => setEnabled(!enabled)}
          className={cn(
            "w-11 h-6 rounded-full relative transition-colors duration-200",
            enabled ? "bg-indigo-600" : "bg-slate-300"
          )}
        >
          <div className={cn(
            "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
            enabled ? "translate-x-5" : "translate-x-0"
          )} />
        </button>
      </div>

      {enabled && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latency</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {["Real-time", "Daily", "Weekly"].map((l) => (
                <button 
                  key={l}
                  className={cn(
                    "flex-1 py-1 text-[10px] font-bold rounded transition-all",
                    l === "Real-time" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Max results/crawl</label>
            <input 
              type="number" 
              defaultValue={500}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}

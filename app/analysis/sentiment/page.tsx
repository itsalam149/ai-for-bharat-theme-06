"use client";

import { Construction } from "lucide-react";

export default function AnalysisPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-amber-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-800">Analysis Module Under Construction</h3>
      <p className="text-slate-500 max-w-md mt-2">This specific analysis view is part of our upcoming Pro update. Stay tuned!</p>
    </div>
  );
}

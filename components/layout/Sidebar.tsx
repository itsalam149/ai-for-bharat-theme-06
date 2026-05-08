"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  Activity, 
  LayoutDashboard, 
  Rss, 
  FolderOpen, 
  Plus, 
  Zap, 
  BarChart2, 
  ShieldAlert, 
  TrendingUp, 
  Database, 
  Cpu, 
  Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Feed", href: "/feed", icon: Rss },
    ],
  },
  {
    title: "Projects",
    items: [
      { name: "All Projects", href: "/projects", icon: FolderOpen },
      { name: "Create Project", href: "/projects/new", icon: Plus },
    ],
  },
  {
    title: "Analysis",
    items: [
      { name: "Signals", href: "/analysis/signals", icon: Zap },
      { name: "Sentiment", href: "/analysis/sentiment", icon: BarChart2 },
      { name: "Safety Alerts", href: "/analysis/safety-alerts", icon: ShieldAlert },
      { name: "Timelines", href: "/analysis/timelines", icon: TrendingUp },
    ],
  },
  {
    title: "Administration",
    items: [
      { name: "Sources", href: "/admin/sources", icon: Database },
      { name: "Engines", href: "/admin/engines", icon: Cpu },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <span className="text-slate-800 font-bold text-lg tracking-tight">NEURAL HIVE</span>
      </div>

      <nav className="flex-1 px-4 space-y-8 mt-4">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isActive 
                        ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", isActive ? "text-indigo-600" : "text-slate-400")} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden relative">
              <Image 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-800 leading-none">Dr. Sarah Chen</span>
              <span className="text-xs text-slate-400 mt-1">Safety Lead</span>
            </div>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
}

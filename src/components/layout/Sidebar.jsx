import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, GitBranch, Users, FileText, Settings, ShieldAlert } from "lucide-react";
import { cn } from "../../lib/utils";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Repository Analysis", href: "/repository", icon: GitBranch },
    { name: "Contributors", href: "/contributors", icon: Users },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <div className="flex w-64 flex-col bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 h-screen fixed top-0 left-0 z-20">
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-700/50">
                <ShieldAlert className="h-8 w-8 text-blue-500 mr-3" />
                <span className="text-xl font-bold text-gradient">AIDetect</span>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pt-6 px-3">
                <nav className="flex-1 space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname.startsWith(item.href) && item.href !== "#";
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    isActive
                                        ? "bg-blue-600/10 text-blue-400 font-semibold"
                                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50",
                                    "group flex items-center rounded-lg px-3 py-2.5 text-sm transition-all"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-100",
                                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-auto mb-6 px-3">
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-xs text-slate-400 mb-2">System Status</div>
                        <div className="flex items-center justify-center text-sm font-medium text-emerald-400">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            All Systems Operational
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

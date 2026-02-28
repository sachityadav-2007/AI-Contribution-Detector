import React, { useState, useEffect } from "react";
import { Terminal, ShieldAlert, Activity, GitCommit, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/Badge";

const LOG_MESSAGES = [
    { text: "Commit a1b2c3d analyzed.", type: "info", icon: GitCommit },
    { text: "Identified high cyclomatic complexity block.", type: "warning", icon: Activity },
    { text: "AI suspected in sarah-code's recent commit.", type: "danger", icon: ShieldAlert },
    { text: "Risk score updated to 45%.", type: "info", icon: Activity },
    { text: "Automated transparency report generated.", type: "success", icon: FileText },
    { text: "Deep learning model matched LLM pattern signature.", type: "warning", icon: Activity },
    { text: "Commit 9f8e7d5 passed human-verification layer.", type: "success", icon: GitCommit },
    { text: "New PR #42 flagged for manual review.", type: "danger", icon: ShieldAlert },
];

export function LiveActivityFeed() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Add initial log
        setLogs([{ ...LOG_MESSAGES[0], id: Date.now() }]);

        const interval = setInterval(() => {
            setLogs((prev) => {
                const newLog = {
                    ...LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)],
                    id: Date.now()
                };
                // Keep only the last 6 logs
                return [newLog, ...prev].slice(0, 6);
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const getLogColor = (type) => {
        switch (type) {
            case "danger": return "text-red-400";
            case "warning": return "text-yellow-400";
            case "success": return "text-emerald-400";
            default: return "text-blue-400";
        }
    };

    return (
        <Card className="h-full border-blue-500/20 shadow-blue-500/10 relative overflow-hidden group">
            {/* Glow Effect */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <CardHeader className="border-b border-slate-800 bg-slate-900/40">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-slate-300">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    Live Activity Stream
                    <span className="relative flex h-2 w-2 ml-auto">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-[#0d1117] font-mono text-sm relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800"></div>
                <div className="flex flex-col h-[320px] overflow-hidden p-4">
                    <AnimatePresence initial={false}>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="flex items-start gap-4 py-2 relative z-10"
                            >
                                <div className="mt-0.5 rounded-full p-1 bg-slate-900 ring-4 ring-[#0d1117] flex-shrink-0">
                                    <log.icon className={`w-3 h-3 ${getLogColor(log.type)}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-xs text-slate-500 font-medium">
                                            {new Date(log.id).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </span>
                                        <Badge variant={log.type} className="text-[10px] px-1.5 py-0 h-4">
                                            {log.type.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <p className="text-slate-300 mt-0.5 truncate typing-animation">{log.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {/* Fade overlay for bottom string */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none"></div>
            </CardContent>
        </Card>
    );
}

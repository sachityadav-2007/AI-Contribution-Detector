import React, { useState } from "react";
import { Download, FileText, CheckCircle2, ShieldAlert, BarChart3, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { AnimatePresence, motion } from "framer-motion";

export function Reports() {
    const [downloadState, setDownloadState] = useState({ type: null, status: "idle" }); // type: 'pdf'|'csv', status: 'idle'|'loading'|'success'

    const handleDownload = (type) => {
        setDownloadState({ type, status: "loading" });

        // Simulate generation time
        setTimeout(() => {
            setDownloadState({ type, status: "success" });

            // Reset back to idle after showing success message
            setTimeout(() => {
                setDownloadState({ type: null, status: "idle" });
            }, 3000);
        }, 2000);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Transparency Reports</h1>
                    <p className="text-slate-400">Generate and export official audit logs for stakeholder review.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="gap-2 w-32 relative overflow-hidden"
                        onClick={() => handleDownload("csv")}
                        disabled={downloadState.status !== "idle"}
                    >
                        <AnimatePresence mode="wait">
                            {downloadState.type === "csv" && downloadState.status === "loading" ? (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Generating
                                </motion.div>
                            ) : downloadState.type === "csv" && downloadState.status === "success" ? (
                                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Done
                                </motion.div>
                            ) : (
                                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Export CSV
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                    <Button
                        className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-emerald-500/25 w-36 relative overflow-hidden"
                        onClick={() => handleDownload("pdf")}
                        disabled={downloadState.status !== "idle"}
                    >
                        <AnimatePresence mode="wait">
                            {downloadState.type === "pdf" && downloadState.status === "loading" ? (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Generating
                                </motion.div>
                            ) : downloadState.type === "pdf" && downloadState.status === "success" ? (
                                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Done
                                </motion.div>
                            ) : (
                                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>
            </div>

            {/* Global Success Banner */}
            <AnimatePresence>
                {downloadState.status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-16 right-0 z-50 bg-slate-800 border border-emerald-500/50 shadow-xl shadow-emerald-900/20 text-emerald-400 px-6 py-3 rounded-lg flex items-center gap-3"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="font-medium">Report downloaded successfully.</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <Card className="border-emerald-500/20 shadow-emerald-900/10 overflow-hidden relative group">
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                    <ShieldAlert className="w-64 h-64 text-emerald-500" />
                </div>

                <CardHeader className="pb-4">
                    <div className="flex justify-between items-center relative z-10">
                        <CardTitle className="text-2xl">Executive Summary</CardTitle>
                        <span className="text-sm font-medium text-slate-400 pb-1">Generated: Feb 28, 2026</span>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                            <h4 className="text-slate-400 font-medium text-sm text-center mb-2">Overall Repository Risk</h4>
                            <div className="flex items-center justify-center">
                                <span className="text-5xl font-bold text-emerald-400">Low</span>
                            </div>
                            <p className="text-xs text-center text-slate-500 mt-2">Passes compliance standards</p>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                            <h4 className="text-slate-400 font-medium text-sm text-center mb-2">AI Usage Rate</h4>
                            <div className="flex items-center justify-center">
                                <span className="text-5xl font-bold text-white">25<span className="text-2xl">%</span></span>
                            </div>
                            <p className="text-xs text-center text-slate-500 mt-2">Expected baseline: &lt; 30%</p>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                            <h4 className="text-slate-400 font-medium text-sm text-center mb-2">Total Scanned Commits</h4>
                            <div className="flex items-center justify-center gap-2 text-blue-400">
                                <BarChart3 className="w-8 h-8" />
                                <span className="text-5xl font-bold">14.2k</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Key Insights
                            </h3>
                            <ul className="space-y-3 pl-7 list-disc text-slate-300">
                                <li><strong className="text-slate-100">Healthy Baseline:</strong> Overall AI adoption is stable at 25%, well within acceptable organizational boundaries for productivity tooling.</li>
                                <li><strong className="text-slate-100">Isolated High-Adoption:</strong> One contributor (`chris-t`) accounts for 40% of all flagged AI commits. A review of these commits shows primarily boilerplate generation.</li>
                                <li><strong className="text-slate-100">Code Quality:</strong> Detected AI blocks exhibit high cyclomatic complexity but pass all native unit tests structure checks.</li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-400" /> Recommended Actions
                            </h3>
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-amber-200/90 text-sm">
                                <p className="mb-2"><strong>1. Code Review Focus:</strong> Assign senior reviewers to automatically verify pull requests where the commit AI-likelihood score exceeds 85%.</p>
                                <p><strong>2. Dependency Audit:</strong> Ensure AI-generated generic data tables do not rely on heavily outdated npm packages.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-sm text-slate-500 pt-8 pb-4">
                End of Report — ID: REP-2026-X89F2
            </div>
        </div>
    );
}

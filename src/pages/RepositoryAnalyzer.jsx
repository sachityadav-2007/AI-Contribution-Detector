import React, { useState, useEffect } from "react";
import { Search, GitBranch, ShieldCheck, FileText, Bot, AlertTriangle, GitCommit, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "";

const SCAN_STEPS = [
    "Connecting to GitHub...",
    "Fetching commits...",
    "Running AI detection...",
    "Analyzing code patterns...",
    "Generating AI report..."
];

export function RepositoryAnalyzer() {
    const navigate = useNavigate();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // State for direct text analysis
    const [textInput, setTextInput] = useState("");
    const [textAnalysisResult, setTextAnalysisResult] = useState(null);
    const [isTextAnalyzing, setIsTextAnalyzing] = useState(false);

    // State for repo scan
    const [repoUrl, setRepoUrl] = useState("https://github.com/example/demo-api");
    const [branch, setBranch] = useState("main");
    const [scanResults, setScanResults] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!repoUrl.trim()) return;

        setIsScanning(true);
        setScanResults(null);
        setScanError(null);

        try {
            console.log("Calling /scan-repo with", repoUrl, branch);
            // Call /scan-repo with the GitHub repo URL and branch as query params
            const res = await fetch(`${API_URL}/scan-repo?repoUrl=${encodeURIComponent(repoUrl)}&branch=${encodeURIComponent(branch)}`);
            const data = await res.json();

            if (!res.ok) {
                setScanError(data.error || "Failed to scan repository");
            } else {
                setScanResults(data.commits);
            }
        } catch (err) {
            console.error(err);
            setScanError("Could not connect to backend");
        } finally {
            setIsScanning(false);
        }
    };

    useEffect(() => {
        if (isAnalyzing) {
            // Animate progress up to 100 over ~5-6 seconds
            const duration = 6000;
            const intervalDelay = 50; // Update every 50ms
            const increment = 100 / (duration / intervalDelay);

            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return prev + increment;
                });
            }, intervalDelay);

            // Change step text roughly evenly throughout the duration
            const stepDuration = duration / SCAN_STEPS.length;
            const stepInterval = setInterval(() => {
                setCurrentStepIndex((prev) => {
                    if (prev >= SCAN_STEPS.length - 1) {
                        clearInterval(stepInterval);
                        return SCAN_STEPS.length - 1;
                    }
                    return prev + 1;
                });
            }, stepDuration);

            // Finish and redirect
            const timeout = setTimeout(() => {
                setIsAnalyzing(false);
                navigate("/dashboard");
            }, duration + 500); // give a little extra time at 100%

            return () => {
                clearInterval(progressInterval);
                clearInterval(stepInterval);
                clearTimeout(timeout);
            };
        }
    }, [isAnalyzing, navigate]);
    const handleTextAnalyze = async (e) => {
        e.preventDefault();

        if (!textInput.trim()) return;

        setIsTextAnalyzing(true);
        setTextAnalysisResult(null);

        try {
            const response = await fetch(`${API_URL}/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: textInput })
            });

            const data = await response.json();
            console.log("API response:", data);
            setTextAnalysisResult(data);
        } catch (err) {
            console.error(err);
            setTextAnalysisResult({
                aiScore: 0,
                reason: "Could not connect to backend",
            });
        } finally {
            setIsTextAnalyzing(false);
        }
    };

    return (
        <div className="space-y-8 relative">
            {/* Full-screen Loading Overlay Overlaying everything if isAnalyzing is true */}
            <AnimatePresence>
                {isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b1120] backdrop-blur-3xl overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full px-6">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="mb-8 relative"
                            >
                                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-40 rounded-full h-24 w-24"></div>
                                <ShieldCheck className="h-24 w-24 text-blue-400 relative z-10 drop-shadow-lg" />
                            </motion.div>

                            <h2 className="text-3xl font-bold text-white mb-6 text-gradient bg-clip-text">Deep Scanning Repository Analyzer</h2>

                            {/* Progress Bar Container */}
                            <div className="w-full bg-slate-800/80 rounded-full h-3 mb-6 relative overflow-hidden ring-1 ring-slate-700/50 shadow-inner">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400"
                                    style={{ width: `${progress}%` }}
                                // animate the width smoothly
                                />
                                {/* Scanning light streak */}
                                <div className="absolute top-0 bottom-0 w-20 bg-white/30 blur-sm skew-x-[-20deg] animate-[shimmer_1.5s_infinite]"></div>
                            </div>

                            <div className="flex justify-between w-full text-slate-300 font-medium mb-10">
                                <span className="text-sm font-mono">{SCAN_STEPS[currentStepIndex]}</span>
                                <span className="text-sm font-mono text-blue-400 tabular-nums">{Math.min(Math.round(progress), 100)}%</span>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xs text-slate-500 uppercase tracking-widest"
                            >
                                Running LLM Fingerprinting Algorithms...
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Repository Analyzer</h1>
                <p className="text-slate-400">Scan any public or private repository for AI-generated code patterns.</p>
            </div>

            <Card className="border-blue-500/20 shadow-blue-900/10 hover:shadow-blue-500/10 transition-shadow">
                <CardHeader>
                    <CardTitle className="text-xl">Scan Configuration</CardTitle>
                    <CardDescription>Enter the repository details you want to analyze.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1 space-y-2 w-full">
                            <label htmlFor="repo" className="text-sm font-medium text-slate-300">GitHub Repository URL</label>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="url"
                                    id="repo"
                                    required
                                    placeholder="https://github.com/organization/repository"
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 shadow-inner"
                                    value={repoUrl}
                                    onChange={(e) => setRepoUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-64 space-y-2">
                            <label htmlFor="branch" className="text-sm font-medium text-slate-300">Target Branch</label>
                            <div className="relative group">
                                <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    id="branch"
                                    placeholder="e.g., main, develop"
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 shadow-inner"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={isScanning} className="w-full sm:w-auto mt-4 sm:mt-0 whitespace-nowrap shadow-lg hover:shadow-blue-500/25">
                            {isScanning ? (
                                <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Scanning...</span>
                            ) : "Start Analysis Scan"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Scan error banner */}
            {scanError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    {scanError}
                </div>
            )}

            {/* Commit scan results */}
            {scanResults && scanResults.length > 0 && (() => {
                // Compute distribution data
                const distributionData = [
                    { name: 'Low Risk', count: 0, color: '#34d399' },
                    { name: 'Medium', count: 0, color: '#facc15' },
                    { name: 'High Risk', count: 0, color: '#f87171' }
                ];

                scanResults.forEach(c => {
                    if (c.aiScore > 70) distributionData[2].count++;
                    else if (c.aiScore > 30) distributionData[1].count++;
                    else distributionData[0].count++;
                });

                return (
                    <Card className="border-blue-500/20">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <GitCommit className="h-5 w-5 text-blue-400" />
                                Commit Scan Results
                            </CardTitle>
                            <CardDescription>{scanResults.length} commits analysed from the repository.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* AI Score Distribution Chart */}
                            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                <h3 className="text-sm font-semibold text-slate-300 mb-4">AI Score Distribution</h3>
                                <div className="h-48 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={distributionData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                            <Tooltip
                                                cursor={{ fill: '#334155', opacity: 0.4 }}
                                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                                                formatter={(value) => [value, 'Commits']}
                                            />
                                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                {distributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-900/50">
                                <table className="w-full text-left text-sm text-slate-300">
                                    <thead className="bg-slate-800/80 text-xs uppercase text-slate-400">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Commit Message</th>
                                            <th className="px-4 py-3 font-medium w-24">AI Score</th>
                                            <th className="px-4 py-3 font-medium w-32">Risk Level</th>
                                            <th className="px-4 py-3 font-medium w-1/3">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {[...scanResults]
                                            .sort((a, b) => b.aiScore - a.aiScore)
                                            .slice(0, 20)
                                            .map((commit, i) => {
                                                const isHigh = commit.aiScore > 70;
                                                const isMid = commit.aiScore > 30;
                                                return (
                                                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                                                        <td className="px-4 py-3 font-medium text-slate-200">
                                                            {commit.message}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className={`font-bold ${isHigh ? "text-red-400" : isMid ? "text-yellow-400" : "text-emerald-400"}`}>
                                                                {commit.aiScore}%
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${isHigh ? "text-red-400 bg-red-500/20" : isMid ? "text-yellow-400 bg-yellow-500/20" : "text-emerald-400 bg-emerald-500/20"
                                                                }`}>
                                                                {isHigh ? (
                                                                    <><AlertTriangle className="h-3 w-3" /> High Risk</>
                                                                ) : isMid ? (
                                                                    <><AlertTriangle className="h-3 w-3" /> Medium</>
                                                                ) : (
                                                                    <><ShieldCheck className="h-3 w-3" /> Low</>
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-xs text-slate-400">
                                                            <ul className="space-y-0.5">
                                                                {commit.reason.replace(/\.$/, "").split(/ and /i).map((point, idx) => (
                                                                    <li key={idx} className="flex items-start gap-1.5">
                                                                        <span className={`mt-1 h-1 w-1 rounded-full flex-shrink-0 ${isHigh ? 'bg-red-400' : isMid ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
                                                                        {point.trim()}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                );
            })()}

            {/* Text / Code Snippet Analyzer */}
            <Card className="border-purple-500/20 shadow-purple-900/10 hover:shadow-purple-500/10 transition-shadow">
                <CardHeader>
                    <CardTitle className="text-xl">Direct Code / Text Analysis</CardTitle>
                    <CardDescription>Paste a commit message or code snippet to check for AI generation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleTextAnalyze} className="flex flex-col gap-4">
                        <div className="w-full space-y-2">
                            <label htmlFor="textInput" className="text-sm font-medium text-slate-300">Input Text or Code</label>
                            <div className="relative group">
                                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                                <textarea
                                    id="textInput"
                                    required
                                    rows={5}
                                    placeholder="Paste your commit message or code block here..."
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-500 shadow-inner resize-y"
                                />
                            </div>
                        </div>
                        {/* Analyze Button */}
                        <Button
                            type="submit"
                            disabled={isTextAnalyzing}
                            className="w-full sm:w-auto self-start bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/25"
                        >
                            {isTextAnalyzing ? "Analyzing..." : "Analyze"}
                        </Button>
                    </form>

                    {/* Result Card below the button */}
                    {textAnalysisResult && (
                        <div className="mt-6 p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col md:flex-row gap-6 items-start">
                            {/* AI Score column */}
                            <div className="flex flex-col items-center justify-center min-w-[120px]">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Score</h3>
                                <div className={`text-4xl font-bold ${textAnalysisResult.aiScore > 70 ? 'text-red-400' : textAnalysisResult.aiScore > 30 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                                    {textAnalysisResult.aiScore}%
                                </div>
                            </div>
                            {/* Reason column */}
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                    {textAnalysisResult.aiScore > 70 ? (
                                        <AlertTriangle className="h-5 w-5 text-red-400" />
                                    ) : textAnalysisResult.aiScore > 30 ? (
                                        <Bot className="h-5 w-5 text-yellow-400" />
                                    ) : (
                                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                    )}
                                    <h4 className="text-lg font-medium text-slate-200">Analysis Result</h4>
                                </div>
                                {/* "Why this score?" bullet list */}
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Why this score?</p>
                                    <ul className="space-y-1">
                                        {textAnalysisResult.reason
                                            // Split on " and " or period to get individual reasons
                                            .replace(/\.$/, "")
                                            .split(/ and /i)
                                            .map((point, i) => (
                                                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                                    <span className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${textAnalysisResult.aiScore > 70 ? 'bg-red-400' : textAnalysisResult.aiScore > 30 ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
                                                    {point.trim()}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Visual cue to let them know table will show up later or is historical data */}
            <div className="p-8 text-center text-slate-500 bg-slate-800/20 rounded-xl border border-dashed border-slate-700">
                <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-sm">Initiate a scan above to view a detailed commit breakdown and anomaly scores.</p>
            </div>

        </div>
    );
}

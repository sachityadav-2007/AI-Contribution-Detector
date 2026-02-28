import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, AlertTriangle, ShieldCheck, FileCode } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export function CommitDetailPopup({ isOpen, onClose, commit }) {
    if (!commit) return null;

    const isHighRisk = commit.score > 70;
    const isMediumRisk = commit.score > 30 && commit.score <= 70;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-[5%] z-50 w-full max-w-3xl -translate-x-1/2 rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-bold tracking-tight text-white">{commit.hash}</h2>
                                    {isHighRisk ? (
                                        <Badge variant="danger" className="gap-1 animate-pulse">
                                            <AlertTriangle className="h-3 w-3" /> High Risk (AI)
                                        </Badge>
                                    ) : isMediumRisk ? (
                                        <Badge variant="warning" className="gap-1">
                                            <Bot className="h-3 w-3" /> Medium Risk
                                        </Badge>
                                    ) : (
                                        <Badge variant="success" className="gap-1">
                                            <ShieldCheck className="h-3 w-3" /> Human Likely
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-slate-400 font-medium">Author: <span className="text-slate-200">{commit.author}</span></p>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 mb-6">
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Commit Message</h3>
                                <p className="text-slate-200 text-sm leading-relaxed">{commit.message}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col justify-center">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">AI Likelihood Score</h3>
                                <div className="flex items-center gap-4">
                                    <span className={`text-4xl font-bold ${isHighRisk ? 'text-red-400' : isMediumRisk ? 'text-yellow-400' : 'text-green-400'}`}>
                                        {commit.score}%
                                    </span>
                                    <p className="text-sm text-slate-300 leading-snug">{commit.reason}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-300 mb-2">
                                <FileCode className="h-5 w-5" />
                                <h3 className="text-base font-semibold">Code Preview</h3>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-[#0d1117] text-sm font-mono text-slate-300">
                                <div className="flex items-center px-4 py-2 border-b border-slate-700/50 bg-slate-800/80 text-xs text-slate-400">
                                    src/components/Authentication.tsx
                                </div>
                                <div className="p-4 overflow-x-auto">
                                    <pre className="origin-top-left">
                                        <code>
                                            <span className="text-red-400">- const authenticateUser = (user, pass) =&gt; {'{'}</span><br />
                                            <span className="text-green-400">+ async function authenticateUser(credentials: Credentials): Promise&lt;AuthResponse&gt; {'{'}</span><br />
                                            <span className="text-green-400">+   try {'{'}</span><br />
                                            <span className="text-green-400">+     const {'{'} username, password {'}'} = credentials;</span><br />
                                            <span className="text-green-400">+     // Pattern match: Typical LLM generated robust error handling block</span><br />
                                            <span className="text-slate-500">      const res = await api.post('/login', {'{'} username, password {'}'});</span><br />
                                            <span className="text-slate-500">      return res.data;</span><br />
                                            <span className="text-green-400">+   {'}'} catch (error) {'{'}</span><br />
                                            <span className="text-green-400">+     logger.error('Authentication failed', error);</span><br />
                                            <span className="text-green-400">+     throw new AuthenticationError('Invalid credentials');</span><br />
                                            <span className="text-green-400">+   {'}'}</span><br />
                                            <span className="text-slate-500">  {'}'}</span>
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <Button variant="outline" onClick={onClose}>Close</Button>
                            <Button onClick={() => window.open(`https://github.com/example/repo/commit/${commit.hash}`, '_blank')}>View on GitHub</Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

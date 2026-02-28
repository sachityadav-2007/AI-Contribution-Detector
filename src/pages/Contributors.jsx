import React from "react";
import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { motion } from "framer-motion";

const MOCK_CONTRIBUTORS = [
    { id: 1, name: "alex-dev", totalCommits: 342, aiCommits: 185, aiPercentage: 54, trend: "up", avatar: "a" },
    { id: 2, name: "sarah-code", totalCommits: 410, aiCommits: 41, aiPercentage: 10, trend: "down", avatar: "s" },
    { id: 3, name: "mike-j", totalCommits: 285, aiCommits: 71, aiPercentage: 25, trend: "up", avatar: "m" },
    { id: 4, name: "emma-w", totalCommits: 156, aiCommits: 12, aiPercentage: 8, trend: "flat", avatar: "e" },
    { id: 5, name: "david-b", totalCommits: 98, aiCommits: 4, aiPercentage: 4, trend: "down", avatar: "d" },
    { id: 6, name: "chris-t", totalCommits: 64, aiCommits: 55, aiPercentage: 86, trend: "up", avatar: "c" },
];

export function Contributors() {
    const getProgressColor = (percent) => {
        if (percent > 50) return "bg-red-500";
        if (percent > 20) return "bg-yellow-500";
        return "bg-emerald-500";
    };

    const getTrendIcon = (trend) => {
        if (trend === "up") return <TrendingUp className="w-4 h-4 text-red-400" />;
        if (trend === "down") return <TrendingDown className="w-4 h-4 text-emerald-400" />;
        return <Minus className="w-4 h-4 text-slate-400" />;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Team Analytics</h1>
                <p className="text-slate-400">Monitor AI code generation usage across individual team members.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Active Contributors</p>
                                <h3 className="text-2xl font-bold text-white">24</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Highest AI Adopter</p>
                                <h3 className="text-2xl font-bold text-white">chris-t (86%)</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Contributor Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-900/80 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-lg">Contributor</th>
                                    <th className="px-6 py-4 text-right">Total Commits</th>
                                    <th className="px-6 py-4 text-right">AI Suspected</th>
                                    <th className="px-6 py-4 w-64 text-center">AI Usage Share</th>
                                    <th className="px-6 py-4 rounded-tr-lg">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_CONTRIBUTORS.sort((a, b) => b.aiPercentage - a.aiPercentage).map((user, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={user.id}
                                        className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-slate-700 flex items-center justify-center text-sm font-bold uppercase text-blue-400">
                                                    {user.avatar}
                                                </div>
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-300 font-mono text-sm">
                                            {user.totalCommits}
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-300 font-mono text-sm">
                                            {user.aiCommits}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 justify-center">
                                                <span className="w-10 text-right font-medium text-slate-300">{user.aiPercentage}%</span>
                                                <div className="w-full bg-slate-700 rounded-full h-2 min-w-[120px]">
                                                    <div
                                                        className={`h-2 rounded-full ${getProgressColor(user.aiPercentage)}`}
                                                        style={{ width: `${user.aiPercentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                {getTrendIcon(user.trend)}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

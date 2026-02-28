import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { Activity, ShieldAlert, GitCommit, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { motion } from "framer-motion";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";
import { LiveActivityFeed } from "../components/dashboard/LiveActivityFeed";
import { AIRiskGauge } from "../components/dashboard/AIRiskGauge";

// Mock Data
const lineChartData = [
    { month: "Jan", ai: 12, human: 150 },
    { month: "Feb", ai: 18, human: 140 },
    { month: "Mar", ai: 25, human: 130 },
    { month: "Apr", ai: 40, human: 160 },
    { month: "May", ai: 65, human: 155 },
    { month: "Jun", ai: 85, human: 165 },
    { month: "Jul", ai: 120, human: 170 },
];

const pieChartData = [
    { name: "Human Commits", value: 75 },
    { name: "AI Commits", value: 25 },
];

const barChartData = [
    { name: "alex-dev", suspected: 45, total: 120 },
    { name: "sarah-code", suspected: 30, total: 95 },
    { name: "mike-j", suspected: 25, total: 200 },
    { name: "emma-w", suspected: 15, total: 150 },
    { name: "david-b", suspected: 5, total: 80 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

const stats = [
    {
        title: "Total Commits Analyzed",
        value: "14,235",
        change: "+12.5%",
        trend: "up",
        icon: GitCommit,
    },
    {
        title: "AI Suspected",
        value: "3,558",
        change: "+24.2%",
        trend: "up",
        icon: Activity,
    },
    {
        title: "AI Usage Share",
        value: "25%",
        change: "+4.1%",
        trend: "up",
        icon: Users,
    }
];

export function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
                    <p className="text-slate-400 mt-1">Analytics and insights for AI-generated code across your repositories.</p>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <Card className="group hover:bg-slate-800/60 transition-colors relative overflow-hidden h-full flex flex-col justify-between">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:via-blue-500/5 transition-all duration-500"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                                    {stat.title}
                                </CardTitle>
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                                    <stat.icon className={`h-4 w-4 text-blue-400`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white tracking-tight">
                                    <AnimatedNumber value={stat.value} />
                                </div>
                                <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-emerald-400" : "text-amber-400"}`}>
                                    <span className="font-semibold">{stat.change}</span> from last month
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    {/* 4th stat card swapped with sleek Risk Gauge */}
                    <AIRiskGauge score={45} />
                </motion.div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {/* Line Chart */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-2 group hover:shadow-lg hover:shadow-purple-900/10 transition-all border-slate-700/50">
                    <CardHeader>
                        <CardTitle>AI vs Human Usage Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="human" name="Human Expected" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#0f172a" }} />
                                    <Line type="monotone" dataKey="ai" name="AI Detected" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2, fill: "#0f172a" }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Live Activity Feed */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2">
                    <LiveActivityFeed />
                </div>

                {/* Bar Chart */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Top Contributors Flagged</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        cursor={{ fill: '#334155', opacity: 0.2 }}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="total" name="Total Commits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="suspected" name="AI Suspected" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="col-span-1 md:col-span-1 border-slate-700/50 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Global Codebase Share</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full flex flex-col items-center justify-center">
                            <ResponsiveContainer width="100%" height="90%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

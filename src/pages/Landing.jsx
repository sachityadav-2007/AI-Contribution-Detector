import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Activity, ShieldCheck, Users, FileBarChart, Zap } from "lucide-react";
import { Button } from "../components/ui/Button";

const features = [
    {
        name: "AI Commit Detection",
        description: "Scan commit messages and code diffs to instantly flag artificial intelligence contributions.",
        icon: Activity,
    },
    {
        name: "Code Pattern Analysis",
        description: "Deep learning models identify structural patterns typical of LLM-generated code blocks.",
        icon: Zap,
    },
    {
        name: "Contributor Analytics",
        description: "Track the AI usage trends of individual team members and monitor shifts over time.",
        icon: Users,
    },
    {
        name: "Likelihood Scoring",
        description: "Every commit receives a detailed confidence score, explaining exactly why it was flagged.",
        icon: ShieldCheck,
    },
    {
        name: "Transparency Reports",
        description: "Generate comprehensive audit logs for stakeholders to prove codebase authenticity.",
        icon: FileBarChart,
    },
];

export function Landing() {
    return (
        <div className="bg-[#0b1120] min-h-screen relative overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
            </div>

            {/* Navigation */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8 text-blue-500" />
                            <span className="text-xl font-bold text-gradient">AIDetect</span>
                        </a>
                    </div>
                    <div className="flex gap-x-4 justify-end">
                        <Link to="/dashboard">
                            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </nav>
            </header>

            <main>
                {/* Hero section */}
                <div className="relative isolate pt-32 sm:pt-40 lg:pt-48 pb-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="mb-8 flex justify-center">
                                    <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-400 ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-pointer backdrop-blur-sm bg-white/5">
                                        Announcing our latest model update. <a href="#" className="font-semibold text-blue-400"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></a>
                                    </span>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                                    Detect AI-Generated <br />
                                    <span className="text-gradient">Code & Commits</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-slate-300">
                                    The ultimate platform to analyze GitHub repositories. Uncover artificial intelligence usage, track contributor trends, and generate comprehensive codebase transparency reports.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link to="/dashboard">
                                        <Button size="lg" className="gap-2 group">
                                            <Activity className="w-5 h-5 group-hover:block hidden transition-all" />
                                            Start Free Analysis
                                        </Button>
                                    </Link>
                                    <Link to="/dashboard">
                                        <Button variant="outline" size="lg">
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="mt-16 sm:mt-24"
                        >
                            {/* Mock Dashboard Image/Frame */}
                            <div className="relative rounded-xl bg-slate-900/50 p-2 ring-1 ring-inset ring-slate-800/50 lg:rounded-2xl lg:p-4 backdrop-blur-sm shadow-2xl shadow-blue-900/20">
                                <div className="rounded-md ring-1 ring-slate-800 bg-slate-950 overflow-hidden shadow-2xl h-[400px] sm:h-[600px] flex flex-col">
                                    {/* Fake browser header */}
                                    <div className="h-10 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    {/* Fake content */}
                                    <div className="flex-1 bg-gradient-to-b from-slate-900 to-[#0b1120] relative overflow-hidden flex items-center justify-center">
                                        <span className="text-slate-500 text-lg font-medium tracking-widest uppercase">System Dashboard Rendered Here</span>
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-50 block"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Feature section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-blue-400">Deploy faster, safer</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Everything you need to audit repositories
                        </p>
                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            Our cutting-edge pipeline processes millions of lines of code to evaluate authenticity and provide deep architectural insights into your codebase.
                        </p>
                    </div>
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.name}
                                    className="flex flex-col glass-card p-8 hover:bg-slate-800/60 transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
                                            <feature.icon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                                        <p className="flex-auto">{feature.description}</p>
                                        <p className="mt-6">
                                            <a href="#" className="text-sm font-semibold leading-6 text-blue-400 hover:text-blue-300 transition-colors">
                                                Learn more <span aria-hidden="true">→</span>
                                            </a>
                                        </p>
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-slate-500" />
                        <span className="text-lg font-bold text-slate-500">AIDetect</span>
                    </div>
                    <p className="text-sm text-slate-500">Hackathon Project 2026</p>
                </div>
            </footer>
        </div>
    );
}

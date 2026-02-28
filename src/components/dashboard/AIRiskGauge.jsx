import React from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { AnimatedNumber } from "../ui/AnimatedNumber";

export function AIRiskGauge({ score = 62 }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    // Arc is 270 degrees (75% of a full circle)
    const strokeDasharray = `${circumference * 0.75} ${circumference * 0.25}`;

    // To avoid animating back from 0, we can use a spring or tween
    const targetOffset = circumference - (score / 100) * (circumference * 0.75);
    const initialOffset = circumference;

    const getColor = (s) => {
        if (s < 30) return "#10b981"; // Medium Risk ? No, low = emerald
        if (s < 70) return "#f59e0b"; // Medium = amber
        return "#ef4444"; // High = red
    };

    const color = getColor(score);
    const shadowColor = color.replace(')', ', 0.5)').replace('rgb', 'rgba');

    return (
        <Card className="h-full flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
            <CardHeader className="relative z-10">
                <CardTitle className="text-center">Global Risk Score</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col items-center justify-center relative z-10" ref={ref}>
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Background Track */}
                    <svg className="absolute w-full h-full transform -rotate-[-135deg]" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="transparent"
                            stroke="#1e293b"
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={circumference * 0.25}
                        />
                    </svg>

                    {/* Animated Gauge Fill */}
                    <svg className="absolute w-full h-full transform -rotate-[-135deg]" style={{ filter: `drop-shadow(0 0 10px ${shadowColor})` }} viewBox="0 0 200 200">
                        <motion.circle
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="transparent"
                            stroke={color}
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                            initial={{ strokeDashoffset: initialOffset }}
                            animate={isInView ? { strokeDashoffset: targetOffset } : {}}
                            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-6">
                        <span className="text-4xl font-bold tracking-tight text-white mb-1">
                            <AnimatedNumber value={score.toString()} />
                        </span>
                        <span className={`text-sm font-semibold uppercase tracking-wider`} style={{ color }}>
                            {score < 30 ? "Low Risk" : score < 70 ? "Medium Risk" : "High Risk"}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

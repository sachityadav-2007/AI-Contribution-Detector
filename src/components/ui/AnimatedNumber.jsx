import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export function AnimatedNumber({ value }) {
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        const node = nodeRef.current;

        let endValue = value;
        let suffix = "";

        if (typeof value === "string") {
            if (value.includes('%')) {
                suffix = "%";
                endValue = Number(value.replace('%', ''));
            } else if (value.includes(',')) {
                endValue = Number(value.replace(/,/g, ''));
            } else if (["High", "Medium", "Low"].includes(value)) {
                node.textContent = value;
                return;
            } else {
                endValue = Number(value);
            }
        }

        if (isNaN(endValue)) {
            node.textContent = value;
            return;
        }

        const controls = animate(0, endValue, {
            duration: 2.5,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
            onUpdate(v) {
                if (suffix === "%") {
                    node.textContent = `${Math.round(v)}${suffix}`;
                } else if (typeof value === 'string' && value.includes(',')) {
                    node.textContent = new Intl.NumberFormat('en-US').format(Math.round(v));
                } else {
                    node.textContent = Math.round(v).toString();
                }
            },
        });

        return () => controls.stop();
    }, [value, isInView]);

    return <span ref={nodeRef}>{typeof value === "string" && ["High", "Medium", "Low"].includes(value) ? value : "0"}</span>;
}

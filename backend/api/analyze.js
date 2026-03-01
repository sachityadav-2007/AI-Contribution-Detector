// Vercel Serverless Function for POST /api/analyze

const ALLOWED_ORIGINS = [
    "https://ai-contribution-detector.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
];

function setCorsHeaders(req, res) {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        // Allow any *.vercel.app subdomain (preview deploys)
        if (origin && origin.endsWith(".vercel.app")) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default function handler(req, res) {
    setCorsHeaders(req, res);

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { text = "" } = req.body || {};
    const reasons = [];
    let aiScore = 50;

    // AI-style keywords → +20
    const aiKeywords = ["refactor", "optimize", "scalability", "improve architecture"];
    if (aiKeywords.some((kw) => text.toLowerCase().includes(kw))) {
        aiScore += 20;
        reasons.push("AI-style wording detected");
    }

    // Short text (< 10 words) → +10
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 10) {
        aiScore += 10;
        reasons.push("Short commit message");
    }

    // Emojis → -20
    const emojiRegex = /\p{Emoji}/u;
    if (emojiRegex.test(text)) {
        aiScore -= 20;
        reasons.push("Emoji usage detected (less likely AI)");
    }

    aiScore = Math.max(0, Math.min(100, aiScore));

    const reason =
        reasons.length > 0
            ? reasons.join(" and ") + "."
            : "No strong AI indicators found.";

    res.json({ aiScore, reason });
}

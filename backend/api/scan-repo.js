// Vercel Serverless Function for GET /api/scan-repo

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
        if (origin && origin.endsWith(".vercel.app")) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function scoreText(text) {
    const reasons = [];
    let aiScore = 50;

    const aiKeywords = ["refactor", "optimize", "scalability", "improve architecture"];
    if (aiKeywords.some((kw) => text.toLowerCase().includes(kw))) {
        aiScore += 20;
        reasons.push("AI-style wording detected");
    }

    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 10) {
        aiScore += 10;
        reasons.push("Short commit message");
    }

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

    return { aiScore, reason };
}

export default async function handler(req, res) {
    setCorsHeaders(req, res);

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { repoUrl, branch } = req.query;

    if (!repoUrl) {
        return res.status(400).json({ error: "Missing repoUrl query param" });
    }

    // Parse owner/repo from the GitHub URL
    let owner, repoName;
    try {
        const url = new URL(repoUrl);
        const parts = url.pathname.replace(/^\//, "").split("/");
        owner = parts[0];
        repoName = parts[1];
        if (!owner || !repoName) throw new Error("Missing owner or repo");
    } catch {
        return res.status(400).json({ error: "Invalid GitHub repository URL" });
    }

    let apiUrl = `https://api.github.com/repos/${owner}/${repoName}/commits?per_page=20`;
    if (branch && branch.trim() !== "") {
        apiUrl += `&sha=${encodeURIComponent(branch.trim())}`;
    }

    try {
        const ghRes = await fetch(apiUrl, {
            headers: { Accept: "application/vnd.github+json" },
        });

        if (!ghRes.ok) {
            const msg =
                ghRes.status === 404
                    ? "Repository or branch not found. Make sure it is public."
                    : `GitHub API error: ${ghRes.status}`;
            return res.status(ghRes.status).json({ error: msg });
        }

        const commits = await ghRes.json();

        const results = commits.map((c) => {
            const message = c.commit.message.split("\n")[0];
            const { aiScore, reason } = scoreText(message);
            return { message, aiScore, reason };
        });

        res.json({
            repo: repoName,
            branch: branch || "default",
            commits: results,
        });
    } catch (err) {
        console.error("scan-repo error:", err);
        res.status(500).json({ error: "Failed to fetch commits from GitHub" });
    }
}

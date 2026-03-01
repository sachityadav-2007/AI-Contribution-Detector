import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ai-contribution-detector.vercel.app"
    ]
}));
app.use(express.json());

app.post("/analyze", (req, res) => {
    console.log("Received:", req.body);

    const { text = "" } = req.body;
    const reasons = [];

    // Start at 50
    let aiScore = 50;

    // Check for AI-style keywords → +20
    const aiKeywords = ["refactor", "optimize", "scalability", "improve architecture"];
    const hasAiKeywords = aiKeywords.some((kw) => text.toLowerCase().includes(kw));
    if (hasAiKeywords) {
        aiScore += 20;
        reasons.push("AI-style wording detected");
    }

    // Short text (fewer than 10 words) → +10
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 10) {
        aiScore += 10;
        reasons.push("Short commit message");
    }

    // Contains emojis → -20
    const emojiRegex = /\p{Emoji}/u;
    if (emojiRegex.test(text)) {
        aiScore -= 20;
        reasons.push("Emoji usage detected (less likely AI)");
    }

    // Clamp between 0 and 100
    aiScore = Math.max(0, Math.min(100, aiScore));

    const reason =
        reasons.length > 0
            ? reasons.join(" and ") + "."
            : "No strong AI indicators found.";

    res.json({ aiScore, reason });
});

// Helper: run the same scoring logic on a commit message string
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
    const reason = reasons.length > 0
        ? reasons.join(" and ") + "."
        : "No strong AI indicators found.";

    return { aiScore, reason };
}

// GET /scan-repo?repoUrl=https://github.com/owner/repo
// Fetches last 20 commits from GitHub public API and scores each one
app.get("/scan-repo", async (req, res) => {
    const { repoUrl, branch } = req.query;
    console.log("Received /scan-repo request:", { repoUrl, branch });

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
        // Fetch commits from GitHub public API
        const ghRes = await fetch(apiUrl, {
            headers: { "Accept": "application/vnd.github+json" }
        });

        if (!ghRes.ok) {
            const msg = ghRes.status === 404
                ? "Repository or branch not found. Make sure it is public."
                : `GitHub API error: ${ghRes.status}`;
            return res.status(ghRes.status).json({ error: msg });
        }

        const commits = await ghRes.json();

        // Score each commit message using existing logic
        const results = commits.map((c) => {
            const message = c.commit.message.split("\n")[0]; // first line only
            const { aiScore, reason } = scoreText(message);
            return { message, aiScore, reason };
        });

        res.json({
            repo: repoName,
            branch: branch || "default",
            commits: results
        });
    } catch (err) {
        console.error("scan-repo error:", err);
        res.status(500).json({ error: "Failed to fetch commits from GitHub" });
    }
});

app.listen(port, () => {
    console.log("Server running on port 5001");
});

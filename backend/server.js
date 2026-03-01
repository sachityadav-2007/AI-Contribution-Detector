const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5175" }));
app.use(express.json());

app.post("/analyze", (req, res) => {
    console.log("Received:", req.body);
    res.json({
        aiScore: 42,
        reason: "Backend working!"
    });
});

app.listen(5001, "127.0.0.1", () => {
    console.log("Server running on port 5001");
});
// server.js (CommonJS version)
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// Route for checking code
app.post("/check-code", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-r1:7b",
        prompt: `You are a friendly coding mentor. Check this code and explain in a simple way:\n\n${code}`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ feedback: data.response || "No feedback from DeepSeek." });
  } catch (error) {
    console.error("❌ Ollama error:", error.message);
    res.status(500).json({ feedback: "Error checking code with DeepSeek." });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

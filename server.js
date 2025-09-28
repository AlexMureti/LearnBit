app.use(bodyParser.json());
app.use(express.static("public"));

// 👉 route that checks code
app.post("/check-code", async (req, res) => {
  // take the code the user sent
  let userCode = req.body.code;

  try {
    // ask Ollama for feedback
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-coder:1.3b", // model we want to use
        prompt: `You are a friendly coding mentor. Check this code,, make sure its correct and nothing is lacking especially semicolons and commas and other punctuations and explain simply:\n\n${userCode}`,
        stream: false, // we want one answer, not pieces
      }),
    });

    // if Ollama has an error
    if (!response.ok) {
      throw new Error("Ollama error: " + response.status);
    }
    
    // read Ollama’s answer
    const data = await response.json();

    // send answer back to browser
    res.json({
      feedback: data.response || "⚠️ No feedback from Ollama.",
    });
  } catch (error) {
    console.error("Problem talking to Ollama:", error.message);
    res.status(500).json({
      feedback: "Could not check code with Ollama.",
    });
  }
});

// 👉 start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("🚀 Server is running at http://localhost:" + PORT);
});

// server.js
// Connects the HTML page to the server (server.js)
// Jobs:
// 1. Send the code you type (or later, speak) to the server
// 2. Show feedback in the feedback box
// 3. Speak the feedback out loud

// 1. bring in libraries
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

// 2. make the express app
const app = express();

// 3. middlewares = things that run before routes
app.use(bodyParser.json()); // lets us read JSON
app.use(express.static("public")); // serve files in "public" folder

// 4. route that checks code
app.post("/check-code", async (req, res) => {
  // take the code the user sent
  let userCode = req.body.code;

  try {
    // ask Ollama for feedback
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "learnbit", // model we want to use
        prompt: `You are a friendly coding mentor.Learn about the user's needsg.Get to know them, then rquest them to paste their code so you check for errors and bugs. If there are any,address the errors andd advice them on areas to work on and materials to use. make sure it’s correct and nothing is missing (semicolons, commas, punctuation). Explain simply:\n\n${userCode}`,
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
      feedback: data.response || " No feedback from Ollama.",
    });
  } catch (error) {
    console.error("Problem talking to Ollama:", error.message);
    res.status(500).json({
      feedback: "Could not check code with Ollama.",
    });
  }
});

// 5. start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});

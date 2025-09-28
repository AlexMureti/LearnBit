// script.js
// This file connects the simple HTML page to the server (server.js).
// It has two main jobs:
// 1. Send the code you type (or later, speak) to the server
// 2. Show the feedback in the feedback box

// function that sends the code to the server
async function checkCode() {
  // grab the text area
  const codeBox = document.getElementById("code");
  // grab the feedback div
  const feedbackBox = document.getElementById("feedback");
  // grab the progress list
  const progressList = document.getElementById("progress");

  // take what the user typed
  let userCode = codeBox.value.trim();

  // if nothing typed, show message
  if (!userCode) {
    feedbackBox.textContent = "⚠️ Please type some code first.";
    return;
  }

  // show waiting message
  feedbackBox.textContent = "⏳ Checking your code...";

  try {
    // send request to our server
    const response = await fetch("/check-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: userCode }),
    });

    // if server says error
    if (!response.ok) {
      feedbackBox.textContent = "❌ Server problem: " + response.status;
      return;
    }

    // read answer as JSON
    const data = await response.json();

    // show the feedback
    feedbackBox.textContent = data.feedback || "⚠️ No feedback from mentor.";

    // also add this to "My Progress" list
    const newItem = document.createElement("li");
    newItem.textContent = "You checked some code: " + userCode.slice(0, 30) + "...";
    progressList.appendChild(newItem);
  } catch (error) {
    console.error("❌ Error talking to server:", error);
    feedbackBox.textContent = "❌ Could not reach server. Is it running?";
  }
}

// function for "Speak Code" button (not real yet, just a placeholder)
function listenToUser() {
  const feedbackBox = document.getElementById("feedback");
  feedbackBox.textContent = "🎤 Voice input not ready yet. Coming soon!";
}

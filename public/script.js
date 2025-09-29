// script.js
// ----------------------------
// This file connects the HTML page to the server (server.js).
// What it does:
// 1. Takes the code typed by the user
// 2. Sends it to the server to check
// 3. Shows feedback on the page
// 4. Reads the feedback out loud

// Function: checkCode()
// Called when user clicks the "Check Code" button
// ----------------------------
async function checkCode() {
  // 1. Get the text area (where user types code)
  const codeBox = document.getElementById("code");

  // 2. Get the feedback <div> (where feedback is shown)
  const feedbackBox = document.getElementById("feedback");

  // 3. Get the progress <ul> (list where we track progress)
  const progressList = document.getElementById("progress");

  // 4. Take what user typed (and remove extra spaces)
  let userCode = codeBox.value.trim();

  // If nothing was typed, warn the user and stop here
  if (userCode === "") {
    feedbackBox.textContent = "Please type some code first.";
    speakText("Please type some code first.");
    return;
  }

  // Show waiting message while we check
  feedbackBox.textContent = "Checking your code...";
  speakText("Checking your code");

  try {
    // 5. Send the code to our server using fetch
    //    (fetch = make a request to another server)
    const response = await fetch("/check-code", {
      method: "POST", // POST means "send something"
      headers: { "Content-Type": "application/json" }, // tell server it's JSON
      body: JSON.stringify({ code: userCode }) // send the code as JSON
    });

    // 6. If the server replies with an error (not 200 OK)
    if (!response.ok) {
      let errorMsg = "Server problem: " + response.status;
      feedbackBox.textContent = errorMsg;
      speakText(errorMsg);
      return;
    }

    // 7. Read the answer from the server as JSON
    const data = await response.json();

    // 8. Show the feedback (or a default message if empty)
    let feedback = data.feedback || "No feedback from mentor.";
    feedbackBox.textContent = feedback;

    // 9. Speak the feedback out loud
    speakText(feedback);

    // 10. Add this action to the "My Progress" list
    let newItem = document.createElement("li");
    newItem.textContent =
      "You checked some code: " + userCode.slice(0, 30) + "...";
    progressList.appendChild(newItem);

  } catch (error) {
    // If something went wrong (server not running, etc.)
    console.error("Error talking to server:", error);
    let errMsg = "Could not reach server. Is it running?";
    feedbackBox.textContent = errMsg;
    speakText(errMsg);
  }
}

// ----------------------------
// Function: listenToUser()
// Placeholder for the "Speak Code" button
// ----------------------------
function listenToUser() {
  const feedbackBox = document.getElementById("feedback");
  let msg = "Voice input not ready yet. Coming soon!";
  feedbackBox.textContent = msg;
  speakText(msg);
}

// ----------------------------
// Function: speakText()
// Uses the browser's speech system to read text out loud
// ----------------------------
function speakText(text) {
  if ("speechSynthesis" in window) {
    // Stop anything already speaking before starting new
    speechSynthesis.cancel();

    // Create a voice message
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // language

    // Speak it
    speechSynthesis.speak(utterance);
  } else {
    console.log("This browser does not support speech synthesis.");
  }
}

// ----------------------------
// Add event listeners when the page loads
// ----------------------------
document.addEventListener("DOMContentLoaded", function () {
  let checkBtn = document.getElementById("checkBtn");
  let speakBtn = document.getElementById("speakBtn");

  // Link the buttons to their functions
  if (checkBtn) {
    checkBtn.addEventListener("click", checkCode);
  }

  if (speakBtn) {
    speakBtn.addEventListener("click", listenToUser);
  }
});

// script.js
// Connects the HTML page to the server (server.js)
// Jobs:
// 1. Send the code you type (or later, speak) to the server
// 2. Show feedback in the feedback box
// 3. Speak the feedback out loud

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
    feedbackBox.textContent = "Please type some code first.";
    speakText("Please type some code first.");
    return;
  }

  // show waiting message
  feedbackBox.textContent = "Checking your code...";
  speakText("Checking your code");

  try {
    // send request to our server
    const response = await fetch("/check-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: userCode }),
    });

    // if server says error
    if (!response.ok) {
      let errorMsg = "Server problem: " + response.status;
      feedbackBox.textContent = errorMsg;
      speakText(errorMsg);
      return;
    }

    // read answer as JSON
    const data = await response.json();

    // show the feedback
    let feedback = data.feedback || "No feedback from mentor.";
    feedbackBox.textContent = feedback;
    speakText(feedback);

    // also add this to "My Progress" list
    const newItem = document.createElement("li");
    newItem.textContent = "You checked some code: " + userCode.slice(0, 30) + "...";
    progressList.appendChild(newItem);
  } catch (error) {
    console.error("Error talking to server:", error);
    let errMsg = "Could not reach server. Is it running?";
    feedbackBox.textContent = errMsg;
    speakText(errMsg);
  }
}

// function for "Speak Code" button (not real yet, just a placeholder)
function listenToUser() {
  const feedbackBox = document.getElementById("feedback");
  let msg = "Voice input not ready yet. Coming soon!";
  feedbackBox.textContent = msg;
  speakText(msg);
}

// helper function: make the computer speak text
function speakText(text) {
  if ("speechSynthesis" in window) {
    // stop anything already speaking before starting new
    speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // set language
    speechSynthesis.speak(utterance);
  } else {
    console.log("This browser does not support speech synthesis.");
  }
}

// add event listeners

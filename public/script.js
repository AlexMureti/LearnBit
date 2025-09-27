document.getElementById("checkBtn").addEventListener("click", async () => {
  const userCode = document.getElementById("code").value.trim();
  if (!userCode) {
    document.getElementById("feedback").innerText = "Please enter some code!";
    return;
  }

  document.getElementById("feedback").innerText = "Thinking...";

  try {
    const res = await fetch("/check-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: userCode }),
    });

    const data = await res.json();
    document.getElementById("feedback").innerText = data.feedback;
  } catch (err) {
    document.getElementById("feedback").innerText = "Error: " + err.message;
  }
});

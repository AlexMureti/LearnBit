require("dotenv").config();
const axios = require("axios");

const hfKey = process.env.HF_API_KEY;

async function testHF() {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      { inputs: "Hello from Hugging Face!" },
      { headers: { Authorization: `Bearer ${hfKey}` } }
    );

    console.log(" HF replied:", response.data[0].generated_text);
  } catch (err) {
    console.error(" Hugging Face error:", err.response?.data || err.message);
  }
}

testHF();

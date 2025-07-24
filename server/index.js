// server/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Loads environment variables from a .env file

const app = express();
// Render provides the PORT environment variable
const PORT = process.env.PORT || 5000;

// Setup
app.use(cors());
app.use(bodyParser.json());

// Use the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/parse", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Extract the amount and recipient address from this input and respond strictly in JSON format like:
      {
        "amount": "10",
        "address": "0xAbc1234567890123456789012345678901234567",
        "symbol": "BDAG"
      }

      Input: "${prompt}"`
    );

    const text = result.response.text();

    const match = text.match(/{[\s\S]*}/);
    if (!match) {
      return res.status(500).json({ error: "Failed to parse Gemini output" });
    }

    const rawParsed = JSON.parse(match[0]);

    // Normalize field names
    const parsed = {
      amount: rawParsed.amount || rawParsed.value || "",
      address: rawParsed.address || rawParsed.recipient || "",
      symbol: rawParsed.symbol || "BDAG", // fallback default
    };

    if (!parsed.amount || !parsed.address) {
      return res.status(500).json({ error: "Incomplete parsed result from Gemini" });
    }

    res.json(parsed);
  } catch (error) {
    console.error("Parse error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Gemini parser backend listening on port ${PORT}`);
});

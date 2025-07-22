// src/api/parse.js (Express backend with Gemini 1.5 Flash parsing logic)

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

app.post("/api/parse", async (req, res) => {
  const prompt = req.body.prompt;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are a smart contract assistant. Only return pure JSON.

Example output:
{
  "action": "transfer",
  "amount": 10,
  "recipient": "0xAbc123"
}

User command: ${prompt}`
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.candidates && result.candidates[0]) {
      const text = result.candidates[0].content.parts[0].text;
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        return res.json(parsed);
      }
      return res.status(400).json({ error: "No JSON found in Gemini reply", raw: text });
    }

    res.status(500).json({ error: "No candidates found", raw: JSON.stringify(result) });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to contact Gemini", raw: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Gemini backend listening on port ${PORT}`));

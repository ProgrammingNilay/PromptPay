// src/components/ChatBox.jsx

import React, { useState } from "react";
import { useTokenTransfer } from "../hooks/useTokenTransfer";
import axios from "axios";

export default function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { transferTokens } = useTokenTransfer(); //  Corrected function name

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    setChatHistory((prev) => [...prev, { sender: "User", message: userInput }]);

    try {
      //  Call Gemini backend to parse the user input
      const response = await axios.post("/api/parse", {
        prompt: userInput,
      });

      console.log(" Gemini parsed response:", response.data);
      const parsed = response.data; // Expected: { amount, address, symbol }

      //  Transfer token based on parsed output
      const result = await transferTokens(parsed.address, parsed.amount); //  Corrected order and args

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "PromptPay",
          message: `Transferred ${parsed.amount} ${parsed.symbol} to ${parsed.address}`,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "PromptPay",
          message: `Error processing request: ${error.message}`,
        },
      ]);
    }

    setUserInput(""); // Clear input
  };

  return (
    <div className="p-4">
      <div className="h-[400px] overflow-y-auto border rounded p-2 mb-4 bg-gray-100 text-black">
  {chatHistory.map((entry, index) => (
    <div key={index} className="mb-2">
      <strong className="text-blue-800">{entry.sender}:</strong>{" "}
      <span className="text-gray-800">{entry.message}</span>
    </div>
  ))}
</div>

      <div className="flex gap-2">
        <input
          className="flex-grow border rounded px-2 py-1 text-black"
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

import React from "react";
import ChatBox from "./components/ChatBox";
import WalletConnect from "./components/WalletConnect";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">PromptPay 💬</h1>
      <WalletConnect />
      <ChatBox />
    </div>
  );
}

export default App;

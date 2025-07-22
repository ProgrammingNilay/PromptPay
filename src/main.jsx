import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { WagmiConfig } from "wagmi";
import { defaultWagmiConfig, createWeb3Modal } from "@web3modal/wagmi/react";
import { sepolia } from "wagmi/chains";

//  Environment Variable
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

//  Wagmi config
const metadata = {
  name: "PromptPay",
  description: "AI to Blockchain Payment Interface",
  url: "http://localhost:5173"
};

const chains = [sepolia];

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);

PromptPay 💬⛓️
PromptPay: The AI-powered interface for seamless blockchain transactions.

PromptPay allows users to perform ERC20 token transfers by typing natural language commands. It uses Google's Gemini AI to parse user input and initiates blockchain transactions through a secure wallet connection.

(Replace this placeholder with a real screenshot of your application)

✨ Features
Natural Language Processing: Leverages Google's Gemini API to understand commands like "Send 10 BDAG to 0x...".

Secure Wallet Integration: Connects to user wallets (e.g., MetaMask) via Web3Modal (WalletConnect) for secure transaction signing.

ERC20 Token Transfers: Executes transfer function calls on any standard ERC20 token contract.

Real-time Feedback: A clean, chat-based UI provides instant status updates, from AI parsing to on-chain transaction confirmation.

Responsive Design: Built with React and Tailwind CSS for a great experience on any device.

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS

Web3: Ethers.js, Wagmi, Viem, Web3Modal

AI/Backend: Node.js, Express, Google Gemini API

Blockchain: Deployed on the Sepolia test network.

🚀 Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (v18 or later)

npm or yarn package manager

A Web3 wallet like MetaMask configured for the Sepolia network.

Sepolia ETH in your wallet for gas fees.

1. Clone the Repository
git clone <your-repository-url>
cd <your-project-directory>

2. Configure the Backend
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file and add your Gemini API key
echo "GEMINI_API_KEY='YOUR_GEMINI_API_KEY_HERE'" > .env

You can get a Gemini API key from Google AI Studio.

3. Configure the Frontend
# Navigate back to the root project directory
cd ..

# Install dependencies
npm install

# Create a .env file and add your WalletConnect Project ID
echo "VITE_WALLETCONNECT_PROJECT_ID='YOUR_WALLETCONNECT_PROJECT_ID'" > .env

You can get a Project ID from WalletConnect Cloud.

4. Update Contract Address
Open src/hooks/useTokenTransfer.js and set the tokenAddress constant to your deployed ERC20 contract address.

// src/hooks/useTokenTransfer.js
const tokenAddress = "0xD652306C4bD421e91b65Fe60240D67B7cccD149B"; // ✅ Update this address

5. Run the Application
You need to run both the frontend and backend servers in two separate terminals.

Terminal 1 (Backend):

# In the /server directory
npm start

✅ Gemini parser backend listening on http://localhost:5000

Terminal 2 (Frontend):

# In the root project directory
npm run dev

Open your browser to http://localhost:5173.

📖 How to Use
Click "Connect Wallet" and connect your wallet. Make sure you are on the Sepolia network.

In the chat input, type a command to send tokens. For example: Send 10 BDAG to 0xAbc123...

Press Send.

The AI will parse your command. If successful, your wallet will pop up to ask for transaction confirmation.

Approve the transaction and wait for the on-chain confirmation message in the chat.

📄 Smart Contract
The application is configured to interact with a standard ERC20 token contract deployed on the Sepolia testnet.

Token Address: 0xD652306C4bD421e91b65Fe60240D67B7cccD149B

View on Etherscan: https://sepolia.etherscan.io/address/0xD652306C4bD421e91b65Fe60240D67B7cccD149B

📁 Project Structure
/
├── public/              # Static assets
├── server/              # Express.js backend for AI parsing
│   ├── .env             # (Untracked) Server environment variables
│   └── index.js         # Main server file with the /api/parse endpoint
├── src/                 # Frontend React application
│   ├── components/      # Reusable React components
│   ├── constants/       # ABIs and contract configurations
│   ├── hooks/           # Custom hooks (useTokenTransfer)
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point with Wagmi/Web3Modal setup
├── .gitignore           # Files to be ignored by Git
├── package.json         # Frontend dependencies and scripts
└── README.md            # This file

🗺️ Roadmap
[ ] Support for multiple tokens (e.g., "Send 20 USDC...")

[ ] Add a transaction history view

[ ] Support other transaction types (e.g., swapping, staking)

[ ] Improve AI error handling for ambiguous commands

[ ] Migrate to a mainnet version

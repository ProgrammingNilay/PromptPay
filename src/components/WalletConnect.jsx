import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export default function WalletConnect() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  return (
    <div className="mb-4">
      {isConnected ? (
        <p> Connected: {address}</p>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => open()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

import { useAccount, useWalletClient } from "wagmi";
import { parseUnits } from "viem";
import { TOKEN_ABI } from "../constants/abi";
import { readContract, writeContract } from "@wagmi/core";

// Set your deployed contract address
const tokenAddress = "0xD652306C4bD421e91b65Fe60240D67B7cccD149B";

export function useTokenTransfer() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const transferTokens = async (to, amount) => {
    if (!walletClient || !address) throw new Error("Wallet not connected");

    // 🛠️ Dynamically read decimals
    const decimals = await readContract({
      abi: TOKEN_ABI,
      address: tokenAddress,
      functionName: "decimals",
    });

    const parsedAmount = parseUnits(amount.toString(), decimals);

    const txHash = await writeContract({
      address: tokenAddress,
      abi: TOKEN_ABI,
      functionName: "transfer",
      args: [to, parsedAmount],
      account: address,
    });

    return txHash;
  };

  return { transferTokens };
}

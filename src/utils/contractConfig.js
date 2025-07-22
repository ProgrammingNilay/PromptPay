import { erc20Abi } from 'viem';
import { getPublicClient } from 'wagmi/actions';

export const BDAG_CONTRACT = {
  address: '0xD652306C4bD421e91b65Fe60240D67B7cccD149B', // <- Replace with deployed BDAG contract
  abi: erc20Abi, // Standard ERC20 ABI from viem
};
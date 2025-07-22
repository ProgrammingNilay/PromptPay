// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PromptPayToken is ERC20 {
    constructor() ERC20("PromptPay Token", "BDAG") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        // _mint(msg.sender, 1_000_000 * (10 ** decimals()));
    }
}
// I have used REMIX IDE
// Set ENVIRONMENT to Injected Provider - MetaMask
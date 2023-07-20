// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Smart Contract for BiTicket TokenStable Mock
/// @author Eduardo Mannarino
contract TokenStable is ERC20 {
    constructor() ERC20("TKNS", "TKNS") {
        _mint(msg.sender, 1000000000 * 10 ** 18);
    }
}
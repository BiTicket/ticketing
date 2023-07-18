// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../Tickets.sol";

interface IFactory {
  function createTicketsContract(
    string[] memory ticketMetadataUris, 
    string[] memory NFTMetadataUris,
    uint256[] memory prices, 
    uint256[] memory maxSupplies, 
    address platform 
  ) external returns (Tickets);

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Tickets.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {

  function createTicketsContract(
    string[] memory ticketMetadataUris, 
    string[] memory NFTMetadataUris,
    uint256[] memory prices, 
    uint256[] memory maxSupplies, 
    address platform 
  ) public onlyOwner returns (Tickets) {
    return new Tickets(
      ticketMetadataUris, 
      NFTMetadataUris, 
      prices, 
      maxSupplies, 
      platform
    );
  }
}
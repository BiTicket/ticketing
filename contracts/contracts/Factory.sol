// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Tickets.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Smart Contract for BiTicket Factory
/// @author Eduardo Mannarino
contract Factory is Ownable {

  /// @notice Creates an Tickets Smart Contract for an Event
  /// @param ticketMetadataUris Array of Links to Ticket Metadata 
  /// @param NFTMetadataUris Array of Links to NFT Ticket Metadata 
  /// @param prices Array of prices for each ticket type
  /// @param maxSupplies Array of Max Supplies for each ticket type
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
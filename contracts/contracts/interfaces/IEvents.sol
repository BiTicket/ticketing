// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

struct Event {
  address creator;
  bool cancelled; 
  address tickets;
  uint256 deadline;
  string eventMetadataUri;
  string NFTMetadataUri;
}

interface IEvents {
  function createEvent(    
    address creator,
    string calldata eventMetadataUri, 
    string calldata NFTMetadataUri, 
    string[] calldata ticketsMetadataUris, 
    string[] calldata ticketsNFTMetadataUris, 
    uint256[] calldata prices, 
    uint256[] calldata maxSupplies,
    uint256 deadline
  ) external;
  function useTicket(bytes calldata message, uint8 v, bytes32 r, bytes32 s) external;
  function getEventById(uint256 eventId) external view returns (Event memory);
}


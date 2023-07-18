// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

struct Event {
  address creator;
  bool cancelled; 
  address tickets;
  address escrow;
  uint256 deadline;
  string eventMetadataUri;
  string NFTMetadataUri;
}

struct CreateEventParams {
  address creator;
  string eventMetadataUri;
  string NFTMetadataUri;
  string[] ticketsMetadataUris;
  string[] ticketsNFTMetadataUris;
  uint256[] prices;
  uint256[] maxSupplies;
  uint256 deadline;
  uint16 percentageWithdraw;
}

interface IEvents {
  function createEvent(CreateEventParams memory createEventParams, address tokenStable) external;
  function useTicket(bytes calldata message, uint8 v, bytes32 r, bytes32 s) external;
  function getEventById(uint256 eventId) external view returns (Event memory);
  function cancelEvent(uint256 eventId) external;
}


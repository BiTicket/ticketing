// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

struct TicketInfo {
  string ticketMetadataUri;
  string NFTMetadataUri;
  uint256[3] prices; // 0-STABLE 1-DOT 2-GLMR
  uint256 maxSupply;
}

interface ITickets {
  function mint(address to, uint256 ticketType, uint256 amount) external;
  function getTicketByType(uint256 ticketType) external view returns (TicketInfo memory);
  function getTotalSupply(uint256 id) external view returns (uint256);
}
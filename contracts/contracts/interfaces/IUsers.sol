// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IUsers {
  function upsertUser(address to, string calldata metadataUri) external;
  function users(address userAddress) external view returns (string memory);

}
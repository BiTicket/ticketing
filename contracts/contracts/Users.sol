// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./PlatformGated.sol";
import "./interfaces/IUsers.sol";

/// @title Smart Contract for BiTicket Users
/// @author Eduardo Mannarino
contract Users is IUsers, PlatformGated {
  error EmptyMetadata();

  mapping (address user => string metadataUri) public users;

  constructor(address platform) PlatformGated(platform) {
  }

  /// @notice Allows user to register or update the data
  /// @param metadataUri Link to Metadata of the info
  function upsertUser(address userAddress, string calldata metadataUri) public onlyPlatform {
    if (bytes(metadataUri).length == 0)
      revert EmptyMetadata();
    users[userAddress] = metadataUri;
  }
  
}
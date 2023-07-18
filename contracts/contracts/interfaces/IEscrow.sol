// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IEscrow {
  function depositNative(address user) external payable;
  function withdrawNative(uint256 amount) external;
  function depositStable(address user, uint256 amount) external;
  function withdrawStable(uint256 amount) external;
}
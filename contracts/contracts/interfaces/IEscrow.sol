// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IEscrow {
  function depositStable(address user, uint256 amount, address payer) external;
  function depositDOT(address user, uint256 amount) external;
  function depositNative(address user) external payable;
  function withdrawStable(uint256 amount) external;
  function withdrawDOT(uint256 amount) external;
  function withdrawNative(uint256 amount) external;
}
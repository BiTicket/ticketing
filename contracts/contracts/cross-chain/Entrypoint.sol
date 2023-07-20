// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IERC20 } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol';

contract Sender {
    IAxelarGasService public immutable gasService;
    IAxelarGateway public immutable gateway;
    IERC20 public immutable aUSDC;
    string public tokenSymbol;

    constructor(address _gateway, address _gasService, address _aUSDC, string memory _tokenSymbol)  {
        gateway = IAxelarGateway(_gateway);
        gasService = IAxelarGasService(_gasService);
        aUSDC = IERC20(_aUSDC);
        tokenSymbol = _tokenSymbol;
    }

    function buyTicket(
        string calldata destinationChain,
        string calldata destinationAddress,
        address _user, 
        uint256 _eventId, 
        uint256 _ticketType, 
        uint256 _amount,
        uint256 totalPriceAndFees
    )external payable{
        bytes memory payload = abi.encode(_user, _eventId, _ticketType, _amount);

        aUSDC.transferFrom(msg.sender, address(this), totalPriceAndFees);
        aUSDC.approve(address(gateway), totalPriceAndFees);        
        gasService.payNativeGasForContractCallWithToken{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            tokenSymbol,
            totalPriceAndFees,
            msg.sender
        );

        gateway.callContractWithToken(destinationChain, destinationAddress, payload, tokenSymbol, totalPriceAndFees);
    }

    function upsertUser(
        string calldata destinationChain,
        string calldata destinationAddress,
        string memory metadata
    ) external payable {
        bytes memory payload = abi.encode(msg.sender, metadata);
        gasService.payNativeGasForContractCall{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

}
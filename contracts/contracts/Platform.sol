// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IEscrow.sol";
import "./interfaces/IEvents.sol";
import "./interfaces/ITickets.sol";
import "./interfaces/IUsers.sol";

contract Platform is Ownable {
  error AddressZero();
  error ErrorGettingEvent();
  error InvalidLength();
  error EventCancelled();
  error EmptyMetadata();
  error NotUser();
  error CannotSendFunds();
  error IncorrectSentFunds();
  error NotCreator();
  error EventDeadlineReached(uint256, uint256);
  error MaxSupplyExceeded();
  error TokenNotSupported();

  IEvents eventsContract;
  IUsers usersContract;
  IERC20 immutable tokenStable; 

  constructor(address tokenStable_) payable {
    tokenStable = IERC20(tokenStable_);
  }

  function createEvent(CreateEventParams memory createEventParams) external onlyUser {
    if (
      createEventParams.ticketsMetadataUris.length * 3 != createEventParams.prices.length  || 
      createEventParams.prices.length != createEventParams.maxSupplies.length * 3
    )
      revert InvalidLength();    
    eventsContract.createEvent(
      CreateEventParams(
        createEventParams.creator, 
        createEventParams.eventMetadataUri, 
        createEventParams.NFTMetadataUri, 
        createEventParams.ticketsMetadataUris, 
        createEventParams.ticketsNFTMetadataUris, 
        createEventParams.prices, 
        createEventParams.maxSupplies, 
        createEventParams.deadline,
        createEventParams.percentageWithdraw
      ),
      address(tokenStable)
    );
  } 

  function buyTicket(address user, uint256 eventId, uint256 ticketType, uint256 tokenUsed, uint256 amount) external payable onlyUser {
    if (user == address(0))
      revert AddressZero();    
    Event memory event_ = eventsContract.getEventById(eventId);
    if (event_.cancelled)
      revert EventCancelled();
    if (block.timestamp >= event_.deadline)
      revert EventDeadlineReached(block.timestamp, event_.deadline);

    ITickets ticketsContract = ITickets(event_.tickets);
    TicketInfo memory ticketInfo = ticketsContract.getTicketByType(ticketType);

    if (ticketsContract.getTotalSupply(ticketType) + amount > ticketInfo.maxSupply) 
      revert MaxSupplyExceeded();    

    if (tokenUsed == 0) { // Stable
      if (ticketInfo.prices[0] == 0)
        revert TokenNotSupported();
      IEscrow(event_.escrow).depositStable(user, ticketInfo.prices[0] * amount);   
      // if (!tokenStable.transferFrom(user, event_.creator, ticketInfo.prices[0] * amount))
      //   revert CannotSendFunds();
    } 
    if (tokenUsed == 1) { // DOT
      if (ticketInfo.prices[1] == 0)
        revert TokenNotSupported();
      revert TokenNotSupported();
    } 
    if (tokenUsed == 2) { // GLMR
      if (ticketInfo.prices[2] == 0)
        revert TokenNotSupported();
      if (msg.value != ticketInfo.prices[2] * amount)
        revert IncorrectSentFunds();
      IEscrow(event_.escrow).depositNative{value: msg.value}(user); 
    } 
    ticketsContract.mint(user, ticketType, amount);
  }

  function useTicket(bytes calldata message, uint8 v, bytes32 r, bytes32 s) external onlyUser {
    eventsContract.useTicket(message, v, r, s);         
  }

  function upsertUser(string calldata metadataUri) external {
    if (bytes(metadataUri).length == 0)
      revert EmptyMetadata();   
    usersContract.upsertUser(msg.sender, metadataUri); 
  }

  function cancelEvent(uint256 eventId) external onlyUser {
    Event memory event_ = eventsContract.getEventById(eventId);
    if (msg.sender != event_.creator)
      revert NotCreator();
    eventsContract.cancelEvent(eventId);
  } 

  // OWNER FUNCTIONS
  function setEventsContract(address _eventsContract) external onlyOwner {
    if (_eventsContract == address(0))
      revert AddressZero();
    eventsContract = IEvents(address(_eventsContract));
  }

  function setUsersContract(address _usersContract) external onlyOwner {
    if (_usersContract == address(0))
      revert AddressZero();
    usersContract = IUsers(address(_usersContract));
  }

    modifier onlyUser() {
        _checkIsUser();
        _;
    }

    function _checkIsUser() private view {
        if (bytes(usersContract.users(msg.sender)).length == 0) 
          revert NotUser();
    }
}
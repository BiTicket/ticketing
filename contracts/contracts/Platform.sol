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
  error InvalidFee();
  error PlatformWalletNotSet();
  error InvalidAmount();

  IEvents eventsContract;
  IUsers usersContract;
  address public platformWallet;
  uint16 public platformFee; // Two decimal places (10% = 1000)
  IERC20 public immutable tokenStable; 
  IERC20 public immutable tokenDOT; 

  constructor(address tokenStable_, address tokenDOT_) payable {
    tokenStable = IERC20(tokenStable_);
    tokenDOT = IERC20(tokenDOT_);
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
      address(tokenStable),
      address(tokenDOT),
      platformFee
    );
  } 

  function buyTicket(address user, uint256 eventId, uint256 ticketType, uint256 tokenUsed, uint256 amount) external payable onlyUser {
    if (user == address(0))
      revert AddressZero();
    if (amount == 0)
      revert InvalidAmount();
    Event memory event_ = eventsContract.getEventById(eventId);
    if (event_.cancelled)
      revert EventCancelled();
    if (block.timestamp >= event_.deadline)
      revert EventDeadlineReached(block.timestamp, event_.deadline);

    ITickets ticketsContract = ITickets(event_.tickets);
    TicketInfo memory ticketInfo = ticketsContract.getTicketByType(ticketType);

    if (ticketsContract.getTotalSupply(ticketType) + amount > ticketInfo.maxSupply) 
      revert MaxSupplyExceeded();
    
    if (event_.platformFee != 0 && platformWallet == address(0))
      revert PlatformWalletNotSet();

    if (tokenUsed == 0) { // Stable
      uint256 price = ticketInfo.prices[0];
      if (price == 0)
        revert TokenNotSupported();
      uint256 fee = price * amount * event_.platformFee / 10000;
      if (fee > 0)
        tokenStable.transferFrom(user, platformWallet, fee);
      IEscrow(event_.escrow).depositStable(user, price * amount);   
    } 

    if (tokenUsed == 1) { // DOT
      uint256 price = ticketInfo.prices[1];
      if (price == 0)
        revert TokenNotSupported();
      uint256 fee = price * amount * event_.platformFee / 10000;
      if (fee > 0)
        tokenDOT.transferFrom(user, platformWallet, fee);
      IEscrow(event_.escrow).depositDOT(user, price * amount);   
    } 

    if (tokenUsed == 2) { // GLMR
      uint256 price = ticketInfo.prices[2];
      if (price == 0)
        revert TokenNotSupported();
      uint256 fee = price * amount * event_.platformFee / 10000;
      if (msg.value != (price * amount) + fee)
        revert IncorrectSentFunds();
      if (fee > 0) {
        (bool sent, ) = platformWallet.call{value: fee}("");
        if (!sent)
          revert CannotSendFunds();      
      }
      IEscrow(event_.escrow).depositNative{value: msg.value - fee}(user); 
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
  function setPlatformFee(uint16 _platformFee) external onlyOwner {
    if (platformFee >= 3000)
      revert InvalidFee();
    platformFee = _platformFee;
  }

  function setPlatformWallet(address _platformWallet) external onlyOwner {
    if (_platformWallet == address(0))
      revert AddressZero();
    platformWallet = _platformWallet;
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
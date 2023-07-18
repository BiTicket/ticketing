// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./PlatformGated.sol";
import "./Tickets.sol";
import "./Escrow.sol";
import "./interfaces/IEvents.sol";

contract Events is ERC721, IEvents, PlatformGated {
  bytes16 private constant _SYMBOLS = "0123456789abcdef";

  error InvalidEventId(uint256 eventId);
  error InvalidLength();
  error EventCancelled();
  error MessageAlreadyUsed();
  error InvalidContract();
  error TicketAlreadyUsed();
  error TicketNotOwnedByuser();
  error InvalidDeadline();
  error DeadlineNotReached();

  event NewEvent(Event event_, uint256 eventId);
  event TicketUsed(address messageSigner, uint256 eventId, uint256 ticketType);
  event CancelEvent(uint256 eventId);

  uint256 public totalEvents;
  mapping (uint256 eventId => Event _event) private events;
  mapping (uint256 eventId => mapping(uint256 ticketType => mapping(address user => uint256 used))) public ticketsUsed;
  mapping (bytes message => bool used) usedMessages;

  constructor(address platform) ERC721("Events", "EVNT") PlatformGated(platform) payable {
  } 

  function createEvent(CreateEventParams memory createEventParams, address tokenStable, address tokenDOT, uint16 platformFee) public onlyPlatform {
    if (
      createEventParams.ticketsMetadataUris.length * 3 != createEventParams.prices.length || 
      createEventParams.prices.length != createEventParams.maxSupplies.length * 3
    )
      revert InvalidLength();
    if (block.timestamp >= createEventParams.deadline)
      revert InvalidDeadline();

    Tickets tickets = new Tickets(
      createEventParams.ticketsMetadataUris, 
      createEventParams.ticketsNFTMetadataUris, 
      createEventParams.prices, 
      createEventParams.maxSupplies, 
      getPlatform()
    );

    Escrow escrow = new Escrow(
      totalEvents, 
      address(this), 
      createEventParams.creator, 
      createEventParams.percentageWithdraw, 
      tokenStable,
      tokenDOT,
      getPlatform()
    );

    Event memory newEvent = Event(
      createEventParams.creator, 
      false, 
      address(tickets), 
      address(escrow),
      createEventParams.deadline, 
      createEventParams.eventMetadataUri, 
      createEventParams.NFTMetadataUri,
      platformFee
    );
    events[totalEvents] = newEvent;
    _mint(createEventParams.creator, totalEvents);
    
    ++totalEvents;
    
    emit NewEvent(newEvent, totalEvents);
  }

  function useTicket(bytes calldata message, uint8 v, bytes32 r, bytes32 s) public onlyPlatform {
    if (usedMessages[message])
      revert MessageAlreadyUsed();
    usedMessages[message] = true;

    address contractAddress = address(bytes20(bytes(message[0:20])));
    if (contractAddress != address(this))
      revert InvalidContract();

    uint32 eventId = uint32(bytes4(bytes(message[20:24])));
    _checkEventId(eventId);
    
    uint32 ticketType = uint32(bytes4(bytes(message[24:28])));
    uint32 nonce = uint32(bytes4(bytes(message[28:32])));

    bytes32 prefixedMessage = keccak256(
      abi.encodePacked(
        "\x19Ethereum Signed Message:\n66", 
        _toHexString(uint256(uint160(contractAddress)), 20, true),
        _toHexString(eventId, 4, false),
        _toHexString(ticketType, 4, false),
        _toHexString(nonce, 4, false)
      )
    );

    address messageSigner = ecrecover(prefixedMessage, v, r, s);

    Event memory event_ = events[eventId];
    if (event_.cancelled)
      revert EventCancelled();
    uint256 balance = Tickets(event_.tickets).balanceOf(messageSigner, ticketType);
    if (balance == 0)
      revert TicketNotOwnedByuser();
    if (balance <= ticketsUsed[eventId][ticketType][messageSigner])
      revert TicketAlreadyUsed();
    ++ticketsUsed[eventId][ticketType][messageSigner];
    emit TicketUsed(messageSigner, eventId, ticketType);
  }

  function cancelEvent(uint256 eventId) public onlyPlatform {
    _checkEventId(eventId);
    Event storage event_ = events[eventId];
    event_.cancelled = true;
    emit CancelEvent(eventId);
  }

  function getEventById(uint256 eventId) public view returns (Event memory) {
    _checkEventId(eventId);
    return events[eventId];
  }

  function tokenURI(uint256 eventId) public view  override returns (string memory) {
    _checkEventId(eventId);
    Event memory event_ = events[eventId];
    return event_.NFTMetadataUri;
  }

  function _checkEventId(uint256 eventId) internal view {
    if (eventId >= totalEvents)
      revert InvalidEventId(eventId);
  }

  function _toHexString(uint256 value, uint256 length, bool isAddress) internal pure returns (string memory) {
    bytes memory buffer = new bytes(2 * length + (isAddress ? 2 : 0));
    buffer[0] = '0';
    buffer[1] = 'x';
    for (uint256 i = 2 * length + (isAddress ? 2 : 0) ; i > (isAddress ? 2 : 0);) {
        unchecked { --i; }
        buffer[i] = _SYMBOLS[value & 0xf];
        value >>= 4;
    }
    require(value == 0, "");
    return string(buffer);
  }
}
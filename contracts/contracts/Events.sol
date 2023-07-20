// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./PlatformGated.sol";
import "./Escrow.sol";
import "./Tickets.sol";
import "./interfaces/IEvents.sol";
import "./interfaces/IFactory.sol";


/// @title Smart Contract for BiTicket Events
/// @author Eduardo Mannarino
contract Events is ERC721, IEvents, PlatformGated {
  bytes16 private constant _SYMBOLS = "0123456789abcdef";

  error InvalidEventId(uint256 eventId);
  error InvalidEventRange(uint256 eventIdFrom, uint256 eventIdTo);
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
  IFactory public immutable factory;

  constructor(address platform, address _factory) ERC721("Events", "EVNT") PlatformGated(platform) payable {
    factory = IFactory(_factory);
  } 

  /// @notice Creates an Event 
  /// @param createEventParams Set of Events Configuration
  /// @param tokenStable Address of Token Stable
  /// @param tokenDOT Address of Token DOT
  /// @param platformFee Platform fee for buying tickets (Two decimals places: 10% = 1000)
function createEvent(
    CreateEventParams memory createEventParams, 
    address tokenStable, 
    address tokenDOT, 
    uint16 platformFee
  ) public onlyPlatform returns (uint256) {
    if (
      createEventParams.ticketsMetadataUris.length * 3 != createEventParams.prices.length || 
      createEventParams.prices.length != createEventParams.maxSupplies.length * 3
    )
      revert InvalidLength();
    if (block.timestamp >= createEventParams.deadline)
      revert InvalidDeadline();

    // Tickets tickets = new Tickets(
    //   createEventParams.ticketsMetadataUris, 
    //   createEventParams.ticketsNFTMetadataUris, 
    //   createEventParams.prices, 
    //   createEventParams.maxSupplies, 
    //   getPlatform()
    // );
      Tickets tickets = factory.createTicketsContract(
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
    return totalEvents-1;
  }

  /// @notice Allows creator to use tickets and mark it as used
  /// @param message Message with the necessary information (address of contract, eventId, tokenType, nonce)
  /// @param v Component v of the signature
  /// @param r Component r of the signature
  /// @param s Component s of the signature
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

  /// @notice Allows creator to cancel an event
  /// @param eventId Id of the Event to cancel
  function cancelEvent(uint256 eventId) public onlyPlatform {
    _checkEventId(eventId);
    Event storage event_ = events[eventId];
    event_.cancelled = true;
    emit CancelEvent(eventId);
  }

  /// @notice Getter functions to obtain Events filtered by range of Id
  /// @param eventIdFrom Filter from this Event Id
  /// @param eventIdTo Filter to (inclusive) this Event Id
  function getEventByRange(uint256 eventIdFrom, uint256 eventIdTo) public view returns (Event[] memory) {
    if (eventIdFrom > eventIdTo)
      revert InvalidEventRange(eventIdFrom, eventIdTo);
    Event[] memory events_ = new Event[](eventIdTo - eventIdFrom + 1);
    for (uint256 id = eventIdFrom; id <= eventIdTo; id++)  {
      events_[id - eventIdFrom]  = events[id];
    }
    return events_;
  }

  /// @notice Get the NFT Metadata link
  /// @param eventId Event Id
  function tokenURI(uint256 eventId) public view  override returns (string memory) {
    _checkEventId(eventId);
    Event memory event_ = events[eventId];
    return event_.NFTMetadataUri;
  }

  /// @notice Checks for valid Event Id
  /// @param eventId Event Id to check
  function _checkEventId(uint256 eventId) internal view {
    if (eventId >= totalEvents)
      revert InvalidEventId(eventId);
  }
  
  /// @notice Function to convert byte encoded data to string
  /// @param value Value to convert
  /// @param length Length of the convert data (PadLeft with 00) 
  /// @param isAddress If isAddress prepend 0x 
  /// @dev This function is used to recover the original string signed by user
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
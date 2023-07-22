import web3 from '../utils/web3';

export const CONTRACT_ADDRESS = "0xa209bA65ac79D8CB4ED08618f25de6a99e10cdF3";

const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "platform",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      
    ],
    "name": "DeadlineNotReached",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "EventCancelled",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "InvalidContract",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "InvalidDeadline",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      }
    ],
    "name": "InvalidEventId",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "eventIdTo",
        "type": "uint256"
      }
    ],
    "name": "InvalidEventRange",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "InvalidLength",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "MessageAlreadyUsed",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "NotPlatform",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "TicketAlreadyUsed",
    "type": "error"
  },
  {
    "inputs": [
      
    ],
    "name": "TicketNotOwnedByuser",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      }
    ],
    "name": "CancelEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tickets",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "escrow",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "eventMetadataUri",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "NFTMetadataUri",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "platformFee",
            "type": "uint16"
          }
        ],
        "indexed": false,
        "internalType": "struct Event",
        "name": "event_",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      }
    ],
    "name": "NewEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "messageSigner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ticketType",
        "type": "uint256"
      }
    ],
    "name": "TicketUsed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      }
    ],
    "name": "cancelEvent",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "eventMetadataUri",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "NFTMetadataUri",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "ticketsMetadataUris",
            "type": "string[]"
          },
          {
            "internalType": "string[]",
            "name": "ticketsNFTMetadataUris",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "prices",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "maxSupplies",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "percentageWithdraw",
            "type": "uint16"
          }
        ],
        "internalType": "struct CreateEventParams",
        "name": "createEventParams",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "tokenStable",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenDOT",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "platformFee",
        "type": "uint16"
      }
    ],
    "name": "createEvent",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "factory",
    "outputs": [
      {
        "internalType": "contract IFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "eventIdTo",
        "type": "uint256"
      }
    ],
    "name": "getEventByRange",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "tickets",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "escrow",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "eventMetadataUri",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "NFTMetadataUri",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "platformFee",
            "type": "uint16"
          }
        ],
        "internalType": "struct Event[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "getPlatform",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "platform",
        "type": "address"
      }
    ],
    "name": "setPlatform",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ticketType",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "ticketsUsed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "used",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "totalEvents",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "message",
        "type": "bytes"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "useTicket",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);
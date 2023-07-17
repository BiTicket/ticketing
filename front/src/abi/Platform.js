import { CONTRACT_ADDRESSES } from '@thirdweb-dev/sdk';
import web3 from '../utils/web3';

const CONTRACT_ABI = "0x897F9122591E2E615d2Dc6242Ff0c1Fe532D8f26";

const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenStable_",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [
        
      ],
      "name": "AddressZero",
      "type": "error"
    },
    {
      "inputs": [
        
      ],
      "name": "CannotSendFunds",
      "type": "error"
    },
    {
      "inputs": [
        
      ],
      "name": "EmptyMetadata",
      "type": "error"
    },
    {
      "inputs": [
        
      ],
      "name": "ErrorGettingEvent",
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
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "EventDeadlineReached",
      "type": "error"
    },
    {
      "inputs": [
        
      ],
      "name": "IncorrectSentFunds",
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
      "name": "MaxSupplyExceeded",
      "type": "error"
    },
    {
      "inputs": [
        
      ],
      "name": "NotCreator",
      "type": "error"
    },
    {
      "inputs": [
        
      ],
      "name": "NotUser",
      "type": "error"
    },
    {
      "inputs": [
        
      ],
      "name": "TokenNotSupported",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
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
          "internalType": "uint256",
          "name": "tokenUsed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "buyTicket",
      "outputs": [
        
      ],
      "stateMutability": "payable",
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
            }
          ],
          "internalType": "struct CreateEventParams",
          "name": "createEventParams",
          "type": "tuple"
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
      "name": "owner",
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
        
      ],
      "name": "renounceOwnership",
      "outputs": [
        
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_eventsContract",
          "type": "address"
        }
      ],
      "name": "setEventsContract",
      "outputs": [
        
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_usersContract",
          "type": "address"
        }
      ],
      "name": "setUsersContract",
      "outputs": [
        
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [
        
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "metadataUri",
          "type": "string"
        }
      ],
      "name": "upsertUser",
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

  export default new web3.eth.Contract(CONTRACT_ADDRESSES, CONTRACT_ABI);
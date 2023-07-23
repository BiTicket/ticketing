import web3 from "../utils/web3";

const CONTRACT_ADDRESS_SENDER = '0x6B0CD258b9C9D5fCf4bBD21Bdc83684AC8E53fFF';
const CONTRACT_ABI_SENDER = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_gateway",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_gasService",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_aUSDC",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_tokenSymbol",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "aUSDC",
      "outputs": [
        {
          "internalType": "contract IERC20",
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
          "internalType": "string",
          "name": "destinationChain",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "destinationAddress",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_eventId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_ticketType",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalPriceAndFees",
          "type": "uint256"
        }
      ],
      "name": "buyTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gasService",
      "outputs": [
        {
          "internalType": "contract IAxelarGasService",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gateway",
      "outputs": [
        {
          "internalType": "contract IAxelarGateway",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenSymbol",
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
          "internalType": "string",
          "name": "destinationChain",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "destinationAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "metadata",
          "type": "string"
        }
      ],
      "name": "upsertUser",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

export default new web3.eth.Contract(CONTRACT_ABI_SENDER, CONTRACT_ADDRESS_SENDER);
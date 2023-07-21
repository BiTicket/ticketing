import web3 from '../utils/web3';

const CONTRACT_ADDRESS = '0x87FF35820f582DA1B654370724Dad55A973eccDF';

const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "platform",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
    "name": "NotPlatform",
    "type": "error"
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
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "string",
        "name": "metadataUri",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);
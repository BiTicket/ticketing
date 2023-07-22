import web3 from '../utils/web3';

export const CONTRACT_ABI_SCROW = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_eventId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_eventsContract",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_seller",
            "type": "address"
          },
          {
            "internalType": "uint16",
            "name": "_percentageWithdraw",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "_tokenStable",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_tokenDOT",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "platform",
            "type": "address"
          }
        ],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "CannotSendFunds",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "EventCancelled",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "EventNotCancelled",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "EventNotFinished",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "InvalidAddress",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint32",
            "name": "percentageWithdraw",
            "type": "uint32"
          }
        ],
        "name": "InvalidPercentage",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "MaximumWithdrawalExcedeed",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "NotPlatform",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "NotSeller",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "FundsReturned",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "NewDepositDOT",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "NewDepositNative",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "NewDepositStable",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "NewWithdrawDOT",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "NewWithdrawNative",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "NewWithdrawStable",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "balances",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
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
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "depositDOT",
        "outputs": [],
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
        "name": "depositNative",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
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
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "payer",
            "type": "address"
          }
        ],
        "name": "depositStable",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
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
        "inputs": [],
        "name": "returnFunds",
        "outputs": [],
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
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawDOT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawNative",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawStable",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    
];


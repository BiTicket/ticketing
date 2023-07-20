import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }  
  },
  gasReporter: {
    enabled: true
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    moonbase: {
      url: `https://rpc.testnet.moonbeam.network`,
      chainId: 1287,
      accounts: [process.env.PRIVATE_KEY!],
      allowUnlimitedContractSize: true,
    },    
    mumbai: {
      url: `https://rpc.ankr.com/polygon_mumbai`,
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY!],
      allowUnlimitedContractSize: true,
    },    
    bsc: {
      url: `https://data-seed-prebsc-1-s3.binance.org:8545/`,
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY!],
      allowUnlimitedContractSize: true,
    },    
  },
  etherscan: {
    apiKey: {
      moonbaseAlpha: `${process.env.MOONBASE_API_KEY}`,
      bscTestnet: `${process.env.BSCTESTNET_API_KEY}`,
    }
  }  
};

export default config;

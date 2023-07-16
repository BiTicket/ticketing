import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  configureChains, createConfig, WagmiConfig
} from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from "wagmi/providers/public";

import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    goerli,
    moonbaseAlpha
  } from 'wagmi/chains';



export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [moonbaseAlpha],
  [publicProvider()]
);

export const { connectors } = getDefaultWallets({
  appName: "Rainbowkit-Wagmi-Demo-React",
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

export const client = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

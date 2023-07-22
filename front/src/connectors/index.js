import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { unipassWallet } from "@unipasswallet/rainbowkit-plugin";

import { moonbaseAlpha } from "wagmi/chains";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [moonbaseAlpha],
  [publicProvider()]
);

export const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      unipassWallet({
        chains,
        options: {
          chainId: polygonMumbai.id,
          returnEmail: false,
          configurations: {
            onAuthChain: true,
          },
          appSettings: {
            appName: "wagmi demo",
          },
        },
      }),
    ],
  },
]);

export const client = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

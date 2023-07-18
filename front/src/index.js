import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import { chains, client } from './connectors';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useAccount, WagmiConfig } from 'wagmi';


ReactDOM.render(
  <WagmiConfig config={client}>
    <RainbowKitProvider chains={chains}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>,
  document.getElementById("root")
);

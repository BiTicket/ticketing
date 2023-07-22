import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const ConnectButtonCustom = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Link
                    onClick={openConnectModal}
                    className="sc-button header-slider style style-1 wallet fl-button pri-1"
                  >
                    <span>Wallet connect</span>
                  </Link>
                );
              } else if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              } else {
                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <Link
                      onClick={openAccountModal}
                      className="sc-button header-slider style style-1 wallet fl-button pri-1"
                    >
                      <span>
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </span>
                    </Link>
                  </div>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectButtonCustom;

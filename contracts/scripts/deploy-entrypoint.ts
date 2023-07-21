import { ethers, network, run } from "hardhat";
import 'dotenv/config';

// CONFIGURE PARAMETERS //
const AXELAR_GATEWAY_ADDRESS = ""
const AXELAR_GAS_SERVICE_ADDRESS = ""
const aUSDC_ADDRESS = ""
const TOKEN_SYMBOL = ""

async function main() {
  if (
    !AXELAR_GATEWAY_ADDRESS || 
    !AXELAR_GAS_SERVICE_ADDRESS || 
    !aUSDC_ADDRESS ||
    !TOKEN_SYMBOL
  ) {
    console.log("Error: Missing Parameters.")
    return
  }
  const Entrypoint = await ethers.getContractFactory("Sender");
  const entrypoint = await Entrypoint.deploy(
    AXELAR_GATEWAY_ADDRESS, 
    AXELAR_GAS_SERVICE_ADDRESS,
    aUSDC_ADDRESS,
    TOKEN_SYMBOL);
  await entrypoint.deploymentTransaction()?.wait()
  const entrypointAddress = await entrypoint.getAddress()
  console.log("Entrypoint deployed to:", entrypointAddress);

  await verify(
    entrypointAddress, 
    [    
      AXELAR_GATEWAY_ADDRESS, 
      AXELAR_GAS_SERVICE_ADDRESS,
      aUSDC_ADDRESS,
      TOKEN_SYMBOL
    ]
  )
}

const verify = async (contractAddress: string, args: any) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
    });
    console.log(`${contractAddress} verified`)
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already verified!");
    } else {
        console.log(e);
    }
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

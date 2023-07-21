import { ethers, network, run } from "hardhat";
import 'dotenv/config';

// CONFIGURE PARAMETERS //
const TOKEN_STABLE_ADDRESS = "" 
const TOKEN_DOT_ADDRESS = ""
const AXELAR_GATEWAY_ADDRESS = ""
const PLATFORM_WALLET = ""
const PLATFORM_FEE = 0

async function main() {
  if (!TOKEN_STABLE_ADDRESS || !TOKEN_DOT_ADDRESS || !AXELAR_GATEWAY_ADDRESS) {
    console.log("Error: Missing Parameters.")
    return
  }

  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.deploymentTransaction()?.wait()
  const factoryAddress = await factory.getAddress()
  console.log("Factory deployed to:", factoryAddress);

  const Platform = await ethers.getContractFactory("Platform");
  const platform = await Platform.deploy(TOKEN_STABLE_ADDRESS, TOKEN_DOT_ADDRESS, AXELAR_GATEWAY_ADDRESS);
  await platform.deploymentTransaction()?.wait()
  const platformAddress = await platform.getAddress();
  console.log("Platform deployed to:", platformAddress);
  
  const Events = await ethers.getContractFactory("Events");
  const events = await Events.deploy(platformAddress, factoryAddress);
  await events.deploymentTransaction()?.wait()
  const eventsAddress = await events.getAddress()
  console.log("Events deployed to:", eventsAddress);
  
  const Users = await ethers.getContractFactory("Users");
  const users = await Users.deploy(platformAddress);
  await users.deploymentTransaction()?.wait()
  const usersAddress = await users.getAddress()
  console.log("Users deployed to:", usersAddress);
  
  await (await factory.transferOwnership(eventsAddress)).wait();
  await (await platform.setEventsContract(eventsAddress)).wait();
  await (await platform.setUsersContract(usersAddress)).wait();
  if (PLATFORM_WALLET)
    await (await platform.setPlatformWallet(PLATFORM_WALLET)).wait();
  if (PLATFORM_FEE)
    await (await platform.setPlatformFee(PLATFORM_FEE)).wait();
  
  await verifyAll(
    factoryAddress, 
    platformAddress, 
    TOKEN_STABLE_ADDRESS, 
    TOKEN_DOT_ADDRESS, 
    AXELAR_GATEWAY_ADDRESS, 
    eventsAddress, 
    usersAddress
  )  
}

const verifyAll = async (
  factory: string,
  platform: string,
  tokenStable: string,
  tokenDOT: string,
  axelarGateway: string,
  events: string,
  users: string
) => {
  await verify(factory, [])
  await verify(platform, [tokenStable, tokenDOT, axelarGateway])
  await verify(events, [platform, factory])
  await verify(users, [platform])
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

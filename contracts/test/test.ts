import { expect } from "chai";
import { ethers } from "hardhat";
import { Escrow, Events, Factory, Platform, TokenStable, Users } from "../typechain-types"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"

describe("General", function () {
  let tokenStable: TokenStable, tokenDOT: TokenStable, events: Events, platform: Platform, users: Users;
  let factory: Factory;
  let eventsAddress: string, platformAddress: string, tokenStableAddress: string, tokenDOTAddress: string;
  let usersAddress: string, factoryAddress: string;
  let deployer: SignerWithAddress, creator: SignerWithAddress, buyer: SignerWithAddress, platformWallet: SignerWithAddress;
  let platformFee: bigint;
  const ticketsABI = require("../artifacts/contracts/Tickets.sol/Tickets.json")
  const escrowABI = require("../artifacts/contracts/Escrow.sol/Escrow.json")

  function getUseTicketParams(contract: string, eventId: number, ticketType: number) {
    const eventIdBytes = ethers.zeroPadValue(ethers.toBeHex(eventId), 4)
    const ticketTypeBytes = ethers.zeroPadValue(ethers.toBeHex(ticketType), 4)
    const nonce =  Math.floor(Math.random() * 4294967295)
    const nonceBytes = ethers.zeroPadValue(ethers.toBeHex(nonce), 4)
    return ethers.concat([contract, eventIdBytes, ticketTypeBytes, nonceBytes])
  }
  

  before(async function() {
    [deployer, creator, buyer, platformWallet] = await ethers.getSigners();

    const TokenStable = await ethers.getContractFactory("TokenStable");
    tokenStable = await TokenStable.deploy();
    tokenStableAddress = await tokenStable.getAddress()
    console.log("TokenStable deployed to:", tokenStableAddress);

    const TokenDOT = await ethers.getContractFactory("TokenStable");
    tokenDOT = await TokenDOT.deploy();
    tokenDOTAddress = await tokenDOT.getAddress()
    console.log("TokenDOT deployed to:", tokenDOTAddress);

    const Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy();
    factoryAddress = await factory.getAddress()
    console.log("Factory deployed to:", factoryAddress);

    const Platform = await ethers.getContractFactory("Platform");
    platform = await Platform.deploy(tokenStableAddress, tokenDOTAddress);
    platformAddress = await platform.getAddress();
    console.log("Platform deployed to:", platformAddress);
  
    const Events = await ethers.getContractFactory("Events");
    events = await Events.deploy(platformAddress, factoryAddress);
    eventsAddress = await events.getAddress()
    console.log("Events deployed to:", eventsAddress);
  
    const Users = await ethers.getContractFactory("Users");
    users = await Users.deploy(platformAddress);
    usersAddress = await users.getAddress()
    console.log("Users deployed to:", usersAddress);

    await factory.transferOwnership(eventsAddress);
    await platform.setEventsContract(eventsAddress);
    await platform.setUsersContract(usersAddress);
    await platform.setPlatformWallet(platformWallet);
    platformFee = 1000n
    await platform.setPlatformFee(platformFee);

    await tokenStable.transfer(buyer.address, ethers.parseEther("1000000"))
    await tokenDOT.transfer(buyer.address, ethers.parseEther("1000000"))

    await tokenStable.connect(buyer).approve(platform, ethers.parseEther("1000000"))
    await tokenDOT.connect(buyer).approve(platform, ethers.parseEther("1000000"))
  })

  it("Should Not Create User Without Data", async function () {
    await expect(platform.connect(creator).upsertUser("")).to.be.revertedWithCustomError(platform, "EmptyMetadata")
  });

  it("Should Create User", async function () {
    await platform.connect(creator).upsertUser("ipfs://creatorMetadata")
    expect(await users.users(creator.address)).to.be.equal("ipfs://creatorMetadata")
    await platform.connect(buyer).upsertUser("ipfs://buyerMetadata")
    expect(await users.users(buyer.address)).to.be.equal("ipfs://buyerMetadata")
  });  

  it("Should Create Event", async function () {
    await platform.connect(creator).createEvent({
      creator: creator.address,
      eventMetadataUri: "ipfs://eventMetadata", 
      NFTMetadataUri: "ipfs://NFTMetadata", 
      ticketsMetadataUris: ["ipfs://TicketMetadata1","ipfs://TicketMetadata2"], 
      ticketsNFTMetadataUris: ["ipfs://TicketNFTMetadata1","ipfs://TicketNFTMetadata2"], 
      prices: [100,1000,10000, 200,2000,20000], 
      maxSupplies: [100, 200], 
      deadline: Math.floor(new Date().getTime() / 1000) + 100,
      percentageWithdraw: 5000
    })
    expect(await events.totalEvents()).to.be.equal(1n);
    expect(await events.balanceOf(creator.address)).to.be.equal(1n);
    const event = await events.getEventByRange(0, 0)
    expect(event[0].creator).to.be.equal(creator.address)
    expect(event[0].eventMetadataUri).to.be.equal("ipfs://eventMetadata")
    expect(event[0].NFTMetadataUri).to.be.equal("ipfs://NFTMetadata")
  });

  it("Should Buy Ticket With StableCoin", async function () {
    const event = await events.getEventByRange(0, 0)
    const balanceBuyerBefore = await tokenStable.balanceOf(buyer.address)
    const balanceCreatorBefore = await tokenStable.balanceOf(creator.address)
    const balanceEscrowBefore = await tokenStable.balanceOf(event[0].escrow)
    const balancePlatformBefore = await tokenStable.balanceOf(platformWallet)
    const ticketType = 0
    const tokenUsed = 0
    const amount = 1

    await tokenStable.connect(buyer).approve(event[0].escrow, ethers.parseEther("1000000"))
    await platform.connect(buyer).buyTicket(buyer.address, 0, ticketType, tokenUsed, amount)
    const tickets = new ethers.Contract(event[0].tickets, ticketsABI.abi, deployer)
    expect(await tickets.balanceOf(buyer.address, 0)).to.be.equal(amount)
    const ticketInfo = await tickets.getTicketByType(ticketType);
    const ticketPrice = ticketInfo.prices[tokenUsed]
    const fee = ticketPrice * platformFee / 10000n
    expect(await tokenStable.balanceOf(buyer.address)).to.be.equal(balanceBuyerBefore - ticketPrice - fee)
    expect(await tokenStable.balanceOf(creator.address)).to.be.equal(balanceCreatorBefore)
    expect(await tokenStable.balanceOf(event[0].escrow)).to.be.equal(balanceEscrowBefore + ticketPrice)
    expect(await tokenStable.balanceOf(platformWallet)).to.be.equal(balancePlatformBefore + fee)
  });

  it("Should Buy Ticket With DOT", async function () {
    const event = await events.getEventByRange(0, 0)
    const balanceBuyerBefore = await tokenDOT.balanceOf(buyer.address)
    const balanceCreatorBefore = await tokenDOT.balanceOf(creator.address)
    const balanceEscrowBefore = await tokenDOT.balanceOf(event[0].escrow)
    const balancePlatformBefore = await tokenDOT.balanceOf(platformWallet)
    const ticketType = 1
    const tokenUsed = 1
    const amount = 1

    await tokenDOT.connect(buyer).approve(event[0].escrow, ethers.parseEther("1000000"))
    await platform.connect(buyer).buyTicket(buyer.address, 0, ticketType, tokenUsed, amount)
    const tickets = new ethers.Contract(event[0].tickets, ticketsABI.abi, deployer)
    expect(await tickets.balanceOf(buyer.address, 0)).to.be.equal(amount)
    const ticketInfo = await tickets.getTicketByType(ticketType);
    const ticketPrice = ticketInfo.prices[tokenUsed]
    const fee = ticketPrice * platformFee / 10000n
    expect(await tokenDOT.balanceOf(buyer.address)).to.be.equal(balanceBuyerBefore - ticketPrice - fee)
    expect(await tokenDOT.balanceOf(creator.address)).to.be.equal(balanceCreatorBefore)
    expect(await tokenDOT.balanceOf(event[0].escrow)).to.be.equal(balanceEscrowBefore + ticketPrice)
    expect(await tokenDOT.balanceOf(platformWallet)).to.be.equal(balancePlatformBefore + fee)
  });

  it("Should Buy Ticket With Native", async function () {
    const event = await events.getEventByRange(0, 0)
    const balanceBuyerBefore = await ethers.provider.getBalance(buyer.address)
    const balanceCreatorBefore = await ethers.provider.getBalance(creator.address)
    const balanceEscrowBefore = await ethers.provider.getBalance(event[0].escrow)
    const balancePlatformBefore = await ethers.provider.getBalance(platformWallet)
    const ticketType = 1
    const tokenUsed = 2
    const amount = 1
    const tickets = new ethers.Contract(event[0].tickets, ticketsABI.abi, deployer)
    const ticketInfo = await tickets.getTicketByType(ticketType);
    const ticketPrice = ticketInfo.prices[tokenUsed]
    const fee = ticketPrice * platformFee / 10000n
    const txMined = await (await platform.connect(buyer).buyTicket(buyer.address, 0, ticketType, tokenUsed, amount, {value: ticketPrice + fee})).wait()
    const gasSpent = txMined ? txMined.gasUsed * txMined.gasPrice : 0n
    expect(await tickets.balanceOf(buyer.address, 0)).to.be.equal(amount)
    expect(await ethers.provider.getBalance(buyer.address)).to.be.equal(balanceBuyerBefore - ticketPrice - gasSpent - fee)
    expect(await ethers.provider.getBalance(creator.address)).to.be.equal(balanceCreatorBefore)
    expect(await ethers.provider.getBalance(event[0].escrow)).to.be.equal(balanceEscrowBefore + ticketPrice)
    expect(await ethers.provider.getBalance(platformWallet)).to.be.equal(balancePlatformBefore + fee)

  });

  it("Should Use Ticket", async function () {
    const eventId = 0
    const ticketType = 0
    const message =  getUseTicketParams(eventsAddress, eventId, ticketType)
    const sig = ethers.Signature.from(await buyer.signMessage(message))
    await platform.connect(creator).useTicket(message, sig.v, sig.r, sig.s)

    expect(await events.ticketsUsed(eventId, ticketType, buyer.address)).to.be.equal(1n)
  });

  it("Should Not Use Ticket Again", async function () {
    const eventId = 0
    const ticketType = 0
    const message =  getUseTicketParams(eventsAddress, eventId, ticketType)
    const sig = ethers.Signature.from(await buyer.signMessage(message))
    await expect(platform.connect(creator).useTicket(message, sig.v, sig.r, sig.s)).to.be.revertedWithCustomError(events, "TicketAlreadyUsed")
  });

  it("Should Not Withdraw More Than 50% Of Escrow With Stable", async function () {
    const event = await events.getEventByRange(0, 0)
    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    await expect(escrow.withdrawStable(100)).to.be.revertedWithCustomError(escrow, "MaximumWithdrawalExcedeed")
  });

  it("Should Not Withdraw More Than 50% Of Escrow With DOT", async function () {
    const event = await events.getEventByRange(0, 0)
    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    await expect(escrow.withdrawStable(2000)).to.be.revertedWithCustomError(escrow, "MaximumWithdrawalExcedeed")
  });

  it("Should Not Withdraw More Than 50% Of Escrow With Native", async function () {
    const event = await events.getEventByRange(0, 0)
    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    await expect(escrow.withdrawNative(20000)).to.be.revertedWithCustomError(escrow, "MaximumWithdrawalExcedeed")
  });

  it("Should Withdraw 50% Of Escrow With Stable", async function () {
    const amount = 50n
    const event = await events.getEventByRange(0, 0)
    const balanceCreatorBefore = await tokenStable.balanceOf(creator.address)
    const balanceEscrowBefore = await tokenStable.balanceOf(event[0].escrow)

    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    await escrow.withdrawStable(amount)
    expect(await tokenStable.balanceOf(creator.address)).to.be.equal(balanceCreatorBefore + amount) 
    expect(await tokenStable.balanceOf(event[0].escrow)).to.be.equal(balanceEscrowBefore - amount)
  });

  it("Should Withdraw 50% Of Escrow With DOT", async function () {
    const amount = 1000n
    const event = await events.getEventByRange(0, 0)
    const balanceCreatorBefore = await tokenDOT.balanceOf(creator.address)
    const balanceEscrowBefore = await tokenDOT.balanceOf(event[0].escrow)

    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    await escrow.withdrawDOT(amount)
    expect(await tokenDOT.balanceOf(creator.address)).to.be.equal(balanceCreatorBefore + amount) 
    expect(await tokenDOT.balanceOf(event[0].escrow)).to.be.equal(balanceEscrowBefore - amount)
  });

  it("Should Withdraw 50% Of Escrow With Native", async function () {
    const amount = 10000n
    const event = await events.getEventByRange(0, 0)
    const balanceCreatorBefore = await ethers.provider.getBalance(creator.address)
    const balanceEscrowBefore = await ethers.provider.getBalance(event[0].escrow)

    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    const txMined = await (await escrow.withdrawNative(amount)).wait()
    const gasSpent = BigInt(txMined ? txMined.gasUsed * txMined.gasPrice : 0)
    expect(await ethers.provider.getBalance(creator.address)).to.be.equal(balanceCreatorBefore + amount - gasSpent) 
    expect(await ethers.provider.getBalance(event[0].escrow)).to.be.equal(balanceEscrowBefore - amount)
  });
  
  it("Should Withdraw The Rest Of Escrow With Stable When Event Is Finished", async function () {
    await ethers.provider.send("evm_increaseTime", [3600])
    await ethers.provider.send("evm_mine")

    const amount = 50n
    const event = await events.getEventByRange(0, 0)
    const balanceCreatorBefore = await tokenStable.balanceOf(creator.address)
    const balanceEscrowBefore = await tokenStable.balanceOf(event[0].escrow)

    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    await escrow.withdrawStable(amount)
    expect(await tokenStable.balanceOf(creator.address)).to.be.equal(balanceCreatorBefore + amount) 
    expect(await tokenStable.balanceOf(event[0].escrow)).to.be.equal(balanceEscrowBefore - amount)
  });

  it("Should Withdraw The Rest Of Escrow With DOT When Event Is Finished", async function () {
    const amount = 50n
    const event = await events.getEventByRange(0, 0)
    const balanceCreatorBefore = await tokenDOT.balanceOf(creator.address)
    const balanceEscrowBefore = await tokenDOT.balanceOf(event[0].escrow)

    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    await escrow.withdrawDOT(amount)
    expect(await tokenDOT.balanceOf(creator.address)).to.be.equal(balanceCreatorBefore + amount) 
    expect(await tokenDOT.balanceOf(event[0].escrow)).to.be.equal(balanceEscrowBefore - amount)
  });

  it("Should Withdraw The Rest Of Escrow With Native When Event Is Finished", async function () {
    const amount = 10000n
    const event = await events.getEventByRange(0, 0)
    const balanceCreatorBefore = await ethers.provider.getBalance(creator.address)
    const balanceEscrowBefore = await ethers.provider.getBalance(event[0].escrow)

    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, creator)
    const txMined = await (await escrow.withdrawNative(amount)).wait()
    const gasSpent = BigInt(txMined ? txMined.gasUsed * txMined.gasPrice : 0)
    expect(await ethers.provider.getBalance(creator.address)).to.be.equal(balanceCreatorBefore + amount - gasSpent) 
    expect(await ethers.provider.getBalance(event[0].escrow)).to.be.equal(balanceEscrowBefore - amount)
  });
 
  it("Should Cancel Event And Return Founds When Event Is Cancelled", async function () {
    await platform.connect(creator).createEvent({
      creator: creator.address,
      eventMetadataUri: "ipfs://eventMetadata", 
      NFTMetadataUri: "ipfs://NFTMetadata", 
      ticketsMetadataUris: ["ipfs://TicketMetadata1","ipfs://TicketMetadata2"], 
      ticketsNFTMetadataUris: ["ipfs://TicketNFTMetadata1","ipfs://TicketNFTMetadata2"], 
      prices: [100,1000,10000, 200,2000,20000], 
      maxSupplies: [100, 200], 
      deadline: Math.floor(new Date().getTime() / 1000) + 100000000,
      percentageWithdraw: 5000
    })

    const event = await events.getEventByRange(1, 1)
    const eventId = 1
    
    const ticketType = 0
    const tokenUsedStable = 0
    const amount = 2
    const ticketPriceStable = 200n

    await tokenStable.connect(buyer).approve(event[0].escrow, ethers.parseEther("1000000"))
    await tokenDOT.connect(buyer).approve(event[0].escrow, ethers.parseEther("1000000"))
    await platform.connect(buyer).buyTicket(buyer.address, eventId, ticketType, tokenUsedStable, amount)

    const ticketType2 = 1
    const tokenUsedDOT = 1
    const ticketPriceDOT = 4000n
    await platform.connect(buyer).buyTicket(buyer.address, eventId, ticketType2, tokenUsedDOT, amount)

    const tokenUsedNative = 2
    const ticketPriceNative = 40000n
    const fee = ticketPriceNative * platformFee / 10000n
    await platform.connect(buyer).buyTicket(buyer.address, eventId, ticketType2, tokenUsedNative, amount, {value: ticketPriceNative + fee})

    await platform.connect(creator).cancelEvent(eventId) 
    const eventCancelled = await events.getEventByRange(1, 1)
    expect(eventCancelled[0].cancelled).to.be.equal(true)

    const balanceStableBuyerBefore = await tokenStable.balanceOf(buyer.address)
    const balanceStableEscrowBefore = await tokenStable.balanceOf(event[0].escrow)
    const balanceDOTBuyerBefore = await tokenDOT.balanceOf(buyer.address)
    const balanceDOTEscrowBefore = await tokenDOT.balanceOf(event[0].escrow)
    const balanceNativeBuyerBefore = await ethers.provider.getBalance(buyer.address)
    const balanceNativeEscrowBefore = await ethers.provider.getBalance(event[0].escrow)

    const escrow = new ethers.Contract(event[0].escrow, escrowABI.abi, buyer)
    const txMined = await (await escrow.returnFunds()).wait()
    const gasSpent = BigInt(txMined ? txMined.gasUsed * txMined.gasPrice : 0)

    expect(await tokenStable.balanceOf(buyer.address)).to.be.equal(balanceStableBuyerBefore + ticketPriceStable)
    expect(await tokenStable.balanceOf(event[0].escrow)).to.be.equal(balanceStableEscrowBefore - ticketPriceStable)
    expect(await tokenDOT.balanceOf(buyer.address)).to.be.equal(balanceDOTBuyerBefore + ticketPriceDOT)
    expect(await tokenDOT.balanceOf(event[0].escrow)).to.be.equal(balanceDOTEscrowBefore - ticketPriceDOT)
    expect(await ethers.provider.getBalance(buyer.address)).to.be.equal(balanceNativeBuyerBefore + ticketPriceNative - gasSpent)
    expect(await ethers.provider.getBalance(event[0].escrow)).to.be.equal(balanceNativeEscrowBefore - ticketPriceNative)
  });

});


const { assert, expect } = require("chai")
const { network, deployments, ethers, getUnnamedAccounts, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nft Marketplace Unit Tests", function () {
          let nftMarketplace, basicNft, deployer, player
          const PRICE = ethers.utils.parseEther("0.1")
          const TOKEN_ID = 0

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              //   player = (await getUnnamedAccounts()).player
              const accounts = await ethers.getSigners()
              player = accounts[1]
              await deployments.fixture(["all"])
              nftMarketplace = await ethers.getContract("NftMarketplace")
              basicNft = await ethers.getContract("BasicNft")
              await basicNft.mintNft()
              await basicNft.approve(nftMarketplace.address, TOKEN_ID)
          })

          it("Lists and can be bought", async function () {
              await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
              const playerConnectedNftMarketplace = nftMarketplace.connect(player)
              await playerConnectedNftMarketplace.buyItem(basicNft.address, TOKEN_ID, {
                  value: PRICE,
              })
              const newOwner = await basicNft.ownerOf(TOKEN_ID)
              const deployerProceeds = await nftMarketplace.getProceeds(deployer)
              assert(newOwner.toString() == player.address)
              assert(deployerProceeds.toString() == PRICE.toString())
          })
      })

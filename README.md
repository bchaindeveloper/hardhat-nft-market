The Ultimate NFT Repo
keyboard (20:28:51) Lesson 14: Hardhat NFTs

Full Repo

This repo has been updated to work with Goerli over Rinkeby.


NFT Pug NFT Happy NFT Shiba NFT Frown NFT St.Bernard


We go through creating 3 different kinds of NFTs.

A Basic NFT
IPFS Hosted NFT
That uses Randomness to generate a unique NFT
SVG NFT (Hosted 100% on-chain)
Uses price feeds to be dynamic
Getting Started
Requirements
git
You'll know you did it right if you can run git --version and you see a response like git version x.x.x
Nodejs
You'll know you've installed nodejs right if you can run:
node --version and get an ouput like: vx.x.x
Yarn instead of npm
You'll know you've installed yarn right if you can run:
yarn --version and get an output like: x.x.x
You might need to install it with npm or corepack
Quickstart
git clone https://github.com/PatrickAlphaC/hardhat-nft-fcc
cd hardhat-nft-fcc
yarn
Typescript
If you want to get to typescript and you cloned the javascript version, just run:

git checkout typescript
Useage
Deploy:

yarn hardhat deploy
Testing
yarn hardhat test
Test Coverage
yarn hardhat coverage
Deployment to a testnet or mainnet
Setup environment variabltes
You'll want to set your GOERLI_RPC_URL and PRIVATE_KEY as environment variables. You can add them to a .env file, similar to what you see in .env.example.

PRIVATE_KEY: The private key of your account (like from metamask). NOTE: FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
You can learn how to export it here.
GOERLI_RPC_URL: This is url of the goerli testnet node you're working with. You can get setup with one for free from Alchemy
Get testnet ETH
Head over to faucets.chain.link and get some tesnet ETH & LINK. You should see the ETH and LINK show up in your metamask. You can read more on setting up your wallet with LINK.

Setup a Chainlink VRF Subscription ID
Head over to vrf.chain.link and setup a new subscription, and get a subscriptionId. You can reuse an old subscription if you already have one.

You can follow the instructions if you get lost. You should leave this step with:

A subscription ID

Your subscription should be funded with LINK

Deploy

In your helper-hardhat-config.ts add your subscriptionId under the section of the chainId you're using (aka, if you're deploying to goerli, add your subscriptionId in the subscriptionId field under the 4 section.)

Then run:

yarn hardhat deploy --network goerli --tags main
We only deploy the main tags, since we need to add our RandomIpfsNft contract as a consumer.

Add your contract address as a Chainlink VRF Consumer
Go back to vrf.chain.link and under your subscription add Add consumer and add your contract address. You should also fund the contract with a minimum of 1 LINK.

Mint NFTs
Then run:

yarn hardhat deploy --network goerli --tags mint
Estimate gas cost in USD
To get a USD estimation of gas cost, you'll need a COINMARKETCAP_API_KEY environment variable. You can get one for free from CoinMarketCap.

Then, uncomment the line coinmarketcap: COINMARKETCAP_API_KEY, in hardhat.config.ts to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out.

Verify on etherscan
If you deploy to a testnet or mainnet, you can verify it if you get an API Key from Etherscan and set it as an environemnt variable named ETHERSCAN_API_KEY. You can pop it into your .env file as seen in the .env.example.

In it's current state, if you have your api key set, it will auto verify goerli contracts!

However, you can manual verify with:

yarn hardhat verify --constructor-args arguments.ts DEPLOYED_CONTRACT_ADDRESS
Typescript differences
.js files are now .ts
We added a bunch of typescript and typing packages to our package.json. They can be installed with:
yarn add @typechain/ethers-v5 @typechain/hardhat @types/chai @types/node ts-node typechain typescript
The biggest one being typechain
This gives your contracts static typing, meaning you'll always know exactly what functions a contract can call.
This gives us factories that are specific to the contracts they are factories of. See the tests folder for a version of how this is implemented.
We use imports instead of require. Confusing to you? Watch this video
Add tsconfig.json
Linting
To check linting / code formatting:

yarn lint
or, to fix:

yarn lint:fix
Thank you!

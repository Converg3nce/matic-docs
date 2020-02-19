---
id: metatransactions-gsn
title: GSN
---


Writing a GSN compatible application requires the following changes/workarounds on your application:

1. In your DApp's smart contract 
    - The smart contract is to be made capable of listening to 'collect calls'
    - Meaning, it should be able to make a difference between a regular transaction and a transaction from a Relayer
2. On your Client application
    - Instead of talking directly to the blockchain, the client now talks to a Relayer/a network of relayers
    - Calls from such clients need to be directed via a relayer

The following tutorial builds upon a previous tutorial [[link](https://docs.matic.network/newbies/getting-started-solidity/)], where we built an Airbnb smart contract, followed by [[link](https://docs.matic.network/newbies/deploy-dapp-on-matic/)], where we deployed the complete DApp.

In this tutorial, we will edit the client side code and contracts to make it GSN-compatible.

We start by cloning the repository from [here](https://github.com/maticnetwork/ethindia-workshop)

## Writing GSN compatible smart contract

install openzeppelin contracts package and other dependencies, we'd be needing them later,
```js
$ npm i --save-dev @openzeppelin/gsn-helpers \ 
  @openzeppelin/contracts-ethereum-package \
  @openzeppelin/upgrades \
  @openzeppelin/gsn-provider
$ npm i --save-dev truffle-hdwallet-provider
```
Head over to `./contracts/Airbnb.sol` 

add the following import in your contract
```js
import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";
```
and inherit `GSNRecipient.sol`, 
```js
    pragma solidity ^0.5.7;
    import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";
    contract Airbnb is GSNRecipient {
    		.....
    		.....
    }
```
Next, we'd like the contract to *do something* when it receives a 'collect-call' or a relayed call, for that, the GSNRecipient interface defines `acceptRelayedCall()`, add the following function in your contract code
```js
function acceptRelayedCall(
    address relay,
    address from,
    bytes calldata encodedFunction,
    uint256 transactionFee,
    uint256 gasPrice,
    uint256 gasLimit,
    uint256 nonce,
    bytes calldata approvalData,
    uint256 maxPossibleCharge
  ) external view returns (uint256, bytes memory) {

    // approve ALL calls!
    return _approveRelayedCall();

  }
function _preRelayedCall(bytes memory context) internal returns (bytes32) {
}
function _postRelayedCall(bytes memory context, bool, uint256 actualCharge, bytes32) internal {
}
```
Next, we compile our contract, run the following in terminal window
```js
$ truffle compile
```
Before we migrate, we'll edit our migrations file to call `initialize()` function right after deployment of the contract. We do this for our contract to be *aware* of the RelayHub address sitting on the network

Make sure this is how your `./migrations/2_deploy_contracts.js` file looks like,
```js
const Airbnb = artifacts.require("Airbnb");

module.exports = aysnc function(deployer) {
  await deployer.deploy(Airbnb);
  airbnbInstance = await Airbnb.deployed();
  await airbnbInstance.initialize();
};
```
To be able to deploy our contract on Matic network and not on a local blockchain, we'll edit out `truffle-config.js` file in root directory to look something like this:
```js
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://testnetv3.matic.network`),
      network_id: 15001,
      gasPrice: '0x0',
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
    }
  }
}
```

Notice, it requires mnemonic to be passed in for maticProvider, this is the seed phrase for the account you'd like to deploy from. Create a new `.secret` file in root directory and enter your 12 word mnemonic seed phrase to get started (gas price on testnet3 can be set to 0, so you don't have to worry about funds right now)

next, run:
```js
$ truffle migrate --network matic
```
If all goes well, you should get your GSN compatible contract address, 

    2_deploy_contracts.js
    =====================
    
       Replacing 'Airbnb'
       ------------------
       > transaction hash:    0x1c94d095a2f629521344885910e6a01076188fa815a310765679b05abc09a250
       > Blocks: 5            Seconds: 5
       > contract address:    0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB
       > block number:        2371252
       > block timestamp:     1578238698
       > account:             0x9fB29AAc15b9A4B7F17c3385939b007540f4d791
       > balance:             79.409358061899298312
       > gas used:            1896986
       > gas price:           0 gwei
       > value sent:          0 ETH
       > total cost:          0 ETH
    
       Pausing for 2 confirmations...
       ------------------------------
       > confirmation number: 5 (block: 2371262)
    initialised!
    
       > Saving migration to chain.
       > Saving artifacts
       -------------------------------------
       > Total cost:                   0 ETH
    
    
    Summary
    =======
    > Total deployments:   2
    > Final cost:          0 ETH

We have our contract deployed at `0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB` (your address would differ, but you can play around with this address in the next steps)

Now that we have a contract that is "aware" of the RelayHub and "collect-calls", we'd like to fund it on the RelayHub. 

Remember, the gas-less transactions are being paid by the DApp developer through their deposit for the smart contract on the RelayHub.

> Remember to replace your ABI file!

## Fund your smart contract on the RelayHub

This deposit is where the gas cost is deducted from.

You can either use the DApp tool at GSN's website,

Head over to [https://gsn.openzeppelin.com/recipients](https://gsn.openzeppelin.com/recipients), switch to testnetv3 on Metamask, enter your contract address, and fund it with sufficient amount of ETH to pay for your user's gas costs. 

Or you can use a js-helper library by OpenZeppelin, 
```js
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const Web3 = require('web3');
const { fundRecipient } = require('@openzeppelin/gsn-helpers');

const provider = new HDWalletProvider(mnemonic, "https://testnetv3.matic.network");
const web3 = new Web3(provider);

await fundRecipient(web3, {
  recipient: // enter your contract address ,
  relayHubAddress: 0xD216153c06E857cD7f72665E0aF1d7D82172F494,
  amount: web3.utils.toWei("2", "ether"),
  from: YOUR_ACCOUNT // enter your account address (must have enough balance to fund!)
});
```
You can look at the available balance for our contract (deployed in the previous step) here: [https://gsn.openzeppelin.com/recipients/0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB](https://gsn.openzeppelin.com/recipients/0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB)

## Writing client side code for ether-less users

Head over to `./dapp-ui/plugins/utils.js`, this is where all our contract calls reside. 

Edit the contract address variable,
```js
let airbnbContractAddress = '0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB' // Paste Contract address here
```
Since now we can potentially cater to users having no money at all, they won't be requiring to approve anything on metamask, which means for the user, experience would be similar to what it is on any other web application. And for you as the developer, have to change just a few lines of code, that direct user calls via a relayer.

Edit the `setProvider` function in your `utils.js` to look something like,
```js
export async function setProvider() {
  gsnWeb3 = new Web3(new GSNProvider("https://testnetv3.matic.network"));  
  gsnWeb3.eth.accounts.wallet.add('0xa12 ... ') // add private key to an account holding no funds!
  account = gsnWeb3.eth.accounts.wallet
}
```
Notice, we use a new instance of GSNProvider here, it is a provider that elegantly sits inside the Web3 object, to provide the developer similar function calls as that of Web3, but instead the `send()` calls will now be routed via a Relayer.

Ideally, you'd want a random private key generated here, instead of a fixed private key for all your users' accounts. Read more about ephemeral keys here: [https://github.com/OpenZeppelin/openzeppelin-network.js](https://github.com/OpenZeppelin/openzeppelin-network.js)

We import the GSNProvider in our file, 
```js
const { GSNProvider } = require("@openzeppelin/gsn-provider");
```
Next, we change all instances of `metamaskWeb` to `gsnWeb3`

Following is how the `utils.js` now looks:
```js
import AirbnbABI from './Airbnb.json'
const Web3 = require('web3')
const { GSNProvider } = require("@openzeppelin/gsn-provider");

let gsnWeb3 = null
let account = null
let airbnbContract
let airbnbContractAddress = '0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB'

export function web3() {
  return gsnWeb3
}
export const accountAddress = () => {
  return account
}
export async function setProvider() {
  gsnWeb3 = new Web3(new GSNProvider("https://testnetv3.matic.network"));
  gsnWeb3.eth.accounts.wallet.add('0x12AeC... ')
  account = gsnWeb3.eth.accounts.wallet
}

function getAirbnbContract() {
  airbnbContract = airbnbContract || new gsnWeb3.eth.Contract(AirbnbABI.abi, airbnbContractAddress)
  return airbnbContract
}
export async function postProperty(name, description, price) {
  const prop = await getAirbnbContract().methods.rentOutproperty(name, description, price).send({
    from: account[0].address,
    gas: 8000000
  })
  alert('Property Posted Successfully')
}
export async function bookProperty(spaceId, checkInDate, checkOutDate, totalPrice) {
  const prop = await getAirbnbContract().methods.rentProperty(spaceId, checkInDate, checkOutDate).send({
    from: account[0].address,
    value: totalPrice,
  })
  alert('Property Booked Successfully')
}

export async function fetchAllProperties() {
  const propertyId = await getAirbnbContract().methods.propertyId().call()
  const properties = []
  for (let i = 0; i < propertyId; i++) {
    const p = await airbnbContract.methods.properties(i).call()
    properties.push({
      id: i,
      name: p.name,
      description: p.description,
      price: gsnWeb3.utils.fromWei(p.price)
    })
  }
  return properties
}
```

And that's it! 

You can now run
```js
$ npm run dev
```
and view your DApp now compatible with the web2 world 😄

## Test

Following are the addresses of the Airbnb contract and the RelayHub contract on testnetv3,
```
Airbnb.sol : `0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB`

RelayHub.sol : `0xD216153c06E857cD7f72665E0aF1d7D82172F494`
```
You can check our contract's balance here: [https://gsn.openzeppelin.com/recipients/0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB](https://gsn.openzeppelin.com/recipients/0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB)

### setup repository

clone [https://github.com/maticnetwork/ethindia-workshop.git](https://github.com/maticnetwork/ethindia-workshop.git), and checkout on branch `gsn`

    $ git clone https://github.com/maticnetwork/ethindia-workshop.git && git checkout gsn

and run:

    $ cd dapp-ui && npm run dev
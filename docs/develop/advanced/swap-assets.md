---
id: swap-assets
title: Swap Assets
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

## Swap ERC20 and ERC721 tokens atomically using Plasma Asset Swaps

This document will help you understand the Plasma asset swaps that can be performed while using Matic. This allows you to create applications such as decentralized exchanges, NFT marketplaces and similar while using our Plasma construction, which piggybacks on the security of Ethereum.

## Introduction to EIP712 and signed transfer
This section aims to provide an introduction to the swap of mapped assets on Matic plasma chain. 

>Note: For tokens deployed on Matic directly - the process isn't required. The process only applies to tokens that are *mapped* on to Matic.

The transfer process is enabled by making use of the new RPC call `eth_SignTypedData`, introduced in [EIP712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) - this is done to avoid the complexity of allowance on plasma chains and to add simplicity to plasma fraud proofs.

The construction includes introduction of a new method in each associated asset contract - [ERC721](https://github.com/maticnetwork/contracts/blob/aee2433b2cb76b8bf2ad53736a9e6340cd3d9f15/contracts/child/ChildERC721.sol#L76) and [ERC20](https://github.com/maticnetwork/contracts/blob/aee2433b2cb76b8bf2ad53736a9e6340cd3d9f15/contracts/child/ChildERC20.sol#L104) on matic plasma chain, called `transferWithSig`. And a `Marketplace.sol` smart contract that executes the swap.


## transferWithSig Method

The method definition is as follows:
```javascript
function transferWithSig(bytes calldata sig, uint256 amount, bytes32 data, uint256 expiration, address to) external returns (address from) {
    require(amount > 0);
    require(expiration == 0 || block.number <= expiration, "Signature is expired");

    bytes32 dataHash = getTokenTransferOrderHash(
      msg.sender,
      amount,
      data,
      expiration
    );
    require(disabledHashes[dataHash] == false, "Sig deactivated");
    disabledHashes[dataHash] = true;

    from = ecrecovery(dataHash, sig);
    _transferFrom(from, to, amount);
}
```

### Params
`bytes calldata sig` - signature of the user on an order of spending a set amount of tokens in exchange of another set of tokens (creating an *order*)

`uint256 amount` - the amount of tokens user signs on

`bytes32 data`  is a `keccak256` hash of the matching order (order id, token, amount)

`uint256 expiration` - the block number at which the order is to be expired

`address to` - order filler's address

The above method, when called from an external contract, validates the passed signature - the construction of which follows [EIP712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md), recovers the user address and transfers the specified amount of tokens from the user's account to the specified account.

## Asset Swap Protocol 

Now this particular functionality - of transferring assets from a user's account using their signature - can be employed in a number of ways. One of them being that of a DEX-like marketplace that executes atomic swaps between tokens.

### Terminology
An **order** comprises of an order id, token address, amount (or token id). A user signs on an **order** and generates a signature. This signature is then used to transfer the signed amount of assets on user's behalf. 

Below is a detailed spec of the [Marketplace](https://github.com/maticnetwork/contracts/blob/master/contracts/child/misc/Marketplace.sol) smart contract deployed on Matic chain, that performs atomic asset swaps. 

### Marketplace.sol

```javascript
pragma solidity ^0.5.2;

interface MarketplaceToken {
  function transferWithSig(bytes calldata sig, uint256 tokenIdOrAmount, bytes32 data, uint256 expiration, address to) external returns (address);
}

contract Marketplace {
  struct Order {
    address token;
    bytes sig;
    uint256 tokenIdOrAmount;
  }

  function decode(bytes memory data) internal pure returns(Order memory order) {
    (order.token, order.sig, order.tokenIdOrAmount) = abi.decode(data, (address, bytes, uint256));
  }

  function executeOrder(
    bytes memory data1,
    bytes memory data2,
    bytes32 orderId,
    uint256 expiration,
    address taker
  ) public {
    Order memory order1 = decode(data1);
    Order memory order2 = decode(data2);

    // Transferring order1.token tokens from tradeParticipant1 to address2
    address tradeParticipant1 = MarketplaceToken(order1.token).transferWithSig(
      order1.sig,
      order1.tokenIdOrAmount,
      keccak256(abi.encodePacked(orderId, order2.token, order2.tokenIdOrAmount)),
      expiration,
      taker
    );

    // Transferring token2 from tradeParticipant2 to tradeParticipant1
    address tradeParticipant2 = MarketplaceToken(order2.token).transferWithSig(
      order2.sig,
      order2.tokenIdOrAmount,
      keccak256(abi.encodePacked(orderId, order1.token, order1.tokenIdOrAmount)),
      expiration,
      tradeParticipant1
    );
    require(taker == tradeParticipant2, "Orders are not complimentary");
  }
}
```
The above contract executes the swap without prior approval or allowance transaction. 

The function executeOrder takes two bytestreams that represent two orders that are to be settled along with the order filler (the participant that fulfills the order). Order settlement happens with the execution of transferWithSig method on the two tokens from both the orders:

```javascript
address tradeParticipant1 = MarketplaceToken(order1.token).transferWithSig(
      order1.sig,
      order1.tokenIdOrAmount,
      keccak256(abi.encodePacked(orderId, order2.token, order2.tokenIdOrAmount)),
      expiration,
      taker
    );

// Transferring token2 from tradeParticipant2 to tradeParticipant1
address tradeParticipant2 = MarketplaceToken(order2.token).transferWithSig(
      order2.sig,
      order2.tokenIdOrAmount,
      keccak256(abi.encodePacked(orderId, order1.token, order1.tokenIdOrAmount)),
      expiration,
      tradeParticipant1
    );
require(taker == tradeParticipant2, "Orders are not complimentary");
```

## Tutorial (ERC20/721 Swap)

Here is a short tutorial for you to try out execution of plasma-backed asset swaps on matic. 
A boilerplate codebase is ready for you to clone [here](https://github.com/nglglhtr/asset-swap-tutorial). 
The repository consists of all the relevant contracts, which are, ChildERC20, ChildERC721, Marketplace and their dependencies along with the scripts that will guide you through the tutorial ahead.

### Prerequisites
1. Best to use node v10.17.0 (npm v6.11.3)
2. Truffle
```
npm install -g truffle
```
3. Web3
```
npm install -g web3
```

Clone the repository and install dependencies

```bash
$ git clone https://github.com/nglglhtr/asset-swap-tutorial.git
$ cd asset-swap-tutorial
$ npm i
```

> NOTE: All tokens that are mapped on to Matic (mapping is what enables movement of assets to and fro main chain - or root chain) are deployed on matic sidechain in the form of [ChildERC20](https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC20.sol) and [ChildERC721](https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC721.sol) tokens.

The version of ChildERC20 and ChildERC721 used in this tutorial include one additional function:

```javascript
// ChildERC20
function mint (uint256 amount) public {
    _mint (msg.sender, amount);
}
```
```javascript 
// ChildERC721
function mint (uint256 tokenId) public {
    _mint (msg.sender, tokenId);
}
```
These are to help us mint the required tokens before we perform the swap.

### Step 1 - Setup
#### 1 - Compile contracts and deploy
Once you've cloned the repository, compile and migrate the contracts onto your preferred network. 

```bash
$ truffle compile
$ truffle migrate
```
Change directory to scripts

`cd` into the `scripts/erc20-721/` directory.

#### 2 - Fill in contracts' and accounts' details
Open the `config.js` file sitting under `/scripts/erc20-721/` directory, and fill in the values of the variables mentioned.

`provider` - the network provider your contracts are deployed on

`erc20` - address of the erc20 contract

`erc721` - address of the erc721 contract

`marketplace` - address of the marketplace contract

`amount` - amount of erc20 tokens you'd like to exchange for the `tokenid`

`tokenid` - the id of the erc721 token you'd like to exchange for `amount` of erc20 tokens

`privateKey1` and `privateKey2` - the private keys of the accounts participating in the swap

You can leave `orderId` and `expiration` untouched for now.

> Note: Best to use a wallet - instead of hardcoding the private keys in your code - when building for production.

### Step 2 - Mint

#### 1 - Mint tokens into both accounts
Run 
```bash
$ node mint.js
```
to mint tokens in the two accounts.


The following function in the script mints the specified amount of tokens in the first account and the NFT of specified tokenId in the second account.

```javascript
async function mint () {
    await CHE.methods.mint(config.amount).send({
        from: wallet[0].address,
        gas: 6721975
    }).on('transactionHash', function(transactionHash){ console.log("erc20 mint\t" +  transactionHash) })

    await NFT.methods.mint(config.tokenid).send({
        from: wallet[1].address,
        gas: 6721975
    }).on('transactionHash', function(transactionHash){ console.log("erc721 mint\t" +  transactionHash) })
}
```

Running the script should display the transaction hashes of the two mints.

You can view the balances of the two accounts anytime by running:
```bash
$ node balance.js
```
This will display the balances of both the accounts for both the tokens.

### Step 3 - Swap

To swap between the two accounts we first create two signatures - this is equivalent to creating two orders.


In the script, `swap.js` the `encode` function prepares the bytestreams of data that are the first two parameters of the `executeOrder` function in `Marketplace.sol` smart contract.
```javascript
function encode(token, sig, tokenIdOrAmount) {
    return web3.eth.abi.encodeParameters(
      ['address', 'bytes', 'uint256'],
      [token, sig, '0x' + tokenIdOrAmount.toString(16)]
    )
}
```

Next, we create two signature objects - which are essentially our two orders we'd like to match and execute via our Marketplace smart contract. 

```javascript
const obj1 = sigUtils.getSig({
    privateKey: privateKey1,
    spender: marketplaceAddress,
    orderId: orderId,
    expiration: expiration,

    token1: token1,
    amount1: amount1,
    token2: token2,
    amount2: amount2
})

const obj2 = sigUtils.getSig({
    privateKey: privateKey2,
    spender: marketplaceAddress,
    orderId: orderId,
    expiration: expiration,

    token2: token1,
    amount2: amount1,
    token1: token2,
    amount1: amount2
})
```

And executing the two orders:

```javascript
Marketplace.methods.executeOrder(
    encode(token1, obj1.sig, amount1),
    encode(token2, obj2.sig, amount2),
    orderId,
    expiration,
    address2
).send({
    from: address3,
    gas: maxGas
}).then(console.log)
```

Run the following to execute swap:
```bash
$ node swap.js
```
A successful swap displays a transaction hash. Next you can check the balances - 

```bash
$ node balance.js
```

### Deploying and Swapping on Matic

If you'd like to deploy and test on Matic network, the steps would only differ in migrating your smart contracts onto Matic and changing contract addresses in the config file.

From root directory, run:
```bash
$ truffle migrate --network maticTestnet
```
or, for Matic beta network, run:
```bash
$ truffle migrate --network maticBetaMainnet
```

Once you have your contract addresses, fill them in the config file under `/scripts/erc20-721/` along with the provider, which will be the following for the two networks:

Matic testnet: `https://testnetv3.matic.network`
Matic beta mainnet: `https://beta.matic.network`

Once the config file is ready, inside the `/scripts/erc20-721/` run the following - 

To mint tokens
```bash
$ node mint.js
```
To check balances
```bash
$ node balance.js
```
To Swap
```bash
$ node swap.js
```
Once the swap is successful, you can check and confirm the balances again 
```bash
$ node balance.js
```

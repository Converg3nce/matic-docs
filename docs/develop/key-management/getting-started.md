---
id: getting-started
title: Key Management Strategies
sidebar_label: Getting Started
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

The following article aims to be a guide through integration of a key management strategy on client side of your Decentralised Application on Matic Network.

The following strategies will be discussed:

- [Metamask](metamask)
- [Wallet Connect](walletconnect)
- [Portis](portis)

The overall steps would essentially remain the same for any client side application to talk to the blockchain:
 
1. **Set up Web3**: [web3.js](https://web3js.readthedocs.io/) is a javascript library that allows our client-side application to talk to the blockchain. We configure web3 to communicate via Metamask/Wallet Connect/Portis. 
> Note: Refer [Web3.js](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js) docs to 
add web3 to your project 
2. **Set up Account**: To send transactions from (specifically for transactions that alter the state of the blockchain) 
3. **Instantiate contracts**: Once we have our web3 object in place, we next instantiate our deployed contract, with which we interact. 
4. **Call functions**: we fetch data via functions in the contract - through our contract object.


## Working Demo

For demonstration purposes the following example DApp was created to give a better understanding of the user’s perspective for the three approaches. Please refer this [repository](https://github.com/nglglhtr/key-management).

An example [ERC20 and ERC721 tokens](https://gist.github.com/nglglhtr/cf1686322449365e21eb9b32d0754939) were deployed on Matic chain, the DApp supports minting, transfer and checking balance/owner of tokens.

### Usage

1. Clone the repository
2. Install dependencies `bash npm install`
3. Checkout on respective branches for the separate approaches:
    - Metamask `bash git checkout master`
    - Wallet Connect `bash git checkout walletconnect`
    - Portis `bash git checkout portis`
4. `cd client && npm run serve`
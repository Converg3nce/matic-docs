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

### Wallets: Metamask, WalletConnect, Portis

1. [**Metamask**](https://metamask.io/): Metamask is a browser add-on that manages a user’s Ethereum wallet by storing their private key on their browser’s data store and the seed phrase encrypted with their password. It is a non-custodial wallet, meaning, the user has full access and responsibility their private key. Once lost, the user can no longer control the savings or restore access to the wallet.

2. [**Wallet Connect**](https://walletconnect.org/): Wallet Connect is an open protocol - not a wallet - built to create a communication link between DApps and Wallets. A wallet and an application supporting this protocol will enable a secure link through a shared key between the two peers. A connection is initiated by the DApp displaying a QR code with a standard WalletConnect URI and the connection is established when the wallet application approves the connection request. Further requests regarding funds transfer are confirmed on the wallet application itself.

3. [**Portis**](https://www.portis.io/): Portis is a web-based wallet built keeping easy user-onboarding in mind. It comes with a javascript SDK that integrates into the DApp and creates a local wallet-less experience for the user. Further, it handles setting up the wallet, transactions and gas fees. Like Metamask, it is non-custodial - users control their keys, Portis just stores them securely. But, unlike Metamask, it is integrated into the application and not the browser. Users have their keys associated with their login id and passwords.


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
---
id: getting-started
title: Wallets
sidebar_label: Getting Started
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

The following article aims to be a guide through integration of a key management strategy on client side of your Decentralised Application on Matic Network.

The following wallets will be discussed:

- [Metamask](metamask)
- [Torus](torus)
- [Portis](portis)
- [Arkane](arkane)
- [Fortmatic](fortmatic)
- [Wallet Connect](walletconnect)

### Wallets

1. [**Metamask**](https://metamask.io/): Metamask is a browser add-on that manages a user’s Ethereum wallet by storing their private key on their browser’s data store and the seed phrase encrypted with their password. It is a non-custodial wallet, meaning, the user has full access and responsibility their private key. Once lost, the user can no longer control the savings or restore access to the wallet. [For more...](metamask)

2. [**Torus**](https://toruswallet.io/): Torus is a user-friendly, secure, and non-custodial key management system for DApps. We're focused on providing mainstream users a gateway to the decentralized ecosystem. [For more...](torus)

3. [**Portis**](https://www.portis.io/): Portis is a web-based wallet built keeping easy user-onboarding in mind. It comes with a javascript SDK that integrates into the DApp and creates a local wallet-less experience for the user. Further, it handles setting up the wallet, transactions and gas fees. [For more...](portis)

4. [**Arkane**](https://arkane.network/): Arkane is able to generate wallets for your users it allows your Dapp to service not only MetaMask users but also mainstream people who are unfamiliar with blockchain and digital assets. [For more...](arkane)

5. [**Fortmatic**](https://fortmatic.com/): Fortmatic SDK allows you to easily integrate your app with the Ethereum blockchain, whether you already have a dApp integrated with web3 or are starting from scratch. Fortmatic provides a smooth and delightful experience for both you and your app's users. [For more...](fortmatic)

6. [**Wallet Connect**](https://walletconnect.org/): WalletConnect is an open protocol to communicate securely between Wallets and Dapps (Web3 Apps). The protocol establishes a remote connection between two apps and/or devices using a Bridge server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers. [For more...](walletconnect)

### High-level steps:

The overall steps would essentially remain the same for any client side application to talk to the blockchain:
 
1. **Set up Web3**: [web3.js](https://web3js.readthedocs.io/) is a javascript library that allows our client-side application to talk to the blockchain. We configure web3 to communicate via Metamask/Wallet Connect/Portis. 
> Note: Refer [Web3.js](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js) docs to 
add web3 to your project 
2. **Set up Account**: To send transactions from (specifically for transactions that alter the state of the blockchain) 
3. **Instantiate contracts**: Once we have our web3 object in place, we next instantiate our deployed contract, with which we interact. 
4. **Call functions**: we fetch data via functions in the contract - through our contract object.
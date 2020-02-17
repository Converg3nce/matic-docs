---
id: tutorial-metatransactions
title: Getting started
sidebar_label: Getting Started
---

Meta Transactions are also known as "Gasless Transactions". The concept of meta transactions allows users to interact with the decentralized applications having ONLY a public/private keys pair.

A user with an account can craft a transaction in a similar way to how the ‘normal’ transaction is created, sign it with the own private key, but instead of sending it on-chain (which is usually the last step that requires paying ETH for gas), they send it to so-called a ‘relayer’, or the actual ‘sender’.

To integrate your DApp with Meta Transactions on Matic, you can choose to go with either the following two relayers or spin up a custom solution:

1. Biconomy
2. [Gas Station Network](https://gsn.openzeppelin.com/)
3. Custom solutions

## Biconomy

- Biconomy uses the IdentityProxy/Controller pair approach
- Each user associated with his unique Proxy contract address - which acts as their identity for any on-chain transaction
- Biconomy runs their own Relayers paying Gas fee upfront which is eventually recovered from the DApp on monthly basis.
- No changes to the smart contract required
- Biconomy provides their SDK Mexa to integrate with, abstracting the process of enabling meta transactions in a DApp to a few lines of code

### Usage

- Refer to Biconomy documentation for a comprehensive guidelines on usage of their SDK and steps to integrate it into your DApp.
- If you are developing your DApp on Matic, you can integrate with Biconomy on the following test-networks:
    - Testnet2 `https://testnet2.matic.network`
    - Testnet3 `https://testnetv3.matic.network`
    - BetaMainnetV2 `https://betav2.matic.network`

### Documentation

- [Biconomy SDK](https://docs.biconomy.io/biconomy-sdk-mexa)

## Gas Station Network

- As described in the previous post, GSN uses a RelayHub to keep track of the decentralised network of Relayers and acts as their point of discovery
- The entire mechanism is decentralized
- Neither the Relayers not the RelayHub are controlled by the network/developer in any way
- The relays network is a free market, where relays compete based on transaction fees and quality of service, on equal grounds.
- OpenZeppelin provides tools, tutorials and guidelines on how to integrate with the Gas Station Network.
- Smart contracts are required to be modified in order for them to accept relayed calls

### Usage

- The following details should get you started on building GSN powered DApps on Matic Network:
    - Networks:
        - `https://testnetv3.matic.network`
    - RelayHub address: `0xD216153c06E857cD7f72665E0aF1d7D82172F494`

### Documentation

- [Writing GSN compatible smart contracts](https://docs.openzeppelin.com/contracts/2.x/gsn)
- [Building a DApp with GSN](https://docs.openzeppelin.com/sdk/2.6/gsn-dapp)
- [Starter Kit](https://docs.openzeppelin.com/starter-kits/gsnkit)
- Tools:
    - [DApp Tool](https://gsn.openzeppelin.com/recipients)
    - [Relayer Tool](https://gsn.openzeppelin.com/relays)

## Further Steps

Assuming your familiarity with the different approaches you can take to integrate meta-transactions in your DApp, and depending on weather you're migrating to meta-transactions or building fresh DApp on using it, the following links will guide you on your steps ahead:

- [[Tutorial: GSN](tutorial-metatransactions-gsn.md)]
- [[Tutorial: Biconomy](tutorial-metatransactions-biconomy.md)]
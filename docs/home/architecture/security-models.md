---
id: security-models
title: Security Models
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

Matic provides three types of security models for a developer to build their DApp upon:

1. [Proof of Stake security](#proof-of-stake-security)
2. [Plasma security](#plasma-security)
3. [Hybrid (Plasma + PoS)](#hybrid)

What follows is a description of each of these security models offered by Matic, and what would be the developer workflow for each with an example DApp.

### Proof of Stake security

Proof of Stake security is provided by the Heimdall & Bor layer which is built on top of Tendermint. A checkpoint is committed to the root chain only when ⅔ of the validators have signed on it.

To enable the PoS mechanism on our platform, we employ a set of staking management contracts on Ethereum, as well as a set of incentivized validators running Heimdall and Bor nodes. These implement the following features:

- The ability for anyone to stake MATIC tokens on the Ethereum smart contract and join the system as a Validator
- Earn staking rewards for validating state transitions on Matic Network
- Enable penalties/slashing for activities such as double signing, validator downtime, etc.

The PoS mechanism also acts as a mitigation to the data unavailability problem for our sidechains in terms of Plasma.

We have a fast finality layer that finalizes the sidechain state periodically via checkpoints. The fast finality helps us cement sidechain state. The EVM compatible chain has few validators and faster block time with high throughput. It chooses scalability over high degrees of decentralization. Heimdall ensures that the final state commit is bulletproof and passes via a large validator set and hence high decentralization. 

**For developers**

As a DApp developer, to build on PoS security, the procedure is as simple as taking your smart contract and deploying it on Matic. This is possible because of the account based architecture enabling an EVM-compatible sidechain.

[Here is a Full Stack Dapp build on POS security](/docs/develop/full-stack-dapp-with-pos).

### Plasma Security

Matic provides Plasma Guarantees with respect to various attack scenarios. Two main cases considered are: 

- Chain operator (or in Matic, the Heimdall layer) is corrupt
- The user is corrupt

In either case, if a user’s assets on the plasma chain have been compromised, they’d need to start mass exiting. Matic provides constructions on the rootchain smart contract that can be leveraged. (For more details and technical specifications regarding this construction and attack vectors considered, read [here](https://ethresear.ch/t/account-based-plasma-morevp/5480)).

Effectively, security offered by Matic’s Plasma contracts piggybacks on Ethereum’s security. Users’ funds are only ever at risk if Ethereum fails. Put simply, a plasma chain is as secure as the main chain consensus mechanism. (This can be extrapolated to say that the plasma chain can use really simple consensus mechanisms and still be safe.) 

**For developers** 

As a DApp developer if you’d like to build on Matic with Plasma security guarantee, you are required to write custom predicates for your smart contracts. Which basically means writing the external contracts that handle the dispute conditions set in place by the Matic plasma constructs.

### Hybrid

Apart from pure Plasma security and pure Proof of Stake security that is possible in DApps deployed on Matic, there is a Hybrid approach that developers can follow - which simply means having both plasma and proof of stake guarantees on some particular workflows of the DApp. 

This approach is better understood with an example: Consider a gaming DApp with a set of smart contracts that describe the game’s logic. Let’s say the game uses its own erc20 token to reward players. Now, the smart contracts defining the game logic can be deployed on Matic sidechain directly - guaranteeing Proof of Stake security to the contracts while the erc20 token transfer can be secured with Plasma guarantees and fraud proof embedded in Matic’s root chain contracts.

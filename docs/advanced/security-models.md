---
id: security-models
title: Security Models
---

Matic provides three types of security models for a developer to build their DApp upon:

1. Plasma security
2. Proof of Stake security
3. Hybrid (Plasma + PoS)

What follows is a description of each of these security models offered by Matic, and what would be the developer workflow for each with an example DApp.

### Plasma Security

Matic provides Plasma Guarantees with respect to various attack scenarios. Two main cases considered are: 

- Chain operator (or in Matic, the Heimdall layer) is corrupt
- The user is corrupt

In either case, if a user’s assets on the plasma chain have been compromised, they’d need to start mass exiting. Matic provides constructions on the rootchain smart contract that can be leveraged. (For more details and technical specifications regarding this construction and attack vectors considered, read [here](https://ethresear.ch/t/account-based-plasma-morevp/5480.))

Effectively, security offered by Matic’s Plasma contracts piggybacks on Ethereum’s security. Users’ funds are only ever at risk if Ethereum fails. Put simply, a plasma chain is as secure as the main chain consensus mechanism. (This can be extrapolated to say that the plasma chain can use really simple consensus mechanisms and still be safe.) 

**For developers** 

As a DApp developer if you’d like to build on Matic with Plasma security guarantee, you are required to write custom predicates for your smart contracts. Which basically means writing the external contracts that handle the dispute conditions set in place by the Matic plasma constructs.

### Proof of Stake security

Proof of Stake security is provided by the Heimdall layer which is built on top of Tendermint. A checkpoint is committed to the root chain only when ⅔ of the validators have signed on it. 

**For developers**

As a DApp developer, to build on PoS security, the procedure is as simple as taking your smart contract and deploying it on Matic. This is possible because of the account based architecture enabling an EVM-compatible sidechain.

### Hybrid

Apart from pure Plasma security and pure Proof of Stake security that is possible in DApps deployed on Matic, there is a Hybrid approach that developers can follow - which simply means having both plasma and proof of stake guarantees on some particular workflows of the DApp. 

This approach is better understood with an example: Consider a gaming DApp with a set of smart contracts that describe the game’s logic. Let’s say the game uses its own erc20 token to reward players. Now, the smart contracts defining the game logic can be deployed on Matic sidechain directly - guaranteeing Proof of Stake security to the contracts while the erc20 token transfer can be secured with Plasma guarantees and fraud proof embedded in Matic’s root chain contracts.
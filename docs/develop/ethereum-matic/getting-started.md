---
id: getting-started
title: Ethereum↔Matic Bridge
sidebar_label: Getting Started
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Matic brings you a trustless two-way transaction channel between Matic and Ethereum by introducing the cross-chain bridge with Plasma and PoS security. With this users can transfer tokens across matic without incurring third-party risks and market liquidity limitations. **_The Plasma and PoS Bridge is available on both Mumbai as well as Mainnet._**

**Matic network bridge provides a scaling solution which is near-instant, low-cost, and quite flexible**. Matic uses a dual-consensus architecture(Plasma + Proof-of-Stake (PoS) platform)
to optimise for speed and decentralisation. We consciously architected the system to support arbitrary state transitions on our sidechains, which are EVM-enabled.

**There is no change to the circulating supply of your token when it crosses the bridge**;

- tokens that leave ethereum network are locked and the same number of tokens are minted on matic network as a pegged token (1:1).
- To move the tokens back to the ethereum network, tokens are burned on matic network and unlocked on ethereum network during the process.

## PoS vs Plasma

|                                    | PoS Bridge(Recommended)                                                                  | Plasma Bridge                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Short Description**              | DApp Developer's looking for flexibility and faster withdrawals with POS system security | DApp Developer's looking for increased security guarantees with Plasma exit mechanism\.   |
| **Structure**                      | Highly flexible                                                                          | Rigid, Less Flexible                                                                      |
| **Deposit\(Ethereum → Matic\)**    | 3-5 mins                                                                                 | 3-5 mins                                                                                  |
| **Withdrawal\(Matic → Ethereum\)** | 1 checkpoint = ~3 hours                                                                  | 10080 mins or 7 days \(Challenge Period\)                                                 |
| **Security**                       | Proof\-of\-Stake system, secured by a robust set of external validators\.                | Matic’s Plasma contracts piggybacks on Ethereum’s security with 7 days challenge period\. |
| **Support Standards**              | ETH, ERC20, ERC721, ERC1155 and Others                                                   | Only ETH, ERC20, ERC721                                                                   |

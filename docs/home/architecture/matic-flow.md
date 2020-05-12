---
id: matic-flow
title: How Matic Works?
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Matic Network is a blockchain application platform that provides hybrid Proof-of-Stake and Plasma-enabled sidechains.

Architecturally, the beauty of Matic is its elegant design, which features a generic validation layer separated from varying execution environments like Plasma enabled chains, full blown EVM sidechains, and in the future, other Layer 2 approaches such as Optimistic Rollups. 

Currently, developers can use **Plasma** for specific state transitions for which Plasma predicates have been written such as ERC20, ERC721, asset swaps or other custom predicates. For arbitrary state transitions, they can use PoS. Or both! This is made possible by Matic's hybrid construction.

To enable the PoS mechanism on our platform, a set of **staking** management contracts are deployed on Ethereum, as well as a set of incentivized validators running **Heimdall** and **Bor** nodes. Ethereum is the first basechain Matic Network supports, but Matic intends to offer support for additional basechains, based on community suggestions and consensus, to enable an interoperable decentralized Layer 2 blockchain platform.

Matic has a three-layer architecture:

1. Staking and Plasma smart contracts on Ethereum
2. Heimdall (Proof of Stake layer) 
3. Bor (Block producer layer)

<img src={useBaseUrl("img/bor/bor-architecture.png")} />
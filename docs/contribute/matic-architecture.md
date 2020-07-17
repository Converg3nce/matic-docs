---
id: matic-architecture
title: Overview
description: Architecturally, the beauty of Matic is its elegant design, which features a generic validation layer separated from varying execution environments like Plasma enabled chains, full blown EVM sidechains, and in the future, other Layer 2 approaches such as Optimistic Rollups.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
```
import useBaseUrl from '@docusaurus/useBaseUrl';
```

## Matic Network 

Matic Network is a blockchain application platform that provides hybrid Proof-of-Stake and Plasma-enabled sidechains.

Architecturally, the beauty of Matic is its elegant design, which features a generic validation layer separated from varying execution environments like Plasma enabled chains, full-blown EVM sidechains, and in the future, other Layer 2 approaches such as Optimistic Rollups. 

Currently, developers can use **Plasma** for specific state transitions for which Plasma predicates have been written such as ERC20, ERC721, asset swaps, or other custom predicates. For arbitrary state transitions, they can use PoS. Or both! This is made possible by Matic's hybrid construction.

To enable the PoS mechanism on our platform, a set of **staking** management contracts are deployed on Ethereum, as well as a set of incentivized validators running **Heimdall** and **Bor** nodes. Ethereum is the first basechain Matic Network supports, but Matic intends to offer support for additional basechains, based on community suggestions and consensus, to enable an interoperable decentralized Layer 2 blockchain platform.

Matic has a three-layer architecture:

1. Staking and Plasma smart contracts on Ethereum
2. Heimdall (Proof of Stake layer) 
3. Bor (Block producer layer)

<img src="https://github.com/maticnetwork/matic-docs/blob/master/static/img/matic/Architecture.png" alt="matic architecture">

### Matic smart contracts (on Ethereum)

Matic maintains a set of smart contracts on Ethereum, which handle the following:

- Staking management for the Proof-of-Stake layer
- Delegation management including validator shares
- Plasma contracts for MoreVP, including checkpoints/snapshots of sidechain state

### Heimdall (Proof-of-Stake validator layer)

**Heimdall** is the PoS validator node that works in consonance with the Staking contracts on Ethereum to enable the PoS mechanism on Matic. We have implemented this by building on top of the Tendermint consensus engine with changes to the signature scheme and various data structures. It is responsible for block validation, block producer committee selection, checkpointing a representation of the sidechain blocks to Ethereum in our architecture, and various other responsibilities.

Heimdall layer handles the aggregation of blocks produced by Bor into a Merkle tree and publishing the Merkle root periodically to the root chain. This periodic publishing is called `checkpoints`. For every few blocks on Bor, a validator (on the Heimdall layer): 

1. Validates all the blocks since the last checkpoint
2. Creates a Merkle tree of the block hashes
3. Publishes the Merkle root to the main chain

Checkpoints are important for two reasons: 

1. Providing finality on the Root Chain
2. Providing proof of burn in withdrawal of assets

A bird’s eye view of the process can be explained as: 

- A subset of active validators from the pool is selected to act as block producers for a span. The Selection of each span will also be consented by at least 2/3 in power. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
- A checkpoint includes the root of all blocks created during any given interval. All nodes validate the same and attach their signature to it.
- A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain.
- The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.

### Bor (Block Producer Layer)

Bor is Matic’s block producer layer - the entity responsible for aggregating transactions into blocks.  Currently, it is a basic Geth implementation with custom changes done to the consensus algorithm. 

Block producers are periodically shuffled via committee selection on Heimdall in durations termed as a `span` in Matic. Blocks are produced at the **Bor** node and the sidechain VM is EVM-compatible. Blocks produced on Bor are also validated periodically by Heimdall nodes, and a checkpoint consisting of the Merkle tree hash of a set of blocks on Bor is committed to Ethereum periodically.

### **:scroll:Resources**

:paperclip: Bor Architecture: [https://forum.matic.network/t/matic-system-overview-bor/126](https://forum.matic.network/t/matic-system-overview-bor/126) <br/>
:paperclip: Heimdall Architecture: [https://forum.matic.network/t/matic-system-overview-heimdall/125](https://forum.matic.network/t/matic-system-overview-heimdall/125) <br/>
:paperclip: Checkpoint Mechanism: [https://forum.matic.network/t/checkpoint-mechanism-on-heimdall/127](https://forum.matic.network/t/checkpoint-mechanism-on-heimdall/127)

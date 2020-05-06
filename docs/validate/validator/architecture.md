---
id: architecture
title: Architecture
sidebar_label: Architecture
description: The Matic network is broadly divided into 3 layers.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The Matic network is broadly divided into 3 layers (see figure below):

1. Staking and Plasma smart contracts on Ethereum
2. Heimdall (Proof of Stake validation layer) 
3. Bor (Block producer layer)

<img src={useBaseUrl("img/staking/architecture.png")} />

### Staking and Plasma smart contracts on Ethereum

To enable the Proof of Stake mechanism on Matic, the system employs a set of staking management contracts on Ethereum. These implement the following features:

- The ability for anyone to stake MATIC tokens on the Ethereum smart contract and join the system as a Validator
- Earn staking rewards for validating state transitions on Matic Network
- Enable penalties/slashing for activities such as double signing, validator downtime, etc.
- Save checkpoints (aka snapshots of the Bor sidechain) in the Ethereum smart contract

The PoS mechanism also acts as a mitigation to the data unavailability problem for the Matic sidechains in terms of Plasma.

The Plasma contracts implement the [MoreVP Plasma framework](https://ethresear.ch/t/more-viable-plasma/2160). Here is an overview of the Matic MoreVP implementation - [https://ethresear.ch/t/account-based-plasma-morevp/5480](https://ethresear.ch/t/account-based-plasma-morevp/5480). 

### Heimdall (Validation Layer)

Heimdall layer handles the aggregation of blocks produced by Bor into a Merkle tree and publishing the Merkle root periodically to the root chain. The periodic publishing of snapshots of the Bor sidechain are called ‘checkpoints’. 

For every few blocks on Bor, a validator (on the Heimdall layer): 

1. Validates all the blocks since the last checkpoint
2. Creates a merkle tree of the block hashes
3. Publishes the merkle root hash to the Ethereum smart contract

Checkpoints are important for two reasons: 

1. Providing finality on the Root Chain
2. Providing proof of burn in withdrawal of assets

A bird’s eye view of the process can be explained as: 

- A subset of active validators from the pool are selected to act as block producers for a span (set of blocks on the sidechain). The Selection of each span will also be decided by at least 2/3 of the validators in terms of stakingpower. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
- A checkpoint includes the merkle root hash of all blocks created during any given interval. All nodes validate the same and attach their signature to it.
- A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain.
- The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.

### Bor (Block Producer Layer)

Bor is Matic’s sidechain block producer - the entity responsible for aggregating transactions into blocks. 

Bor block producers are a subset of the validators and are shuffled periodically by the Heimdall validators. 

Read more about Bor architecture here: [https://forum.matic.network/t/matic-system-overview-bor/126](https://forum.matic.network/t/matic-system-overview-bor/126) 

## Read More

🔗 Bor architecture: [https://forum.matic.network/t/matic-system-overview-bor/126](https://forum.matic.network/t/matic-system-overview-bor/126)

🔗 Heimdall architecture: [https://forum.matic.network/t/matic-system-overview-heimdall/125](https://forum.matic.network/t/matic-system-overview-heimdall/125) 

🔗 Checkpoint mechanism: [https://forum.matic.network/t/checkpoint-mechanism-on-heimdall/127](https://forum.matic.network/t/checkpoint-mechanism-on-heimdall/127)
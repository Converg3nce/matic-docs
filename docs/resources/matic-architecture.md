---
id: matic-architecture
title: Matic Architecture 
---

Matic’s plasma chain builds upon Plasma MoreVP with an account based implementation. In the account model, transactions are interpreted as events to the blockchain state machine and the Ethereum Virtual Machine computes the state transition result of these events based on prior blockchain state. The two main components that set apart Matic’s implementation from other Plasma implementations are:

1. State based sidechain running on EVM (account based)
2. Public checkpointing layer (running Proof of Stake)

Matic works as a three layer architecture 

1. Plasma smart contract on the Root Chain 
2. Heimdall (Proof of Stake checkpointing layer) 
3. Bor (Block producer layer)

### Bor (Block Producer Layer)

Bor is Matic’s plasma chain block producer - the entity responsible for aggregating transactions into blocks. Read more about Bor architecture here: [https://forum.matic.network/t/matic-system-overview-bor/126](https://forum.matic.network/t/matic-system-overview-bor/126) 

### Heimdall (Checkpointing Layer)

Heimdall layer handles the aggregation of blocks produced by Bor into a merkle tree and publishing the merkle root periodically to the root chain. This periodic publishing are called ‘checkpoints’. For every few blocks on Bor, a validator (on the Heimdall layer): 

1. Validates all the blocks since the last checkpoint
2. Creates a merkle tree of the block hashes
3. Publishes the merkle root to the main chain

Checkpoints are important for two reasons: 

1. Providing finality on the Root Chain
2. Providing proof of burn in withdrawal of assets

A bird’s eye view of the process can be explained as: 

- A subset of active validators from the pool are selected to act as block producers for a span. The Selection of each span will also be consented by at least 2/3 in power. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
- A checkpoint includes the root of all blocks created during any given interval. All nodes validate the same and attach their signature to it.
- A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain.
- The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.

### Matic Plasma Smart Contracts (on Root Chain)

The plasma contract on ethereum records the order in which plasma blocks are committed by the operator, and prevents commitments from ever being overwritten.

### Resources

:paperclip: Bor Architecture: [https://forum.matic.network/t/matic-system-overview-bor/126](https://forum.matic.network/t/matic-system-overview-bor/126) <br/>
:paperclip: Heimdall Architecture: [https://forum.matic.network/t/matic-system-overview-heimdall/125](https://forum.matic.network/t/matic-system-overview-heimdall/125) <br/>
:paperclip: Checkpoint Mechanism: [https://forum.matic.network/t/checkpoint-mechanism-on-heimdall/127](https://forum.matic.network/t/checkpoint-mechanism-on-heimdall/127)
---
id: introduction
title: Introduction
---
**Heimdall**

[Heimdall](https://github.com/maticnetwork/heimdall) is the Proof-of-Stake Validator node and layer for the Matic Network. It works in consonance with the [Staking contracts](https://github.com/maticnetwork/contracts/tree/master/contracts/staking) on Ethereum to enable the PoS mechanism on Matic. You can read up on it more [here](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

It comes with 2 main entrypoints:

* `heimdalld`: The heimdall Daemon, runs a full-node of the heimdall application.
* `heimdallcli`: The Heimdall command-line interface, which enables interaction with a heimdall full-node.

The core responsibility of Heimdall is to verify all state transitions happening on `Bor` and to periodically submit checkpoints on the Ethereum chain cementing the side-chain state.

**Bor**

[Bor](https://github.com/maticnetwork/bor) is the Block producer node and layer for the Matic Network. Blocks produced on Bor are validated by Heimdall nodes.

Bor is the EVM compatible Matic Side chain which currently is built on top of `geth` using `bor` consensus mechanism.


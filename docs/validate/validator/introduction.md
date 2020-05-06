---
id: introduction
title: Introduction
sidebar_label: Introduction
description: A Validator is a participant in the network who locks up MATIC tokens in the system and runs Heimdall validator and Bor block producer nodes in order to help run the network. Validators stake their Matic tokens as collateral to work for the security of the network and in exchange for their service, earn rewards.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

A Validator is a participant in the network who locks up MATIC tokens in the system and runs Heimdall validator and Bor block producer nodes in order to help run the network. Validators stake their Matic tokens as collateral to work for the security of the network and in exchange for their service, earn rewards.

### Overview

Matic Network relies on a set of validators to secure the network. The role of validators is to run a full node; produce blocks, validate and participate in consensus and commit checkpoints on the main-chain. To become a validator, one needs to stake their Matic tokens with staking management contracts residing on the main-chain.

Heimdall reads the events emitted by the staking contracts to pick the validators for the current set with their updated stake ratio, which is used also by Bor while producing blocks.

Delegation is also recorded in the staking contracts and any update in the validator power or node signer address or unbonding requests comes into effect soon when the next checkpoint gets committed.

Rewards are distributed to all stakers proportional to their stake at every checkpoint with an exception being the proposer getting an additional bonus. User reward balance gets updated in the contract which is referred to while claiming rewards.

Stakes are at risk of getting slashed in case the validator node commits a malicious act like double signing which also affects the linked delegators at that checkpoint.

### End-to-end flow for a Matic validator

Validators set up their signing nodes, sync data and then stake their tokens on the Ethereum staking contracts to be accepted as a validator in the current set. If a slot is vacant, the validator is accepted immediately. Otherwise, one needs to go through the replacement mechanism to get a slot.

Block producers are chosen from the validator set where it’s the responsibility of the selected validators to produce blocks for a given span.

Nodes at Heimdall validate the blocks being produced, participate in consensus and commit checkpoints on the Ethereum main-chain at defined intervals.

The probability of validators to get selected as the Block producer or Checkpoint proposer is dependent on one’s stake ratio including delegations in the overall pool.

Validators receive rewards at every checkpoint as per their stake ratio, after deducting proposer bonus which is disbursed to the checkpoint proposer.

One can opt out of the system at any time and can withdraw tokens once the unbonding period ends.

### Economics

Matic has allocated 12% of its total supply of 10 billion tokens to fund the staking rewards. This is to ensure that the network is seeded well enough until transaction fees gain traction. These rewards are primarily meant to jump-start the network. While the protocol in the long run is intended to sustain itself on the basis of transaction fees.

> Validator Rewards = Staking Rewards + Transaction Fees

This is allocated in a way to ensure gradual decoupling of staking rewards from being the dominant component of the validator rewards.

![https://blog.matic.network/wp-content/uploads/2019/10/Screenshot-2019-10-25-at-5.10.49-PM.png](https://blog.matic.network/wp-content/uploads/2019/10/Screenshot-2019-10-25-at-5.10.49-PM.png)

Below is a sample snapshot of the expected annual rewards for the first 5 years considering staked supply ranging from 5% to 40% at 5% interval

![https://blog.matic.network/wp-content/uploads/2019/10/Screenshot-2019-10-25-at-5.11.21-PM.png](https://blog.matic.network/wp-content/uploads/2019/10/Screenshot-2019-10-25-at-5.11.21-PM.png)

### **Who all can avail this?**

Stakers running validator nodes and stakers delegating their tokens toward a validator that they prefer. Validators will have an option to charge a commission on the reward earned by delegators.

It is important to note that funds belonging to all stakers will be locked in a contract deployed on the ethereum main-chain. Also, no validator holds custody over delegator’s tokens.

### **Setting up a Validator Node**

Setting up a validator node is a job that comes with responsibilities. To better run and maintain the node, one needs to think around backup, uptime, firewall security, HSM, attack preventing strategies and much more. There are a lot of recommendations and practices for validators, especially now, including learnings from experiences had so far across staking with different networks. Layer 2 demands all of it and a bit more.

1. A subset of active validators from the pool are selected to act as block producers for a span. The selection of each span will also be consented by at least ⅔ +1 in power. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
2. A checkpoint is basically the Merkle root of all blocks produced in between intervals. All nodes validate the same and attach their signature to it.
3. A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain.

The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool.

To setup your node you can follow the instructions from [here](https://docs.matic.network/docs/validate/counter-stake-stage-2/getting-started) 
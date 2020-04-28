---
id: responsibilities
title: Responsibilities
sidebar_label: Responsibilities
description: Validators in Matic Network are selected via an on-chain auction process which happens at regular intervals. These selected validators, participates as block producers and verifiers.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

A Blockchain Validator is someone who is responsible for verifying transactions within a blockchain. For Matic Network, any participant can be qualified to became a Matic's validator by running a full-node to earn Rewards and Transaction fee. To ensure Good Participation by Validators, they lock up some of their Matic Tokens as a stake in the ecosystem.

Validators in Matic Network are selected via an on-chain auction process which happens at regular intervals. These selected validators, participates as block producers and verifiers. Once a Checkpoint(set of blocks) is validated by the participants, then updates are made on Parent Chain(Ethereum Main Chain) which releases rewards for validators depending on their stake in network.

## Responsibilities of Validator

1. Join the network by locking MATIC tokens in the Matic staking contracts on Ethereum.
2. A validator has the option to exit the system at any time. This can be done by executing an `unstake` transaction on the contracts. Do note that a 21-day withdrawal period is in place to ensure sufficient time for any penalties/slashing to be levied within this duration if any fraudulent behavior was detected from the validator.
3. A validator can increase the staked amount of MATIC tokens at any time to increase staking power.
4. A validator also needs to maintain a minimum amount of MATIC tokens as Heimdall gas fees to execute various transactions on Heimdall.
5. Once the validator node is setup, validators do the following:
    - Block producer selection
        - Select a subset of validators for the block producer set for each span
        - A span is a set of blocks on the Bor sidechain
        - For each span, the validators need to select the block producer set again on Heimdall and transmit this information to Bor periodically
    - Validating blocks on Bor
        - For a set of Bor sidechain blocks, each validator will independently read block data for these blocks and validate the data on Heimdall
    - Checkpoint submission
        - A checkpoint is a Merkle tree root hash (or a snapshot of the sidechain state) of a set of blocks on Bor
        - A proposer is chosen among the validators for each Heimdall block. The checkpoint proposer will create the checkpoint of Bor block data, validate and broadcast the signed transaction for other validators to consent to.
        - If >2/3 of the active validators reach consensus on the checkpoint, it is then submitted as an Ethereum transaction to the Matic staking contracts
    - Sync changes to Matic staking contracts on Ethereum
        - Continuing from the last step above, since this is an external network call, the checkpoint transaction on Ethereum may or may not be confirmed, or may be pending due to Ethereum congestion issues.
        - In this case, there is a `ack/no-ack` process that is followed to ensure that the next checkpoint contains a snapshot of the previous Bor blocks as well
        - For e.g. if checkpoint 1 is for Bor blocks 1-256, and it failed for some reason, the next checkpoint 2 will be for Bor blocks 1-512
        - For more details, you can refer [Checkpoint](/docs/contribute/heimdall/checkpoint)
    - State sync from Ethereum to Bor sidechain
        - There is a mechanism by which contract state can be moved between Ethereum and Matic, specifically Bor.
        - The basic flow is the following:
            - A DApp contract on Ethereum calls a function on a special Matic contract on Ethereum
            - The corresponding event is relayed to Heimdall and then Bor
            - A state-sync transaction get called on a Matic smart contract and the DApp can get the value on Bor via a function call on Bor itself.
            - A similar mechanism is in place for sending state from Matic to Ethereum
            - Refer [state sync mechanism](/docs/contribute/state-sync) for more details on this
6. A validator does need to maintain a minimum amount of ETH to pay for gas fees for all Ethereum transactions.
---
id: proposers-producers-selection
title: Proposers & Producers Selection
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Block Producers for the BOR layer, Are a committee selected from the Validators pool on the basis of their stake which happens at regular intervals. These intervals are decided by the Validator's governance with regards to dynasty and network.

Ratio of Stake specifies the probability to be selected as a member of block producer's committee. 

### Selection Process

- Let's suppose we have 3 validator's in pool, and they are Alice, Bill and Clara.
- Alice staked 100 Matic tokens whereas Bill and Clara staked 40 Matic tokens.
- Validators are given slots according to the stake, as Alice has 100 Matic tokens staked, and per slot cost is 10 (*maintained by validator's governance*), Alice will get 5 slots in total. Similarly, Bill and Clara get 2 slots in total.
- All the validators are given these slots [ A, A, A, A, A, B, B, C, C ]
- Using the historical ethereum blocks as seed we shuffle this array.
- After shuffling the slots using the seed we get this array [ A, B, A, A, C, B, A, A, C]
- Now depending on Producer count*(maintained by validator's governance)*, we pop validators from the top, for eg if we want to select 5 producers we get the producer set as [ A, B, A, A, C]
- Hence the producer set for the next span is defined as [ A: 3, B:1, C:1 ].
- Using this validator set and tendermint's proposer selection algorithm we choose a producer for every sprint on BOR.

**Definition**

- Dynasty: Time between the end of last auction and start time of next auction.
- Sprint: Time interval for which the Block Producers committee is Selected.
- Span: Number of Blocks Produced by a single producer.

<img src={useBaseUrl("img/validators/bor.png")} />

References:

 - [https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
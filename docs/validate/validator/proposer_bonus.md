---
id: proposer_bonus
title: Proposer Bonus
description: In Matic Network, there is an additional element of committing periodic checkpoints (a Merkle tree hash representation of the Matic sidechain blocks) to the Ethereum mainnet. This is a major part of the validator responsibilities and they are incentivized to perform this activity.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
In Matic Network, there is an additional element of committing periodic checkpoints (a Merkle tree hash representation of the Matic sidechain blocks) to the Ethereum mainnet. This is a major part of the validator responsibilities and they are incentivized to perform this activity. This constitutes a cost to the validator which is unique to a Layer 2 solution such as ours. We strive to accommodate this cost in the validator staking reward payout mechanism as a **bonus to be paid to the proposer**, who is responsible for committing the checkpoint. Rewards, minus the bonus is to be shared among all stakers; proposer and signers, proportionally.

**How is the proposer bonus calculated?**

Let’s have a look at a scenario affecting the checkpoint cost with the following assumptions:

- ETH Price: $200
- MATIC Price: $0.013
- Gwei considered: 30
- Gas considered: 1,000,000
- Checkpoint interval: 15 mins

Checkpoint cost-to-reward ratio pertaining to the checkpoint reward during the first year of live network based on the above assumptions comes to 5.18%. If we were to update the interval to 30 mins, then the same ratio comes down to 2.59%.

Let’s say that during the initial phase, if we were to go ahead with the same assumptions as stated above with the checkpoint interval being 15 mins, then the bonus to be paid out to the checkpoint proposer will be 5.18% and the algorithm will derive this bonus number dynamically depending upon the current checkpoint cost. Please note that the bonus percentage is also dependent on the governance mechanism among validators.

If at some point in time during the first year, and proposer bonus being at 5.18%, if the total bonded tokens in the system is 1 billion, then the network reward rate is 30% and the effective reward rate for every staker other than the proposer, after deducting the bonus component from the checkpoint reward, is 28.45%.

Please note that the cost has been calculated pre-Istanbul (Ethereum upgrade) and will decrease significantly going further.

**Encouraging the proposer to include all signatures**

To avail the bonus completely, the proposer would need to include all signatures in the checkpoint. Because the protocol desires ⅔ +1 weight of the total stake, the checkpoint will be accepted even with 80% votes. However, in this case, proposer gets only 80% of the calculated bonus.
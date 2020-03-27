---
id: staking
title: Staking
---

For Matic Network, any participant can be qualified to became a Matic's validator by running a full-node. The primary incentive to run a full node for validators is to earn Rewards and Transaction fee. Validator participating in consensus for Matic incentivise to participate as they receives block rewards and transaction fee. 

As Validators slots are limited for network, the process to get selected as one is to participate in on-chain auction process which happens at regular intervals as defined [here](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Stake

If the slot is open, then the auction is started to interested validators:

- Where they will bid more than the last bid made for the slot.
- The Process of Participating in Auction is outlined here:
    - Auction are automatically started once the slot is opened.
    - To start participating in auction, Call `startAuction()`
    - This will lock your assets in Stack Manager.
    - If another potential validator stakes more than your stake then locked tokens will be returned back to you.
    - Again, Stake more to win this Auction.
- At the end of the auction period, The highest bidder wins and becomes a Validator on Matic's Network.

> Please keep full node running if your are participating in auction to avoid Slashing of stake due to inactive Node as a validator.

To process of a becoming a validator after the highest bidder won the slot is here:

- Call `confirmAuction()` to confirm your participation.
- `Bridge` on heimdall listens to this event and broadcasts to heimdall
- After consensus `Validator` is added to `heimdall` but not activated.
- `Validator` starts validating only after `StartEpoch` (defined [here](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187))
- As soon as `startEpoch` reaches the validator is added to `validator-set` and starts participating in the consensus mech.

> To ensure security for validators stake, we recommend validators to provide different `signer` address from which verification of `checkPoint` sigs will be handled. This is to keep signing key separate from validator's wallet key so that funds are protected in case of node hack.

### UnStake

Unstacking allows validator to be out of active pool of validators. But to ensure Good Participation stake is locked for next 21 days.

- When validator wants to exit from system and stop validating blocks and submitting checkpoints she can `unstake.`
- This action is immediate as of now.
- After this action validator is considered out of active set of validators.

### ReStake

- Validators can add more stake into their amount in order to earn more rewards and be competitive for their validator place.
- Maintain your position
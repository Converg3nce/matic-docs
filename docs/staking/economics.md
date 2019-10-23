#Staking Economics

Matic is a Layer 2 scaling solution for public blockchains. It uses an account based variant of More Viable Plasma to guarantee the security of assets on the main-chain and it ensures the security of generic transactions by using a decentralized network of Proof-of-Stake validators. The system is designed to enable quicker partial confirmations for better user experience while the final confirmation is attained periodically as the checkpoints are committed on the main-chain.  

Validators stake their Matic tokens as collateral to work for the security of the network and in exchange for their service, earn rewards. 

## What is the incentive?

Matic will be allocating 12% of its total supply of 10 billion tokens to fund the staking rewards. This is to ensure that the network is seeded well enough until transaction fees gain traction. These rewards are primarily meant to jump-start the network. While the protocol in the long run is intended to sustain itself on the basis of transaction fees. 

**Validator Rewards = Staking Rewards + Transaction Fees**

This is allocated in a way to ensure gradual decoupling of staking rewards from being the dominant component of the validator rewards.

|Year|Target Stake (30% of circulating supply)|Reward Rate for 30% Bonding|Reward Pool|
|---|---|---|---|
|First|1,977,909,431|20%|312,917,369|
|Second|2,556,580,023|12%|275,625,675|
|Third|2,890,642,855|9%|246,933,140|
|Fourth|2,951,934,048|7%|204,303,976|
|Fifth|2,996,518,749|5%|148,615,670 + **11,604,170**|

Below is a sample snapshot of the expected annual rewards for the first 5 years considering staked supply ranging from 5% to 40% at 5% interval

|% of circulating supply staked|5%|10%|15%|20%|25%|30%|35%|40%|
|---|---|---|---|---|---|---|---|---|
|Annual reward for year
|First|120%|60%|40%|30%|24%|20%|17.14%|15%|
|Second|72%|36%|24%|18%|14.4%|12%|10.29%|9%|
|Third|54%|27%|18%|13.5%|10.8%|9%|7.71%|6.75%|
|Fourth|42%|21%|14%|10.5%|8.4%|7%|6%|5.25%|
|Fifth|30%|15%|10%|7.5%|6%|5%|4.29%|3.75%|


## Who all can avail this?

Stakers running validator nodes and stakers delegating their tokens toward a validator that they prefer. Validators will have an option to charge a commission on the reward earned by delegators. 

It is important to note that funds belonging to all stakers will be locked in a contract deployed on the ethereum main-chain. Also, no validator holds custody over delegator’s tokens. 


## Responsibilities

Setting up a validator node is a job that comes with responsibilities. To better run and maintain the node, one needs to think around backup, uptime, firewall security, HSM, attack preventing strategies and much more. There are a lot of recommendations and practices for validators, especially now, including learnings from experiences had so far across staking with different networks. Layer 2 demands all of it and a bit more. 

1. A subset of active validators from the pool are selected to act as block producers for a span. The selection of each span will also be consented by at least ⅔ +1 in power. These block producers are responsible for creating blocks and broadcasting it to the remaining of the network.
2. A checkpoint is basically the Merkle root of all blocks produced in between intervals. All nodes validate the same and attach their signature to it. 
3. A selected proposer from the validator set is responsible for collecting all signatures for a particular checkpoint and committing the same on the main-chain. 

The responsibility of creating blocks and also proposing checkpoints is variably dependent on a validator’s stake ratio in the overall pool. 

## Staking Rewards

Yearly incentive as mentioned above is to be considered absolute, which means irrespective of the overall stake or the target bonding rate in the network, the said amount will be given out as a reward to all signers periodically. 

In Matic, there is an additional element of committing periodic checkpoints (a Merkle tree hash representation of the Matic sidechain blocks) to the Ethereum mainnet. This is a major part of the validator responsibilities and they are incentivized to perform this activity. This constitutes a cost to the validator which is unique to a Layer 2 solution such as ours. We strive to accommodate this cost in the validator staking reward payout mechanism as a bonus to be paid to the proposer, who is responsible for committing the checkpoint. Rewards minus the bonus is to be shared among all stakers; proposer and signers, proportionally. 

## How is proposer bonus calculated?
Let’s have a look at some of the varying state of affairs affecting the checkpoint cost with following assumptions:
 
- ETH Price: $200
- MATIC Price: $0.013
- Gwei considered: 30
- Gas considered: 1,500,000
- Checkpoint interval: 15 mins
 
Checkpoint cost-to-reward ratio pertaining to the checkpoint reward during the first year of live network based on the above assumptions comes to 7.77%.
 
If we were to update the interval to 30 mins, then the same ratio comes down to 3.89%.
 
Let’s say that during the initial phase, if we were to go ahead with the same assumptions as stated above with the checkpoint interval being 15 mins, then the bonus to be paid out to the checkpoint proposer will be 7.77% and the algorithm will derive this bonus number dynamically depending upon the current checkpoint cost. Please note that the bonus percentage is also dependent on the governance mechanism among validators..
 
If at some point in time during the first year, and proposer bonus being at 7.77%, if the total bonded tokens in the system is 1 billion, then the network reward rate is 30% and the effective reward rate for every staker other than the proposer, after deducting the bonus component from the checkpoint reward, is 27.67%

 
 
## Encouraging the proposer to include all signatures

To avail the bonus completely, the proposer would need to include all signatures in the checkpoint. Because the protocol desires ⅔ +1 weight of the total stake, the checkpoint will be accepted even with 80% votes. However, in this case, proposer gets only 80% of the calculated bonus. 


## Transaction Fees

Each block producer at Bor will be given a certain percentage of the transaction fees collected in each block. Selection of producers for any given span is also dependent on the validator’s ratio in the overall stake. The remaining transaction fees flow through the same funnel as the rewards which get shared among all validators working at the Heimdall layer. What exact percentage of transaction fees will be shared with every block producer will be decided at a later point in time taking into consideration the overall statistics of the live network. Until then, the transaction fees flow through the same funnel disbursing everything collected among all validators.



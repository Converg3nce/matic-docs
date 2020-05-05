---
id: derivatives
title: Derivatives(Liquidity)
sidebar_label: Derivatives
description: In a traditional Proof of Stake Mechanism, the blockchain keeps track of a set of validators
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

Matic supports delegation via validator shares. By using this design, it is easier to distribute rewards and slash with scale (thousands of delegators) on Ethereum contracts without much computation.

Delegators delegate by purchasing shares of a finite pool from validators. Each validator will have their own validator share token. Let's call these fungible tokens `VATIC` for a validator `A`. As soon as a user delegates to a validator `A`, they will be issued `VATIC` based on an exchange rate of `MATIC/VATIC` pair. As users accrue value the exchange rate indicates that they can now withdraw more `MATIC` for each `VATIC` and when users get slashed, users withdraw less `MATIC` for their `VATIC`.

Note that `MATIC` is a staking token. A delegator needs to have `MATIC` tokens to participate in the delegation.

Initially, a delegator `D` buys tokens from validator `A` specific pool when `1 MATIC per 1 VATIC`. 

When a validator gets rewarded with more `MATIC` tokens, new tokens are added to the pool. Let's say with the current pool of `100 MATIC` tokens,  `10 MATIC` rewards are added to the pool. But since the total supply of `VATIC` tokens didn't change due to rewards, the exchange rate becomes `1 MATIC per 0.9 VATIC`. Now, delegator `D` gets more `MATIC` for the same shares. Similar to slashing, if `10 MATIC` gets slashed from the pool, the new exchange rate will be `1 Matic per 1.1 VATIC`.

`VATIC`: Validator specific minted validator share tokens (ERC20 tokens)

## Workflow of items
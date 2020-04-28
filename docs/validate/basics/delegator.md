---
id: delegator
title: Who is a Delegator?
sidebar_label: Delegator
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

Delegators are token holders who cannot, or do not want to run a validator node themselves. 

Delegator's participates in validation without hosting a full node. But by staking with validators, they can earn reward and strengthen the network by paying a small commission fee(depends on Validator) to a validator of their choice. 

They can delegate staking tokens to a validator and obtain a part of their rewards in exchange. Because they share rewards with their validators, delegators also share risks. Should a validator misbehave, each of their delegators will be partially slashed in proportion to their delegated stake. Delegators play a critical role in the system, as they are responsible for choosing validators.

- Delegator calls stake function on delegationManager `stake` event is emitted. When staking you can pick to bond with any validator(provide `validatorId` in `stake` function) or just put 0 if you wish to delegate later.
- When a delegator starts delegating to a validator  `bond` event can be used to update the stake of a particular validator pool on Heimdall using the exchange rate.
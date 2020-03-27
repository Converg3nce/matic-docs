---
id: delegator
title: Who is a Delegator?
sidebar_label: Delegator
---
Delegator's participates in validation without hosting a full node. But by staking with validators, they can earn reward and strengthen the network by paying a small commission fee(depends on Validator) to a validator of their choice. 

- Delegator calls stake function on delegationManager `stake` event is emitted. When staking you can pick to bond with any validator(provide `validatorId` in `stake` function) or just put 0 if you wish to delegate later.
- When a delegator starts delegating to a validator  `bond` event can be used to update the stake of a particular validator pool on Heimdall using the exchange rate.
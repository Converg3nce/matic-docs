---
id: delegation
title: Delegation
sidebar_label: Delegation
description: Delegators participate in validation without hosting a full node. But by staking with validators, they can earn rewards and strengthen the network by paying a small commission fee (depends on the individual validator) to a validator of their choice.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
:::caution

This section is a work in progress.

:::

Delegators participate in validation without hosting a full node. But by staking with validators, they can earn rewards and strengthen the network by paying a small commission fee (depends on the individual validator) to a validator of their choice. 

- Delegator calls stake function on delegationManager `stake` event is emitted. When staking you can pick to bond with any validator(provide `validatorId` in `stake` function) or just put 0 if you wish to delegate later.
- When a delegator starts delegating to a validator  `bond` event can be used to update the stake of a particular validator pool on Heimdall using the exchange rate.
- Commission
    - What is  commission? Effects of it. And how to set it (—>)?
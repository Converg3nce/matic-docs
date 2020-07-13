---
id: getting-started
title: PoS Bridge
sidebar_label: Introduction
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
### Motivation

Assets are currently moved between Ethereum and Matic primarily by the Plasma `deposit->transfer->withdraw` mechanism. This provides increased security guarantees due to the Plasma exit mechanism. 

However, there are certain restrictions on the child token and there is a 7-day withdrawal period associated with all exits/withdraws from Matic to Ethereum.

This is quite painful for those DApps/users who need some flexibility and faster withdrawals, and are happy with the level of security provided by the Matic Proof-of-Stake system, secured by a robust set of external validators.

Proof of stake based assets provides PoS security and faster exit with one checkpoint interval.

HRC-20 and HRC721 standard are deployed by default which are same as erc20/erc721 but with pos security. Moreover, these tokens can be any arbitrary contracts that implement the IChildToken interface.

### Main Chain contracts

- ***rootToChild*** and ***childToRoot*** token mapping should be stored.
- ***Deposit*** should call ***StateSender*** contract to use ***StateSync*** mechanism.
- ***Withdraw*** should be a 2 step process
    1. ***Burn*** tokens on matic chain
    2. ***Submit Burn Proof*** on main chain after checkpoint has been submitted.
- ***Burn verification*** should be done using ***checkpoint*** submitted to ***RootChain*** plasma contract.

V1: add mint-able on Matic chain.

### Heimdall

- Nothing new needs to be done on Heimdall layer since we are using stateSync mech.

### Child Chain contracts

- ***rootToChild*** and ***childToRoot*** token mapping should be stored.
- ***StateReceiver*** should be able to call ***onStateReceive*** function.
- ***ChildToken*** should have ***deposit*** and ***withdraw*** methods.
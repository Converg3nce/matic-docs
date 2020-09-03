---
id: metatransactions-gsn
title: Gas Station Network
sidebar_label: Gas Station Network
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

In general, for interacting with Ethereum DApps users need to have enough Ether in their account, which requires them to go through lengthy KYC procedure; then buying Ether & start interacting - not a good UX. 

That's where GSN comes into picture with an interesting proposal for improving DApp UX, where gas less transactions can be sent to Ethereum network & user requests to be funded by some party other than user. Now clients without Ether in their account, can talk to Ethereum Blockchain & pay their fees using ERC20 tokens. Using GSN can also improve UX when onboarding new users to dApp.

<img src={useBaseUrl("img/gsn/paymaster_needs_gas.png")} />

## Components

GSN is a broad idea, which brings several components into picture, discussed below.

### Client

Clients are dApp users, who will be signing a message, with all required fields & send it to a *relay server*, where gas fees to be paid for this transaction. So client doesn't initiate a transaction here, rather they'll ask relay server to do it for them.

### Relay Server

Relay servers will be accepting requests from clients & paying gas fees for them, while first checking with paymaster contract _( via relay hub )_ that if it relays this transaction does it get paid back or not ? 

It's always advisable to use dedicated relay server for your dApp & use third party relays when your relay is down. This provides better availability guarantee of service. Also for using third party relays, most probably you're going to pay an extra service charge.

### PayMaster

PayMaster contract has a full gas tank of Ether, in relayhub, which is to be used for paying gas fees of relayed transactions. PayMaster contract has full control of either accepting or rejecting any relayed transaction.

### Trusted Forwarder

Recipient contract accepts only those requests coming from a trusted forwarder, which will verify signature & account nonce, that can be directly processed in recipient contract.

### Recipient Contract

This is the GSN aware target contract, able to accept meta transactions, where actual client address can be retrieved from `_msgSender()`, instead of `msg.sender`, when it's inheriting from this simple [base class](https://github.com/opengsn/gsn/blob/master/contracts/BaseRelayRecipient.sol).

### Relay Hub

Relay Hub will trustlessly connect clients, relay servers & paymasters, so participants don't need to know about each other. It'll help clients discover good relayers; prevent third-party relays from censoring transactions; make sure relay server gets paid back by paymaster after transaction is completed etc.

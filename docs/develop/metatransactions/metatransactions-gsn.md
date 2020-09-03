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

## GSN-aware Contracts

GSN will help us in building great dApps where user won't need to pay for their transactions, which will improve UX. For writing GSN-aware contracts, we need to take care of following things.

### Recipient Contract

This is the contract that we want to make GSN-aware, for that we're simply going to inherit from [BaseRelayRecipeint](https://github.com/opengsn/gsn/blob/master/contracts/BaseRelayRecipient.sol), which adds one important method `_msgSender()`, to be used in all occurances of `msg.sender`. `_msgSender()` will take care of all lower level details for extracting actual client address, which will be different that `msg.sender` in case of meta transactions.

### PayMaster Contract

GSN relays are not serving free-of-cost, in order to cover their expenses, they will charge transaction fees in terms of FIAT or ERC20 tokens from paymaster contracts. We can inherit from [BasePaymaster](https://github.com/opengsn/gsn/blob/master/contracts/BasePaymaster.sol), and provide implementation of following methods for processing relayed calls. These methods to be invoked by relayhub _( only singleton instance of it for a certain network )_ before & after sending relayed calls to trusted forwarder.

#### `acceptRelayCall`

RelayHub asks paymaster whether it's interested in accepting new request or not, if not it can revert in this method. It can implement business logic for only accepting requests from white listed users; calling specific onboarding function in target contract etc.

#### `preRelayedCall`

After a relayed call is accepted by paymaster, relay hub will call this function before calling target contract, where some book keeping can be done.

#### `postRelayedCall`

After target contract call has completed, this method to be called with accurate estimate of transaction cost, where user can be charged. It'll also let us know whether transaction was reverted or not, giving relayer an opportunity to not charge user for reverted calls. 

Above three methods give us opportunity for creating a fee model where users can be charged using ERC20 tokens. In `pre-` relayed call, we lock some token & in `post-` user actually gets charged, depending upon actual gas data.

### Trusted Forwarder

We can avoid auditing whole relay hub system, by putting an extra piece in image, which will verify client signature of relayed calls & address nonce. Verified calls get through & reach target contract method. 

This eventually reduces amount of checking target contract needs to do. In constructor of target contract, we need to put trusted forwarder. We can also set a list of trusted forwarders, if situation demands. We need to also make it sure, only owner gets to update this trusted forwarder address set.

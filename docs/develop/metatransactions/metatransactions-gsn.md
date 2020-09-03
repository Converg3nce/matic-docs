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

## components

GSN is a broad idea, which brings several components into picture, discussed below.

### client

Clients are dApp users, who will be signing a message, with all required fields & send it to a *relay server*, where gas fees to be paid for this transaction. So client doesn't initiate a transaction here, rather they'll ask relay server to do it for them.


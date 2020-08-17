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

Ethereum Gas Station Network (GSN) abstracts away gas to minimize onboarding & UX friction for dapps. With GSN, gasless clients can interact with Ethereum contracts without users needing ETH for transaction fees. The GSN is a decentralized system that improves dapp usability without sacrificing security.

<img src={useBaseUrl("img/gsn.png")} />

Example use cases for GSN:

1. **Pay gas in any token**: Allow users to pay for gas in any token
2. **Pay gas in fiat**: Allow users to pay for gas in fiat without having to go through KYC
3. **Privacy**: Enabling ETH-less withdrawal of tokens sent to stealth addresses
4. **Onboarding**: Allow dapps to subsidize the onboarding process for new users


## How to implement GSN?

1. [Simple Integration Walkthrough](https://docs.opengsn.org/tutorials/index.html)
2. Read more about [architecture](https://docs.opengsn.org/learn/index.html)

To learn how to integrate GSN with your contracts, [see Writing GSN-capable contracts.](https://docs.opengsn.org/contracts/index.html)

To learn how to integrate GSN with your client, [see Javascript client](https://docs.opengsn.org/gsn-provider/getting-started.html).


---
id: commission
title: Commission
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Setting up Commission Rates as a Validator

Validators can set a Commission rate to their node so as to take a percentange of the rewards from the delegators that have staked on their node.

Currently there is no upperlimit on the Commision rate. Validators are allowed to set any percentage as their Commission rate for their node. The lowerlimit by default is 0%

## How to change your Commission Rate

Login to your Validator profile using your owner address on the Staking Dashboard: https://wallet.matic.network/staking/

Note: The owner address is the address that holds your Matic Tokens and the address that is used for Logging to the Staking Dashboard.

You will see a Card that says "Show Validator Details". Clicking on that button would navigate you to your Validator Profile.

<img src={useBaseUrl("img/staking/show-validator-details.png")} />

Once you're on your Profile Page you will see an option for **Edit Profile** on the top right hand corner. 

<img src={useBaseUrl("img/staking/edit-profile.png")} />

Clicking on the Edit Profile button will navigate you to another screen with Details of your Node. There would be a text box where you can enter the Commission Rate percentage.

<img src={useBaseUrl("img/staking/commission-box.png")} />

In the Text box you can add any number of your choice. Note that it only accepts number as an accepted input and nothing else. 

Once you have the commission rate set, click on **Save** button and it will ask you for a Metamask confirmation. This is a transaction that you have to confirm in order to set the Commission Rate.

Once you have confirmed and signed the transaction your commission rate will be set.

## Precautionary Notes

You are allowed to change the Commission rates as many times as possible. There are no restrictions on this. However, as a Validator if you have updated your Commission Rate recently, it is your duty to also update the community and the delegators that have staked on your node about the recent changes.

Failure to update the community and delegator will result in a lot of confusion.

You can do so by posting an update on our Discord Server (Channel: #mainnet-validators)

**Discord Server**: https://discord.gg/XvpHAxZ



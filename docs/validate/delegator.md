---
id: delegator
title: Delegator
sidebar_label: Delegator
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';


This is a step-by-step guide to help you become a delegator on Matic's incentivised testnet program. There are no pre-requisites required to become a delegator on Matic. All you have to do is have an Ethereum account.

## What is a Delegator?

Delegators are token holders who cannot, or do not want to run a validator themselves. They can delegate staking tokens to a validator and obtain a part of their revenue in exchange. Because they share revenue with their validators, delegators also share risks. Should a validator misbehave, each of their delegators will be partially slashed in proportion to their delegated stake. Delegators play a critical role in the system, as they are responsible for choosing validators.

## Accessing the Dashboard and Login

You will need to first choose the Goerli Testnet on your Metamask. Once you have choose that, you can then login to the Matic's Validator Dashboard. You can access the Dashboard here: https://cs-wallet.matic.today/staking

<img src={useBaseUrl("img/staking/goerli-network.png")} />

Matic Validator Dashboard currently supports only Metamask as of now. So you will need to have the Metamask's extension added to your browser.

**Note**: We have experienced some issues with Firefox when using the Validator Dashboard. We recommend use Google Chrome of Brave.

**Note:** You need to make sure you have the Staking Token added to your Metamask. For CS-2008, the staking token contract address is: `0xAFfb23A344B7ebdf4Ea6B5ec27ECC00D12fecd77`

If you want to know how to add "Custom Tokens" to Metamask, you can read our guide here: https://docs.matic.today/docs/develop/metamask/custom-tokens

Once you have logged in you will be navigated to a screen where you will see a list of Validators and a lot of stats.

**Note:** If you are already a validator, then when you attempt to become a delegator, you have to make sure that you use a different address than the one used for your validator. This is only if you're already a validator.

## How to delegate to a validator

Once you have logged in with your address on the Staking Dashboard you should have an option that says "Become a Delegator"

<img src={useBaseUrl("img/staking/become-a-delegator.png")} />

Note that if you scroll down to the validator list in the Dashboard you will also see a `Delegate` button to each validator. You can also click on that delegate button to choose the validator you want to delegate to.

Once you click on the Delegate button you will be navigated to a screen that will ask you to fill in some information such as Stake amount.

<img src={useBaseUrl("img/staking/delegator-form.png")} />

You can add the amount that you want to delegate in the Stake amount field. You will also see the projected rewards per checkpoint once you add a value in the amount field. 

Clicking on Delegate Now will confirm your transaction. Note that there will 2 confirmations asked to sign from your Wallet.

**Note:** It will take 12 Block confirmations to confirm your delegation transaction and for it reflect on the Dashboard.

Once your delegation transaction is confirmed, you will get a success message.

**Note:** You can also delegate to multiple validators using the same address.

<img src={useBaseUrl("img/staking/delegator-success.png")} />

You can then access your Dashboard by clicking on the `Go to my Account` button.

Clicking on the Dashboard you will be able to see your details such as `Balance`, `Total Stake`, & `Rewards`

You will also see a section of your Delegations. In this section, you will be able to view a list of all your delegations across validators. 

<img src={useBaseUrl("img/staking/delegator-profile.png")} />

## Claiming Rewards as a Delegator

Clicking on the Rewards Card will navigate you to the Rewards page. 

You will see a list of Validators that you have delegated to and next to each delegator would be 2 buttons

* Withdraw Reward
* Restake Rewards

### Withdraw Reward

As a Delegator, you earn rewards as long as the Validator is earning rewards. Clicking on Withdraw Rewards will ask you for a confirmation from your Wallet. Confirming the transaction will get your rewards back to your wallet and your account should be updated.

<img src={useBaseUrl("img/staking/my-rewards.png")} />

### Restake Rewards

Restaking your rewards is an easy way to increase your delegation stake to your validator. Clicking on `Restake Reward` will ask you for confirmation from your Wallet. However, this will be 2 confirmations, as it will first `Claim your Reward` and then `Restake` it.

Once the `Restake` is complete, after 12 Block confirmations you would see an update on your Dashboard with the stake amount getting higher for the validator you had selected.

**Note:** You can `restake rewards` to individual validators only. You cannot restake your entire rewards to all validators at once.


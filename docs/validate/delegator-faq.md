---
id: delegator-faq
title: Delegator FAQ
sidebar_label: Delegator FAQ
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### What is the Staking Dashboard URL?

The staking dashboard URL is https://wallet.matic.network/staking.

### What is the Minimum stake amount?

There is no minimum stake amount to delegate. However, you can always start with 1 Matic token

### How many rewards will I get if I delegate?

Please use the Staking Rewards Calculator to determine your estimates. https://wallet.matic.network/staking-rewards

### Why does my transaction take so long?

All staking transactions of Matic happen on Ethereum for security reasons.

The time taken to complete a transaction depends on the gas fees that you have allowed and also the network congestion of Ethereum mainnet at that point in time. You can always use the “Speed Up” option to increase the gas fees so that your transaction can be completed soon

### Which Wallet is currently supported?

Currently, only the Metamask extension on Browser is supported. We will be gradually adding support for other wallets soon.

### My Ledger/Trezor wallet does not work. What should I do?

Currently, only the Metamask extension on Browser is supported. We will be gradually adding support for other wallets soon.

Ledger/Trezor wallets used with Metamask will also not work currently. Support for these will be added shortly.

### Why can’t I stake directly from Binance?

Staking through Binance is not yet supported. There will be an announcement if and when Binance starts supporting it

### I have completed my delegation, where can I check details?

Once you have completed your delegation, wait for 12 block confirmations on Ethereum (~3-5 minutes), then on the Dashboard,you can click on the “My Delegator Details” option on the left-hand side. Or you could also click on “Show Delegator Profile” card

### Where can I check my rewards?

On the Dashboard, you can click on the “My Delegator Details” option on the left-hand side. Or you could also click on “Show Delegator Profile” card.

Check the `New Rewards` card on the right. Once you accrue rewards, you can click on the `Details` link to check rewards in detail.

### Do I need ETH to pay for Gas fees?

Yes. You should provision for ~0.05-0.1 ETH to be safe.

### Do I need to deposit Matic tokens to the Matic Mainnet network for staking?

No. All your funds need to be on the Main Ethereum Network.

### When I try to do the transaction my Confirm button is disabled, why so?

Please check if you have enough ETH for the gas fees.

### When does reward get distributed?

The rewards are distributed whenever a checkpoint is submitted. This is approximately every 30 mins.

### Why does reward keep getting decreased every checkpoint?

Actual rewards earned will depend on the actual total locked supply in the network at each checkpoint. This is expected to vary significantly as more MATIC tokens get locked in the staking contracts. 

Rewards will be higher, to begin with, and will keep decreasing as the locked supply % goes up. This change in locked supply is captured at every checkpoint, and rewards are calculated based on this.

### How can I claim my rewards?

You can claim your rewards instantly by clicking on the “New Rewards” card and then clicking on the Withdraw rewards button. This will transfer the rewards accumulated to your delegated account on Metamask.

### What is the Unbonding period?

The unbonding period on Matic is approximately 21 days. This period applies to the originally delegated amount and re-delegated amounts - it does not apply to any rewards that were nor re-delegated.

### Will I keep receiving rewards after I unbond?

No. Once you unbond you stop receiving rewards.

### How many transactions does the delegation require?

Delegation requires 2 transactions one after the other - one Approve and another Deposit.

### What does Redelegate Rewards mean?

Redelegating your rewards simply means, that you want to increase your stake by restaking the rewards you have accumulated. 

So what happens if I delegate to a validator dies/goes rogue/node is offline or something similar, I don't have a way to quickly react and delegate my tokens away from him to another good validator. I need to wait 21 days and am exposed to this bad validator the whole time?
Yes, there is an option in the protocol but is not exposed in the UI for now. For every delegation, you get a set of ValidatorShares. These are fungible ERC20 tokens that could be traded as derivatives and swapped for Matic. But it requires market liquidity. Once staking stabilizes after a few weeks, we will spend time in making this market liquid.

### Can I stake to any validator?

Yes. All validators are Matic Foundation nodes currently.

We are doing a phased rollout of the Matic mainnet. Later on, external validators will be onboarded gradually. Please see https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/ for more details.

### Which browser is compatible with Staking Dashboard?

Chrome, Firefox, and Brave

### My Metamask is stuck at confirming after login, what do I do? Or nothing happens when I try to login?

Check for the following:

If you’re using Brave, please turn off the option for “Use Crypto Wallets” in the settings panel.
- Check if you are logged into Metamask
- Check if you are logged into Metamask with Trezor/Ledger. Currently they are not supported
- Check your system timestamp. If the system time is not correct, you will need to correct it.

### How do I send funds from Binance or other exchanges to Matic wallet?

Technically, the Matic web wallet/Staking interface is just a web application. Currently it supports only 1 wallet - Metamask.

So first you must withdraw your funds from Binance or any other exchange to your Ethereum address on Metamask. If you don't know how to use Metamask, google it a bit. There are plenty of videos and blogs to get started with it.

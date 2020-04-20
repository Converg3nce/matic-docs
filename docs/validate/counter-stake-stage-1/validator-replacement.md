---
id: validator-replacement
title: Replacing a Validator on Matic Network
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Become a Validator by higher bidding/replacing another validator

There are 2 ways to become a validator:

- You can become a validator when the network is new and most of the slots are empty
- You replace a validator by bidding to stake higher than the existing one

In this path, to become a validator you will to choose a slot and bid higher than the current validator already occupying that slot. These steps will help you understand and how to become a validator through the bidding process.

In this path of becoming a validator, you view "cinema seating" arrangement where you can pick and choose your seats. You pick a slot of your choice depending on the staked amount of that slot and then you bid higher than the current validator occupying that slot.

To give you a reference:

<img src={useBaseUrl("img/staking/validator-replacement.png")} />

You hover over a slot to view details about a particular validator, such as, stake amount, rewards earned, etc. Once you choose a validator to replace, you can click on that slot/box and it should navigate you to a different screen which would take you through an easy step-by-step process of replacing a validator.

You will initially be taken through a validation process to check if you have setup your node and that your wallet is connected and has the required balances.

Once this is done, the next step would be to initiate your bid amount.

<img src={useBaseUrl("img/staking/bid-form.png")} />

In this screen, you will be provided adequate information of the selected validator. You will see the staked amount and the minimum required amount to outbid the current validator.

You will also see a bidding history, if there is any.

You can then add your amount that you want to bid for and click on **Bid Now.** Once all the information is correctly filled, you will then need to wait for the **Auction** period to be over.

**Note**: A validator slot can have bids from multiple provisional validators.

The dialog in this screen will always show you the minimum required. You can bid higher than that so to contain any outbidding from other validators.

Once you initiate a bid, it goes into an auction period. For Counter-Stake the period is usually 2 hours.

<img src={useBaseUrl("img/staking/top-bid.png")} />

### If your bid is still on top:

Once the Auction period is over, if your bid is still on top, you would be notified about it and then you would be requested to confirm the transaction to finalize your validator process.

You will need to add basic details such as Name of the your validator and the signer address details so that the transaction is successful.

<img src={useBaseUrl("img/staking/bid-stake.png")} />

**Note**:The Commission % will only show an estimated number and will not be an exact

You can then click on **Stake Now** to confirm your stake. Once the transaction is successful you will be provided with a success message and then you become a validator on Matic.

<img src={useBaseUrl("img/staking/success.png")} />

You can then go to the Dashboard by cli

### If you've been outbid during replacing a validator

If someone's outbid you in the auction then you will be notified about it.

<img src={useBaseUrl("img/staking/top-bid-higher.png")} />

Here, you will have 2 options to choose from:

- You could either **Bid Higher** and stay in contention to gain that slot
- You could **View Other Validators** will less staked amount and initiate a bid on them

If you choose not to bid further, your account will be credited back with the bid amount

If you choose to Bid Higher, you see the current Top Bid. When you click on Bid Higher it takes you back to the screen where you can enter your Bid amount and re-initiate your bid toward that validator slot.

When you bid higher, the auction period does not start over, rather it stays the same length from the initial bid.

If you choose to View Other Validators, you are taken back to the screen where you see all slots that are occupied by current validators and then you can pick and choose which validator you would like to bid on. 
---
id: validator-responsibilities
title: Responsibilities of Running a Validator node and as being a Validator on Matic Network
description: Know more about the responsibilties of being a validator on Matic Network
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

A validator is a participant in the network who locks up tokens in the network and runs validator nodes in order to help run the network.

A Blockchain Validator is someone who is responsible for verifying transactions within a blockchain. For Matic Network, any participant can be qualified to became a Matic's validator by running a full-node to earn Rewards and Transaction fee. To ensure Good Participation by Validators, they lock up some of their Matic Tokens as a stake in the ecosystem.

As a validator running nodes on Matic, you are subject to host of responsibilities in order to ensure the network runs appropriately and securely.

Following are some of the responsibilities of a Validator on Matic

## Operations

### Maintaining High Uptime

Uptime on Matic Network is calculated upon the number of Checkpoints transactions that a Validator has signed for. Approximately every 34 minutes a checkpoint is to be submitted by a proposer to the Ethereum Mainchain. This checkpoint transaction is supposed to be signed by every validator on the network. Failure to sign a checkpoint or missing a checkpoint will result in decrease of your performance.

This process is currently automated, however, in order to ensure that your Node is active and signs all the checkpoints you need to ensure that all the services for your Matic Validator node are running correctly.

### Daily checks of Services and Processes

There are several services and processes that run in the backgroung / foreground when your Validator node is up and running such as Heimdall, Bridge, Rest-server and Bor. As a validator you need to ensure that you do a daily check on the services running. Ensure that your node is functioning appropriately and at optimum levels.

### ETH Balance

Validators are supposed to maintain an ETH balance on their Signer address (This address is the one on your Validator node). The ETH on the signer address is primarily for 2 reasons.

* For signing checkpoint transactions
* For proposing and sending a checkpoint on Ethereum

Having low ETH balance may cause delays in the checkpoint submission because the Gas consumed for a checkpoint transaction to be submitted is high. This will in turn cause a network effect in delaying finality of transactions included in the checkpoint and cause delays in the subsequent checkpoints.

Maintaining ETH balance is one of the core responsibilities of a Validator.

### Monitoring your Node

Validators need to ensure that they either run their own Monitoring tools for the Validator / Sentry nodes or execute the Grafana Dashboards systems provided by Matic. This will provide timely updates and health check for your nodes and will also alert you on anything that is running incorrectly on your nodes.

Validators need to ensure that they do a daily check on the health of their nodes to make sure that their nodes are running optimally. 

## Delegation

### Open for Delegation

All validators are open for Delegation from the Community. Each validator have a choice of setting their own commission rate to attract more delegation from the community. There is no upperlimit on the commission rate, it is upto the validator that they can set any commission rate that they feel attractive

### Communication of Commission Rates

Whenever a validator updates their Commission Rates for their nodes, it is their moral duty to update the community of this changes. The preferred platform for update would a Discord Announcement as well as a Forum post (https://forum.matic.network)

Announcing the update will help delegator understand about the change and will also allow them to take action based on this update.


## Communication

### Issues and Queries

At Matic, we want Validators to be vocal about any issues they are facing wrt to their node or monitoring tools or anything. It is best to pop up these issues as early as possible so as to ensure that we / anyone from the community can help rectify the problem as soon as possible.

### Feedback and Suggestion

At Matic, we welcome feedbacks and suggestion on any aspect of our Validator Ecosystem. If you have a suggestion or a feedback that you would like implemented, please post it on our Forum (https://forum.matic.network)

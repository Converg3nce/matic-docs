---
id: oracles
title: Getting Started with Oracles
sidebar_label: Oracles
---

Blockchains or Smart contracts can't access data from outside of their network and there is often needs to access information from the outside world that is relevant to the contractual agreement. An oracle is a way for a blockchain or smart contract to interact with external data. 

With blockchains being deterministic one-way streets, an oracle is the path between off-chain and on-chain events. These oracles are services that send and verify real world occurrences and submit this information to smart contracts, triggering state changes on the blockchain.

Inbound oracles bring off-chain or real-world data to the blockchain, whereas their outbound cousins do the opposite: they inform an entity outside the blockchain of an event that occurred on it.

<!-- To integrate your DApp with Oracles on Matic, you can choose to go with either the following solutions:

1. [Razor]([https://docs.razor.network/](https://docs.razor.network/)) -->

## Razor

Razor Network consists of validators who lock in their tokens as a “Stake” and provide data to the network. The honest validators are rewarded and those who report incoherently are penalised.

The core of Razor Network is a set of smart contracts, that can run on any Ethereum compatible blockchain. Razor relies on the underlying blockchain for providing certain properties such as censorship resistance, security from network partition attacks, etc.

### Usage

This oracle network is currently running on Görli testnet. A "[Bridge](https://github.com/razor-network/bridge)", which picks results from the network and delivers them to Matic Network. To get started with connecting to the data feed, check out this **[Tutorial]([https://docs.razor.network/tutorial/matic/](https://docs.razor.network/tutorial/matic/))**

- The bridge has been updated with more features and linked to razorscan [https://matic.razor.network/](https://matic.razor.network/) (Make sure to connect metamask to matic testnet!)
- [Sample DApp]([https://matic-king.netlify.com/](https://matic-king.netlify.com/))(Make sure to connect Metamask to Matic testnet (`http://testnet2.matic.network`))

### Resources

1. [What is Blockchain Oracle]([https://cryptobriefing.com/what-is-blockchain-oracle/](https://cryptobriefing.com/what-is-blockchain-oracle/))
2. [Types of Blockchain Oracle]([https://blockchainhub.net/blockchain-oracles/](https://blockchainhub.net/blockchain-oracles/))
3. [Tutorial: How to integrate Razor on Matic Network]([https://docs.razor.network/tutorial/matic/](https://docs.razor.network/tutorial/matic/))
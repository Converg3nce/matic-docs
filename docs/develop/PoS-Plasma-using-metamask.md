---
id: pos-plasma-using-metamask
title: PoS-Plasma Using Metamask
description: PoS-Plasma token transfer tutorial using metamask.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# PoS and Plasma using Metamask

This tutorial is a brief introduction on how to transfer tokens between Ethereum and Matic using PoS or Plasma using matic.js library and Metamask. Matic-Ethereum bridge provides a cross-chain channel using which users can transfer tokens from Ethereum to Matic and vice-versa. Both PoS and Plasma bridge is available to the user to transfer the tokens across two chains. More details on using the bridge can be found [here](https://docs.matic.network/docs/develop/ethereum-matic/getting-started). This tutorial mainly focuses on using the bridge from a front end perspective. We will be using Metamask for this purpose.

The most important thing to be understood from this tutorial is the proper usage of the web3 provider in the matic.js instance we create. Whether using PoS or Plasma, certain actions need to be performed on Matic and some on ethereum. Due to this reason, different providers are required in different scenarios. Hence correctly setting the providers is very necessary. 

1. An example react app that demonstrates the usage of the Plasma and PoS bridge can be found [here](https://github.com/maticnetwork/pos-plasma-tutorial) .
2. Install the dependencies using `npm install.`
3. Replace the token addresses in src/config.json with your corresponding token addresses
- goerliDERC20address : ERC20 token address deployed on Goeril
- maticDERC20address : ERC20 token address deployed on Matic
- maticWETH : PoS WETH deployed on Matic
- childMTXaddress : Plasma WETH deployed on Matic
- mainMaticWETH : Plasma WETH deployed on Goerli
- mainTestToken : Plasma ERC20 token deployed on Goerli
- MaticTestToken : Plasma ERC20 token deployed on Matic

## Example using PoS ERC20

### Deposit

In deposit functionality for ERC20 tokens first, approval is given then deposit takes place. Upon clicking the deposit button metamask will first ask to approve the transfer of a specified number of tokens and after the confirmation of the approval transaction, metamask will ask to confirm the deposit transaction. Make sure the ethereum network is selected in metamask for deposit functionality.

During deposit of ERC20 tokens providers are specified as below 

`maticProvider: maticprovider`

`parentProvider: window.web3`

<img src={useBaseUrl("img/pos-plasma-using-metamask/approve.png")} />

 <img src={useBaseUrl("img/pos-plasma-using-metamask/deposit.png")} />


### Burn

Burning of tokens takes place on Matic, make sure Matic network is selected in metamask.

During burning of ERC20 tokens providers are specified as below

`maticProvider: window.web3`

`parentProvider: ethereumprovider`

<img src={useBaseUrl("img/pos-plasma-using-metamask/burn.png")} />

### Exit

The exit process takes place on ethereum and upon confirmation on ethereum, equivalent amount tokens burn on Matic are released on ethereum. Make sure the ethereum network is selected in metamask. The burn hash obtained after burning of tokens is given as an argument. Wait for the checkpointing to complete before doing exit process. Checkpoint time is usually 5 minutes.

During deposit of ERC20 tokens providers are specified as below 

`maticProvider: maticprovider`

`parentProvider: window.web3`
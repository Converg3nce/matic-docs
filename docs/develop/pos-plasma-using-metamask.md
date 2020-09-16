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


This tutorial is a brief introduction on how to transfer tokens between Ethereum and Matic on PoS and Plasma bridge using matic.js library and Metamask.Matic-Ethereum bridge provides a cross-chain channel using which users can transfer tokens from Ethereum to Matic and vice-versa. Both PoS and Plasma bridge is available to the user to transfer the tokens across two chains. More details on using the bridge can be found [here](/docs/develop/ethereum-matic/getting-started). This tutorial mainly focuses on using the bridge from a front end perspective. We will be using Metamask for this purpose.

The most important thing to be understood from this tutorial is the proper usage of the web3 provider in the matic.js instance we create. Whether using PoS or Plasma, certain actions need to be performed on Matic and some on ethereum. Due to this reason, different providers are required in different scenarios. Hence correctly setting the providers is very necessary. 

1. An example react app that demonstrates the usage of the Plasma and PoS bridge can be found [here](https://github.com/maticnetwork/pos-plasma-tutorial) .
2. Install the dependencies using `npm install` .
3. Replace the token addresses in src/config.json with your corresponding token addresses

- posRootERC20 : ERC20 root token address on pos bridge
- posChildERC20 : ERC20 child token address on pos bridge
- posWETH : PoS Weth
- rootChainWETH: WETH deployed on root chain
- plasmaWETH : Plasma WETH
- plasmaRootERC20 : ERC20 root token deployed on plasma
- plasmaChildERC20 : ERC20 child token deployed on plasma

4. Run the project using `npm start` .
## Example using PoS ERC20

### Deposit

To deposit ERC20 tokens, an approve function call has to be made before calling the deposit function. Upon clicking the deposit button metamask will first asks to approve the transfer of a specified number of tokens and after the confirmation of the approval transaction, metamask will ask to confirm the deposit transaction. Make sure the goerli network is selected in metamask for deposit functionality.

During deposit of ERC20 tokens, the providers are specified as below 

`maticProvider: maticprovider`

`parentProvider: window.web3`

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={useBaseUrl("img/pos-plasma-using-metamask/approve.png")} />
</div>

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={useBaseUrl("img/pos-plasma-using-metamask/deposit.png")} />
</div>

### Burn

For withdrawing tokens back to root chain,tokens have to be first burnt on child chain, make sure Mumbai network is selected in metamask.

During burning of ERC20 tokens providers are specified as below

`maticProvider: window.web3`

`parentProvider: ethereumprovider`

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={useBaseUrl("img/pos-plasma-using-metamask/burn.png")} />
</div>

### Exit

The exit process takes place on ethereum and upon confirmation, equivalent amount of tokens that were burnt on ch ild chain are released to the users address on root chain. Make sure the Goerli network is selected in metamask. The burn hash obtained after burning of tokens is given as the input. Wait for the checkpointing to complete before doing this exit process. Checkpoint time is usually ~10 minutes.

During deposit of ERC20 tokens, the providers are specified as below 

`maticProvider: maticprovider`

`parentProvider: window.web3`
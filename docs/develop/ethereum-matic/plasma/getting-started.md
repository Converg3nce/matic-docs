---
id: getting-started
title: Plasma Bridge
sidebar_label: Introduction
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This tutorial will act as a guide for step-by-step process to understand and use Plasma bridge using [Matic JS](https://github.com/maticnetwork/matic.js), which is the easiest way to interact with the Plasma Bridge on Matic Network. 

- ERC20: In this tutorial we use ERC-20 assets to be transferred from Görli to Matic. 
- ERC721: The flow discussed below remains similar for ERC-721 assets with minor changes that will be mentioned wherever required. 
- Ether: The flow discussed below is simliar for transfer and withdraw, The only difference is at deposit, it's only one step by using ```matic.depositEthers```. For transfer and withdraw you can find the Görli_ERC20Address & Matic_ERC20Address in [network detail](/docs/develop/network-details/network)

## Assets flow in Plasma Bridge

We will be showcasing the flow for asset transfers on the Matic Network in this tutorial and how you can do the same using Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. User deposits crypto assets in Matic contract on mainchain
2. Once deposited tokens get confirmed on the mainchain, the corresponding tokens will get reflected on the Matic chain
    - The user can now transfer tokens to anyone they want instantly with negligible fees. Matic chain has faster blocks (approximately 1 second). That way, the transfer will be done almost instantly.
3. Once a user is ready, they can withdraw remaining tokens from the mainchain. Withdrawal of funds is initiated from the Plasma Sidechain. A checkpoint interval of 5 mins is set, where all the blocks on the Matic block layer are validated since the last checkpoint.
4. Once the checkpoint is submitted to the mainchain Ethereum contract, an Exit NFT (ERC721) token is created of equivalent value.
5. Users need to wait for a 7 day challenge period
6. Once the challenge period is complete, the withdrawn funds can be claimed back to your Ethereum acccount from the mainchain contract using a process-exit procedure.
    - User can also get a fast exit via 0x or Dharma (coming soon!)

### Prerequisites:

### Görli Faucet

In order to make any transactions, you will also need some Ether in the test accounts that you will use while following the tutorial. In case you don’t have some ETH on Görli, you can use the faucet links given here — https://goerli-faucet.slock.it/.

### Matic Faucet

Throughout this tutorial, we will be using the ERC20 token `TEST` on the Görli network as an example. This is a TEST token. In your DApp, you can replace it with any ERC20 token. To get some Test `TEST` tokens on Matic Network, you can access the Matic Faucet by clicking on the link below. 

<center>
<button style={{padding: '20px', backgroundColor: '#4093ff', color: '#fff', borderRadius: '25px', fontSize : '15px' }}>
  <a href="https://faucet.matic.network/" target="_blank" style={{color: 'inherit'}}>
    Get Test Tokens
  </a>
</button>
</center>

> Note: To use your own tokens for deposits and withdrawals, you'll have to get the token 'mapped'. Which essentially means making the contracts on main chain and side chain 'aware' of your custom token. Read more about the Mapping process [here](/docs/develop/ethereum-matic/plasma/mapping-assets), or you can submit a mapping request [here](/docs/develop/ethereum-matic/submit-mapping-request). 

### Basic setup for the Metamask Wallet (Optional)

1. [Create a wallet](/docs/develop/metamask/hello): If you are new to wallets, then Setup a Metamask Account.
2. [Configure the Matic testnet](/docs/develop/metamask/config-matic): To easily visualise the flow of funds on the Matic Network, it is instructive if you configure the Matic testnet on Metamask.
> Note that we are using Metamask here solely for visualization purposes. There is no requirement to use Metamask at all for using the Matic Network. 
3. [Create Multiple Accounts](/docs/develop/metamask/multiple-accounts): Before starting with the tutorial, go ahead and have 3 Ethereum test accounts ready.
4. [Configure token on Matic](/docs/develop/metamask/custom-tokens): In order to view the flow of funds easily on the Matic Network using Matic.js, you can configure tokens on Metamask.
The `TEST` token, taken as an example for this tutorial, can be configured in Metamask so as to easily visualise account balances. > Again note this is **optional**. You can very easily query the token balances and other variables using [web3](https://web3js.readthedocs.io/en/1.0/)

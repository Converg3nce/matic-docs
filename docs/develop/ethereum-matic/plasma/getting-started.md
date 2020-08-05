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

The process followed here is:

1. Deposit assets from root chain to Matic [(Ethereum → Matic)](deposit)
2. Transfer assets between accounts on Matic [(Matic ↔ Matic)](transfer)
3. Withdraw assets from Matic on to root chain [(Matic → Ethereum)](withdraw)

- ERC20: In this tutorial we use ERC-20 assets to be transferred from Görli to Matic. 
- ERC721: The flow discussed below remains similar for ERC-721 assets with minor changes that will be mentioned wherever required. 
- Ether: The flow discussed below is simliar for transfer and withdraw, The only difference is at deposit, it's only one step by using ```matic.depositEthers```. For transfer and withdraw you can find the Görli_ERC20Address & Matic_ERC20Address in [network detail](/docs/develop/network-details/network)

## Using Matic JS

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

### Basic setup for the tutorial

1. [Create a wallet](/docs/develop/metamask/hello): If you are new to wallets, then Setup a Metamask Account.
2. [Configure the Matic testnet](/docs/develop/metamask/testnet): To easily visualise the flow of funds on the Matic Network, it is instructive if you configure the Matic testnet on Metamask.
> Note that we are using Metamask here solely for visualization purposes. There is no requirement to use Metamask at all for using the Matic Network. 
3. [Create Multiple Accounts](/docs/develop/metamask/multiple-accounts): Before starting with the tutorial, go ahead and have 3 Ethereum test accounts ready.
4. [Configure token on Matic](/docs/develop/metamask/custom-tokens): In order to view the flow of funds easily on the Matic Network using Matic.js, you can configure tokens on Metamask.
The `TEST` token, taken as an example for this tutorial, can be configured in Metamask so as to easily visualise account balances. > Again note this is **optional**. You can very easily query the token balances and other variables using [web3](https://web3js.readthedocs.io/en/1.0/)

These Test tokens needs to be added (depending upon the type of asset you are using - erc20/erc721/ether) to all 3 test accounts in Metamask once each in both the Görli and Matic testnets:

|  |Görli  |Matic  |
|---|---|---|
|TEST (ERC20)  | `0xb2eda8A855A4176B7f8758E0388b650BcB1828a4` | `0xc7bb71b405ea25A9251a1ea060C2891b84BE1929` |
|TEST (ERC721)  | `0x0217B02596Dfe39385946f82Aab6A92509b7F352` | `0xa38c6F7FEaB941160f32DA7Bbc8a4897b37876b5` |
|Wrapped ETH(WETH)   | `0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc` | `0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62` |

## Introducing Matic.js

The Matic.js repository is hosted on Github at https://github.com/maticnetwork/matic.js/

For reference purposes, I will be creating a test folder to showcase how to setup Matic.js step-by-step. Go ahead and create a folder for this tutorial — I am going with `$ mkdir matic-js-test`

Install the `maticjs` package via npm:

```js
$ npm install --save @maticnetwork/maticjs
$ npm i --save @maticnetwork/meta
```

> If you wish to directly refer a set of code examples, you can do so at https://github.com/maticnetwork/matic.js/tree/master/examples

## matic-example.js
Within the `matic-js-test` folder, create a new file and name it `matic-example.js`, and add the following code

```js
const Matic = require('@maticnetwork/maticjs').default
const config = require('./config.json')

const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
    maticProvider: config.MATIC_PROVIDER,
    parentProvider: config.PARENT_PROVIDER,
    rootChain: config.ROOTCHAIN_ADDRESS,
    withdrawManager: config.WITHDRAWMANAGER_ADDRESS,
    depositManager: config.DEPOSITMANAGER_ADDRESS,
    registry: config.REGISTRY,
})

async function execute() {
    await matic.initialize()
    matic.setWallet(config.PRIVATE_KEY)
}
```

> **Never store your private key in code on production** — this is added in the `config.js` file for illustration purposes. Typically a user’s private key will be stored in a browser wallet such as Metamask or a mobile wallet such as the Matic wallet, Status or a hardware wallet.

### Config.json

You will also need to create another file `config.json`. This will contain all configuration related to Matic.js.
```json
{
    "MATIC_PROVIDER": "https://rpc-mumbai.matic.today", 
    "PARENT_PROVIDER": "https://goerli.infura.io/v3/75aa7935112647bc8cc49d20beafa189", 
    "ROOTCHAIN_ADDRESS": "0x2890bA17EfE978480615e330ecB65333b880928e", 
    "WITHDRAWMANAGER_ADDRESS": "0x2923C8dD6Cdf6b2507ef91de74F1d5E0F11Eac53", 
    "DEPOSITMANAGER_ADDRESS": "0x7850ec290A2e2F40B82Ed962eaf30591bb5f5C96",  
    "PRIVATE_KEY": "your_pvt_key", // Append 0x to your private key
    "FROM_ADDRESS": "your address",
    "GOERLI_ERC20": "0xb2eda8A855A4176B7f8758E0388b650BcB1828a4", 
    "MATIC_ERC20": "0xc7bb71b405ea25A9251a1ea060C2891b84BE1929", 
    "REGISTRY": "0xeE11713Fe713b2BfF2942452517483654078154D",
    "MUMBAI_ERC721":"0xa38c6F7FEaB941160f32DA7Bbc8a4897b37876b5",
    "GOERLI_ERC721":"0x0217B02596Dfe39385946f82Aab6A92509b7F352",
    "MUMBAI_WETH":"0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62",
    "GOERLI_WETH":"0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc"
  }
```
For now, don’t worry about these values — just keep them as is.

> Note: You will need to add your private key here. Signing of transactions will require your private key. Again, it is **NOT ADVISABLE** to hard code your private key when on production. Later, you can build keeping in mind that the user will be handling their keys at their end with MetaMask, Matic Wallet or any other compatible user wallet.

> Important: Make sure you prefix `0x` to your private key.

Let's move to the next part of this tutorial - Deposit assets from root chain to Matic [(Ethereum → Matic)](deposit) 

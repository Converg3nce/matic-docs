---
id: getting-started
title: Getting Started
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This tutorial will act as a guide for step-by-step process to understand and use [Matic JS](https://github.com/maticnetwork/matic.js), which is the easiest way to interact with the Matic Network. 

<img src={useBaseUrl("img/maticjs/maticjs.png")} />

The process followed here is:

1. Deposit assets from root chain to Matic [(Ethereum → Matic)](deposit)
2. Transfer assets between accounts on Matic [(Matic ↔ Matic)](transfer)
3. Withdraw assets from Matic on to root chain [(Matic → Ethereum)](withdraw)

- ERC20: In this tutorial we use ERC-20 assets to be transferred from Ropsten to Matic. 
- ERC721: The flow discussed below remains similar for ERC-721 assets with minor changes that will be mentioned wherever required. 
- Ether: The flow discussed below is simliar for transfer and withdraw, The only difference is at deposit, it's only one step by using ```matic.depositEthers```. For transfer and withdraw you can find the Ropsten_ERC20Address & Matic_ERC20Address in [network detail](/docs/integrate/network-detail)

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

### Ropsten Faucet

In order to make any transactions, you will also need some Ether in the test accounts that you will use while following the tutorial. In case you don’t have some ETH on Ropsten, you can use the faucet links given here — https://faucet.metamask.io/ or https://faucet.ropsten.be/.

### Matic Faucet

Throughout this tutorial, we will be using the ERC20 token `TEST` on the Ropsten network as an example. This is a TEST token. In your DApp, you can replace it with any ERC20 token. To get some Test `TEST` tokens on Matic Network, you can access the Matic Faucet by clicking on the link below

<div style={{textAlign: 'center', paddingTop: '15px', paddingBottom: '15px'}}>
        <button className="btn btn-primary btn-md" style={{padding: '15px', backgroundColor: '#000', color: '#fff', borderRadius: '4px', cursor: 'pointer', boxShadow: '0px 4px 7px -4px rgba(0,0,0,0.75)'}}>
          <a href="https://faucet.matic.network/" target="_blank" style={{color: 'inherit'}}>
            Get Test Tokens
          </a>
        </button>
      </div>

### Basic setup for the tutorial

To easily visualise the flow of funds on the Matic Network, it is instructive if you configure the Matic testnet on Metamask. Note that we are using Metamask here solely for visualization purposes. There is no requirement to use Metamask at all for using the Matic Network.

Before starting with the tutorial, go ahead and have 3 Ethereum test accounts ready. In case you are new to Ethereum and Metamask, you can refer https://docs.matic.network/newbies/create-accounts-metamask/ on instructions on how to.

For your reference we will be using the following accounts in this tutorial

```js
Account #1: 0x1a06816065731fcBD7296f9B2400d632816b070B
Account #2: 0xf66f409086647591e0c2f122C1945554b8e0e74F
Account #3: 0xbFF81BA6Fa6593F0467592ACcF770A120f740552
```

When you create multiple accounts at your end, your addresses will be different from those shown here.

In order to view the flow of funds easily on the Matic Network using Matic.js, you can configure Matic’s testnet URL on Metamask. Refer this link — https://docs.matic.network/newbies/conf-testnet-metamask/ to quickly set it up. Note this is **optional**. You can query using web3, if you choose to.

### Configuring Matic Test tokens on Metamask

The `TEST` token, taken as an example for this tutorial, can be configured in Metamask so as to easily visualise account balances. Again note this is **optional**. You can very easily query the token balances and other variables using [web3](https://web3js.readthedocs.io/en/1.0/)

These Test tokens needs to be added (depending upon the type of asset you are using - erc20/erc721) to all 3 test accounts in Metamask once each in both the Ropsten and Matic testnets:

|  |Ropsten  |Matic  |
|---|---|---|
|TEST (ERC20)  | `0x70459e550254b9d3520a56ee95b78ee4f2dbd846` | `0xc82c13004c06e4c627cf2518612a55ce7a3db699` |
|TEST (ERC721)  | `0x07d799252cf13c01f602779b4dce24f4e5b08bbd` | `0x9f289a264b6db56d69ad53f363d06326b984e637` |

In case you are new to Ethereum and Metamask, you can refer https://docs.matic.network/newbies/conf-custom-tokens-metamask/ on instructions on how to.

## Introducing Matic.js

The Matic.js repository is hosted on Github at https://github.com/maticnetwork/matic.js/

For reference purposes, I will be creating a test folder to showcase how to setup Matic.js step-by-step. Go ahead and create a folder for this tutorial — I am going with `$ mkdir matic-js-test`

Install the `maticjs` package via npm:

```js
$ npm install --save web3 maticjs
$ npm i --save @maticnetwork/meta
```

> If you wish to directly refer a set of code examples, you can do so at https://github.com/maticnetwork/matic.js/tree/master/examples

Let's move to the next part of this tutorial - Deposit assets from root chain to Matic [(Ethereum → Matic)](deposit) 
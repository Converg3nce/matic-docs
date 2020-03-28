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

1. [Create a wallet](/docs/develop/metamask/hello): If you are new to wallets, then Setup a Metamask Account.
2. [Configure the Matic testnet](/docs/develop/metamask/testnet): To easily visualise the flow of funds on the Matic Network, it is instructive if you configure the Matic testnet on Metamask.
> Note that we are using Metamask here solely for visualization purposes. There is no requirement to use Metamask at all for using the Matic Network. 
3. [Create Multiple Accounts](/docs/develop/metamask/multiple-accounts): Before starting with the tutorial, go ahead and have 3 Ethereum test accounts ready.
4. [Configure token on Matic](/docs/develop/metamask/custom-tokens): In order to view the flow of funds easily on the Matic Network using Matic.js, you can configure tokens on Metamask.
The `TEST` token, taken as an example for this tutorial, can be configured in Metamask so as to easily visualise account balances. > Again note this is **optional**. You can very easily query the token balances and other variables using [web3](https://web3js.readthedocs.io/en/1.0/)

These Test tokens needs to be added (depending upon the type of asset you are using - erc20/erc721/ether) to all 3 test accounts in Metamask once each in both the Ropsten and Matic testnets:

|  |Ropsten  |Matic  |
|---|---|---|
|TEST (ERC20)  | `0x70459e550254b9d3520a56ee95b78ee4f2dbd846` | `0xc82c13004c06e4c627cf2518612a55ce7a3db699` |
|TEST (ERC721)  | `0x07d799252cf13c01f602779b4dce24f4e5b08bbd` | `0x9f289a264b6db56d69ad53f363d06326b984e637` |
|Wrapped ETH(WETH)   | `0x7BdDd37621186f1382FD59e1cCAE0316F979a866` | `0x8567184E6F9b1B77f24AfF6168453419AD22f90e` |

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
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs").default;
const config = require("./config.json");

const network = new Network(config.network, config.version);
const MaticNetwork = network.Matic;
const MainNetwork = network.Main;

const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
const Matic_Erc20Address = config.Matic_Erc20Address;

const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
const Matic_Erc721Address = config.Matic_Erc721Address;

const from = config.from; // from address

const matic = new Matic({
  maticProvider: MaticNetwork.RPC,
  parentProvider: MainNetwork.RPC,
  rootChain: MainNetwork.Contracts.RootChain,
  withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
  depositManager: MainNetwork.Contracts.DepositManagerProxy,
  registry: MainNetwork.Contracts.Registry
});

async function init() {
  await matic.initialize();
  await matic.setWallet(config.privateKey);
}
```

> **Never store your private key in code on production** — this is added in the `config.js` file for illustration purposes. Typically a user’s private key will be stored in a browser wallet such as Metamask or a mobile wallet such as the Matic wallet, Status or a hardware wallet.

### Config.json

You will also need to create another file `config.json`. This will contain all configuration related to Matic.js.
```json
{
    "network":'testnet',
    "version": "v3",

    "privateKey": '<paste your private key here>', 
    "from": '<paste address corresponding to the private key>',
    
    "Ropsten_Erc20Address": "",
    "Matic_Erc20Address": "",
    
    "Ropsten_Erc721Address": "",
    "Matic_Erc721Address": "",

    "Ropsten_WEthAddress": "",
    "Matic_WEthAddress": "",

    "value": ""
}
```
For now, don’t worry about these values — just keep them as is.

> Note: You will need to add your private key here. Signing of transactions will require your private key. Again, it is **NOT ADVISABLE** to hard code your private key when on production. Later, you can build keeping in mind that the user will be handling their keys at their end with MetaMask, Matic Wallet or any other compatible user wallet.

> !Important: Make sure you prefix `0x` to your private key.


Let's move to the next part of this tutorial - Deposit assets from root chain to Matic [(Ethereum → Matic)](deposit) 

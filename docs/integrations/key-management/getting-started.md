---
id: getting-started
title: Key Management Strategies
sidebar_label: Getting Started
---

The following article aims to be a guide through integration of a key management strategy on client side of your Decentralised Application on Matic Network.

The following strategies will be discussed:

- Metamask
- Wallet Connect
- Portis

The overall steps would essentially remain the same for any client side application to talk to the blockchain:
 
1. **Set up Web3**: [web3.js](https://web3js.readthedocs.io/) is a javascript library that allows our client-side application to talk to the blockchain. We configure web3 to communicate via Metamask/Wallet Connect/Portis. 
> Note: Refer [Web3.js](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js) docs to 
add web3 to your project 
2. **Set up Account**: To send transactions from (specifically for transactions that alter the state of the blockchain) 
3. **Instantiate contracts**: Once we have our web3 object in place, we next instantiate our deployed contract, with which we interact. 
4. **Call functions**: we fetch data via functions in the contract - through our contract object.


## Portis

Portis is a web-based wallet built keeping easy user-onboarding in mind. It comes with a javascript SDK that integrates into the DApp and creates a local wallet-less experience for the user. Further, it handles setting up the wallet, transactions and gas fees. Like Metamask, it is non-custodial - users control their keys, Portis just stores them securely. But, unlike Metamask, it is integrated into the application and not the browser. Users have their keys associated with their login id and passwords.

**Type**: Non-custodial/HD **Private Key Storage**: Encrypted and stored on portis’ servers **Communication to Ethereum Ledger**: Developer defined **Private key encoding**: Mnemonic

### 1. Setup Web3

Install the following in your DApp:

    npm install --save @portis/web3

And register your DApp with Portis to obtain a Dapp ID: > [Portis Dashboard](https://dashboard.portis.io/)

Import `portis` and `web3` object:

    import Portis from '@portis/web3';import Web3 from 'web3';

Portis constructor takes first argument as the DApp ID (we got from the previous step) and second argument as the network you’d like to connect to. This can either be a string or an object.

    const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');const web3 = new Web3(portis.provider);

### 2. Set up account

If the installation and instantiation of web3 was successful, the following should successfully return the connected account:

    this.web3.eth.getAccounts().then((accounts) => {this.account = accounts[0];})

### 3. Instantiating Contracts

Instantiation of contracts would remain the same, as discussed above:

    const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)

### 4. Calling functions

Calling functions would remain the same as discussed above: #### Calling `call()` Functions

    this.myContractInstance.methods.myMethod(myParams).call().then (// do stuff with returned values)

### Calling `send()` Functions

    this.myContractInstance.methods.myMethod(myParams).send({from: this.account,gasPrice: 0}).then ((receipt) => {// returns a transaction receipt})


## Working Demo

For demonstration purposes the following example DApp was created to give a better understanding of the user’s perspective for the three approaches. Please refer this [repository](https://github.com/nglglhtr/key-management).

An example [ERC20 and ERC721 tokens](https://gist.github.com/nglglhtr/cf1686322449365e21eb9b32d0754939) were deployed on Matic chain, the DApp supports minting, transfer and checking balance/owner of tokens.

### Usage

1. Clone the repository
2. Install dependencies `bash npm install`
3. Checkout on respective branches for the separate approaches:
    - Metamask `bash git checkout master`
    - Wallet Connect `bash git checkout walletconnect`
    - Portis `bash git checkout portis`
4. `cd client && npm run serve`
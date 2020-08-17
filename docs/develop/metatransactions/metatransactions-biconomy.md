---
id: metatransactions-biconomy
title: Biconomy
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Biconomy uses a proxy contract approach to enable meta-transactions on your DApp. The two major implications it has on you as a developer are:

- Any transactions made by the user will have `from` parameter set as the user's proxy contract instead of user's account
- Biconomy runs the relayers and pays Gas fee upfront which is recovered from the DApp on monthly basis
- The smart contract accepting signed transactions will require no changes in the smart contract code whatsoever

<img src={useBaseUrl("img/biconomy/Untitled.png")} />

from [https://docs.biconomy.io/](https://docs.biconomy.io/)

Biconomy offers their SDK that makes this integration seamless, called Mexa.

Integration with Mexa is a two step process:

1. Register your DApp on Mexa Dashboard, a dashboard for developers, and copy API Key generated for your DApp.
2. Integrate Mexa SDK in your DApp code using API Key you got from dashboard.

You'll first need your deployed smart contract address and it's ABI to register on the dashboard.

## Registering on Biconomy dashboard

Follow the steps **[here](https://docs.biconomy.io/biconomy-dashboard)**, to register an account and add a DApp to get the keys, and configure functions that will accept signed transactions.

## Integrate Mexa SDK in your DApp client code

Get inside dApp client code directory, to configure meta transactions. Lets first install `@biconomy/mexa` from npm.

```js
npm install @biconomy/mexa --save
```

Now we can initialize biconomy & web3. In place of `<web3 provider>` you can use `window.ethereum` if your dApp users are using MetaMask.

```js
import Biconomy from "@biconomy/mexa";

const biconomy = new Biconomy(<web3 provider>, {apiKey: <API Key>});
web3 = new Web3(biconomy);

biconomy.onEvent(biconomy.READY, () => {

  // Initialize your dapp here like getting user accounts etc

}).onEvent(biconomy.ERROR, (error, message) => {

  // Handle error while initializing mexa

});
```

Congratulations 👏

You have now enabled meta transactions in your DApp. Interact with web3 the way you have been doing it.

Now whenever there is a write transaction action(registered in mexa dashboard also) initiated from the user, mexa will ask for user’s signature in an [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) format and handle the transaction rather than sending signed transaction directly to blockchain from user’s wallet.

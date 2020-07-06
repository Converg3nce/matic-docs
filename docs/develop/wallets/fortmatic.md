---
id: fortmatic
title: Fortmatic
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

Fortmatic SDK allows you to easily integrate your app with the Ethereum blockchain, whether you already have a dApp integrated with web3 or are starting from scratch. Fortmatic provides a smooth and delightful experience for both you and your app's users.

1. Integrate via

```bash
$ npm i --save fortmatic@latest
```

2. Script

```js
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
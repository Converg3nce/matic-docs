---
id: config-truffle
title: Using Truffle
---

## **Setting up the development environment**

There are a few technical requirements before we start. Please install the following:

- [Node.js v8+ LTS and npm](https://nodejs.org/en/) (comes with Node)
- [Git](https://git-scm.com/)

Once we have those installed, we only need one command to install Truffle:

    npm install -g truffle

To verify that Truffle is installed properly, type **`truffle version`** on a terminal. If you see an error, make sure that your npm modules are added to your path.

We also will be using [Ganache](https://www.trufflesuite.com/ganache), a personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests. You can download Ganache by navigating to [http://truffleframework.com/ganache](http://truffleframework.com/ganache) and clicking the "Download" button.

> If you're new to Truffle then please follow the `getting-started` by truffle, To setup the truffle environment. 

## **truffle-config**

- Go to truffle-config.js
- Update the truffle-config with matic-network-crendentials.

```js
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://testnetv3.matic.network`),
      network_id: 15001,
      gasPrice: '0x0',
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
    }
  }
}
```

Notice, it requires mnemonic to be passed in for maticProvider, this is the seed phrase for the account you'd like to deploy from. Create a new .secret file in root directory and enter your 12 word mnemonic seed phrase to get started (gas price on testnet3 can be set to 0, so you don't have to worry about funds right now).

## **Deploying on Matic Network**

Run this command in root of the project directory:
```js
$ truffle migrate --network matic
```

Contract will be deployed on MaticTestnetv3, it will somewhat looks like this:

```js
2_deploy_contracts.js
=====================

   Replacing 'MyContract'
   ------------------
   > transaction hash:    0x1c94d095a2f629521344885910e6a01076188fa815a310765679b05abc09a250
   > Blocks: 5            Seconds: 5
   > contract address:    0xbFa33D565Fcb81a9CE8e7a35B61b12B04220A8EB
   > block number:        2371252
   > block timestamp:     1578238698
   > account:             0x9fB29AAc15b9A4B7F17c3385939b007540f4d791
   > balance:             79.409358061899298312
   > gas used:            1896986
   > gas price:           0 gwei
   > value sent:          0 ETH
   > total cost:          0 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 5 (block: 2371262)
initialised!

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:                   0 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0 ETH
```

> Remember your address, transaction_hash and other details provided would differ, Above is just to provide an idea of structure.


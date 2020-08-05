---
id: erc20
title: ERC20 Deposit and Withdraw Guide
sidebar_label: ERC20
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

### High Level Flow

#### **Deposit ERC20 (2 step process)** 

1. The tokens need to be first approved to the Matic rootchain contract on Parent Chain(Etheruem/Goerli).
2. Once approved, the deposit function is to be invoked where the tokens get deposited to the Matic contract, and are available for use in the Matic network.

#### **Transfer ERC20**

Once you have funds on Matic, you can use those funds to send to others instantly.
> `recipient` is the receiver’s address, to whom the funds are supposed to be sent.
 
#### **Withdraw ERC20 (3 step process)**

1. Withdrawal of funds is initiated from Matic Network. A checkpoint interval of 5 mins is set, where all the blocks on the Matic block layer are validated since the last checkpoint.
2. Once the checkpoint is submitted to the mainchain ERC20ereum contract, an NFT Exit (ERC721) token is created of equivalent value. Users need to wait for a 7 day challenge period (For testnets wait for ~5 minutes for)
3. Once the challenge period is complete, the withdrawn funds can be claimed back to your ERC20ereum acccount from the mainchain contract using a process-exit procedure.

> For now, just go with the fact that the challenge period for withdrawals is an important part of the Plasma framework to ensure security of your transactions. Later, once you get to know the system better, the reason for the 7-day withdrawal window will become clear to you.

## Setup Details

---

### Configuring Matic SDK

Install Matic SDK (**_2.0.2)_**

```bash
npm install --save @maticnetwork/maticjs
```

### util.js
```js
const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')

const Network = require('@maticnetwork/meta/network')
const Matic = require('@maticnetwork/maticjs').default

const SCALING_FACTOR = new bn(10).pow(new bn(18))

async function getMaticClient(_network = 'testnet', _version = 'mumbai') {
  const network = new Network(_network, _version)
  const { from } = getAccount()
  const matic = new Matic({
    network: _network,
    version: _version,
    parentProvider: new HDWalletProvider(process.env.PRIVATE_KEY, network.Main.RPC),
    maticProvider: new HDWalletProvider(process.env.PRIVATE_KEY, network.Matic.RPC),
    parentDefaultOptions: { from },
    maticDefaultOptions: { from },
  })
  await matic.initialize()
  return { matic, network }
}

function getAccount() {
  if (!process.env.PRIVATE_KEY || !process.env.FROM) {
    throw new Error('Please set the PRIVATE_KEY/FROM env vars')
  }
  return { privateKey: process.env.PRIVATE_KEY, from: process.env.FROM }
}

module.exports = {
  SCALING_FACTOR,
  getMaticClient,
  getAccount,
}
```

### process.env
Create a new file in root directory name it process.env
```bash
PRIVATE_KEY = ""
FROM = ""
```
---

## deposit.js


```js
const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  const token = network.Main.Contracts.Tokens.TestToken
  const amount = matic.web3Client.web3.utils.toWei('1.567')

  // approve
  await matic.approveERC20TokensForDeposit(token, amount).then((res) => {
        console.log("approve hash: ", res.transactionHash)
  })
  
  // deposit 
  await matic.depositERC20ForUser(token, from, amount)).then((res) => {
        console.log("deposit hash: ", res.transactionHash)
  })
}
execute().then(_ => process.exit(0))
```

## transfer.js

```js
const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  const to = "<>"

  const childTokenAddress = network.Matic.Contracts.Tokens.TestToken
  const amount = matic.web3Client.web3.utils.toWei('1.23')

  await matic.transferERC20Tokens(childTokenAddress, to, amount, { from, parent: false }).then((res) => {
        console.log("Transfer hash: ", res.transactionHash)
  })
}

execute().then(_ => process.exit(0))
```

## Withdraw

### 1. Burn
Now, depending upon your asset, add the following code:

```js
const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  const token = network.Matic.Contracts.Tokens.TestToken
  const amount = matic.web3Client.web3.utils.toWei('5.678')
  
  await matic.startWithdraw(token, amount, { from }).then((res) => {
        console.log("Burn hash: ", res.transactionHash)
  })
}

execute().then(_ => process.exit(0))
```

### 2. confirm-withdraw.js

```js
//Wait for 5 mins till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const utils = require('./utils')

async function execute() {
  const { matic } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  // Submit proof of burn on Main Chain
  const txHash = '<>'
  await matic.withdraw(txHash, { from, gas: '7000000' }).then((res) => {
        console.log("Confirm withdraw hash: ", res.transactionHash)
  })
}
// Withdraw process is completed, funds will be transfered to your account after challege period is over.
execute().then(_ => process.exit(0))
```


### 3. Process Exit

The code for process exit remains common for ERC20 and ERC721 tokens except for the value of `token`

```js
const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  const token = network.Main.Contracts.Tokens.TestToken
  await matic.processExits(token, { from, gas: 7000000 }).then((res) => {
        console.log("Exit hash: ", res.transactionHash)
  })

  // for batch process
  // await matic.processExits([
  //   network.Main.Contracts.Tokens.TestToken,
  //   network.Main.Contracts.Tokens.TestToken,
  //   network.Main.Contracts.Tokens.TestToken,
  //   network.Main.Contracts.Tokens.RootERC721
  // ], { from, gas: 7000000 })
}

execute().then(_ => process.exit(0))
```

_Note: A checkpoint, which is a representation of all transactions happening on the Matic Network to the ERC20ereum chain every ~5 minutes, is submitted to the mainchain ERC20ereum contract._
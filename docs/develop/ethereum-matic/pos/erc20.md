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

This tutorial uses the Matic Testnet ( Mumbai ) which is mapped to the Goerli Network to demonstrate the asset transfer to and fro the two blockchains. An **important thing to be noted** while following this tutorial is that you should always use a Proxy address whenever it is available. For eg. The **RootChainManagerProxy** address has to be used for interaction instead of the **RootChainManager** address. The **PoS contract addresses, ABI, Test Token Addresses** and other deployment details of the PoS bridge contracts can be found [here](/docs/develop/ethereum-matic/pos/deployment).

**Mapping your assets** is necessary to integrate the PoS bridge on your application. You can submit a mapping request [here](/docs/develop/ethereum-matic/submit-mapping-request). But for the purpose of this tutorial, we have already deployed the **Test tokens** and Mapped then on the PoS bridge. You may need it for trying out the tutorial on your own. You can request the desired Asset from the [faucet](https://faucet.matic.network/). If the test tokens are unavailable on the faucet, do reach us on [discord](https://discord.gg/er6QVj)

In the upcoming tutorial, every step will be explained in detail along with a few code snippets. However, you can always refer to this [repository](https://github.com/maticnetwork/matic.js/tree/v2.0.2/examples/POS-client) which will have all the **example source code** that can help you to integrate and understand the working of PoS bridge.

## High Level Flow

Deposit ERC20 -

1. **_Approve_** **_ERC20Predicate_** contract to spend the tokens that have to be deposited.
2. Make **_depositFor_** call on **_RootChainManager_**.

Withdraw ERC20 -

1. **_Burn_** tokens on matic chain.
2. Call **_exit_** function on **_RootChainManager_** to submit proof of burn transaction. This call can be made **_after checkpoint_** is submitted for the block containing burn transaction.

## Step Details

---

### Configuring Matic SDK

Install Matic SDK (**_2.0.2)_**

```bash
npm install --save @maticnetwork/maticjs
```

While creating **_MaticPOSClient_** object **network**,**version**,**_maticProvider_**, **_parentProvider_**, **_posERC20Predicate_** and **_posRootChainManager_** need to be provided.

```jsx
const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;
const config = require("./config");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const getMaticPOSClient = () => {
  return new MaticPOSClient({
    network: "testnet", // optional, default is testnet
    version: "mumbai", // optional, default is mumbai
    parentProvider: new HDWalletProvider(
      config.user.privateKey,
      config.root.RPC
    ),
    maticProvider: new HDWalletProvider(
      config.user.privateKey,
      config.child.RPC
    ),
    posRootChainManager: config.root.POSRootChainManager,
    posERC20Predicate: config.root.posERC20Predicate, // optional, required only if working with ERC20 tokens
    parentDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
    maticDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
  });
};
```

The configuration file should be structured like this. Make sure you add your Address, Privatekey and Goerli RPC into this file.

```json
module.exports = {
  root: {
    RPC: "GOERLI-RPC",
    POSRootChainManager: "0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74",
    DERC20: "0x655F2166b0709cd575202630952D71E2bB0d61Af",
    posERC20Predicate: "0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34",
    posEtherPredicate: "0xe2B01f3978c03D6DdA5aE36b2f3Ac0d66C54a6D5",
  },
  child: {
    RPC: "https://rpc-mumbai.matic.today",
    DERC20: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
    MaticWETH: "0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323",
  },
  user: {
    privateKey:
      "0xPVT_KEY",
    address: "0xPUB_ADDR",
    amount: "5000000000000000000", // 0.005
    amount2: "700000000000000000", // 0.007
    tokenId: "1234",
    tokenId2: "6789",
  },
};
```

### Approve

This is a normal ERC20 approval so that **_ERC20Predicate_** can call **_transferFrom_** function. Matic POS client exposes **_approveERC20ForDeposit_** method to make this call.

```jsx
await maticPOSClient.approveERC20ForDeposit(rootToken, amount, { from });
```

### Deposit

Deposit can be done by calling **_depositFor_** on RootChainManager contract. Note that token needs to be mapped and approved for transfer beforehand. Once tokens are transferred deposit proceeds using StateSync mechanism. Matic POS client exposes **_depositERC20ForUser_** method to make this call.

```jsx
await maticPOSClient.depositERC20ForUser(rootToken, from, amount, {
  from,
  gasPrice: "10000000000",
});
```

**_deposit_** function of **_ChildToken_** is called by the **_ChildChainManager._** Tokens should be minted when this call is made.

### Burn

User can call **_withdraw_** function of **_ChildToken_** contract. This function should burn the tokens. Matic POS client exposes **_burnERC20_** method to make this call.

```jsx
await maticPOSClient.burnERC20(childToken, amount, { from });
```

Store the transaction hash for this call and use it while generating burn proof.

### Exit

Once the **_checkpoint_** has been **_submitted_** for the block containing burn transaction, user should call the **_exit_** function of **_RootChainManager_** contract and submit the proof of burn. Upon submitting valid proof tokens are transferred to the user. Matic POS client exposes **_exitERC20_** method to make this call.

```jsx
await maticPOSClient.exitERC20(burnTxHash, { from });
```

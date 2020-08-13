---
id: erc1155-deposit-withdraw
title: ERC1155 Deposit and Withdraw Guide
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

Deposit ERC1155 -

1. **_Approve_** **_ERC1155Predicate_** contract to spend the tokens that have to be deposited.
2. Make **_depositFor_** call on **_RootChainManager_**.

Withdraw ERC1155 -

1. **_Burn_** tokens on matic chain.
2. Call **_exit_** function on **_RootChainManager_** to submit proof of burn transaction. This call can be made **_after checkpoint_** is submitted for the block containing burn transaction.

## Step Details

---

### Configuring Matic SDK

Install Matic SDK (**_2.0.2)_**

```bash
npm install --save @maticnetwork/maticjs
```

While creating **_MaticPOSClient_** object **network**,**version**,**_maticProvider_**, **_parentProvider_**, **_posERC1155Predicate_** and **_posRootChainManager_** need to be provided.

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
    posERC1155Predicate: config.root.posERC1155Predicate, // optional, required only if working with ERC71155 tokens
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
    DERC1155: "0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063",
    posERC1155Predicate: "0xB19a86ba1b50f0A395BfdC3557608789ee184dC8",
    posEtherPredicate: "0xe2B01f3978c03D6DdA5aE36b2f3Ac0d66C54a6D5",
  },
  child: {
    RPC: "https://rpc-mumbai.matic.today",
    DERC1155: "0xA07e45A987F19E25176c877d98388878622623FA",
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

This is a normal ERC1155 approval so that **_ERC1155Predicate_** can call **_transferFrom_** function. Matic POS client exposes **_approveERC1155ForDeposit_** method to make this call.

```jsx
await maticPOSClient.approveERC1155ForDeposit(rootToken, tokenId, { from });
```

### Deposit

Deposit can be done by calling **_depositFor_** on RootChainManager contract. Note that token needs to be mapped and approved for transfer beforehand. Once tokens are transferred deposit proceeds using StateSync mechanism. Matic POS client exposes **_depositSingleERC1155ForUser_** & **_depositBatchERC1155ForUser_** method to make this call.

```jsx
await maticPOSClient.depositSingleERC1155ForUser(
  rootToken,
  from,
  tokenId,
  amount,
  { from, gasPrice: "10000000000" }
);
```

```jsx
await maticPOSClient.depositBatchERC1155ForUser(
  rootToken,
  from,
  [...tokenId],
  [...amount],
  { from, gasPrice: "10000000000" }
);
```

**_deposit_** function of **_ChildToken_** is called by the **_ChildChainManager._** Tokens should be minted when this call is made.

### Burn

User can call **_withdraw_** function of **_ChildToken_** contract. This function should burn the tokens. Matic POS client exposes **_burnSingleERC1155_** & **_burnBatchERC1155_** method to make this call.

```jsx
await maticPOSClient.burnSingleERC1155(rootToken, tokenId, amount, {
  from,
  gasPrice: "10000000000",
});
```

```jsx
await maticPOSClient.burnBatchERC1155(rootToken, [...tokenId], [...amount], {
  from,
  gasPrice: "10000000000",
});
```

**Store the transaction hash for this call and use it while generating burn proof.**

### Exit

Once the **_checkpoint_** has been **_submitted_** for the block containing burn transaction, user should call the **_exit_** function of **_RootChainManager_** contract and submit the proof of burn. Upon submitting valid proof tokens are transferred to the user. Matic POS client exposes **_exitBatchERC1155_** & **_exitSingleERC1155_** method to make this call.

```jsx
await maticPOSClient.exitSingleERC1155(burnTxHash, { from });
```

```jsx
await maticPOSClient.exitBatchERC1155(burnTxHash, { from });
```

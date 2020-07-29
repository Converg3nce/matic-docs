---
id: erc20-deposit-withdraw
title: ERC20 Deposit and Withdraw Guide
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

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

```json
"dependencies": {
    "@maticnetwork/maticjs": "2.0.2"
}
```

While creating **_MaticPOSClient_** object **network**,**version**,**_maticProvider_**, **_parentProvider_**, **_posERC20Predicate_** and **_posRootChainManager_** need to be provided.

```jsx
const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;

const maticPOSClient = new MaticPOSClient({
  network: "testnet", // optional, default is testnet
  version: "mumbai", // optional, default is mumbai
  parentProvider: new HDWalletProvider(config.user.privateKey, config.root.RPC),
  maticProvider: new HDWalletProvider(config.user.privateKey, config.child.RPC),
  posRootChainManager: config.root.POSRootChainManager,
  posERC20Predicate: config.root.posERC20Predicate, // optional, required only if working with ERC20 tokens
  posERC721Predicate: config.root.posERC721Predicate, // optional, required only if working with ERC721 tokens
  posERC1155Predicate: config.root.posERC1155Predicate, // optional, required only if working with ERC71155 tokens
  parentDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
  maticDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
});
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

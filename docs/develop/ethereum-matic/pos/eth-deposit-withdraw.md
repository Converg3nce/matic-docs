---
id: eth-deposit-withdraw
title: ETH Deposit and Withdraw Guide
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## High Level Flow

Deposit ETH -

1. Make **_depositEtherFor_** call on **_RootChainManager_** and **send **the required ether.

Withdraw ETH -

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

While creating **_MaticPOSClient_** object **network**,**version**,**_maticProvider_**, **_parentProvider_** and **_posRootChainManager_** need to be provided.

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

### Deposit

ETH can be deposited to matic chain by calling **_depositEtherFor_** on RootChainManager contract. Matic POS client exposes **_depositEtherForUser_** method to make this call.

**_ETH_** is deposited as **_ERC20_** token on Matic chain. For withdrawing it follow the same process as withdrawing ERC20 tokens.

```jsx
await maticPOSClient.depositEtherForUser(from, amount, {
  from,
  gasPrice: "10000000000",
});
```

### Burn

User can call **_withdraw_** function of **_MaticWETH_** contract. This function should burn the tokens. Since Ether is an ERC20 token on matic chain, use **_burneth_** method of Matic POS client exposes to make this call.

```jsx
await maticPOSClient.burneth(childToken, amount, { from });
```

Store the transaction hash for this call and use it while generating burn proof.

### Exit

Once the **_checkpoint_** has been **_submitted_** for the block containing burn transaction, user should call the **_exit_** function of **_RootChainManager_** contract and submit the proof of burn. Upon submitting valid proof tokens are transferred to the user. Matic POS client exposes **_exitERC20_** method to make this call.

```jsx
await maticPOSClient.exiteth(burnTxHash, { from });
```

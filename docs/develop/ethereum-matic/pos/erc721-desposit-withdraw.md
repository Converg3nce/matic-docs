---
id: erc721-deposit-withdraw
title: ERC721 Deposit and Withdraw Guide
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
## High Level Flow

Deposit ERC721 -

1. ***Approve*** ***RootChainManager*** contract to spend the tokens that have to be deposited.
2. Make ***deposit*** or ***depositFor*** call on ***RootChainManager***.

Deposit Ether -

1. Make ***depositEther*** or ***depositEtherFor*** call on ***RootChainManager*** and ******send ******the ******required ether. 

Withdraw ERC721 -

1. ***Burn*** tokens on matic chain.
2. Call ***exit*** function on ***RootChainManager*** to submit proof of burn transaction. This call can be made ***after checkpoint*** is submitted for the block containing burn transaction.

## Step Details

---

### Configuring Matic SDK

Install Matic SDK (***2.0.0-beta.12)***

```bash
npm install --save @maticnetwork/maticjs
```

```json
"dependencies": {
    "@maticnetwork/maticjs": "2.0.0-beta.12"
}
```

While creating ***MaticPOSClient*** object ***maticProvider***, ***parentProvider***, ***rootChain*** and ***posRootChainManager*** need to be provided.

```jsx
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

const maticPOSClient = new MaticPOSClient({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.PLASMA_ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
})
```

### Approve

This is a normal ERC721 approval so that  ***RootChainManager*** can call ***transferFrom*** function. Matic POS client exposes ***approveERC721ForDeposit*** method to make this call.

```jsx
await maticPOSClient.approveERC721ForDeposit(rootToken, tokenId, { from })
```

### Deposit

Deposit can be done by calling ***deposit*** or ***depositFor*** on RootChainManager contract. Note that token needs to be mapped and approved for transfer beforehand. Once tokens are transferred deposit proceeds using StateSync mechanism. Matic POS client exposes ***depositERC721ForUser*** method to make this call.

```jsx
await maticPOSClient.depositERC721ForUser(rootToken, from, tokenId, { from, gasPrice: '10000000000' })
```

***deposit*** function of ***ChildToken*** is called by the ***ChildChainManager.*** Tokens should be minted when this call is made.

### Burn

User can call ***withdraw*** function of ***ChildToken*** contract. This function should burn the tokens. Matic POS client exposes ***burnERC721*** method to make this call.

```jsx
await maticPOSClient.burnERC721(childToken, tokenId, { from })
```

Store the transaction hash for this call and use it while generating burn proof.

### Exit

Once the ***checkpoint*** has been ***submitted*** for the block containing burn transaction, user should call the ***exit*** function of ***RootChainManager*** contract and submit the proof of burn. Upon submitting valid proof tokens are transferred to the user. Matic POS client exposes ***exitERC721*** method to make this call.

```jsx
await maticPOSClient.exitERC721(burnTxHash, { from })
```
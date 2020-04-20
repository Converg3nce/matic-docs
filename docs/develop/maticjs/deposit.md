---
id: deposit
title: Deposit (Ethereum→Matic)
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Depositing Funds from Ropsten to Matic

### ERC20
**Deposit for ERC20 is a 2 step process**

1. The tokens need to be first approved to the Matic rootchain contract on Ethereum.
2. Once approved, the deposit function is to be invoked where the tokens get deposited to the Matic contract, and are available for use in the Matic network.

```js
const amount = "1000000000000000000"; // amount in wei
const token = Ropsten_Erc20Address;
  // const amount = config.value
  init();
  matic
    .approveERC20TokensForDeposit(token, amount, {
  from
  })
  .then(logs => console.log(logs.transactionHash))
    .then(() => {
      matic.depositERC20ForUser(token, from, amount, {
  from
  })
  .then(logs => console.log(logs.transactionHash));
})
```
`amount` is the amount that is to be deposited. Amount is mentioned in `wei` . To those new to the field, `1 TEST` token is equivalent to 10¹⁸ `wei` . In the code snippet, `0.01 TEST` = 10¹⁶ `wei`.

### ERC721
**Deposit for ERC721 is a 1 step process**

1. The deposit function is to be invoked where the tokens get deposited to the Matic contract, and are available for use in the Matic network. 

```js
const token = Ropsten_Erc721Address;
// const tokenId = config.value
const tokenId = "746"; // ERC721 token Id
init();
// Deposit ERC721 into Matic chain
matic.safeDepositERC721Tokens(token, tokenId, {
  from
})
.then(logs => console.log(logs.transactionHash));
```
Here, instead of `amount` we mention the `tokenId` to be deposited.

### Ether
**Deposit for Ether is a 1 step process**

1. The deposit function is to be invoked where the tokens get deposited to the Matic contract, and are available for use in the Matic network. 

```js
// const amount = config.value
const amount = "1000000000000000000"; // amount in wei
// Deposit Ether into Matic chain
init();
matic.depositEther(amount, {
  from
})
.then(logs => console.log(logs.transactionHash));
```

## Expected Flow

For reference purposes, the screenshots below will provide context during the actual deposit.

We currently have `100 TEST` tokens and `9` ETH at our address `0x1a06816065731fcBD7296f9B2400d632816b070B` on Ropsten Network,

<img src={useBaseUrl("img/maticjs/before-deposit-balance-ropsten.png")} />

while on Matic Network we have `0 TEST` tokens.

<img src={useBaseUrl("img/maticjs/before-deposit-balance-matic.png")} />

We will be depositing `1 TEST` tokens to Matic Testnet.

Let’s run the Deposit function. To run use:

`$ node deposit-ERC20.js`

or `$ node deposit-ERC721.js`

We have added console logging for both events, which when run successfully will display the Transaction Hash as well as a message `“Deposit Tokens from Ropsten/Ethereum to Matic — Transaction Approved.”.` Once deposit is complete, you will see the Transaction Hash and message `”Tokens deposited from Ropsten/Ethereum to Matic.”` Since this is only for illustration purposes, the message can be customized to anything of your choice. By default it will only display the Transaction Hash.

<img src={useBaseUrl("img/maticjs/run-deposit-erc20.png")} />
<img src={useBaseUrl("img/maticjs/run-deposit-erc20.png")} />

Let’s verify our account balances on Metamask.

Our Balance on Ropsten now shows `99 TEST` which means our Deposit transaction of `1 TEST` was successful.

<img src={useBaseUrl("img/maticjs/after-deposit-balance-update-ropsten.png")} />

Verifying our balance on Matic Testnet also shows that our balance is increased by `1 TEST`.

<img src={useBaseUrl("img/maticjs/after-deposit-balance-update-matic.png")} />

Congratulations! You have successfully deposited funds from Ropsten to Matic.

In order to ensure you have more funds, deposit `1 TEST` token to Matic by repeating the above process. Make sure you change the `amount` value in the above script.

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


### ERC20
**Deposit for ERC20 is a 2 step process**

1. The tokens need to be first approved to the Matic rootchain contract on Ethereum.
2. Once approved, the deposit function is to be invoked where the tokens get deposited to the Matic contract, and are available for use in the Matic network.

```js
const token = config.GOERLI_ERC20 // ERC20 token address
const amount = '1000000000000000000' // amount in wei

async function execute() {
    await matic.initialize()
    matic.setWallet(config.PRIVATE_KEY)
    // Approve Deposit Manager contract to transfer tokens
    await matic.approveERC20TokensForDeposit(token, amount, { from, gasPrice: '10000000000' })
    // Deposit tokens
    return matic.depositERC20ForUser(token, from, amount, { from, gasPrice: '10000000000' })
}
```
`amount` is the amount that is to be deposited. Amount is mentioned in `wei` . To those new to the field, `1 TEST` token is equivalent to 10¹⁸ 

### ERC721
**Deposit for ERC721 is a 1 step process**

1. The deposit function is to be invoked where the tokens get deposited to the Matic contract, and are available for use in the Matic network. 

```js
const token = config.GOERLI_ERC721 // ERC721 token address
const tokenId = '1' // ERC721 token ID

async function execute() {
    await matic.initialize()
    matic.setWallet(config.PRIVATE_KEY)
    // Depsoit NFT Token
    let response = await matic.safeDepositERC721Tokens(token,tokenId,{ from, gasPrice: '10000000000' })
    return response;
}
```
Here, instead of `amount` we mention the `tokenId` to be deposited.

### Ether
**Deposit for Ether is a 1 step process**

1. The deposit function is to be invoked where the tokens get deposited to the Matic contract, and are available for use in the Matic network. 

```js
const amount = '10000000000000000' // amount in wei

async function execute() {
    await matic.initialize()
    matic.setWallet(config.PRIVATE_KEY)
    // Deposit ether
    let response = await matic.depositEther(amount,{ from, gasPrice: '10000000000' })
    return response;
}
```

## Expected Flow

For reference purposes, the screenshots below will provide context during the actual deposit.

We currently have `100 TEST` tokens and `0.1` ETH at our address `0x28e9E72DbF7ADee19B5279C23E40a1b0b35C2B90` on Görli Network,

<img src={useBaseUrl("img/maticjs/before-deposit-balance-goerli.png")} />

while on Matic Network we have `0 TEST` tokens.

<img src={useBaseUrl("img/maticjs/before-deposit-balance-mumbai.png")} />

We will be depositing `1 TEST` tokens to Matic Testnet.

Let’s run the Deposit function. To run use:

`$ node deposit-ERC20.js`

or `$ node deposit-ERC721.js`

Now, let’s verify our account balances on Metamask.

Our Balance on Görli now shows `99 TEST` which means our Deposit transaction of `1 TEST` was successful.

<img src={useBaseUrl("img/maticjs/after-deposit-balance-update-goerli.png")} />

Verifying our balance on Matic Testnet also shows that our balance is increased by `1 TEST`. It may take 1 to 5 minutes for your balance to get updated on Matic chain after the deposit is complete

<img src={useBaseUrl("img/maticjs/after-deposit-balance-update-matic.png")} />

Congratulations! You have successfully deposited funds from Görli to Matic.

In order to ensure you have more funds, deposit `1 TEST` token to Matic by repeating the above process. Make sure you change the `amount` value in the above script.

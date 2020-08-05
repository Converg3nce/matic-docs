---
id: transfer
title: Transfer (Matic↔Matic)
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';


Once you have funds on Matic, you can use those funds to send to others instantly.
> `recipient` is the receiver’s address, to whom the funds are supposed to be sent.

### ERC20/ETH


### ERC721
```js
const recipient = '0x28e9E72DbF7ADee19B5279C23E40a1b0b35C2B90'
const token = config.MUMBAI_ERC721 // test token address
const tokenId = '1' // NFT token Id

matic.initialize().then(() => {
    matic.setWallet(config.PRIVATE_KEY)
    // Transfer ERC721 Tokens
    matic.transferERC721Tokens(token, recipient, tokenId, {
        from,
    }).then((res) => {
        console.log("hash", res.transactionHash)
    })
})
```

> **Sidenote** — you can change the `parent` parameter to TRUE if you are using Matic.js to transfer funds on the main Ethereum network.

## Expected Flow

We will be making 2 different transfers worth `1 TEST` and `0.100 TEST` tokens respectively.

The screenshots below will provide context during the actual transfer.

### **Transfer #1**

We will be transferring `1 TEST` from Account 1 to Account 2 on Matic Network.

Account 1–`0x1a06816065731fcBD7296f9B2400d632816b070B`. This account currently holds `11 TEST` tokens.

Account 2–`0xf66f409086647591e0c2f122C1945554b8e0e74F`. This account currently holds `0 TEST` tokens.

<img src={useBaseUrl("img/maticjs/account2-transfer1-balance.png")} />

Now we will run the transfer function. Run this on the terminal:

`$ node transfer-ERC20.js`

Let’s verify our balances on Metamask.

Our balance on account address — `0x1a06816065731fcBD7296f9B2400d632816b070B` is now updated to `10 TEST` tokens.

<img src={useBaseUrl("img/maticjs/account1-transfer1-update.png")} />

And to confirm that on our receiver’s account, our balance is now updated to `1 TEST` tokens.

<img src={useBaseUrl("img/maticjs/account2-transfer1-update.png")} />

You can also check the transaction on the Matic Explorer by searching the transaction hash.

Link to the explorer - https://mumbai-explorer.matic.today/


### **Transfer #2**

In this transaction we will attempt to transfer `0.100 TEST` from Account 1 to Account 3.

From — `0x1a06816065731fcBD7296f9B2400d632816b070B`

To — `0xbFF81BA6Fa6593F0467592ACcF770A120f740552`. Account 3 currently has `0 TEST` tokens.

<img src={useBaseUrl("img/maticjs/account3-transfer2-balance.png")} />

We will again run `$ node transfer-ERC20.js` from the terminal. 

Balance on Account 1 now shows a balance of `9.900TEST`,

<img src={useBaseUrl("img/maticjs/account1-transfer2-update.png")} />

whereas the balance on Account 3 shows us `0.100 TEST`.

<img src={useBaseUrl("img/maticjs/account3-transfer2-update.png")} />
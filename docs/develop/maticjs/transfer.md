---
id: transfer
title: Transfer (Matic↔Matic)
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Transferring funds within Matic

Once you have funds on Matic, you can use those funds to send to others instantly.
> `recipient` is the receiver’s address, to whom the funds are supposed to be sent.

### ERC20/ETH
Now, depending upon your asset, add the following code:

```js
// const token = Matic_Erc20Address;   // For ERC20
// const token = Matic_WEthAddress;    // For ETH
const recipient = "<enter the recipient address>" // to address
// const amount = config.value
const amount = "1000000000000000000"; // amount in wei
init();
// Send Tokens
matic.transferERC20Tokens(token, recipient, amount, {
  from
})
.then(logs => console.log(logs.transactionHash));
```

### ERC721
```js
const token = Matic_Erc721Address;
const recipient = "<enter the recipient address>" // to address
// const amount = config.value
const tokenId = "746"; // ERC721 token Id
init();
// Send Tokens
matic.transferERC721Tokens(token, recipient, tokenId, {
  from
})
.then(logs => console.log(logs.transactionHash));
```

> **Sidenote** — you can change the `parent` parameter to TRUE if you are using Matic.js to transfer funds on the main Ethereum network.

We have added console logging on both events, which when run successfully will display `“Transfer done!”` to assure that the transaction was completed successfully. These messages are completely customized for this tutorial, by default only the Transaction Hash will be displayed.

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

<img src={useBaseUrl("img/maticjs/run-transfer-erc20-1.png")} />

Once the code has run successfully, it will display a message of `"Transfer done!"`

Let’s verify our balances on Metamask.

Our balance on account address — `0x1a06816065731fcBD7296f9B2400d632816b070B` is now updated to `10 TEST` tokens.

<img src={useBaseUrl("img/maticjs/account1-transfer1-update.png")} />

And to confirm that on our receiver’s account, our balance is now updated to `1 TEST` tokens.

<img src={useBaseUrl("img/maticjs/account2-transfer1-update.png")} />

You can also check the transaction on the Matic Explorer by searching the transaction hash.

Link to the explorer - https://explorer.testnet2.matic.network/


### **Transfer #2**

In this transaction we will attempt to transfer `0.100 TEST` from Account 1 to Account 3.

From — `0x1a06816065731fcBD7296f9B2400d632816b070B`

To — `0xbFF81BA6Fa6593F0467592ACcF770A120f740552`. Account 3 currently has `0 TEST` tokens.

<img src={useBaseUrl("img/maticjs/account3-transfer2-balance.png")} />

We will again run `$ node transfer-ERC20.js` from the terminal. Once we get the `‘Transfer done!’` message, we will check our balances.

<img src={useBaseUrl("img/maticjs/run-transfer-erc20-2.png")} />

Balance on Account 1 now shows a balance of `9.900TEST`,

<img src={useBaseUrl("img/maticjs/account1-transfer2-update.png")} />

whereas the balance on Account 3 shows us `0.100 TEST`.

<img src={useBaseUrl("img/maticjs/account3-transfer2-update.png")} />
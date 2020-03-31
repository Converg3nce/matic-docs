---
id: withdraw
title: Withdraw (Matic→Ethereum)
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Withdraw funds from Matic
Funds that are available on Matic chain can be withdrawn back to the Ethereum Network.

In Matic, withdrawing is a 3 step process where:

1. Withdrawal of funds is initiated from Matic Network. A checkpoint interval of 5 mins is set, where all the blocks on the Matic block layer are validated since the last checkpoint.
2. Once the checkpoint is submitted to the mainchain Ethereum contract, an NFT Exit (ERC721) token is created of equivalent value. Users need to wait for a 7 day challenge period (For testnets wait for ~5 minutes for)
3. Once the challenge period is complete, the withdrawn funds can be claimed back to your Ethereum acccount from the mainchain contract using a process-exit procedure.

For now, just go with the fact that the challenge period for withdrawals is an important part of the Plasma framework to ensure security of your transactions. Later, once you get to know the system better, the reason for the 7-day withdrawal window will become clear to you.

Just for reference, there will be an active exit market, which will allow trading of exit tokens (ERC721), thereby leading to faster withdrawals — but that is an article for another day.

**To keep the withdrawal process easier for now on the Matic Testnet, we have not enforced the 7-day withdrawal process**. This means while going through this tutorial and developing apps on the testnet, for now, you will get the withdrawn funds immediately after you initiate the `process-exit` procedure.

## Initiate Withdraw

### ERC20/ETH
Now, depending upon your asset, add the following code:

```js
  // const token = Matic_WEthAddress;     // For ETH
  // const token = Matic_Erc20Address;    // For ERC20
  // const amount = config.value
const amount = "10000000000000000"; // amount in wei
init();
// Send Tokens
matic
.startWithdraw(token, amount, {
   from
})
.then(logs => console.log(logs.transactionHash));
```

### ERC721
```js
const token = Matic_Erc721Address
// const tokenId = config.value
const tokenId = '1' // ERC721 token Id
init();
// Send Tokens
matic
.startWithdrawForNFT(token, tokenId, {
   from
})
.then(logs => console.log(logs.transactionHash));
```
> NOTE: Wait for next checkpoint, which will take approximately 5-10 mins. Save the transaction hash which will be the input for the withdraw.

## Confirm Withdraw

### ERC20/ETH
```js
init();
// await checkInclusion();
var transactionHash = 'Paste txHash here ...' // Insert txHash generated from initiate-withdraw.js 

//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
matic
.withdraw(transactionHash, {
   from
})
.then(logs => console.log(logs.transactionHash));
// action on Transaction success
// Withdraw process is completed, funds will be transfer to your account after challege period is over.
```
### ERC721
```js
init();
// await checkInclusion();
var transactionHash = 'Paste txHash here ...' // Insert txHash generated from initiate-withdraw.js 

//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
matic.withdrawNFT(transactionHash, {
   from
})
.then(logs => console.log(logs.transactionHash));
// action on Transaction success
// Withdraw process is completed, funds will be transfer to your account after challege period is over.
```

## Process Exit

The code for confirm withdraw remains common for ERC20 AND ERC721 tokens except for the value of `token`

```js
init();
// const token = Ropsten_Erc20Address                 // For ERC20 Token
// const token = Ropsten_Erc721Address                // For ERC721 Token
// const token = Ropsten_WEthAddress                  // For ETH
const token = Ropsten_WEthAddress;
matic.processExits(token,  {
   from
})
.then(logs => console.log(logs.transactionHash));
```

_Note: A checkpoint, which is a representation of all transactions happening on the Matic Network to the Ethereum chain every ~5 minutes, is submitted to the mainchain Ethereum contract._

## Expected Flow

We will now initiate the Withdraw process.

We currently have `9.900 TEST` tokens at our address on Matic — `0x1a06816065731fcBD7296f9B2400d632816b070B`

We will withdraw `1 TEST` from the Matic Account.

To initiate the withdraw we will run `$ node initiate-withdraw-ERC20.js`.

Once this process is initiated, you will receive the transaction hash. The transaction hash will be used as input to run the next step i.e. confirm withdraw process.

I’ll add the transaction hash to the code — `0x1b12ae634c7538adfcbddd5028ea47aa97fd8d07c0e3aeffd0caa2fff80cc365`. Note that in your case, this transaction hash will be different.

Once the initiate process is complete, we will **wait for ~5 minutes**, before running the second script `$ node confirm-withdraw.js`.

<img src={useBaseUrl("img/maticjs/run-confirm-withdraw-erc20.png")} />

To verify, we will also check the account balances on Metamask.

The balance on Account 1 on Matic Network now shows `8.900 TEST` Tokens.

<img src={useBaseUrl("img/maticjs/confirm-withdraw-balance-update.png")} />

Now, in order to claim your funds after the challenge period is complete, you will need to run the `process-exit-ERC20.js`

So let's run `$ process-exit-ERC20.js`

<img src={useBaseUrl("img/maticjs/run-process-exit-ERC20.png")} />

Once this is complete, you will see the funds in your Ropsten account.

So that’s it folks! You have withdrawn your funds successfuly and gotten to the end of this tutorial :)

Hope you have understood now that interacting with the Matic Network is quite easy. We will dive deeper and explore advanced interactions with Matic in later posts.

Similarly, as an exercise you can Deposit, transfer and withdraw ERC721 and Ether using Matic.js following the same steps as above.

Feel free to reach out to us at https://forum.matic.network/ in case you face any issues.

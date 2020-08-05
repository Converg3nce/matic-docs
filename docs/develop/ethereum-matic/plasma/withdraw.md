---
id: withdraw
title: Withdraw (Matic→Ethereum)
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Funds that are available on Matic chain can be withdrawn back to the Ethereum Network.

In Matic, withdrawing is a 3 step process where:

1. Withdrawal of funds is initiated from Matic Network. A checkpoint interval of 5 mins is set, where all the blocks on the Matic block layer are validated since the last checkpoint.
2. Once the checkpoint is submitted to the mainchain Ethereum contract, an NFT Exit (ERC721) token is created of equivalent value. Users need to wait for a 7 day challenge period (For testnets wait for ~5 minutes for)
3. Once the challenge period is complete, the withdrawn funds can be claimed back to your Ethereum acccount from the mainchain contract using a process-exit procedure.

For now, just go with the fact that the challenge period for withdrawals is an important part of the Plasma framework to ensure security of your transactions. Later, once you get to know the system better, the reason for the 7-day withdrawal window will become clear to you.

Just for reference, there will be an active exit market, which will allow trading of exit tokens (ERC721), thereby leading to faster withdrawals — but that is an article for another day.

**To keep the withdrawal process easier for now on the Matic Testnet, we have not enforced the 7-day withdrawal process**. This means while going through this tutorial and developing apps on the testnet, for now, you will get the withdrawn funds immediately after you initiate the `process-exit` procedure.

## Initiate Withdraw

### ERC721
```js
const token = config.MUMBAI_ERC721 // test token address
const tokenId = '2'

matic.initialize().then(() => {
    matic.setWallet(config.PRIVATE_KEY)
    // Initiate withdraw from matic/ Burn NFT on Matic
    matic.startWithdrawForNFT(token, tokenId, {
            from,
        }).then((res) => {
            console.log(res.transactionHash) // eslint-disable-line
        })
})
```
> NOTE: Wait for next checkpoint, which will take approximately 5-10 mins. Save the transaction hash which will be the input for next step which is the confirm withdraw step.

## Confirm Withdraw

### ERC721
```js
//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
var transactionHash = '0x6d391453fb02ce833c4444a8599813069e1d75258397171068cda95f6d624eb4'

matic.initialize().then(() => {
    matic.setWallet(config.PRIVATE_KEY)
    // Submit proof of burn on Goerli
    matic.withdrawNFT(transactionHash, {
        from,
    }).then((res) => {
        console.log(res.transactionHash) // eslint-disable-line
    })
})
// Withdraw process is completed, funds will be transfered to your account after challege period is over. 
```

## Process Exit

The code for process exit remains common for ERC20 and ERC721 tokens except for the value of `token`

```js
// const token = GOERLI_ERC20                 // For ERC20 Token
// const token = GOERLI_ERC721                // For ERC721 Token
// const token = GOERLI_WETH                  // For ETH
const rootTokenAddress = config.GOERLI_ERC20  // Root token address

matic.initialize().then(() => {
    matic.setWallet(config.PRIVATE_KEY)
    // Get back tokens to ethereum account after 7 day challenge period
    matic.processExits(rootTokenAddress, {
        from,
    }).then((res) => {
        console.log(res.transactionHash) // eslint-disable-line
    })
})
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

To verify, we will also check the account balances on Metamask.

The balance on Account 1 on Matic Network now shows `8.900 TEST` Tokens.

<img src={useBaseUrl("img/maticjs/confirm-withdraw-balance-update.png")} />

Now, in order to claim your funds after the challenge period is complete, you will need to run the `process-exit-ERC20.js`

So let's run `$ process-exit-ERC20.js`

Once this is complete, you will see the funds in your Görli account.

So that’s it folks! You have withdrawn your funds successfuly and gotten to the end of this tutorial :). The example code for performing deposit,transfer and withdraw of tokens from ethereum to matic can be found in this [github repository](https://github.com/rahuldamodar94/learnmatic.git)

Hope you have understood now that interacting with the Matic Network is quite easy. We will dive deeper and explore advanced interactions with Matic in later posts.

Similarly, as an exercise you can Deposit, transfer and withdraw ERC721 and Ether using Matic.js following the same steps as above.

Feel free to reach out to us at https://forum.matic.network/ in case you face any issues.

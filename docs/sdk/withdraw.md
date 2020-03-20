---
id: withdraw
title: Withdraw (Matic→Ethereum)
---
# Withdraw funds from Matic

Funds that are available on Matic chain can be withdrawn back to the Ethereum Network.

In Matic, withdrawing is a 3 step process where:

1. Withdrawal of funds is initiated from Matic Network. A checkpoint interval of 5 mins is set, where all the blocks on the Matic block layer are validated since the last checkpoint.
2. Once the checkpoint is submitted to the mainchain Ethereum contract, an NFT Exit (ERC721) token is created of equivalent value. Users need to wait for a 7 day challenge period
3. Once the challenge period is complete, the withdrawn funds can be claimed back to your Ethereum acccount from the mainchain contract using a process-exit procedure.

For now, just go with the fact that the challenge period for withdrawals is an important part of the Plasma framework to ensure security of your transactions. Later, once you get to know the system better, the reason for the 7-day withdrawal window will become clear to you.

Just for reference, there will be an active exit market, which will allow trading of exit tokens (ERC721), thereby leading to faster withdrawals — but that is an article for another day.

**To keep the withdrawal process easier for now on the Matic Testnet, we have not enforced the 7-day withdrawal process**. This means while going through this tutorial and developing apps on the testnet, for now, you will get the withdrawn funds immediately after you initiate the `process-exit` procedure.

Create 3 new files and name them `initiate-withdraw-ERC20.js`, `confirm-withdraw-ERC20.js`,  and `process-exit-ERC20.js`
(Or, replace ERC20 with ERC721 in case you're using NFTs)

## Initiate Withdraw


```js
const Network = require("@maticnetwork/meta/network")
const Matic = require("@maticnetwork/maticjs").default
const config = require('../config.json')

const network = new Network(config.network, config.version)
const MaticNetwork = network.Matic 
const MainNetwork = network.Main 

const Ropsten_Erc20Address = config.Ropsten_Erc20Address
const Matic_Erc20Address = config.Matic_Erc20Address

const Ropsten_Erc721Address = config.Ropsten_Erc721Address
const Matic_Erc721Address = config.Matic_Erc721Address

const from = config.from // from address

const matic = new Matic({
    maticProvider: MaticNetwork.RPC,
    parentProvider: MainNetwork.RPC,
    rootChain: MainNetwork.Contracts.RootChain,
    withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
    depositManager: MainNetwork.Contracts.DepositManagerProxy,
    registry: MainNetwork.Contracts.Registry
})
```
The above setup code remains the same for ERC20/ERC721

Now, depending upon your asset, add the following code:

### ERC20

```js
const token = Matic_Erc20Address
// const amount = config.value
const amount = '1000000000000000000' // amount in wei
// NOTE: Initiate the withdraw on the Matic chain, and wait for ~5 minutes for 
// the checkpoint (refer https://whitepaper.matic.network/#checklayer for technical details) 
// before confirming the withdraw by executing `confirm-withdraw.js`.
// The txHash from the output needs to be copied to the `confirm-withdraw.js` file before executing
matic
 .startWithdraw(token, amount, {
   from,
   onTransactionHash: (hash) => {
    //  console.log("Withdraw Initiated")
    console.log(hash) // eslint-disable-line
   },
})
```

### ERC721

```js
const token = Matic_Erc721Address
// const tokenId = config.value
const tokenId = '1' // ERC721 token Id
matic
  .startERC721Withdraw(token, tokenId, {
    from,
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash) // eslint-disable-line
    },
  })

// NOTE: Wait for next checkpoint, which will take approximately 5-10 mins. 
// Then you can call complete-withdraw.js to submit proof.
```

## Confirm Withdraw

The code for confirm withdraw remains common for ERC20 AND ERC721 tokens

```js
const Network = require("@maticnetwork/meta/network")
const Matic = require("@maticnetwork/maticjs").default
const config = require('../config.json')

const network = new Network(config.network, config.version)
const MaticNetwork = network.Matic 
const MainNetwork = network.Main 

const Ropsten_Erc20Address = config.Ropsten_Erc20Address
const Matic_Erc20Address = config.Matic_Erc20Address

const Ropsten_Erc721Address = config.Ropsten_Erc721Address
const Matic_Erc721Address = config.Matic_Erc721Address

const from = config.from // from address

const matic = new Matic({
    maticProvider: MaticNetwork.RPC,
    parentProvider: MainNetwork.RPC,
    rootChain: MainNetwork.Contracts.RootChain,
    withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
    depositManager: MainNetwork.Contracts.DepositManagerProxy,
    registry: MainNetwork.Contracts.Registry

var transactionHash = 'Paste txHash here ...' // Insert txHash generated from initiate-withdraw.js 

//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
matic.withdraw(transactionHash, {
   from,
   onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash) // eslint-disable-line
      // Withdraw process is completed, funds will be transfer to your account after challege period is over.
   },
})
```

## Process Exit

The code for confirm withdraw remains common for ERC20 AND ERC721 tokens except for the value of `token`

```js
const Network = require("@maticnetwork/meta/network")
const Matic = require("@maticnetwork/maticjs").default
const config = require('../config.json')

const network = new Network(config.network, config.version)
const MaticNetwork = network.Matic 
const MainNetwork = network.Main 

const Ropsten_Erc20Address = config.Ropsten_Erc20Address
const Matic_Erc20Address = config.Matic_Erc20Address

const Ropsten_Erc721Address = config.Ropsten_Erc721Address
const Matic_Erc721Address = config.Matic_Erc721Address

const from = config.from // from address

const matic = new Matic({
    maticProvider: MaticNetwork.RPC,
    parentProvider: MainNetwork.RPC,
    rootChain: MainNetwork.Contracts.RootChain,
    withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
    depositManager: MainNetwork.Contracts.DepositManagerProxy,
    registry: MainNetwork.Contracts.Registry

// For ERC20 Token
// const token = Ropsten_ERC20Address

// For ERC721 Token
// const token = Ropsten_ERC721Address

// NOTE: Wait for NFT Challenge period to be complete
matic.processExits(token, {
   from,
   onTransactionHash: (hash) => {
      // action on Transaction success
      // DEVNOTE: on sucessfull processExits funds will be transfered to your mainchain account
      console.log(hash) // eslint-disable-line
   },
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

Once the initiate process is complete, we will wait for ~5 minutes, before running the second script `$ node confirm-withdraw.js`.

![Arch](../../img/maticjs/run-confirm-withdraw-erc20.png)

To verify, we will also check the account balances on Metamask.

The balance on Account 1 on Matic Network now shows `8.900 TEST` Tokens.

![Arch](../../img/maticjs/confirm-withdraw-balance-update.png)

Now, in order to claim your funds after the challenge period is complete, you will need to run the `process-exit-ERC20.js`

So let's run `$ process-exit-ERC20.js`

![Arch](../../img/maticjs/run-process-exit-ERC20.png)

Once this is complete, you will see the funds in your Ropsten account.

So that’s it folks! You have withdrawn your funds successfuly and gotten to the end of this tutorial :)

Hope you have understood now that interacting with the Matic Network is quite easy. We will dive deeper and explore advanced interactions with Matic in later posts.

Similarly, as an exercise you can Deposit, transfer and withdraw ERC721 and Ether using Matic.js following the same steps as above.

Feel free to reach out to us at https://stack.matic.network/ in case you face any issues.

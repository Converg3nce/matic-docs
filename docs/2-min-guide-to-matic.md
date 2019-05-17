# 2-min guide to get started on Matic

Block time on the Matic testnet is ~1s.

### Deploy smart contracts

* If you are already developing contracts on Ethereum, just configure the Web3 Provider URL to https://testnet2.matic.network
* Everything else remains the same
* Matic Mainnet will have PoS security, with greater Plasma guarantees being added


### Bring Ropsten assets (ERC20/ERC721) to the Matic testnet using Plasma

* To get TEST tokens on Ropsten you can access the Matic Faucet: https://wallet.matic.today/faucet

```js
Ropsten TEST token contract address - 0x6b0b0e265321e788af11b6f1235012ae7b5a6808
```

* Use matic.js (https://github.com/maticnetwork/matic.js) to interact with the Matic Plasma contracts. Go to https://docs.matic.network/matic-js-tutorial/ for a walkthrough of matic.js.

The flow for this would be:

* Deposit assets from Ropsten to Matic
* Fast transfers on the Matic Plasma sidechain
* Withdraw from Matic to Ropsten

![Arch](/images/matic-workflow-theme.jpg)

* Take a look at the examples here - https://github.com/maticnetwork/matic.js/tree/master/examples - to get started



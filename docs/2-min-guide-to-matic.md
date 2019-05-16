# 2-min guide to get started on Matic

Block time on the Matic testnet is ~1s.

### Deploy smart contracts

* If you are already developing contracts on Ethereum, just configure the Web3 Provider URL to https://testnet2.matic.network
* Everything else remains the same
* Matic Mainnet will have PoS security, with greater Plasma guarantees being added

### Matic Faucet

To get some TEST tokens on Matic Network, you can access the Matic Faucet: https://wallet.matic.today/faucet

All you would need to do is follow simple steps on the link above and you will get some funds into your account:

* Go to the link and enter your address
* Copy the tweet content and tweet it
* Now, paste the Tweet Id in the last field and click on 'Get Test Matic'


### Bring Ropsten assets (ERC20/ERC721) to the Matic testnet using Plasma

* Use matic.js (https://github.com/maticnetwork/matic.js) to interact with the Matic Plasma contracts

The flow for this would be:

* Deposit assets from Ropsten to Matic
* Fast transfers on the Matic Plasma sidechain
* Withdraw from Matic to Ropsten

![Arch](/images/matic-workflow-theme.jpg)

* Take a look at the examples here - https://github.com/maticnetwork/matic.js/tree/master/examples - to get started



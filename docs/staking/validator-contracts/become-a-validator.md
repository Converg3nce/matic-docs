
Responsibilities of a validator include sending periodic checkpoints to on-chain contract using heimdall and bor. To become a validator on matic network you need to stake your `MATIC` tokens on a contract called `stakeManager` which is deployed on base-chain aka the Ethereum chain.

#### Time to stake! 

Proceed further only if you have deployed contracts, if not go [here](https://docs.matic.network/staking/validator-contracts/deploying-contracts). We will soon have a staking  UI, till we reach there let's use some sweet nodejs. 

#### Step-1: Get your private key or MNEMONIC and your validator account

```js

$ heimdalld show-account

```

#### Step-2: Update the scripts/stake.js from Contracts repo

Do the following to stake. 

```js

// (Optional) Export mnemonic or the private key (without the 0x prefix)
// This account needs to have test token
export MNEMONIC="<your private key without 0x prefix>"

// (Optional) Infura PROJECT ID, if required
export API_KEY=<PROJECT_ID>

npm run truffle exec scripts/stake.js -- --network <base_chain_network_name> <validator_account> <# tokens to stake>
//e.g. npm run truffle exec scripts/stake.js -- --network development 0xE0938d9fd679bB6B83bf31fA62c433646B9F749e 10

```


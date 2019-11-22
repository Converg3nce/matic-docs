Responsibilities of a validator include sending periodic checkpoints to on-chain contract using heimdall and bor. To become a validator on matic network you need to stake your MATIC tokens on a contract called stakeManager which is deployed on base-chain aka the ethereum chain.

#### Time to stake! 

Proceed further only if you have deployed contracts, if not go [here](https://docs.matic.network/staking/validator-contracts/deploying-contracts). We will soon have a staking  UI, till we reach there let's use some sweet sweet nodejs. 

##### Step-1: Update MNEMONIC 

Update the MNEMONIC in `truffle-config.json` file present in the master branch of 

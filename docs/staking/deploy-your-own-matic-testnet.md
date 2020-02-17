---
id: tutorial-oracles
title: Getting Started with Oracles
sidebar_label: Oracles
---

Step by step instructions on how to create a single and multiple (soon to be added) validator testnet.

### Creating a single validator testnet

Running a testnet with a single validator is recommended if you want to understand in more detail how the system works. For ease of setup we have a package of configurations setup already. 

<!-- #CHECK steps numbers -->
### Step 1: Installing Heimdall and Bor
Before we start with the steps make sure you have either installed `heimdall` and `bor` [binaries](../running-with-binaries) (make sure to follow only the installation steps numbered 1 to 6) or have the [docker image](../running-with-docker) (only steps 1 to 3) running.

### Step 2: Verify commit ids

```js

$ git clone https://github.com/maticnetwork/public-testnets

```

Check that your `heimdall` and `bor` commit ids match the ones given in `borversion.txt` and `heimdallversion.txt`.

### Step 3: Deploy root contracts

```js

// (optional) If you are runnng testrpc to simulate base chain, run the below command to add your validator to testrpc instance
$ export MNEMONIC="257bc7bbb735c3cb39d0b809f9d95dc5e5385ba7444f0459d231cfd1f1f954ff"

```

**Why do I need to deploy contracts?**

For running a private testnet or single validator version of `Matic` we need to deploy plasma contracts. 

We need to deploy our set of contracts on 2 chains:

* `Base Chain`: Ideally a higher security EVM chain which can be used for dispute resolution. For testing ganache or any other EVM chain should work.

* `Child Chain`: EVM compatible chain to work as our side-chain. For testing note that using `ganache` for child-chain is not recommended, instead running `npm run simuate-bor` would be better.

> However, for connecting to a public testnet you just need to fetch the addresses from the `public-testnets` repo.

#### 3.1 Installing NodeJS

To move further we need to install nodejs which is an open-source runtime javascript execution environment using `nvm` like explained [here](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/).

#### 3.2 Installing Truffle

To deploy contracts you need to install truffle like explained [here](https://www.npmjs.com/package/truffle).

#### 3.3 Clone the contracts repo

```js
$ git clone https://github.com/maticnetwork/contracts
$ cd contracts

```

#### 3.4 Install dependencies

```js
$ npm i

```

#### 3.5: Deploy root contracts on base chain 

```js
$ export HEIMDALL_ID="<your heimdall ID>"

// From the contracts repo, do the following
$ npm run truffle:compile

$ mv migrations dev-migrations && cp -r deploy-migrations migrations

```

* Root contracts are deployed on the base chain. 

* Base chain can be your own ganache or testnets like rinkeby, ropsten.

* If you're running it locally, `npm run testrpc` will bring a local test blockchain up to function as basechain.

* Modify `truffle-config.js` to configure base chain. 

```js

$ npm run truffle:migrate -- --reset --network <base_chain_network_name> --to 3

```

### Step 4: Deploy Heimdall

```js

// Run the following from your public-testnets repo.
$ cp -r heimdall-config/* ~/.heimdalld

```
> NOTE: Contract addresses will be written to a `contractAddresses.json` file

Update the file `~/.heimdalld/config/heimdall-config.toml` with the root contract addresses and RPC links. Also update the file `~/.heimdalld/config/genesis.json` with the correct heimdall `chain_id`. 

<!-- #CHECK run heimdall commands -->
> You can start heimdall and other associated services now using the steps mentioned below! 

**Run Heimdall**

Starting Heimdall is fairly easy, the below command will start heimdall using the genesis file in `~/.heimdalld/config/genesis.json`.

```js

$ heimdalld start

```

**Run rest-server**

The rest-server can be used by external services like explorer, faucets etc to connect to heimdall chain for fetching data and sending transactions.

```js

$ heimdalld rest-server

```

**Run Bridge**

Bridge is a helper package that sends transactions to heimdall on behalf of validators. All interactions with other chains happens via this bridge.

> NOTE: Skip this part of the step for Stage 0 as this is needed only when you stake to participate in validation and need to send transactions.

```js

$ bridge start --all

```

> Note: Bridge won't run without `rabbitmq` and `rest-server` so ensure they are running before trying to run bridge.

**Reset Heimdall**

> NOTE: To be used only if you need to restart Heimdall and delete old data in the event of a crash or if there are changes in genesis files.

Use the following to delete blockchain data and reset everything.

```js

$ heimdalld unsafe-reset-all

```
<!-- #CHECK bor commands -->
#### Step 5: Deploy Bor  

```js

// Run the following from your public-testnets repo.
$ cd bor-config

```

This sample config package for bor contains the genesis file and keystore for a validator along with a script to start the node.

**Clean & Stop bor**

```js

$ bash clean.sh && bash stop.sh

```

**Start Bor**

```js

$ bash start.sh

```

> Node started! Logs are being written to to `logs/bor.log` check them out! 

#### Step 6: Deploy child contracts on Bor 

Contracts like ChildERC20Token are deployed on child chain aka BOR chain

**Modify truffle-config.js to configure bor chain**

``` js
/* 
 bor: {
      host: 'localhost',
      port: 8546,
      network_id: '*', // match any network
      skipDryRun: true,
      gas: 7000000
    }
 */
$ npm run truffle:migrate -- --reset --network <child_chain_network_name> -f 4 --to 4

```

#### Step 7: Link child and base chain contracts


Contracts deployed on BOR are mapped to the registry contract deployed on-chain.

```js
$ npm run truffle:migrate -- --network <base_chain_network_name> -f 5 --to 5

```

> NOTE: Check your ether balance on base chain before deploying contracts. Post successful deployment, contract addresses will be written to a `contractAddresses.json` file.

#### Step 8: Stake It!

Responsibilities of a validator include sending periodic checkpoints to on-chain contract using heimdall and bor. To become a validator on matic network you need to stake your `MATIC` tokens on a contract called `stakeManager` which is deployed on base-chain aka the Ethereum chain.

**Time to stake!**

Proceed further only if you have deployed child and base chain contracts. 

#### 8.1: Get your private key or MNEMONIC and your validator account

```js

$ heimdalld show-account

```

#### 8.2: Update the scripts/stake.js from Contracts repo

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

### Ta-Da!

If you did everything correctly you should be able to see blocks being created on both `Heimdall` and `Bor` nodes. Full plasma safety guaranteed! 

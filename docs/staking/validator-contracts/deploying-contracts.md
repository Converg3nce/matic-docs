Know how to deploy contracts on Ethereum (Parent) and Matic (Child chain)

### When do I need to deploy contracts?

For running a private testnet or single validator version of `Matic` we need to deploy plasma contracts. However for connecting to a public testnet you just need to fetch the addresses from the [public-testnets](https://github.com/maticnetwork/public-testnets/) repo.

### Installing NodeJS

To move further we need to install nodejs which is an open-source runtime javascript execution environment using `nvm` like explained [here](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/).

### Installing Truffle

To deploy contracts you need to install truffle like explained [here](https://www.npmjs.com/package/truffle).

### Clone the contracts repo

```js
git clone https://github.com/maticnetwork/contracts
cd contracts

```

### Install dependencies

```js
npm i

```

### Deploying contracts

We need to install 2 set of contracts, one on base chain and one on side-chain, the instructions to do that can be found [here](https://github.com/maticnetwork/contracts/tree/master/deploy-migrations).

We need to deploy our set of contracts on 2 chains:

* `Base Chain`: Ideally a higher security EVM chain which can be used for dispute resolution. For testing ganache or any other EVM chain should work.

* `Child Chain`: EVM compatible chain to work as our side-chain. For testing note that using `ganache` for child-chain is not recommended, instead running `npm run simuate-bor` would be better.

#### Step-1: Deploy root contracts on base chain 

* Do make sure that the dependencies are installed and that you have cloned the contracts repo as stated above in this document. 

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

Post successful deployment all contract addresses will be written to a `contractAddresses.json` file.



#### Step-2: Deploy contracts on BOR

```js
// Contracts like ChildERC20Token are deployed on child chain aka BOR chain

```

```js

// NOTE: You need to deploy or simulate BOR before running the below command
// modify truffle-config.js to configure bor chain
*/ 
 bor: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // match any network
      skipDryRun: true,
      gas: 7000000
    }
 /*
$ npm run truffle:migrate -- --reset --network <child_chain_network_name> -f 4 --to 4

```

#### Step-3: Link contracts on BOR with contracts on base chain

```js

// Contracts deployed on BOR are mapped to the registry contract deployed on-chain
npm run truffle:migrate -- --network <base_chain_network_name> -f 5 --to 5

```

Post successful deployment all contract addresses will be written to a `contractAddresses.json` file.

> Check your ether balance on base chain before deploying contracts.

### Almost Done! 

The `contractAddresses.json` file should be stored somewhere where you can read it again because we need to add contract addresses to `heimdall-config`


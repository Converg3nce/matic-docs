---
id: metatransactions-gsn
title: Gas Station Network
sidebar_label: Gas Station Network
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

In general, for interacting with Ethereum DApps users need to have enough Ether in their account, which requires them to go through lengthy KYC procedure; then buying Ether & start interacting - not a good UX. 

That's where GSN comes into picture with an interesting proposal for improving DApp UX, where gas less transactions can be sent to Ethereum network & user requests to be funded by some party other than user. Now clients without Ether in their account, can talk to Ethereum Blockchain & pay their fees using ERC20 tokens. Using GSN can also improve UX when onboarding new users to dApp.

<img src={useBaseUrl("img/gsn/paymaster_needs_gas.png")} />

## Components

GSN is a broad idea, which brings several components into picture, discussed below.

<img src={useBaseUrl("img/gsn/gsn_flow_full_layered.jpg")} />

### Client

Clients are dApp users, who will be signing a message, with all required fields & send it to a *relay server*, where gas fees to be paid for this transaction. So client doesn't initiate a transaction here, rather they'll ask relay server to do it for them.

### Relay Server

Relay servers will be accepting requests from clients & paying gas fees for them, while first checking with paymaster contract _( via relay hub )_ that if it relays this transaction does it get paid back or not ? 

It's always advisable to use dedicated relay server for your dApp & use third party relays when your relay is down. This provides better availability guarantee of service. Also for using third party relays, most probably you're going to pay an extra service charge.

### PayMaster

PayMaster contract has a full gas tank of Ether, in relayhub, which is to be used for paying gas fees of relayed transactions. PayMaster contract has full control of either accepting or rejecting any relayed transaction.

### Trusted Forwarder

Recipient contract accepts only those requests coming from a trusted forwarder, which will verify signature & account nonce, that can be directly processed in recipient contract.

### Recipient Contract

This is the GSN aware target contract, able to accept meta transactions, where actual client address can be retrieved from `_msgSender()`, instead of `msg.sender`, when it's inheriting from this simple [base class](https://github.com/opengsn/gsn/blob/master/contracts/BaseRelayRecipient.sol).

### Relay Hub

Relay Hub will trustlessly connect clients, relay servers & paymasters, so participants don't need to know about each other. It'll help clients discover good relayers; prevent third-party relays from censoring transactions; make sure relay server gets paid back by paymaster after transaction is completed etc.

## GSN-aware Contracts

GSN will help us in building great dApps where user won't need to pay for their transactions, which will improve UX. For writing GSN-aware contracts, we need to take care of following things.

### Recipient Contract

This is the contract that we want to make GSN-aware, for that we're simply going to inherit from [BaseRelayRecipeint](https://github.com/opengsn/gsn/blob/master/contracts/BaseRelayRecipient.sol), which adds one important method `_msgSender()`, to be used in all occurances of `msg.sender`. `_msgSender()` will take care of all lower level details for extracting actual client address, which will be different that `msg.sender` in case of meta transactions.

### PayMaster Contract

GSN relays are not serving free-of-cost, in order to cover their expenses, they will charge transaction fees in terms of FIAT or ERC20 tokens from paymaster contracts. We can inherit from [BasePaymaster](https://github.com/opengsn/gsn/blob/master/contracts/BasePaymaster.sol), and provide implementation of following methods for processing relayed calls. These methods to be invoked by relayhub _( only singleton instance of it for a certain network )_ before & after sending relayed calls to trusted forwarder.

#### `acceptRelayedCall`

RelayHub asks paymaster whether it's interested in accepting new request or not, if not it can revert in this method. It can implement business logic for only accepting requests from white listed users; calling specific onboarding function in target contract etc.

#### `preRelayedCall`

After a relayed call is accepted by paymaster, relay hub will call this function before calling target contract, where some book keeping can be done.

#### `postRelayedCall`

After target contract call has completed, this method to be called with accurate estimate of transaction cost, where user can be charged. It'll also let us know whether transaction was reverted or not, giving relayer an opportunity to not charge user for reverted calls. 

Above three methods give us opportunity for creating a fee model where users can be charged using ERC20 tokens. In `pre-` relayed call, we lock some token & in `post-` user actually gets charged, depending upon actual gas data.

### Trusted Forwarder

We can avoid auditing whole relay hub system, by putting an extra piece in image, which will verify client signature of relayed calls & address nonce. Verified calls get through & reach target contract method. 

This eventually reduces amount of checking target contract needs to do. In constructor of target contract, we need to put trusted forwarder. We can also set a list of trusted forwarders, if situation demands. We need to also make it sure, only owner gets to update this trusted forwarder address set.

## Example

Now we're going to write a meta transactions enabled dApp, to demonstrate how you can also integrate it in your application.

### Setup

#### Truffle Suite

We need one manage our smart contracts easily, so we're going to use `truffle`. Lets jump into console & install it.

```bash
npm i -g truffle # global installation will be helpful
```

#### Private Blockchain

We're going to use one private blockchain i.e. a simulated blockchain environment like ganache or you can also use geth/ parity in private mode.

So, lets go ahead and install GUI version of [ganache](https://www.trufflesuite.com/ganache). There's also one npm package `ganache-cli`. Consider using that if you're familiar with basic command line functionalities.

```bash
npm i -g ganache-cli # lets install it globally
```

#### GSN

We need another utility package `@opengsn/gsn`, for deploying all above defined components & also running a relay-server on local machine.

```bash
npm i -g @opengsn/gsn # this is also on global scope
```

### Project

As now we've installed all tools, we can move forward with creation of a project.

#### Init

Lets create directory for accomodating our project.

```bash
mkdir ~/meta-tx-gsn
cd ~/meta-tx-gsn # got inside directory
```

Create a truffle project.

```bash
truffle init
```

If you now check content of this directory, you'll see some new directories & files created for you, which are for making your dApp development journey lesser painful.

```bash
tree
.
├── [4.0K]  contracts
│   └── [ 378]  Migrations.sol
├── [4.0K]  migrations
│   └── [ 126]  1_initial_migration.js
├── [4.0K]  test
└── [4.1K]  truffle-config.js

3 directories, 3 files
```

Now lets install `@opengsn/gsn`, with in this project, so that we can use some contracts from them. We'll also require `web3`, so lets get it too.

```bash
npm i @opengsn/gsn
npm i web3
```

#### Smart Contract

Time to write a smart contract. Lets get into `contracts` directory & create a contract.

```bash
cd contracts
touch StringOwner.sol # a very simple smart contract
```

Lets copy paste below code into our `StringOwner.sol`.

```js
// SPDX-License-Identifier: None

pragma solidity ^0.7.0;

import "@opengsn/gsn/contracts/BaseRelayRecipient.sol";
import "@opengsn/gsn/contracts/interfaces/IKnowForwarderAddress.sol";

contract StringOwner is BaseRelayRecipient, IKnowForwarderAddress {

    address public deployer;
    string private _str;
    address private _strOwner;

    // event to be emitted for denoting string got updated
    event StringUpdated(string _prev, address _preOwner, string _current, address _currentOwner);

    constructor(address forwarder) {
        trustedForwarder = forwarder;

        deployer = msg.sender;

        // initializing it with this
        _str = "init";
        _strOwner = msg.sender;
    }

    function getTrustedForwarder() public override view returns(address) {
		return trustedForwarder;
	}

	function setTrustedForwarder(address forwarder) public {
        require(_msgSender() == deployer, "Only deployer can update it");

		trustedForwarder = forwarder;
	}

    // get current string
    function getString() public view returns(string memory) {
        return _str;
    }

    // get current string owner
    function getStringOwner() public view returns(address) {
        return _strOwner;
    }

    // updates string content & also owner address
    // with the address which invoked this function
    function update(string memory _string) external {
        string memory _tmpStr = _str;
        address _tmpStrOwner = _strOwner;

        _str = _string;
        _strOwner = _msgSender();

        emit StringUpdated(_tmpStr, _tmpStrOwner, _str, _strOwner);
    }

    function versionRecipient() external virtual view override returns (string memory) {
		return "1.0";
	}

}
```

This contract is GSN-aware, as you can see, it's inheriting from `@opengsn/gsn/contracts/BaseRelayRecipient.sol`, which has `_msgSender()` defined, that can be used for looking up, original message signer. If we try to use `msg.sender`, it this context, most probably we'll end up with trusted forwarder's address, given it's meta transaction which is sent for invoking the function.

#### Deployment

Lets get inside `migrations` directory & create a file named `2_deploy_contracts.js` which is our deployment script.

```js
const StringOwner = artifacts.require('StringOwner.sol')
// we need to deploy a trusted forwarder specific to our dapp,
// every dapp needs to deploy it, because that will eventually
// save us from going through a very lengthy whole relayhub contract auditing
// process, and our contract can also be made to only accepting requests from
// specified forwarder or a set of forwarder, whom dapp developer trusts & deployed
// themselves.
const TrustedForwarder = artifacts.require('Forwarder.sol')

module.exports = async function deployFunc (deployer, network) {
  const netid = await web3.eth.net.getId()

  // first, check if already deployed through truffle:
  let forwarder = await TrustedForwarder.deployed().then(c => c.address).catch(e => null)
  if (!forwarder) {
    forwarder = (await deployer.deploy(Forwarder)).address
  }
  console.log('Using forwarder: ', forwarder)
  // passing forwarder address in constructor of StringOwner
  await deployer.deploy(StringOwner, forwarder)
}
```

As we've our deployment scripts ready, lets just run migration.

**Oh wait, did we create a relay server, deploy relay hub & pay master ?**

- No we didn't. So we're going to do that first & then go with target contract deployment.

#### Running Private Blockchain

Find GUI ganache & run it or you can simply start ganache from cli using following command. 

```bash
npx ganache-cli -d -k 'istanbul' -l 1e8 &
```

#### Deploy RelayHub, Paymaster, StakeManager, Penalizer

We're going to use `@opengsn/gsn` for installing these components in local blockchain,which is by default running on `http://localhost:8545`.


```bash
npx gsn deploy-relay-hub 
# for targetting another network, you need to 
# check here https://docs.opengsn.org/gsn-provider/gsn-helpers.html#deploy
```

#### Funding Paymaster

It's not over yet, we need to fund out paymaster, that's what is going to pay for our transaction, so we need to fund it.


```bash
npx gsn fund-paymaster
# for more control: https://docs.opengsn.org/gsn-provider/gsn-helpers.html#paymaster_fund
```

#### Running Relay Server

We're going to start a local relay server for our purpose. If you want to run a public relayer in a public blockchain, then you need to read this [one](https://docs.opengsn.org/gsn-provider/running-own-relay.html).

You can also expose this local relayer for public usage, but in that case make sure you set proper params while starting it. This local relayer can be exposed to public by using tunneling tool like `ngrok`. 

> Install ngrok: `npm i -g ngrok`

> Run ngrok, for exposing local endpoint for public usage: `npx ngrok http <relayer-port>`

```bash
npx gsn-run-relay --Workdir <workdir> --DevMode --RelayHubAddress <hub_address>
# check here too: https://docs.opengsn.org/gsn-provider/gsn-helpers.html#run
```

#### Registering Relayer with RelayHub

And last but not least, we need to register our relay server, with `RelayHub`, because among all these moving parts, this is one, which is stiching them all together.

```bash
npx gsn register-relayer
# also check here: https://docs.opengsn.org/gsn-provider/gsn-helpers.html#relayer_register
```

#### Finally Deployment

As we've set up all required components, we can start deployment process. But before that we need to make sure our `truffle-config.js` is okay.

Given we're running `ganache-cli`, which is exposing its RPC endpoint on `http://localhost:8545`, we can use this network as our target network for deploying contracts i.e. _{StringOwner, Forwarder}_.

If you'd like to deploy contracts on different network, consider adding new network & specify it while invoking truffle. In that case you need to also ensure, you've deployed all previous components on that certain network.

```js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.7.0",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
      evmVersion: "istanbul"
      }
    },
  },
};
```

Lets deploy our contracts on local blockchain.

```bash
npx truffle migrate
```

#### Sending Meta Transaction

For talking to GSN aware smart contract, we need to use `@opengsn/gsn` SDK, which will manage lots of lower level complexities for us. And as we've already installed it, lets create a JS file in root of this project directory i.e.`meta-tx-gsn`.

```bash
cd ~/meta-tx-gsn
touch index.js
```

Now lets copy paste following code snippet into `index.js`.

```js
const { RelayProvider } = require('@opengsn/gsn')

const configuration = { 
  relayHubAddress: <relay-hub-for-this-network>,
  stakeManagerAddress: <stake-manager-for-this-network> 
};

const provider = new RelayProvider(web3.currentProvider, configuration);
const web3 = new Web3(provider);
```

As we've connected our web3 instance to `RelayProvider`, all transactions to be automatically routed via GSN.

```js
// abi => StringOwner contracts ABI array
// address => deployed at, in local ganache blockchain
const myRecipient = new web3.eth.Contract(abi, address);

// Interacting with GSN aware contract
const interact = async () => {
  // keep paymaster address that we deployed
  // along with trusted forwarder which was specifically deployed
  // for this dapp
  await myRecipient.methods.update("GSN").send({ from, paymaster, forwarder });

  // we can also ask this provider to not
  // route our transaction via GSN network, rather
  // send a vanilla transaction
  await myRecipient.methods.update("non-GSN").send({ from, useGSN: false });
}
```

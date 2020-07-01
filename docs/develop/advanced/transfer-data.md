---
id: transfer-data
title: Transfer data from Ethereum to Matic
description: Transfer state or data from Ethereum to Matic via Contracts
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

The mechanism to natively read Ethereum data from Matic EVM chain is that of ‘State Sync’. In other words, this mechanism enables transfer of arbitrary data from Ethereum chain to Matic chain. The procedure that makes it possible is: Validators on the Heimdall layer are listening for a particular event — `StateSynced` from a Sender contract, as soon as the event is picked, the `data` that was passed in the event is written on the Receiver contract. Read more [here](https://docs.matic.network/docs/validate/validator/state-sync-mechanism).

The Sender and Receiver contract are required to be mapped on Ethereum — [`StateSender.sol`](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) needs to be aware of each sender and receiver. If you'd like to get the mapping done, please request a mapping [here](https://angela758926.typeform.com/to/IqKhy2).

<center>
<button style={{padding: '20px', backgroundColor: '#4093ff', color: '#fff', borderRadius: '25px', fontSize : '15px' }}>
  <a href="https://angela758926.typeform.com/to/IqKhy2" target="_blank" style={{color: 'inherit'}}>
    Submit Sender/Receiver Mapping Request
  </a>
</button>
</center>

<hr></hr>

In the following walkthrough, we'll be deploying a Sender contract on Ropsten (Ethereum testnet) and a Receiver contract on Testnetv3 (Matic's testnet) and then we'll be sending data from Sender and reading data on Receiver via web3 calls in a node script.

## 1. Deploy Sender Contract

The sole purpose of Sender contract is to be able to call [`syncState`](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) function on the StateSender contract — which is Matic's state syncer contract - the StateSynced event of which Heimdall is listening to. 

Deployed at:

- `0x22E1f5aa1BA9e60527250FFeb35e30Aa2913727f` on Ropsten (Receiver on Testnetv3)
- `0xfB631F5A239A5B651120335239CC19aEbCb185e6` on Ethereum Mainnet (Receiver on BetaV2)

To be able to call this function, let's first include it's interface in our contract:

```javascript
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...

```

Next, let's write our custom function that takes in the data we'd like to pass on to Matic and calls syncState

```javascript
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

In the above function, `stateSenderContract` is the address of the `StateSender` on the network you'll be deploying `Sender` on. (eg., we'll be using `0x22E1f5aa1BA9e60527250FFeb35e30Aa2913727f` for Ropsten), and receiver is the contract that will receive the data we send from here.

It is recommended to use constructors to pass in variables, but for the purpose of this demo, we'll simply harcode these two addresses:

Following is how our Sender.sol looks like:

```javascript
// sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

contract sender {
  address public stateSenderContract = 0x22E1f5aa1BA9e60527250FFeb35e30Aa2913727f;
  address public receiver = 0x83bB46B64b311c89bEF813A534291e155459579e;
  
  uint public states = 0;

  function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
  }
  
}
```

We're using a simple `states` counter to keep track of the number of states sent via the Sender contract.

Use Remix to deploy the contract and keep a note of the address and ABI.

Ours is deployed at `0xf428d353aBdb6fdFf9E5E713f1Ec403cD15d0975` on Ropsten, and here is the ABI: [SenderABI.json](https://gist.githubusercontent.com/nglglhtr/147d8707391b5de5a572f2b462bd058c/raw/11bf04f2342473958fb63c63fa48e0b0645e42d9/SenderABI.json)


## 2. Deploy Receiver contract

Receiver contract is the one that is invoked by a Validator when the `StateSynced` event is emitted. The Validator invokes the function `onStateReceiveon` the receiver contract to submit the data. To implement it, we first import [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) interface and write down our custom logic — to interpret the tranferred data inside onStateReceive.

Following is how our Receiver.sol looks like:

```javascript
// receiver.sol

pragma solidity ^0.5.11;

// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}

contract receiver {

  uint public lastStateId;
  bytes public lastChildData;

  function onStateReceive(uint256 stateId, bytes calldata data) external {
    lastStateId = stateId;
    lastChildData = data;
	}

}
```

The function simply assigns the last received State Id and data to variables. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) is a simple unique reference to the transferred state (a simple counter).

Deploy  your Receiver.sol on Matic's testnet and keep a note of the address and ABI

Ours is deployed at `0x83bB46B64b311c89bEF813A534291e155459579e` on TestnetV3, and here is the ABI: [ReceiverABI.json](https://gist.githubusercontent.com/nglglhtr/147d8707391b5de5a572f2b462bd058c/raw/11bf04f2342473958fb63c63fa48e0b0645e42d9/ReceiverABI.json)

## 3. Getting your Sender and Receiver Mapped
You can either use the already deployed addresses (mentioned above) for sender and receiver, or deploy your custom contracts and request a mapping done [here](https://angela758926.typeform.com/to/IqKhy2)

<center>
<button style={{padding: '20px', backgroundColor: '#4093ff', color: '#fff', borderRadius: '25px', fontSize : '15px' }}>
  <a href="https://angela758926.typeform.com/to/IqKhy2" target="_blank" style={{color: 'inherit'}}>
    Submit Sender/Receiver Mapping Request
  </a>
</button>
</center>

## 4. Sending and Receiving data

Now that we have our contracts in place and mapping done, we'll be writing a simple node script to send arbitrary hex bytes, receive them on matic network and interpret the data!

### 4.1 Setup your script

We'll first initialise our web3 objects, wallet to make the transactions and contracts

```javascript
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'v3')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...` // add or import your private key

matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `0x83bB46B64b311c89bEF813A534291e155459579e`
let receiverABI = `` // insert or import ABI
let senderAddress = `0xf428d353aBdb6fdFf9E5E713f1Ec403cD15d0975`
let senderABI = `` // insert of import the ABI



let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

```

We're using @maticnetwork/meta package for the RPCs, the package isn't a requirement to run the script.

`matic` and `main` objects refer to the web3 object initialised with Matic's and Ropsten's RPC respectively. 

`sender` and `receiver` objects refer to the contract objects of Sender.sol and Receiver.sol that we deployed in Step 1 and 2. 

### 4.2 Sending data

Next, let's setup our functions to create bytestring of the data and send it via Sender contract: 

```javascript
// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

// send data via sender
async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}
```

Calling `getData` will convert an ascii string (eg., `Hello World !`) to a string of bytes (eg., `0x48656c6c6f20576f726c642021`); while the function `sendData` takes in data (an ascii string), calls `getData` and passes on the bytestring to sender contract

### 4.3 Receiving data

Next, we'll be checking for received data on `Receiver.sol`.

It should take ~4 minutes for the state sync to execute.

Add the following functions to check (a) number of sent states from Sender and (b) Last received state on `Receiver`.

```javascript
// check `states` variable on sender
async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

// check last received data on receiver
async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}
```

the function `checkReceiver` simply calls the variables we defined in the contract — which would be set as soon as the Validator calls `onStateReceive` on the contract. The `getString` function simply interprets the bytestring (converts it back to ascii)

```javascript
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Finally, we'll write up a method to execute our functions:

```javascript
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

### 4.4 Putting it all together!

This is how our test script looks like: 

```javascript
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'v3')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...`
matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `0x83bB46B64b311c89bEF813A534291e155459579e`
let receiverABI = ``
let senderAddress = `0xf428d353aBdb6fdFf9E5E713f1Ec403cD15d0975`
let senderABI = ``



let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}

// console.log(getData('Sending a state sync! :) '))

async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}

async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}

async function test() {
	await sendData ('Hello World !')
	await checkSender ()
	// add a timeout here to allow time gap for the state to sync
	await checkReceiver ()
}

test()
```

### 4.5 Let's run the script

Successful execution of the above script provide an output as:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World ! 
```

## 5. Code

Here is the Gist with contracts code and the test node script: [Gist](https://gist.github.com/nglglhtr/147d8707391b5de5a572f2b462bd058c).
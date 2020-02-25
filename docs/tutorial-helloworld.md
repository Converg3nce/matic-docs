---
id: helloworld
title: Hello World
sidebar_label: Hello Remix
---
A Hello World style starter project. Deploys a smart contract with a message, and renders it in the front-end. You can change the message using the interact panel!

This dapp implements a "Hello World" style application that echoes a message passed to the contract to the front end. This tutorial is intended to be followed using the online IDE available at [Remix IDE]([https://remix.ethereum.org/](https://remix.ethereum.org/)).

### Setting up [Remix IDE]([https://remix.ethereum.org/](https://remix.ethereum.org/))

- Remix IDE - an online IDE to develop smart contracts.
- If you’re new to Remix, You’ll first need to activate two modules: Solidity Compiler and Deploy and Run Transactions.
- Select Solidity Environment
<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={'../img/helloworld/RemixIDE_Step1.png'} alt="RemixIDE_Step1"/>
      </div>

- ![../img/helloworld/Screenshot_2020-02-14_at_12.52.45_PM.png](../img/helloworld/Screenshot_2020-02-14_at_12.52.45_PM.png) Go to File Explorers, And Create a new file ![../img/helloworld/Screenshot_2020-02-14_at_12.51.59_PM.png](../img/helloworld/Screenshot_2020-02-14_at_12.51.59_PM.png), Name it ```HelloWorld.sol```

- Copy/Paste the Smart contract below into the newly created file ```HelloWorld.sol```

# **The smart contract**
  ```javascript
  // Specifies that the source code is for a version
  // of Solidity greater than 0.5.10
  pragma solidity ^0.5.10;

  // A contract is a collection of functions and data (its state)
  // that resides at a specific address on the Ethereum blockchain.
  contract HelloWorld {

      // The keyword "public" makes variables accessible from outside a contract
      // and creates a function that other contracts or SDKs can call to access the value
      string public message;

      // A special function only run during the creation of the contract
      constructor(string memory initMessage) public {
          // Takes a string value and stores the value in the memory data storage area,
          // setting `message` to that value
          message = initMessage;
      }

      // A publicly accessible function that takes a string as a parameter
      // and updates `message`
      function update(string memory newMessage) public {
          message = newMessage;
      }
  }
  ```

The first line, `pragma solidity ^0.5.10` specifies that the source code is for a Solidity version greater than 0.5.10. [Pragmas](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#pragma) are common instructions for compilers about how to treat the source code (e.g., pragma once).

A contract in the sense of Solidity is a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain. The line `string public message` declares a public state variable called `message` of type `string`. You can think of it as a single slot in a database that you can query and alter by calling functions of the code that manages the database. The keyword public automatically generates a function that allows you to access the current value of the state variable from outside of the contract. Without this keyword, other contracts have no way to access the variable.

The [constructor](https://solidity.readthedocs.io/en/latest/contracts.html#constructor) is a special function run during the creation of the contract and cannot be called afterward. In this case, it takes a string value `initMessage`, stores the value in the [memory](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) data storage area, and sets `message` to that value.

The `string public message` function is another public function that is similar to the constructor, taking a string as a parameter, and updating the `message` variable.

### Compile Smart Contract

- ![../img/helloworld/Screenshot_2020-02-14_at_1.00.03_PM.png](../img/helloworld/Screenshot_2020-02-14_at_1.00.03_PM.png) Go to Solidity Compiler
- Select Compiler Version to 0.5.10
- Now, ```Compile HelloWorld.sol```
- After Successful Compilation, it will show ![../img/helloworld/Screenshot_2020-02-14_at_1.08.22_PM.png](../img/helloworld/Screenshot_2020-02-14_at_1.08.22_PM.png)
- Now, We have to deploy our smart contract on Matic Network. For that, we have to connect to web3 world, this can be done my many services like Metamask, Brave, Portis etc. We will be using Metamask. Please follow this [tutorial to setup a Metamask Account](quickstart-metamask).
- Open Metamask and select Custom RPC from the networks dropdown

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={'../img/helloworld/metamask-custom-rpc.png'} alt="RemixIDE_Step1"/>
</div>

- Put in a Network name - “Matic Testnet v3”
- In URL field you can add the URL as - “https://testnetv3.matic.network”
- Go ahead and click save
- Copy your address from Metamask
<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={'../img/helloworld/Screenshot_2020-01-09_at_1.24.49_PM.png'} alt="RemixIDE_Step1"/>
</div>

- Head over to [Faucet](https://faucet.matic.network/) and request test ether - if you'd like. (the gas fee can also be safely set to 0 on testnet.
- Now, Let's Deploy ![../img/helloworld/Screenshot_2020-02-14_at_1.08.37_PM.png](../img/helloworld/Screenshot_2020-02-14_at_1.08.37_PM.png)
- the Smart Contract on Matic Network
- Select Injected Web3 in the Environment dropdown and your contract

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={'../img/helloworld/Screenshot_2020-02-14_at_1.39.04_PM.png'} alt="RemixIDE_Step1"/>
</div>

- Accept the Connection Request!

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={'../img/helloworld/Screenshot_2020-02-14_at_1.59.10_PM.png'} alt="RemixIDE_Step1"/>
</div>

- Once Metamask is connected to Remix, the ‘Deploy’ transaction would generate another metamask popup that requires transaction confirmation.

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={'../img/helloworld/Screenshot_2020-02-14_at_1.45.23_PM.png'} alt="RemixIDE_Step1"/>
</div>

**Congratulations!** You have successfully deployed HelloWorld Smart Contract. Now you can interact with the Smart Contract.

<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={'../img/helloworld/Screenshot_2020-02-14_at_2.00.19_PM.png'} alt="RemixIDE_Step1"/>
</div>

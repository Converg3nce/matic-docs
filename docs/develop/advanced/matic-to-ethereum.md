---
id: matic-to-ethereum
title: Transfer data from Matic to Ethereum
description: Transfer state or data from Matic to Ethereum via Contracts
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mechanism for transferring data from matic to ethereum is a little different from doing the same for ethereum to matic. The **checkpoint** transactions created by the Validators on the ethereum chain are used for achieving this. Basically a transaction is initially created on the matic network. While creating this transaction it has to be ensured that an **event is emitted** and the **event logs includes the data we wish to transfer** from matic to ethereum.

In a period of time ( about 10-30mins ), this transaction is check-pointed on the ethereum chain by the validators. Once checkpointing is done, the hash of the transaction created on the matic chain can be submitted as a proof on the **RootChainManager** contract on the Ethereum chain. This contract, validates the transaction, verifies that this transaction is included in the checkpoint and finally decodes the event logs from this transaction.

Once this phase is over, we can use the **decoded event log data to perform any change** on the root contract deployed on the ethereum chain. For this we also need to ensure that, the change of state on ethereum is only done in a secure way. Hence, we make use of a **Predicate** contract which is a special type of contract that can be only triggered by the **RootChainManager** contract. This architecture ensures that the state changes on ethereum happens only when the transaction on matic is check pointed and verified on the ethereum chain by the **RootChainManager** contract.

# Overview

- A transaction is executed on the child contract deployed on the Matic chain.
- An event is also emitted in this transaction. The parameters of this **event includes the data which has to be transferred** from matic to ethereum.
- The validators on the matic network picks up this transaction in a specific interval of time( probably 10-30mins), validates them and **adds them to the checkpoint** on ethereum.
- A checkpoint transaction is created on the **RootChain** contract and the checkpoint transactions can be seen in the explorer link given [here](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e).
- Once the checkpoint addition is completed, the **matic.js** library can be used to call the **exit** function of the **RootChainManager** contract. **exit** function can be called using the matic.js library as shown in this [example](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js).

- Running the script, verifies the inclusion of the matic transaction hash on ethereum chain, and then in turn calls the **exitToken** function of the [predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol) contract.
- The **custom logic to be executed** can be included in this **predicate** contract. An example use case would be making a state change on the root contract.
- This ensures that the **state change on the root chain contract** is always done in a **secure** way and **only through the predicate contract**.
- The important thing to note is that the **verification of the transaction hash** from matic and **triggering the predicate** contract happens in a **single transaction** and thus ensuring security of any state change.
- In the predicate contract, the **event logs of the transaction can be decoded**. So any data that was emitted from the event on the matic chain can be accessed in the predicate and used to make changes on the root chain contract.

# Implementation

1.  Create the root chain and child chain contract. Ensure that the function that does the state change also emits an event. This event must include the data to be transferred as one of its parameters. A sample format of how the Root Token contract must look like is given below. This is a very simple contract that has a data variable whose value is set by using a setData function. Calling the setData function emits the Data event. Rest of the things in the contract will be explained in the upcoming sections of this tutorial. An example implementation of the **child** and **root** contract can be found [here](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum/contracts)

    <img src={useBaseUrl("img/matic-to-eth/root-contract.png")} />

2.  Once the child and root token contract is deployed, these contracts have to be mapped using the PoS bridge. This mapping ensures that a connection is maintained between these two contracts across the chains.
3.  But before mapping, a predicate contract has to be created that will actually handle the custom logic of making the state change on the root contract deployed on ethereum. A few things have to be taken care of while creating the **CustomPredicate** contract.

    A. The predicate contract should implement the ITokenPredicate.sol
    [ITokenPredicate](https://github.com/maticnetwork/pos-portal/blob/transfer-metadata/contracts/root/TokenPredicates/ITokenPredicate.sol) interface.

    B. The predicate should also have an interface with the functions on the root chain contract. This is necessary to make calls from the predicate contract to the root chain contract.

    C. It is recommended to maintain the event signature inside the predicate. The event signature is the **keccack-256** hash of the event signature in the root contract. This signature will be later verified each time the predicate is triggered by the **RootChainManager** contract.

    D. Once the [Predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol) is deployed, we also need to ensure that the RootChainManager Proxy contract address is given the access rights to trigger the **exitTokens** function of the Predicate contract. This can be done by calling the **grantRole** function of the predicate contract.

    <img src={useBaseUrl("img/matic-to-eth/predicate.png")} />

    It can be seen from the example above that the **logRLPList.toUint()** has the logs from the event of the transaction done on matic chain. **logTopicRLPList** will have the indexed log data and also **logTopicRLPList[0].toUint()** will always be the keccack-256 hash of the signature of the event on childchain.

4.  Hence, any custom logic that has to performed on the root contract can be included in the **exitTokens** function of the Custom Predicate contract. This logic is always executed when the RootChainManager triggers the predicate contract. The event logs from the transaction executed on the matic chain will be available inside this predicate contract. Using these logs, state changes can be performed on the root chain as well.
5.  Once the Predicate is deployed, we also need to ensure that the Predicate contract address is given access to make state changes on the root chain contract. An **onlyPredicate** modifier can be used for this purpose as seen in the root contract code in this tutorial.
6.  The next step is to register the predicate and map the root and child contracts. For doing this the matic team can be reached on [discord](https://discord.gg/ThJq53).

For testing the above implementation, we can create a transaction on the matic chain by calling the **setData** function of the child contract. We need to wait at this point for the checkpoint to be completed. Finally, call the exit function of the RootChainManager using the matic.js SDK.

```jsx
const txHash =
  "0xc9f6ba0ad48a8812a0b22bcb8a205f3c5cb41ccf1ce2908b6ebe84a5e6c1a64f";

const logEventSignature =
  "0x46269ee522654e4067695b81b5bcafa7f76e1d31ef24c997420450b0c6626531";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

As shown in the above screenshot, the **txHash** is the transaction hash of the transaction that happened on the child contract deployed on matic chain.

The **logEventSignature** is the keccack-256 hash of the Data event. This is the same hash that we have included in the Predicate contract. All the contract code used for this tutorial and the exit script can be found [here](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Once the exit script is completed, the root contract on ethereum chain can be queried to verify if the value of the variable **data** that was set in child contract has also been reflected in the **data** variable of the root contract.

This was a simple demonstration of how data can be transfered from matic to ethereum. More complex logic to be executed can be included in the exitToken function of the **CustomPredicate** contract.

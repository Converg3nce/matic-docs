---
id: accounts
title: What are Accounts?
sidebar_label: Accounts
---
The global state of Ethereum is comprised of accounts that interact with one another through a message-passing framework. The most basic interaction is that of sending some value - like ether - the native cryptocurrency of Ethereum blockchain.

Each account is identified by a 20 byte identifier which is called an address - this is the public key of the account.

There exist two types of accounts:

1. Externally owned account - the private key to which is owned by a person (eg., you’d own the private key and be responsible to keep it safe)
2. Contract owned account - has an associated code with it and is not owned by a person

These can be differentiated as follows:

<!-- | Contract accounts| Externally Owned Account (EOA)|  
|---|-------------------------|
|**A Contract**:|**An externally controlled account**:<img width=700/>|   
|1. has an ether balance|1. has an ether balance|   
|2. has associated code|2. can send transactions (ether transfer or trigger contract code), |   
|3. code execution is triggered by transactions or messages (calls) received from other contracts|3. is controlled by private keys|
|4. when executed - perform operations of arbitrary complexity (Turing completeness) - manipulate its own persistent storage, i.e., can have its own permanent state - can call other contracts.|4. has no associated code.| -->

**Contract Accounts** 

1. has an ether balance
2. has associated code
3. code execution is triggered by transactions or messages (calls) received from other contracts
4. when executed - perform operations of arbitrary complexity (Turing completeness) - manipulate its own persistent storage, i.e., can have its own permanent state - can call other contracts.

**Externally Owned Accounts** 

1. has an ether balance
2. can send transactions (ether transfer or trigger contract code)
3. is controlled by private keys
4. has no associated code

### **:scroll:Resources**

[Read more about accounts](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)

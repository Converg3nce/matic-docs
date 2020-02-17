---
id: transactions
title: What are Transactions?
sidebar_label: Transactions
---

The term “transaction” is used in Ethereum to refer to the signed data package that stores a message to be sent from an externally owned account to another account on the blockchain.

Can be categorised into two main categories:

**Value Transfer**

- A value (in Ether) is transferred between two externally owned accounts

**Execution of Contracts**

- Here, a function/method call is made from an externally owned account to a contract account. These types of transactions can be further chained eg., the contract account can make several internal transactions before calling another contract account or returning back.

Any type of transaction execution on Ethereum costs money - or gas. Which brings us to the next question: What is Gas?

You can read this really [good explanation](https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas/62#62) on Gas.

Gas is the name for the execution fee that senders of transactions need to pay for every operation made on an Ethereum blockchain. The name gas is inspired by the view that this fee acts as cryptofuel, driving the motion of smart contracts. Gas is purchased for ether from the miners that execute the code. Gas and ether are decoupled deliberately since units of gas align with computation units having a natural cost, while the price of ether generally fluctuates as a result of market forces. [(Source)](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#what-is-gas)

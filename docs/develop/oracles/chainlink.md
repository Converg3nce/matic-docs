---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Chainlink provides your smart contracts with a reliable way to consume external API data. Chainlink network uses LINK token which is ERC677 standard, for incentivizing their node operators. For each oracle contract call you make from your contract, you'll transfer a certain amount of LINK token to oracle's account & provide it with a callback function signature, which is to be invoked for feeding requested data back to your smart contract. For reading more about how chainlink works, you can start [here](https://docs.chain.link/docs/architecture-overview).

**And now we've added support for Chainlink in Matic Mumbai Testnet.**

## addresses

- LINK Token: `0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB`
- Oracle: `0x1cf7D49BE7e0c6AC30dEd720623490B64F572E17`

## example

In this simple tutorial, you'll get an overview of how to use chainlink oracle in your smart contracts.

- We'll fetch Ether Price in USD from [here](https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD)
- You'll require to extend [ChainlinkClient.sol](https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol) in your smart contract which will be called as the **consumer contract** as your contract will be making the oracle requests and consuming the responses. So, lets go to Remix and paste below code into editor.

```javascript
pragma solidity ^0.6.0;

// In remix use: https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol
// In truffle use: @chainlink/contracts/src/v0.6/ChainlinkClient.sol

import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";

// extending chainlinkclient contract library
contract Chainlinked is ChainlinkClient {
    // this is where price to stored
    uint256 public ethereumPrice;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    // for link token: 0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB
    constructor(address link) public {
        setChainlinkToken(link);
        
        // oracle to serve our request
        oracle = 0x1cf7D49BE7e0c6AC30dEd720623490B64F572E17;
        // jobid which is to be invoked offchain 
        jobId = "d8fcf41ee8984d3b8b0eae7b74eca7dd";
        // 1 LINK token to be paid for each call to this oracle
        fee = 10**18;
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestEthereumPrice() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on
        request.add(
            "get",
            "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
        );

        // Set the path to find the desired data in the API response, where the response format is:
        // {"USD":243.33}
        request.add("path", "USD");

        // Multiply the result by 100 to remove decimals
        request.addInt("times", 100);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */

    function fulfill(bytes32 _requestId, uint256 _price)
        public
        recordChainlinkFulfillment(_requestId)
    {
        ethereumPrice = _price;
    }
}
```

- As above consumer contract is already deployed in Matic Mumbai, we'll start interacting with it.
- Make sure you're connected to correct network & have enough Matic token & LINK token in your account. Get some tokens from [here](https://faucet.matic.network/).
- Now if you interact with `requestEthereumPrice` function, it'll send a transaction off to matic network. And chainlink node will catch this job request. After serving request, data will be written back to blockchain, by calling `fulfill` callback method.
- Now calling `ethereumPrice` function will show current Ether price in USD, multiplied by 100 _( in case you're wondering why ? EVM can't handle floating point numbers )_.

<img src={useBaseUrl("img/chainlink/interaction.png")} />

_Quick Fact_: **In matic network 1 Gwei gas price works like charm.**

## jobs

Before sending any request to chainlink oracle contract, make sure you set oracle address & job_id carefully.

In Matic Mumbai Testnet, there's only one operational chainlink oracle contract at `0x1cf7D49BE7e0c6AC30dEd720623490B64F572E17`, deployed by us. This oracle contract supports 5 job requests, which are as follows.

### HTTP POST Request

#### Intro

- Send POST request to specified URL
- Parse JSON response
- Convert value to bytes32
- Write bytes32 back into blockchain

#### Job Id

`d50dacc32d514a2eae0d6981235a25df`

<img src={useBaseUrl("img/chainlink/jobspec_0.png")} />

### HTTP GET Request

#### Intro

- Send GET request to specified URL
- Parse JSON response
- Convert value to boolean
- Write boolean back into blockchain

#### Job Id

`31779f840111490299551ba34646db47`

<img src={useBaseUrl("img/chainlink/jobspec_1.png")} />

### HTTP GET Request

#### Intro

- Send GET request to specified URL
- Parse JSON response
- Multiply value by X
- Convert value to unsigned integer
- Write unsigned integer back into blockchain

#### Job Id

`d8fcf41ee8984d3b8b0eae7b74eca7dd`

<img src={useBaseUrl("img/chainlink/jobspec_2.png")} />

### HTTP GET Request

#### Intro

- Send GET request to specified URL
- Parse JSON response
- Multiply value by X
- Convert value to signed integer
- Write signed integer back into blockchain

#### Job Id

`508bac12319e4a488ac46e194997db1f`

<img src={useBaseUrl("img/chainlink/jobspec_3.png")} />

### HTTP GET Request

#### Intro

- Send GET request to specified URL
- Parse JSON response
- Convert value to bytes32
- Write bytes32 back into blockchain

#### Job Id

`4f880ce628544e1a8d26a26044c91c20`

<img src={useBaseUrl("img/chainlink/jobspec_4.png")} />

Read more about job specifications [here](https://docs.chain.link/docs/job-specifications), to understand which of these can be useful for your usecase.

Chainlink API reference can be found [here](https://docs.chain.link/docs/chainlink-framework).

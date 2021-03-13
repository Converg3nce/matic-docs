---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
  - chainlink
  - oracle
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Chainlink enables your contracts to access to *any* external data source, through a decentralized oracle network. Whether your contract requires sports results, the latest weather, or any other publicly available data, Chainlink provides the tools required for your contract to consume it.

# Decentralized Data

One of Chainlinks most powerful features, is already decentralized, aggregated, and ready to be digested on-chain data on most of the most popular cryptocurrenies. These are known as [Chainlink Data Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts). 

Here is a working example of a contract that pulls the latest price of MATIC in USD on the Mumbai Testnet. 

All you need to do, is swap out the address [with any address of a data feed](https://docs.chain.link/docs/matic-addresses#config) that you wish, and you can start digesting price information.
```

pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

# Request and Receive Cycle

Chainlink's Request and Receive cycle enables your smart contracts to make a request to any external API and consume the response. To implement it, your contract needs to define two functions: 

1. One to request the data
2. Another to receive the response.

To request data, your contract builds a request object which it provides to an oracle. Once the oracle has reached out to the API and parsed the response, it will attempt to send the data back to your contract using the callback function defined in your smart contract.

# Uses

1. Chainlink Data Feeds 
   1. These are decentralized data reference points already aggregated on-chain, and the quickest, easiest, and cheapest way to get data from the real world. Currently supports some of the most popular cryptocurrency and fiat pairs. 
2. Chainlink VRF    
   1. Get provably random numbers, where the random number is cryptographically guaranteed to be random.
3. Chainlink API Calls
   1. How to configure your smart contract to work with traditional APIs, and customize to get any data, send any requests over the internet, and more. 

For working with Data Feeds, use the [Polygon Data Feeds](https://docs.chain.link/docs/matic-addresses) from the Chainlink documenation.

For working with Chainlink VRF, use the [Polygon VRF](https://docs.chain.link/docs/vrf-contracts) addresses from the [Chainlink documentation](https://docs.chain.link/docs/get-a-random-number).
# Code Example

To interact with external APIs, your smart contract should inherit from <a href="https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol" target="_blank">`ChainlinkClient`</a>, which is a contract designed to make processing requests easy. It exposes a struct called `Chainlink.Request`, which your contract should use to build the API request. 

The request should define the oracle address, the job id, the fee, adapter parameters, and the callback function signature. In this example, the request is built in the `requestEthereumPrice` function.

`fulfill` is defined as the callback function.

```javascript
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {
  
    uint256 public price;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    /**
     * Network: Matic Mumbai Testnet
     * Oracle: 0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D
     * Job ID: 5592aa6da3d64580933fce0401d373f0
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D;
        jobId = "5592aa6da3d64580933fce0401d373f0";
        fee = 10 ** 16; // 0.01 LINK
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return. 
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");
        
       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);
        
        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

# Addresses

There are currently only a few operational Chainlink oracles on the Matic Mumbai Testnet. You can always run one yourself too!

### View the reference on Market.Link
[Alpha Chain Mumbai Chainlink Node](https://market.link/nodes/384a3ac9-3260-46ad-b253-f231fac77687?network=80001&start=1613667421&end=1614272221)

* Oracle: <a href="https://mumbai-explorer.matic.today/address/0xBf87377162512f8098f78f055DFD2aDAc34cbB47/transactions" target="_blank">`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`</a>
* LINK: <a href="https://mumbai-explorer.matic.today/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions" target="_blank">`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`</a>


To obtain LINK on Mumbai Testnet, head to the <a href="https://faucet.matic.network/" target="_blank">faucet here</a>.

# Which APIs are Supported?

Chainlink's Request and Receive cycle is flexible enough to call any public API, so long as the request parameters are correct and the response format is known. For example, if the response object from a URL we want to fetch from is formatted like this: `{"USD":243.33}`, the path is simple: `"USD"`.

If an API responds with a complex JSON object, the "path" parameter would need to specify where to retrieve the desired data, using a dot delimited string for nested objects. For example, take the following response:

```JSON
{
   "Prices":{
        "USD":243.33
    }
}
```

This would require the following path: `"Prices.USD"`. If there are spaces in the stings, or the strings are quite long, we can use the syntax shown in the example above, where we pass them all as a string array.

```
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

# What Are Job IDs For?

You may have noticed that example uses a `jobId` parameter when building the request. Jobs are comprised of a sequence of instructions that an oracle is configured to run. In the [code example](#code-example) above, the contract makes a request to the oracle with the job ID: `d8fcf41ee8984d3b8b0eae7b74eca7dd`. This particular job is configured to do the following:

* Make a GET request 
* Parse the JSON response
* Multiply the value by *x*
* Convert the value to `uint` 
* Submit to the chain

This is why our contract adds in the URL, the path of where to find the desired data in the JSON response, and the times amount to the request; using the `request.add` statements. These instructions are facilitated by what's known as Adapters, in the oracle.

**Every request to an oracle must include a specific job ID.**

Here is the list of jobs that the Matic oracle is configured to run.

| Name |  Return Type  | ID | Adapters |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `5592aa6da3d64580933fce0401d373f0` |  `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx`  |
| HTTP GET | `int256` | `8e930dbc3f7b4300a2a914da35ac9511 ` |  `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx`  |
| HTTP GET | `bool` | `6289d5af30684a4d9dd6b3f878a46202 ` |  `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx`  |
| HTTP GET | `bytes32` | `92bc82fdc9824a71a2721cb5f00b8e35 ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx`  |
| HTTP POST | `bytes32` | `3af399b3ce3d4a6e80112e36049955df ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx`  |

Read more about job specifications [here](https://docs.chain.link/docs/job-specifications).

The complete Chainlink API reference can be found [here](https://docs.chain.link/docs/chainlink-framework).

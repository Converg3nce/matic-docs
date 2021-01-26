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

Chainlink enables your contracts to access to *any* external data source, through a decentralized oracle network. Whether your contract requires sports results, the latest weather, or any other publicly available data, Chainlink provides the tools required for your contract to consume it.

# Request and Receive Cycle

Chainlink's Request and Receive cycle enables your smart contracts to make a request to any external API and consume the response. To implement it, your contract needs to define two functions: 

1. One to request the data
2. Another to receive the response.

To request data, your contract builds a request object which it provides to an oracle. Once the oracle has reached out to the API and parsed the response, it will attempt to send the data back to your contract using the callback function defined in your smart contract.

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
     * Oracle: 0xBf87377162512f8098f78f055DFD2aDAc34cbB47
     * Job ID: 6b57e3fe0d904ba48d137b39350c7892
     * LINK address: 0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB);
        oracle = 0xBf87377162512f8098f78f055DFD2aDAc34cbB47;
        jobId = "6b57e3fe0d904ba48d137b39350c7892";
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
[Alpha Chain Mumbai Chainlink Node](https://market.link/nodes/cca2eddf-06a3-4d43-8ae2-eb803554e2fd?start=1611015021&end=1611619821)

* Oracle: <a href="https://mumbai-explorer.matic.today/address/0xBf87377162512f8098f78f055DFD2aDAc34cbB47/transactions" target="_blank">`0xBf87377162512f8098f78f055DFD2aDAc34cbB47`</a>
* LINK: <a href="https://mumbai-explorer.matic.today/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions" target="_blank">`0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB`</a>


To obtain LINK on Mumbai Testnet, contact us on our <a href="https://discord.com/invite/UFC4VYh" target="_blank">Discord</a>.

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
| HTTP GET | `uint256` | `6b57e3fe0d904ba48d137b39350c7892` |  `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx`  |
| HTTP GET | `int256` | `18ee1e6eeedc4dac843ace23c0b4e974 ` |  `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx`  |
| HTTP GET | `bool` | `f1020a3f10ba478e827462daee70e3ab ` |  `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx`  |
| HTTP GET | `bytes32` | `e5725140623b4c559c774c116ee6945a ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx`  |
| HTTP POST | `bytes32` | `c794acefe64e42b489bae7344f410798 ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx`  |

Read more about job specifications [here](https://docs.chain.link/docs/job-specifications).

The complete Chainlink API reference can be found [here](https://docs.chain.link/docs/chainlink-framework).

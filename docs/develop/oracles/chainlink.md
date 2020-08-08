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

Chainlink provides your smart contracts with a reliable way to consume external API data. Chainlink network uses LINK token which is ERC677 standard, for incentivizing their node operators. For each oracle contract call you make from your contract, you'll transfer a certain amount of LINK token to oracle's account & provide it with a callback function signature, which is to be invoked for feeding requested data back to your smart contract. For reading more about how chainlink works, you can start [here](https://docs.chain.link/docs/architecture-overview)

**And now we've added support for Chainlink in Matic Mumbai Testnet.**

## addresses

- LINK Token: `0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB`
- Oracle: `0x1cf7D49BE7e0c6AC30dEd720623490B64F572E17`

## example

In this simple tutorial, you'll get an overview of how to use chainlink oracle in your smart contracts. 

- We'll fetch Ether Price in USD from [here](https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD)
- You'll require to extend [ChainlinkClient.sol](https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol) in your smart contract. So, lets go to Remix and paste below code into editor.

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

- As above contract is already deployed in Matic Mumbai network, we'll put address ( `0x9A5395187104EbED17364B26869d120b032c5D39` ) and start interacting with it.
- Make sure you're connected to correct network & have enough Matic token & LINK token in your account. Get some tokens from [here](https://faucet.matic.network/).

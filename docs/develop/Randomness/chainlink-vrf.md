---
id: chainlink-vrf
title: Chainlink VRF
sidebar_label: Chainlink VRF
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
  - chainlink
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Generating random numbers isn't possible natively in a determanistic system. This is why we need to use oracles to generate a random number. Most conventional methods, like generating a random number from a block hash, relies on the miners being honest. This makes for a non-trustless environment, and defeats the purpose of smart contracts.

We work with [Chainlink VRF](https://docs.chain.link/docs/get-a-random-number) (Chainlink Verifiable Randomness Funciton) to create cryptographically provable random numbers. In order to do so, we make a request to a Chainlink VRF node, and it responds with a random number. 

After deploying the code below, we have to send our contract some LINK. The Chainlink VRF takes LINK as oracle payment, similar to how the Polygon network takes Matic as transaction payment. 
```
pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract RandomNumberConsumer is VRFConsumerBase {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    
    uint256 public randomResult;
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor() 
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (varies by network)
    }
    
    /** 
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }
}
```

Here are the details for the Polygon Mumbai testnet VRF. To work with mainnet Polygon Matic, reach out to vrf@chain.link.

| Item | Value | 
|------|-------|
| LINK Token | 0x326C977E6efc84E512bB9C30f76E30c160eD06FB |
| VRF Coordinator | 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255 | 
| Key Hash | 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4 |
| Fee | 0.0001 LINK |

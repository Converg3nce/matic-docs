---
id: deployment
title: Mumbai deployment
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Maticjs version: ^2.0.2

Maticjs Examples: [https://github.com/maticnetwork/matic.js/tree/v2.0.2/examples/POS-client](https://github.com/maticnetwork/matic.js/tree/v2.0.2/examples/POS-client)

Contracts: [https://github.com/maticnetwork/pos-portal/tree/v1.0.0/contracts](https://github.com/maticnetwork/pos-portal/tree/v1.0.0/contracts)

Artifacts: [https://github.com/maticnetwork/pos-portal/tree/v1.0.0/artifacts](https://github.com/maticnetwork/pos-portal/tree/v1.0.0/artifacts)

Flattened contracts: [https://github.com/maticnetwork/pos-portal/tree/v1.0.0/flat](https://github.com/maticnetwork/pos-portal/tree/v1.0.0/flat)

Use the **_Proxy_** address where ever it is available.

```json
{
  "root": {
    "Merkle": "0x0ef207185e0c1631beb5514eb76501dd16ff9258",
    "MerklePatriciaProof": "0xfa76e5b10a0131573176bd2802535b4a9e76fecb",
    "RLPReader": "0x383b6b577298a35fd8ee18536d3915db6039468f",
    "SafeERC20": "0xcf0902e21c85ba20633c89523c9a0bfa04de3ec5",
    "RootChainManager": "0x8829EC24A1BcaCdcF4a3CBDE3A4498172e9FCDcE",
    "RootChainManagerProxy": "0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74",
    "DummyStateSender": "0x4Ad6FFD6D9b49E832e5ac56f5aEcaB137F9F91C6",
    "ERC20Predicate": "0x07f76e8EfaEAe05cb093AC79740e3546dC03FA93",
    "ERC20PredicateProxy": "0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34",
    "ERC721Predicate": "0xb9B40c5a9614A40148cd11A494b00EE8E6f486E3",
    "ERC721PredicateProxy": "0x74D83801586E9D3C4dc45FfCD30B54eA9C88cf9b",
    "ERC1155Predicate": "0xe57f31d0E1320E5C69bC000044BD155Df3fe4FeE",
    "ERC1155PredicateProxy": "0xB19a86ba1b50f0A395BfdC3557608789ee184dC8",
    "EtherPredicate": "0xd8AA0d2C537137916E6A0ea4b2AFE96188884a84",
    "EtherPredicateProxy": "0xe2B01f3978c03D6DdA5aE36b2f3Ac0d66C54a6D5",
    "DummyERC20": "0x655F2166b0709cd575202630952D71E2bB0d61Af", // Test ERC20 Token on Goerli
    "DummyERC721": "0x084297B12F204Adb74c689be08302FA3f12dB8A7", // Test ERC721 Token on Goerli
    "DummyERC1155": "0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063" // Test ERC1155 Token on Goerli
  },
  "child": {
    "ChildChainManager": "0x2e5e27d50EFa501D90Ad3638ff8441a0C0C0d75e",
    "ChildChainManagerProxy": "0xb5505a6d998549090530911180f38aC5130101c6",
    "DummyERC20": "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1", // Test ERC20 Token on Mumbai
    "DummyERC721": "0x757b1BD7C12B81b52650463e7753d7f5D0565C0e", // Test ERC721 Token on Mumbai
    "DummyERC1155": "0xA07e45A987F19E25176c877d98388878622623FA", // Test ERC1155 Token on Mumbai
    "MaticWETH": "0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323"
  }
}
```

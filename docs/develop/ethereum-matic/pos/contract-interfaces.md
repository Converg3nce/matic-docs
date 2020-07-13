---
id: contract-interfaces
title: Contract Interfaces
sidebar_label: Contract Interfaces
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

### IRootChainManager

```jsx
pragma solidity ^0.6.6;

interface IRootChainManager {
    event TokenMapped(
        address indexed rootToken,
        address indexed childToken,
        bytes32 indexed tokenType
    );

    event PredicateRegistered(
        bytes32 indexed tokenType,
        address indexed predicateAddress
    );

    function registerPredicate(bytes32 tokenType, address predicateAddress)
        external;

    function mapToken(
        address rootToken,
        address childToken,
        bytes32 tokenType
    ) external;

    function depositEtherFor(address user) external payable;

    function depositFor(
        address user,
        address rootToken,
        bytes calldata depositData
    ) external;

    function exit(bytes calldata inputData) external;
}
```

### IChildChainManager

```jsx
pragma solidity 0.6.6;

interface IChildChainManager {
    event TokenMapped(address indexed rootToken, address indexed childToken);

    event Deposited(
        address indexed user,
        address indexed childToken,
        uint256 indexed amount
    );

    function mapToken(address rootToken, address childToken) external;

    function rootToChildToken(address rootToken)
        external
        view
        returns (address);

    function childToRootToken(address childToken)
        external
        view
        returns (address);

    function onStateReceive(uint256 id, bytes calldata data) external;
}
```

### IChildToken

```jsx
pragma solidity 0.6.6;

interface IChildToken {
    function deposit(address user, bytes calldata depositData) external;
}
```
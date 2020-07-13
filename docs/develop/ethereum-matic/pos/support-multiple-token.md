---
id: support-multiple-token
title: Support Multiple Token Standards
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
# Motivation

There are many token standards available based on the use case. There are even more token standards under development. POS Portal needs to support as many of these as possible so that it can be used by maximum dapps.

Current Implementation of POS Portal supports deposit and withdraw for ERC20 tokens. This needs to be extended to support ERC721 and ERC1155 tokens. Furthermore, the implementation should be able to support more token types in future with minimal logic changes.

# Mechanism

The basic mechanism remains the same for all tokens. While depositing, tokens should be locked in the POS Portal on root chain and the corresponding tokens should be minted on matic chain. While withdrawing, tokens should be burned on matic chain and exited from POS Portal by submitting burn proof. Verification of burn proof involves verifying token burn, receipt inclusion and checkpoint inclusion. This process also remains the same. This common logic should be kept in a master contract.

Token specific predicate contracts should be created, sharing a common interface. These contracts will have methods to handle specific logic like token transfer, burn verification etc. 

Token type should be identified using  `bytes32` identifier. New tokens can be supported by simply registering a predicate against its identifier.

# Specification

### `ITokenPredicate.sol`

```jsx
abstract contract ITokenPredicate {
    function lockTokens(address user, address rootToken, bytes memory tokenData) public virtual;

    function validateBurn(bytes memory burnLogRLP) public pure virtual;

    function exitTokens(bytes memory burnLogRLP) public virtual;
}
```

### `ERC20Predicate.sol`

```jsx
contract ERC20Predicate is ITokenPredicate, Context {
    event LockedERC20(
        address indexed from,
        address indexed user,
        address indexed rootToken,
        uint256 amount
    );

    function lockTokens(
        address user,
        address rootToken,
        bytes memory tokenData
    ) public override {
        (uint256 amount) = abi.decode(tokenData, (uint256));
        require(
            IERC20(rootToken).allowance(_msgSender(), address(this)) >= amount,
            "ERC20Predicate: TRANSFER_NOT_APPROVED"
        );
        IERC20(rootToken).transferFrom(_msgSender(), address(this), amount);
        emit LockedERC20(_msgSender(), user, rootToken, amount);
    }

    function exitTokens(
        address withdrawer,
        address rootToken,
        bytes memory log
    ) public override {
				// TODO
    }
}
```

### `RootChainManager.sol`

```jsx
contract RootChainManager {
    mapping(bytes32 => address) internal _tokenPredicates;
		mapping(address => address) internal _rootToChildToken;
    mapping(address => bytes32) internal _tokenToType;
    
    function deposit(
        address user,
        address rootToken,
        bytes32 tokenType,
        bytes calldata tokenData) 
    external override {
        require(
            _rootToChildToken[rootToken] != address(0x0),
            "RootChainManager: TOKEN_NOT_MAPPED"
        );

        require(
            _tokenPredicates[tokenType] != address(0x0),
            "RootChainManager: TOKEN_TYPE_NOT_SUPPORTED"
        );

        address predicateAddress = _typeToPredicate[_tokenToType[rootToken]];
        ITokenPredicate(predicateAddress).lockTokens(
            _msgSender(),
            user,
            rootToken,
            depositData
        );

				_stateSender.syncState(_childChainManagerAddress, abi.encode(user, rootToken, tokenType, tokenData));
    }

		function exit(bytes calldata inputData) external override {
				// TODO: verify if exit processed using hash of (blockNumber, receipt, logIndex)

				// TODO: verify receipt inclusion

				// TODO: verify checkpoint inclusion

				// TODO: verify and transfer tokens by call to exitTokens of tokenPredicate
		}
}
```
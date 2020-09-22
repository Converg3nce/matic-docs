---
id: mapping-assets
title: Mapping Assets using POS
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

### intro

Assets can be transferred in between root chain & child chain. Let's be first clear regarding nomenclature

- **Root chain/ Base chain/ Parent chain/ Layer 1** :: all are same, referring to either Goerli or Ethereum Mainnet
- **Child chain/ Layer 2** :: refers to either Matic Mumbai or Matic Matic Mainnet

For assets i.e. ERC20, ERC721, ERC1155 to be transferrable in between chains, we need to be following certain guidelines

- Assets must have required predicate contracts deployed
- Asset contract need to deployed on root chain
- Modified version of asset contract needs to be deployed on child chain
- Then they need to be mapped by calling [`RootChainManager.mapToken(...)`](https://github.com/maticnetwork/pos-portal/blob/c50e4144d90fcd63aa3d5600b11ccfff9b395fcf/contracts/root/RootChainManager/RootChainManager.sol#L165), which can only be performed by certain accounts

> For mapping i.e. the final step, make sure you check [below](#request-submission)

### example

Here we're going to modify child smart contract, _given root smart contract_, for making it mapping eligible.

#### root token contract

Let's copy [this](https://github.com/maticnetwork/pos-portal/blob/master/contracts/child/ChildToken/ChildERC20.sol) smart contract & use it as our root token contract.

```js
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControlMixin} from "../../common/AccessControlMixin.sol";
import {IChildToken} from "./IChildToken.sol";
import {NativeMetaTransaction} from "../../common/NativeMetaTransaction.sol";
import {ChainConstants} from "../../ChainConstants.sol";
import {ContextMixin} from "../../common/ContextMixin.sol";


contract ChildERC20 is
    ERC20,
    IChildToken,
    AccessControlMixin,
    NativeMetaTransaction,
    ChainConstants,
    ContextMixin
{
    bytes32 public constant DEPOSITOR_ROLE = keccak256("DEPOSITOR_ROLE");

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address childChainManager
    ) public ERC20(name_, symbol_) {
        _setupContractId("ChildERC20");
        _setupDecimals(decimals_);
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(DEPOSITOR_ROLE, childChainManager);
        _initializeEIP712(name_, ERC712_VERSION);
    }

    // This is to support Native meta transactions
    // never use msg.sender directly, use _msgSender() instead
    function _msgSender()
        internal
        override
        view
        returns (address payable sender)
    {
        return ContextMixin.msgSender();
    }
}
```

Lets say we've just deployed this on Goerli Testnet at `0x...`.

#### child token contract


### request-submission

Please go through [this](/docs/develop/ethereum-matic/submit-mapping-request).

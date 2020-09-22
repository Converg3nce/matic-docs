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

Let's moidfy [this](https://github.com/maticnetwork/pos-portal/blob/master/contracts/child/ChildToken/ChildERC20.sol) smart contract & use it as our root token contract.

```js
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RootERC20 is ERC20,
{
    constructor(string memory name, string memory symbol, uint8 decimals) public ERC20(name, symbol) {
        
        _setupDecimals(decimals);
        _mint(msg.sender, 10 ** 27); // minting 10^9 MyToken, on root chain
    
    }

}
```

Lets say we've just deployed this on Goerli Testnet at `0x...`.

#### child token contract

Now we need to add two functions in above defined smart contract i.e. {`deposit`, `withdraw`}.

##### why ?

For transferring assets from root chain to child chain, we need to call [`RootChainManager.depositFor(...)`](https://github.com/maticnetwork/pos-portal/blob/c50e4144d90fcd63aa3d5600b11ccfff9b395fcf/contracts/root/RootChainManager/RootChainManager.sol#L205), which will eventually ask [`StateSender.syncState(...)`](https://github.com/maticnetwork/pos-portal/blob/c50e4144d90fcd63aa3d5600b11ccfff9b395fcf/contracts/root/StateSender/IStateSender.sol#L4), to transfer this asset from root chain to child chain, by emitting [`StateSynced`](https://github.com/maticnetwork/pos-portal/blob/c50e4144d90fcd63aa3d5600b11ccfff9b395fcf/contracts/root/StateSender/DummyStateSender.sol#L29) event. 

But before that make sure you've approved [`RootChainManagerProxy`](https://github.com/maticnetwork/static/blob/e9604415ee2510146cb3030c83d7dbebff6444ad/network/testnet/mumbai/index.json#L52) to spend equal amount of token, so that it can call `Token.transferFrom` & start deposit. 

Once this event is emitted, our Heimdal Nodes, which keep monitoring root chain periodically, will pick up `StateSynced` event & perform call to `onStateReceive` function of target smart contract. Here our target smart contract is nothing but [`ChildChainManager.onStateReceive`](https://github.com/maticnetwork/pos-portal/blob/c50e4144d90fcd63aa3d5600b11ccfff9b395fcf/contracts/child/ChildChainManager/ChildChainManager.sol#L48).

`deposit` method which we're going to add in our smart contract, is going to be called by [`ChildChainManagerProxy`](https://github.com/maticnetwork/static/blob/e9604415ee2510146cb3030c83d7dbebff6444ad/network/testnet/mumbai/index.json#L90) & can only be called by this one.

`withdraw` method to be called on child smart contract, which will be check pointed & published on root chain as Merkel Root Proof, which then can be finally exitted by calling [`RootChainManager.exit`](https://github.com/maticnetwork/pos-portal/blob/c50e4144d90fcd63aa3d5600b11ccfff9b395fcf/contracts/root/RootChainManager/RootChainManager.sol#L279), while submitting proof.

- Token minting happens in `deposit` method.
- Tokens to be burnt in `withdraw` method.

These rules need to followed to keep balance of assets between two chains, otherwise it'll be assets created from thin air.

> Note: No token minting in constructor of child token contract.

#### implementation

As we now know, why we need to implement `deposit` & `withdraw` methods in child token contract, we can proceed to implementing that.

```js
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;

    constructor(string memory name, string memory symbol, uint8 decimals) public ERC20(name, symbol) {
        
        _setupDecimals(decimals);
        // can't mint here, because minting in child chain smart contract's constructor not allowed
        // _mint(msg.sender, 10 ** 27);
    
    }

    function deposit(address user, bytes calldata depositData) external override {
        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        
        emit Transfer(address(0), account, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        
        emit Transfer(account, address(0), amount);
    }

}
```

### request-submission

Please go through [this](/docs/develop/ethereum-matic/submit-mapping-request).

**How to add custom restrictions to your ERC20 token on Matic Network**

ERC20 tokens on the Matic chain are standard contracts, auto-deployed by the Plasma root chain contracts, while registering a new ERC20 token on the Matic Network. These cannot be modified, in order to ensure all state transitions are mapped to fraud proofs in the root chain contracts, which basically allow these contracts to maintain the same security as the Ethereum network - this is a key component of the Plasma framework (fraud proofs).

However, in a real-world scenario, the ERC20 token owner may need to add custom restrictions on the contract, especially on the `transfer` function. 

**TL;DR**

- Implement the `beforeTransfer` function in the implementation of the IParentToken interface (https://github.com/maticnetwork/contracts/blob/master/contracts/child/IParentToken.sol) and deploy to the Matic chain.

**This page details the process to add custom transfer restrictions to your ERC20 token:**

- When the ERC20 token is added/mapped to the Matic Network, the function in the root contract(link) expects 
    - the rootchain token contract address,
    - metadata about the token and
    - the owner address

    This also auto-deploys a corresponding standard ERC20 token contract to the Matic chain, with a mapping to the root token contract. Also, the owner address has to be provided, which later allows for authorizing a deployment of an additional contract, by which the ERC20 token owner can add transfer restrictions on the contract in the Matic chain.
  
- To define any custom logic in the standard `transfer` function in the ERC20 token, you need to implement the `IParentToken` interface; see link here - https://github.com/maticnetwork/contracts/blob/master/contracts/child/IParentToken.sol

- The `beforeTransfer` hook function is the place where custom logic can be executed before each transfer. 
- The implemented contract must 
    - follow this interface,
    - return a `bool` value and 
    - in case of ERC20 contracts, it should not have `require` statements and instead return `false`
- Here is a sample `IParentToken` contract implementation:

<script src="https://gist.github.com/anurag-arjun/c7382e2abaf0822e6ec7e988eb46c92e.js"></script>

- Only the owner address given at the time of token registration will be able to add/update parent contract address (`IParentToken` implementation with the `beforeTransfer` hook) in the standard ChildToken contract on the Matic network
- For your information, you can get the address of the standard ChildToken contract (auto-deployed by the Matic root contracts) by querying the `tokens` mapping in the root contract (https://github.com/maticnetwork/contracts/blob/master/contracts/root/TokenManager.sol)

    ```solidity
    contract TokenManager {
        // mapping for (root token => child token)
        mapping(address => address) public tokens;
        ...
    }
    ```

- Ownership of the parent contract implemented in this manner (`IParentToken` implementation with the `beforeTransfer` hook) can be transferred by invoking the `setParent` function in the ChildERC20 contract on the Matic chain - see https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC20.sol

    ```js
    function setParent(address _parent) public isParentOwner {
        require(_parent != address(0x0));
        parent = _parent;
    }
    ```
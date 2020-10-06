---
id: api-reference
title: API
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
- <a href="#initialize"><code><b>new Matic()</b></code></a>
- <a href="#balanceOfERC20"><code>matic.<b>balanceOfERC20()</b></code></a>
- <a href="#balanceOfERC721"><code>matic.<b>balanceOfERC721()</b></code></a>
- <a href="#tokenOfOwnerByIndexERC721"><code>matic.<b>tokenOfOwnerByIndexERC721()</b></code></a>
- <a href="#depositEther"><code>matic.<b>depositEther()</b></code></a>
- <a href="#approveERC20TokensForDeposit"><code>matic.<b>approveERC20TokensForDeposit()</b></code></a>
- <a href="#depositERC20ForUser"><code>matic.<b>depositERC20ForUser()</b></code></a>
- <a href="#safeDepositERC721Tokens"><code>matic.<b>safeDepositERC721Tokens()</b></code></a>
- <a href="#transferERC20Tokens"><code>matic.<b>transferERC20Tokens()</b></code></a>
- <a href="#transferERC721Tokens"><code>matic.<b>transferERC721Tokens()</b></code></a>
- <a href="#startWithdraw"><code>matic.<b>startWithdraw()</b></code></a>
- <a href="#startWithdrawForNFT"><code>matic.<b>startWithdrawForNFT()</b></code></a>
- <a href="#withdraw"><code>matic.<b>withdraw()</b></code></a>
- <a href="#withdrawNFT"><code>matic.<b>withdrawNFT()</b></code></a>
- <a href="#getTransferSignature"><code>matic.<b>getTransferSignature()</b></code></a>
- <a href="#transferWithSignature"><code>matic.<b>transferWithSignature()</b></code></a>
- <a href="#processExits"><code>matic.<b>processExits()</b></code></a>

##### **WithdrawManager**

- <a href="#startExitForMintableBurntToken"><code>matic.<b>withdrawManager.startExitForMintableBurntToken()</b></code></a>
- <a href="#startExitForMetadataMintableBurntToken"><code>matic.<b>withdrawManager.startExitForMetadataMintableBurntToken()</b></code></a>

---

<a name="initialize"></a>

#### new Matic(options)

Creates Matic SDK instance with give options. It returns a MaticSDK object.

```js
import Matic from 'maticjs'

const matic = new Matic(options)
matic.initialize()
```

- `options` is simple Javascript `object` which can have following fields:
  - `maticProvider` can be `string` or `Web3.providers` instance. This provider must connect to Matic chain. Value can be anyone of following:
    - A free RPC URL that you can get from https://rpc.maticvigil.com/
    - `new Web3.providers.HttpProvider('http://localhost:8545')`
    - [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
  - `parentProvider` can be `string` or `Web3.providers` instance. This provider must connect to Ethereum chain (testnet or mainchain). Value can be anyone of following:
    - `'https://ropsten.infura.io'`
    - `new Web3.providers.HttpProvider('http://localhost:8545')`
    - [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
  - `rootChain` must be valid Ethereum contract address.
  - `registry` must be valid Ethereum contract address.
  - `withdrawManager` must be valid Ethereum contract address.
  - `depositManager` must be valid Ethereum contract address.

---
<a name="balanceOfERC20"></a>

#### matic.balanceOfERC20(userAddress, token, options)

get balance of ERC20 `token` for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For balance on Main chain, use `parent: true`

This returns `balance`.

Example:

```js
matic
  .balanceOfERC20('0xABc578455...', '0x5E9c4ccB05...', {
    from: '0xABc578455...',
  })
  .then(balance => {
    console.log('balance', balance)
  })
```

---

<a name="balanceOfERC721"></a>

#### matic.balanceOfERC721(userAddress, token, options)

get balance of ERC721 `token` for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For balance on Main chain, use `parent: true`

This returns `balance`.

Example:

```js
matic
  .balanceOfERC721('0xABc578455...', '0x5E9c4ccB05...', {
    from: '0xABc578455...',
  })
  .then(balance => {
    console.log('balance', balance)
  })
```

---

<a name="tokenOfOwnerByIndexERC721"></a>

#### matic.tokenOfOwnerByIndexERC721(userAddress, token, index, options)

get ERC721 tokenId at `index` for `token` and for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `index` index of tokenId

This returns matic `tokenId`.

Example:

```js
matic
  .tokenOfOwnerByIndexERC721('0xfeb14b...', '21', 0, {
    from: '0xABc578455...',
  })
  .then(tokenID => {
    console.log('Token ID', tokenID)
  })
```

<a name="depositEthers"></a>

#### matic.depositEthers(amount, options)

Deposit `options.value`

- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit).
  - `from` must be valid account address(required)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.depositEthers(amount, {
  from: '0xABc578455...',
})
```

---

<a name="approveERC20TokensForDeposit"></a>

#### matic.approveERC20TokensForDeposit(token, amount, options)

Approves given `amount` of `token` to `rootChainContract`.

- `token` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` (optional) must be valid javascript object containing `from`, `gasPrice`, `gasLimit`, `nonce`, `value`, `onTransactionHash`, `onReceipt` or `onError`
  - `from` must be valid account address(required)
  - `gasPrice` same as Ethereum `sendTransaction`
  - `gasLimit` same as Ethereum `sendTransaction`
  - `nonce` same as Ethereum `sendTransaction`
  - `value` contains ETH value. Same as Ethereum `sendTransaction`.
    This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.approveERC20TokensForDeposit('0x718Ca123...', '1000000000000000000', {
  from: '0xABc578455...',
})
```

---

<a name="depositERC20ForUser"></a>

#### matic.depositERC20ForUser(token, user, amount, options)

Deposit given `amount` of `token` with user `user`.

- `token` must be valid ERC20 token address
- `user` must be value account address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

matic.depositToken('0x718Ca123...', user, '1000000000000000000', {
  from: '0xABc578455...'
})
```

---

<a name="safeDepositERC721Tokens"></a>

#### matic.safeDepositERC721Tokens(token, tokenId, options)

Deposit given `TokenID` of `token` with user `user`.

- `token` must be valid ERC20 token address
- `tokenId` must be valid token ID
- `options` see [more infomation here](#approveERC20TokensForDeposit)

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.safeDepositERC721Tokens('0x718Ca123...', '70000000000', {
  from: '0xABc578455...',
})
```

---

<a name="transferERC20Tokens"></a>

#### matic.transferERC20Tokens(token, user, amount, options)

Transfer given `amount` of `token` to `user`.

- `token` must be valid ERC20 token address
- `user` must be value account address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For token transfer on Main chain, use `parent: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

matic.transferERC20Tokens('0x718Ca123...', user, '1000000000000000000', {
  from: '0xABc578455...',

  // For token transfer on Main network
  // parent: true
})
```

---

<a name="transferERC721Tokens"></a>

#### matic.transferERC721Tokens(token, user, tokenId, options)

Transfer given `tokenId` of `token` to `user`.

- `token` must be valid ERC721 token address
- `user` must be value account address
- `tokenId` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For token transfer on Main chain, use `parent: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

matic.transferERC721Tokens('0x718Ca123...', user, '100006500000000000000', {
  from: '0xABc578455...',

  // For token transfer on Main network
  // parent: true
})
```

---

<a name="startWithdraw"></a>

#### matic.startWithdraw(token, amount, options)

Start withdraw process with given `amount` for `token`.

- `token` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.startWithdraw('0x718Ca123...', '1000000000000000000', {
  from: '0xABc578455...',
})
```

---

<a name="startWithdrawForNFT"></a>

#### matic.startWithdrawForNFT(token, tokenId, options)

Start withdraw process with given `tokenId` for `token`.

- `token` must be valid ERC721 token address
- `tokenId` must be token tokenId (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.startWithdrawForNFT('0x718Ca123...', '1000000000000000000', {
  from: '0xABc578455...',
})
```

---

<a name="withdraw"></a>

#### matic.withdraw(txId, options)

Withdraw tokens on mainchain using `txId` from `startWithdraw` method after header has been submitted to mainchain.

- `txId` must be valid tx hash
- `options` see [more infomation here](#approveERC20TokensForDeposit)

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.withdraw('0xabcd...789', {
  from: '0xABc578455...',
})
```

---

<a name="withdrawNFT"></a>

#### matic.withdrawNFT(txId, options)

Withdraw tokens on mainchain using `txId` from `startWithdraw` method after header has been submitted to mainchain.

- `txId` must be valid tx hash
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.withdrawNFT('0xabcd...789', {
  from: '0xABc578455...',
})
```

---

#### matic.getTransferSignature

Off-chain signature generation for [transferWithSig](https://github.com/maticnetwork/contracts/blob/a9b77252ece25adcd3f74443411821883bb970e6/contracts/child/BaseERC20.sol#L35) function call

- `toSell` object
  - `token`: address of token owned,
  - `amount`: amount/tokenId of the token to sell,
  - `expiry`: expiry (block number after which the signature should be invalid),
  - `orderId`: a random 32 byte hex string,
  - `spender`: the address approved to execute this transaction
- `toBuy` object
  - `token`: address of token to buy
  - `amount`: amount/tokenId of token to buy
- `options` see [more infomation here](#approveERC20TokensForDeposit)

  - `from`: owner of the token (toSell)

  ```javascript
  // sell order
  let toSell = {
    token: token2,
    amount: value2,
    expiry: expire,
    orderId: orderId,
    spender: spender,
  }

  // buy order
  let toBuy = {
    token: token1,
    amount: value1,
  }

  const sig = await matic.getTransferSignature(toSell, toBuy, {
    from: tokenOwner,
  })
  ```

#### matic.transferWithSignature

Executes [transferWithSig](https://github.com/maticnetwork/contracts/blob/a9b77252ece25adcd3f74443411821883bb970e6/contracts/child/BaseERC20.sol#L35) on child token (erc20/721). Takes input as signature generated from `matic.getTransferSignature`

- `sig`: signature generated with matic.getTransferSignature
- `toSell`: object
  - `token`: address of token owned,
  - `amount`: amount/tokenId of the token to sell,
  - `expiry`: expiry (block number after which the signature should be invalid),
  - `orderId`: a random 32 byte hex string,
  - `spender`: the address approved to execute this transaction
- `toBuy`: object
  - `token`: address of token to buy
  - `amount`: amount/tokenId of token to buy
- `orderFiller`: address of user to transfer the tokens to
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `from`: the approved spender in the `toSell` object by the token owner

transfers `toSell.token` from `tokenOwner` to `orderFiller`

```javascript
// sell order
let toSell = {
  token: token2,
  amount: value2,
  expiry: expire,
  orderId: orderId,
  spender: spender,
}

// buy order
let toBuy = {
  token: token1,
  amount: value1,
}

const tx = await matic.transferWithSignature(
  sig, // signature with the intent to buy tokens
  toSell, // sell order
  toBuy, // buy order
  orderFiller, // order fulfiller
  {
    from: spender, // approved spender
  }
)
```

---

<a name="processExits"></a>

#### matic.processExits(rootTokenAddress, options)

Call processExits after completion of challenge period, after that withdrawn funds get transfered to your account on mainchain

- `rootTokenAddress` RootToken address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.processExits('0xabcd...789', {
  from: '0xABc578455...',
})
```

---

#### **WithdrawManager**

<a name="startExitForMintableBurntToken"></a>

#### matic.withdrawManager.startExitForMintableBurntToken(burnTxHash, predicate: address, options)

```
/**
  * Start an exit for a token that was minted and burnt on the side chain
  * Wrapper over contract call: MintableERC721Predicate.startExitForMintableBurntToken
  * @param burnTxHash Hash of the burn transaction on Matic
  * @param predicate address of MintableERC721Predicate
  */
```

See [MintableERC721Predicate.startExitForMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31)

```
const burn = await this.maticClient.startWithdrawForNFT(childErc721.address, tokenId)
await this.maticClient.withdrawManager.startExitForMintableBurntToken(burn.transactionHash, predicate.address)
```

---

<a name="startExitForMetadataMintableBurntToken"></a>

#### matic.withdrawManager.startExitForMintableBurntToken(burnTxHash, predicate: address, options)

```
/**
  * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
  * Wrapper over contract call: MintableERC721Predicate.startExitForMetadataMintableBurntToken
  * @param burnTxHash Hash of the burn transaction on Matic
  * @param predicate address of MintableERC721Predicate
  */
```

See [MintableERC721Predicate.startExitForMetadataMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66)

```
const burn = await this.maticClient.startWithdrawForNFT(childErc721.address, tokenId)
await this.maticClient.withdrawManager.startExitForMetadataMintableBurntToken(burn.transactionHash, predicate.address)
```

---

### Support

Please write to info@matic.network for integration support. If you have any queries, feedback or feature requests, feel free to reach out to us on telegram: [t.me/maticnetwork](https://t.me/maticnetwork)

### License

MIT

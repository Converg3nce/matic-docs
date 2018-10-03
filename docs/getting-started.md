# Getting Started

## DApp Server - Integration with Matic Network - for ERC20 transfers

This note details the steps to be followed by DApp developer(s) to integrate with the Matic test network and Kovan testnet, for scaling ERC20 transfers.

The flow for asset transfers on the Matic Network is as follows:

  1. User deposits crypto assets in Matic contract on mainchain (currently implemented with Ethereum blockchain only)

  2. Once deposited tokens get confirmed on the main chain, the corresponding tokens will get reflected on the Matic chain.

  3. The user can now transfer tokens to anyone they want instantly with negligible fees. Matic chain has faster blocks (approximately 1 second or less). That way, the transfer will be done almost instantly.

  4. Once a user is ready, they can withdraw remaining tokens from the main chain by establishing proof of remaining tokens on Root contract (contract deployed on Ethereum chain)


## Important Addresses and Links

**Matic Testnet link**: https://testnet.matic.network

**Kovan testnet addresses**

TEST mainchain ERC20 token: 0x670568761764f53E6C10cd63b71024c31551c9EC

Plasma Root Contract: 0x24e01716a6ac34D5f2C4C082F553D86a557543a7

**Matic testnet addresses**

TEST childchain ERC20 token: 0x343461c74133E3fA476Dbbc614a87473270a226c

### Tokens for testing
Please write to info@matic.network to request TEST tokens for development purposes. We will soon have a faucet in place for automatic distribution of tokens for testing.


## Step-by-step workflow details

### 1. Deposit ERC20 token from Kovan to Matic

**Description**: To deposit assets (ERC20) from Kovan testnet to Matic

**Network**: Kovan Testnet

    Contract: ERC20 contract
    e.g. use TEST mainchain ERC20 token for reference
    
    Function: approve(address _rootContract, uint256 _amount)

        _rootContract - address of the Plasma Root contract
        _amount - amount of tokens to be deposited

    Function: deposit(address _token, address _user, uint256 _amount)

        _token - address of the mainchain ERC20 token
        _user - address of the user
        _amount - amount of tokens to be deposited

  Sample code:

```javascript

async depositToken(a) {
  
  const rootChainAddress = '0x24e01716a6ac34d5f2c4c082f553d86a557543a7'
  const web3 = this.selectedNetwork.web3
  
  var rootChainContract = new web3.eth.Contract(
    RootContractAbi,
    rootChainAddress.toLowerCase()
  ) 

  var tokenContract = new web3.eth.Contract(TokenABI, a.address.toLowerCase())

  await tokenContract.methods
    .approve(rootChainAddress, web3.utils.toWei((2).toString()))
    .send({ from: this.accounts[0].address.toLowerCase() })

  var allowance = await tokenContract.methods
    .allowance(
      this.accounts[0].address.toLowerCase(),
      rootChainAddress.toLowerCase()
    )
    .call()

  await rootChainContract.methods
    .deposit(
      a.address.toLowerCase(),
      this.accounts[0].address.toLowerCase(),
      allowance
    )
    .send({ from: this.accounts[0].address.toLowerCase() })
}
```

### 2.  Transfer tokens on the sidechain

**Description**: To transfer tokens on the Matic sidechain

**Network**: Matic Testnet

    Contract: ERC20 contract
    e.g. use TEST mainchain ERC20 token for reference
    
    Function: transfer(address _to, uint256_amount)

        _to - Address of the user to which the tokens are to be transferred
        _amount - Amount of tokens to be transferred

Sample code:

```javascript
async transferTokens(token, user, amount, options = {}) {
  const _tokenContract = this._getChildTokenContract(token)
  return _tokenContract.methods.transfer(user, amount).send({
    from: this.wallet.address,
  ...options
  })
}
```

### 3. Display account balances for user

**Description**: Query ERC20 token balances for user

  Balance on Matic testnet:

  ```javascript
  
    const tokenAddress = '0xc60CEc8200513c4eAaF179783d30CdcE8DED8492'
    const address = '0x77559f3e4fc3f22d0a680993ad3a8b117cf5abfc'
    const TokenABI = require("./abi/erc20-token");
    const web3 = new Web3("https://testnet.matic.network");
    const erc20Contract = new web3.eth.Contract(TokenABI, tokenAddress);
    const balance = await erc20Contract.methods.balanceOf(address).call();
    console.log("balance", balance);
  ```
    
  Balance on Kovan testnet:
  
  ```javascript
    const tokenAddress = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2'
    const address = '0x77559f3e4fc3f22d0a680993ad3a8b117cf5abfc'
    const TokenABI = require("./abi/erc20-token");
    const web3 = new Web3("https://kovan.infura.io/matic");
    const erc20Contract = new web3.eth.Contract(TokenABI, tokenAddress);
    const balance = await erc20Contract.methods.balanceOf(address).call();
    console.log("balance", balance);
  ```


### 4. Withdraw ERC20 tokens from Matic to Kovan

**Description**: To withdrawing assets (ERC20) from Matic testnet to Kovan

**Networks**: Matic Testnet & Kovan Testnet

**Matic Testnet**: 
  
    Contract: Childchain ERC20 token contract
    e.g. use TEST childchain ERC20 token
  
    Function: withdraw(uint256 _amount)

        _amount - Amount of tokens to be withdrawn

Submit withdraw request with this code and get the transaction id:

```javascript
async withdrawToken() {
  this.isLoading = true
  const web3 = this.selectedNetwork.web3
  
  var childERC20Contract = new web3.eth.Contract(
    ChildTokenABI,
    this.withdrawTx.address.toLowerCase()
  )

  var withdrawData = childERC20Contract.methods.withdraw(
    web3.utils.toWei(this.amount.toString())
  )
  
  sendContractTransaction(
    this.selectedNetwork.web3,
    withdrawData,
    {
      from: this.accounts[0].address.toLowerCase()
    },
    {
      txShowSuccess: hash => {
        // Add transaction hash to firebase.
        fire.userPendingWithdrawalsRef(hash.toLowerCase()).set({
          transactionId: hash,        
          updatedAt: fire.FieldValue.serverTimestamp()
        })
        .then(() => {
          // reset form
          this.isWithdrawDone= !this.isWithdrawDone
          this.resetForm()
          // this.$router.push('/pending')
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    }
  )
}
```

**Kovan Testnet**: 

    Contract: Plasma root contract

    Function: withdraw(uint256 _headerNumber, bytes _headerProof, uint256 _blockNumber, uint256 _blockTime, bytes32 _txRoot,bytes32 _receiptRoot, bytes _path,bytes _txBytes, bytes _txProof, bytes _receiptBytes, bytes _receiptProof)

        _headerNumber - Header block number
        _headerProof - Header block proof
        _blockNumber - Plasma block number
        _blockTime - Timestamp of Plasma block creation
        _txRoot - Transaction root
        _receiptRoot - Receipt root
        _path - Key for the Trie
        _txBytes - Transaction Bytes
        _txProof - Transction Proof
        _receiptBytes - Receipt Bytes
        _receiptProof - Receipt Proof

Using the transaction id from previous step, call the following code:

```javascript
async submitProof(txId) {
  var transactionHash = txId
  const web3Child = new Web3('https://testnet.matic.network')
  const rootChainAddress = '0x24e01716a6ac34d5f2c4c082f553d86a557543a7'
  const web3 = new Web3(this.selectedNetwork.web3)

  var rootChainContract = new web3.eth.Contract(
    RootContractAbi,
    rootChainAddress.toLowerCase()
  )

  const withdrawTx = await web3Child.eth.getTransaction(transactionHash)
  
  const withdrawReceipt = await web3Child.eth.getTransactionReceipt(
    transactionHash
  )
  
  const withdrawBlock = await web3Child.eth.getBlock(
    withdrawReceipt.blockNumber,
    true
  )

  var withdrawObj = {
    txId: txId,
    block: withdrawBlock,
    tx: withdrawTx,
    receipt: withdrawReceipt
  }

  const txProof = await getTxProof(withdrawObj.tx, withdrawObj.block)

  const receiptProof = await getReceiptProof(
    withdrawObj.receipt,
    withdrawObj.block,
    web3Child
  )
  
  const currentHeaderBlock = await rootChainContract.methods
    .currentHeaderBlock()
    .call()
  
  var header = await rootChainContract.methods
    .getHeaderBlock(parseInt(currentHeaderBlock) - 1)
    .call()

  const headerNumber = +currentHeaderBlock - 1
  const start = header.start
  const end = header.end
  const headers = await getHeaders(start, end, web3Child)
  const tree = new MerkleTree(headers)
  const headerProof = await tree.getProof(getBlockHeader(withdrawObj.block))
  
  const startWithdrawReceipt = await rootChainContract.methods
    .withdraw(
      headerNumber.toString(), // header block
      utils.bufferToHex(Buffer.concat(headerProof)), // header proof
      withdrawObj.block.number.toString(), // block number
      withdrawObj.block.timestamp.toString(), // block timestamp
      utils.bufferToHex(withdrawObj.block.transactionsRoot.toString()), // tx root
      utils.bufferToHex(withdrawObj.block.receiptsRoot.toString()), // tx root
      utils.bufferToHex(rlp.encode(receiptProof.path)), // key for trie (both tx and receipt)
      utils.bufferToHex(getTxBytes(withdrawObj.tx)), // tx bytes
      utils.bufferToHex(rlp.encode(txProof.parentNodes)), // tx proof nodes
      utils.bufferToHex(getReceiptBytes(withdrawObj.receipt)), // receipt bytes
      utils.bufferToHex(rlp.encode(receiptProof.parentNodes)) // reciept proof nodes
    )
    .send({
      from: this.accounts[0].address.toLowerCase()
    })
  }
```





  
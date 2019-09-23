For most developers, it is advisable and recommended to use the Matic.js library to interact with Matic.

However, this page helps developers, who have a good understanding of smart contracts in Ethereum, to bypass the Matic.js library and interact directly with the Matic smart contracts. This might help developers to understand the inner workings of Matic Network, as well as to customise their interaction with Matic to some extent.

## Important Addresses and Links

**Matic RPC endpoint**: `https://testnet2.matic.network`

|Contract|ABI|Ropsten|Matic|
|---|---|---|---|
|TEST (ERC20) token|<a target = "_blank" href="https://raw.githubusercontent.com/maticnetwork/matic.js/master/artifacts/StandardToken.json"><img src="https://img.icons8.com/metro/26/000000/download.png" width="25px" style=" padding: 2px;"></a>|`0x70459e550254b9d3520a56ee95b78ee4f2dbd846`|`0xc82c13004c06E4c627cF2518612A55CE7a3Db699`|
|Plasma Root Contract|<a target = "_blank" href="https://raw.githubusercontent.com/maticnetwork/matic.js/master/artifacts/RootChain.json"><img src="https://img.icons8.com/metro/26/000000/download.png" width="25px" style=" padding: 2px;"></a>|`0x60e2b19b9a87a3f37827f2c8c8306be718a5f9b4`|   |

### Tokens for testing

To get some `TEST` tokens on Ropsten network, you can access the Matic Faucet by clicking on the link below:

<div style="text-align: center; padding-top: 15px; padding-bottom: 15px;">
<button class="btn btn-primary btn-md" style="padding: 15px;background-color: #000;color: #fff; border-radius: 4px;cursor: pointer; box-shadow: 0px 4px 7px -4px rgba(0,0,0,0.75);">
  <a href="https://wallet.matic.today/faucet" target="_blank" style="color:inherit;">
    Get Test Tokens
  </a>
</button>
</div>

## Workflow

### 1. Deposit ERC20 token from Ropsten to Matic

**Description**: To deposit assets (ERC20) from Ropsten to Matic

Let the required amount of tokens be **X**.

1. The Plasma Root Contract is approved to spend **X** on behalf of msg.sender
    - **Contract**: `StandardToken.sol`
    - **Network**: Ropsten
    - **Function**: 
        ```javascript
        /**
         * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
         * @param _rootContract address of plasma root contract
         * @param _amount amount of tokens to approve
         **/
        approve(address _rootContract, uint256 _amount)
        ```
2. **X** tokens are deposited from msg.sender to the Plasma Root   Contract
    - **Contract**: `RootChain.sol`
    - **Network**: Ropsten
    - **Function**:
      ```javascript
      /**
       * @dev deposit tokens for another user. transfers tokens to current contract and generates a deposit block
       * @param _token address of mainchain erc20 token
       * @param _user address of the user
       * @param _amount amount of tokens to be deposited
       **/
      deposit(address _token, address _user, uint256 _amount)
      ```

**Sample code**:

```javascript

async depositToken(tokenAddress, amount) {

  const rootChainAddress = '0x70459e550254b9d3520a56ee95b78ee4f2dbd846' 
  const web3 = this.selectedNetwork.web3

  var rootChainContract = new web3.eth.Contract(
    RootContractAbi,
    rootChainAddress.toLowerCase()
  )

  var tokenContract = new web3.eth.Contract(TokenABI, tokenaddress.toLowerCase())

  await tokenContract.methods
    .approve(rootChainAddress, web3.utils.toWei((amount).toString()))
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

### 2. Transfer tokens on Matic

**Description**: To transfer tokens on Matic testnet

- **Contract**: `StandardToken.sol`
- **Network**: Matic
- **Function**: 
      ```javascript
      /**
        * @dev Transfer token to a specified address
        * @param to The address to transfer to.
        * @param value The amount to be transferred.
        */
      transfer (address _to, uint256 _amount)
      ```

**Sample code**:

```javascript
async transferTokens(tokenAddress, to, amount) {
  var tokenContract = new web3.eth.Contract(TokenABI, tokenAddress.toLowerCase())

  await tokenContract.methods
    .transfer(to, amount)
    .send({ from: this.accounts[0].address.toLowerCase() })
}
```

### 3. Display account balances for users on Matic

**Description**: Query ERC20 token balances for user on Matic and Ropsten

- **Contract**: `StandardToken.sol`
- **Network**: Matic
- **Function**: 
      ```javascript
      /**
       * @dev Gets the balance of the specified address.
       * @param owner The address to query the balance of.
       * @return A uint256 representing the amount owned by the passed address.
       */
      balanceOf (address _to, uint256 _amount)
      ```


**Sample code for Balance on Matic testnet**:

```javascript
const web3 = new Web3("https://testnet.matic.network")

async getBalanceMatic (accountAddress) {
  const erc20Contract = new web3.eth.Contract(TokenABI, tokenAddress)
  const balance = await erc20Contract.methods.balanceOf(accountAddress).call()
  console.log("balance", balance)
}

```

**Sample code for Balance on Ropsten testnet**:

```javascript
const web3 = new Web3("https://ropsten.infura.io/<insert custom key>")

async getBalanceRopsten (accountAddress) {
  const erc20Contract = new web3.eth.Contract(TokenABI, tokenAddress)
  const balance = await erc20Contract.methods.balanceOf(accountAddress).call()
  console.log("balance", balance)
}
```

### 4. Withdraw ERC20 tokens from Matic to Ropsten

**Description**: To withdraw assets (ERC20) from Matic testnet to Ropsten

Let **X** be the amount of tokens to be withdrawn.

1. Submit withdraw request of **X** tokens on Matic - burns the tokens and returns a tx ID.
    - **Contract**: `ChildERC20.sol`
    - **Network**: Matic
    - **Function**: 
        ```javascript
        /**
         * @dev Withdraw tokens
         *
         * @param amount tokens
         */
        function withdraw(uint256 amount)
        ```
2. Use tx ID from previous step to create a withdraw transaction on Ropsten
    - **Contract**: `Rootchain.sol`
    - **Network**: Ropsten
    - **Function**:
      ```javascript
      /**
       * @dev withdraws the tokens burnt on matic  
       * @param headerNumber header block
       * @param headerProof proof
       * @param blockNumber block number
       * @param blockTime Timestamp of Plasma block creation
       * @param txRoot tx root 
       * @param receiptRoot receipt root
       * @param path Key for the Trie 
       * @param txBytes tx bytes
       * @param txProof tx proof nodes
       * @param receiptBytes receipt bytes
       * @param receiptProof receipt proof nodes
      **/
      function withdrawBurntTokens(
        uint256 headerNumber,
        bytes headerProof,

        uint256 blockNumber,
        uint256 blockTime,
        bytes32 txRoot,
        bytes32 receiptRoot,
        bytes path,

        bytes txBytes,
        bytes txProof,

        bytes receiptBytes,
        bytes receiptProof
      )
      ```
3. Process Exits
    - **Contract**: `RootChain.sol`
    - **Network**: Ropsten
    - **Function**: 
        ```javascript
        /**
         * @dev Processes any exits that have completed the exit period.
         */
        function processExits(address _token) 
        ```

**Sample Code**

Submit withdraw request and get tx ID:

```javascript

_web3 = new Web3 (maticProvider)

async startWithdraw(tokenAddress, amount, _from) {
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
    
    return tokenContract.methods.withdraw(amount).send(
      from: _from
    )
}
```

Use the tx ID to withdraw burnt tokens:

```javascript
async submitProof (txId) {
var transactionHash = txId
  const web3Child = new Web3(maticProvider)
  const rootChainAddress = '0x60e2b19b9a87a3f37827f2c8c8306be718a5f9b4'
  const web3 = new Web3(ropstenProvider)

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
    .withdrawBurntTokens(
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

Process Exits:

```javascript
async processExits (rootTokenAddress) {
  const rootChainAddress = '0x60e2b19b9a87a3f37827f2c8c8306be718a5f9b4'
  const web3 = new Web3(ropstenProvider)

  var rootChainContract = new web3.eth.Contract(
    RootContractAbi,
    rootChainAddress.toLowerCase()
  )
  rootChainContract.methods.processExits(
      rootTokenAddress
    ).send ({
      from: this.accounts[0].address.toLowerCase()
    })
}
```
Instructions on how to join an existing public testnet.

As soon as we start the public testnet event you would be able to see the genesis file and other required configurations and seed-nodes [here](https://github.com/maticnetwork/public-testnets).

### Join public testnet

#### Step 1: Get Heimdall genesis config

```js
$ git clone https://github.com/maticnetwork/public-testnets

//NOTE: Do make sure to join the relevant folder
$ cd public-testnets/<testnet version>
// Example: $ cd public-testnets/CS-1001

// copy genesis file to config directory
$ cp heimdall-genesis.json ~/.heimdalld/config/genesis.json

// copy config file to config directory
$ cp heimdall-config.toml ~/.heimdalld/config/heimdall-config.toml

// generate ropsten api key if you don't have one. 
[Steps to generate ropsten API key](https://ethereumico.io/knowledge-base/infura-api-key-guide/ "Generate Ropsten API Key")

Add your api key in ~/.heimdalld/config/heimdall-config.toml
```

#### Step 2: Configure peers for Heimdall

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers separated by commas in file at `~/.heimdalld/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`

Refer to `heimdall-seeds.txt` for peer info in your testnet folder.

#### Step 3: Start & sync Heimdall

You can start heimdall and other associated services now using the link below!

> Click here to understand how you can [Run Heimdall](../heimdall/run-heimdall)

#### Step 4: Initialise genesis block for Bor

```js
// go to bor-config directory
$ cd bor-config

// Using genesis file of validator bor node
$ cp ../<testnet version>/bor-genesis.json genesis.json

// initialize Genesis Block
$ $GOPATH/src/github.com/maticnetwork/bor/build/bin/bor --datadir dataDir init genesis.json

```

#### Step 5: Configure peers for Bor


You can configure permanent static nodes by putting something like the following into `<datadir>/bor/static-nodes.json`with the format `pubkey@IP:PORT` or `pubkey@DOMAIN:PORT`

Refer `static-nodes.json` for the enode url to use in the `static-nodes.json` file.

```js
$ cp static-nodes.json ../bor-config/dataDir/bor/
```

#### Step 6: Start Bor

```js
$ bash start.sh

```

Your `bor-node` should be syncing now! Checkout `logs/bor.log` to get to the logs 🤩

#### Step 7: Query data

To see examples on how to query your full node and get network status, please refer here: https://api.matic.network/staking/cs1001/swagger-ui/



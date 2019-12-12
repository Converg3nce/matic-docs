Instructions on how to join an existing public testnet.

As soon as we start the public testnet event you would be able to see the genesis file and other required configurations and seed-nodes [here](https://github.com/maticnetwork/public-testnets).

Before we start with the steps make sure you have installed `heimdall` and `bor` binaries or have the docker image for [`heimdall`](./heimdall/running-with-docker) and [`bor`](./bor/running-with-docker)) running.

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

//  Generate ropsten api key if you don't have one.
// Generate API key using: https://ethereumico.io/knowledge-base/infura-api-key-guide
// NOTE: Add your api key in ~/.heimdalld/config/heimdall-config.toml under the key "eth_RPC_URL"
```

Do check the checksums of the files from [here](https://github.com/maticnetwork/public-testnets)

#### Step 2: Configure peers for Heimdall

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers separated by commas in file at `~/.heimdalld/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`

Refer to `heimdall-seeds.txt` for peer info in your testnet folder.

#### Step 3: Start & sync Heimdall

Before starting do verify you are on the correct version by running the below command

```
$ heimdallcli version --long

// Expected Output
name: heimdall
server_name: heimdalld
client_name: heimdallcli
version: CS-1001
commit: 812ab544c1f658acf5f84c0b2e4bfe9943fa4854
go: go version go1.13.4 darwin/amd64
```

You can start heimdall and other associated services like [rest-server](https://docs.matic.network/staking/heimdall/run-heimdall/#run-rest-server) now using the link below!

> Click here to understand how you can [Run Heimdall](../heimdall/run-heimdall).
> NOTE: If you are starting heimdall after a crash or simply changed genesis files you need to [reset heimdall](../heimdall/run-heimdall/#reset-heimdall) before moving forward.
> For Stage-0 there is no need to start bridge as you don't need to send any transactions

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

To sync blocks on the testnet, you need to add peers. The file `static-nodes.json` contains information for all the availalble seed nodes. Let's copy this file to your datadir so that when you start your nodes you already have peers!

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

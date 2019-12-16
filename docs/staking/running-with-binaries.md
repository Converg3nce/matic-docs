# Setup Matic Validator Node

### Step 1: Install GO

Install go by following the [official docs](https://golang.org/doc/install). Remember to set your `$GOPATH`, `$GOBIN`, and `$PATH` environment variables, for example:

```js
$ mkdir -p $HOME/go/bin
$ echo "export GOPATH=$HOME/go" >> ~/.bash_profile
$ source ~/.bash_profile
$ echo "export GOBIN=$GOPATH/bin" >> ~/.bash_profile
$ source ~/.bash_profile
$ echo "export PATH=$PATH:$GOBIN" >> ~/.bash_profile
$ source ~/.bash_profile

```

Or we have a script to install go for you

```js

$ curl https://gist.githubusercontent.com/vaibhavchellani/cbe0fa947dc0a6557cb9583d081ff8ce/raw/d47b3df14ccffdd7a965e44c39fb5ec235360166/new.sh > install_go.sh
$ bash install_go.sh

```

> Note: Go version 1.11+ is recommended

### Step 2: Install DEP

Steps to install DEP are [here](https://golang.github.io/dep/docs/installation.html)

Or you can install by running the commands given below
```
$ curl https://raw.githubusercontent.com/golang/dep/master/install.sh -o install_dep.sh
$ sh install_dep.sh 
```


<!-- ### Install RabbitMq

A helper service called `bridge` which is embedded into heimdall codebase requires `rabbit-mq` to queue transactions to multiple networks. Installing it should be pretty straightforward. Checkout the download instructions [here](https://www.rabbitmq.com/download.html).

```js

$ rabbitmq-server

```

This will run the `rabbitmq` server
> NOTE: You don't need rabbit-mq for stage-0 so you can skip -->
### Step 3: Install make

You need to install `make` to run some commands. Using the below commands you can install `make` depending on your system.

**For Ubuntu**
```
$ sudo apt-get install build-essential
```

**For MacOS**

```
$ brew install make
```

### Step 4: Install Heimdall

Next, let's install the latest version of Heimdall. Here, we'll use the master branch, which contains the latest stable release. If necessary, make sure you `git checkout` the correct [released version](https://github.com/maticnetwork/heimdall/releases)

```js
$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/heimdall
$ cd heimdall

// Checkout to a public-testnet version.
// For eg: git checkout CS-1001
$ git checkout <TAG OR BRANCH>
$ make dep && make install
```

That will install the `heimdalld` and `heimdallcli` binaries. Verify that everything is OK:

```bash 
$ heimdalld --help
```

**Set up a new node**

```bash 
$ heimdalld init
```

This will emit the following output which shows your node id and chain id, these can be changed before starting a chain from the genesis file.

```bash
{
  "chain_id": "heimdall-pldzov",
  "node_id": "ae8fd49c192f39a400c00b328d4fd109d5bcb71d"
}
```
### Step 5: Install Bor

```js

$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/bor
$ cd bor
// Checkout to a public-testnet version.
// For eg: git checkout CS-1001
$ git checkout <TAG OR BRANCH>
$ make bor

```

Now you have `bor` installed on your local system and the binary is available in the path `build/bin/bor`

**Adding peers**

Bor also supports a feature called static nodes if you have certain peers you always want to connect to. Static nodes are re-connected on disconnects. You can configure permanent static nodes by putting something like the following example into `<datadir>/bor/static-nodes.json:`

```js
[
  "enode://f4642fa65af50cfdea8fa7414a5def7bb7991478b768e296f5e4a54e8b995de102e0ceae2e826f293c481b5325f89be6d207b003382e18a8ecba66fbaf6416c0@33.4.2.1:30303",
  "enode://ENODEID@ip:port"
];
```

For more info on how to connect to peers see [this](https://geth.ethereum.org/docs/interface/peer-to-peer).

**Connecting to console** 

Just like geth you can connect to bor console to execute various types of queries! From your `dataDir` run the following command.

> Note: If you are trying to connect to a public-testnet, your dataDir is mostly `public-testnets/bor-config/dataDir`

```
$ $GOPATH/src/github.com/maticnetwork/bor/build/bin/bor attach geth.ipc
```
### Step 6: Join public testnet

#### 6.1: Get Heimdall genesis config

```js
$ git clone https://github.com/maticnetwork/public-testnets

//NOTE: Do make sure to join the relevant folder
$ cd public-testnets/<testnet version>
// Example: $ cd public-testnets/CS-1001

// copy genesis file to config directory
$ cp heimdall-genesis.json ~/.heimdalld/config/genesis.json

// copy config file to config directory
$ cp heimdall-config.toml ~/.heimdalld/config/heimdall-config.toml
```

> NOTE: In case you do not have a ropsten API key, generate one using: https://ethereumico.io/knowledge-base/infura-api-key-guide

Add your API key in file `~/.heimdalld/config/heimdall-config.toml` under the key `"eth_RPC_URL"`.

#### 6.2: Configure peers for Heimdall

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers separated by commas in file at `~/.heimdalld/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`

Refer to `heimdall-seeds.txt` for peer info in your testnet folder.

#### 6.3: Start & sync Heimdall

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

**Run Heimdall**

Starting Heimdall is fairly easy, the below command will start heimdall using the genesis file in `~/.heimdalld/config/genesis.json`.

```js

$ heimdalld start

```

**Run rest-server**

The rest-server can be used by external services like explorer, faucets etc to connect to heimdall chain for fetching data and sending transactions.

```js

$ heimdalld rest-server

```

**Run Bridge**

Bridge is a helper package that sends transactions to heimdall on behalf of validators. All interactions with other chains happens via this bridge.

> NOTE: Skip this part of the step for Stage 0 as this is needed only when you stake to participate in validation and need to send transactions.

```js

$ bridge start --all

```

> Note: Bridge won't run without `rabbitmq` and `rest-server` so ensure they are running before trying to run bridge.

**Reset Heimdall**

> NOTE: To be used only if you need to restart Heimdall and delete old data in the event of a crash or if there are changes in genesis files.

Use the following to delete blockchain data and reset everything.

```js

$ heimdalld unsafe-reset-all

```

**Check sync status** 

To check the sync status you can run the follwing command on your node

```
$ curl http://localhost:26657/status

// Output 
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "c4abb0ddd80a413f35f9db2d5b4bc573417b95c4",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-wOVEJp",
      "version": "0.31.5",
      "channels": "4020212223303800",
      "moniker": "Vaibhavs-MacBook-Air.local",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "E9219F1FBE049B19A919FBF39F46600ADCD7B690C29C92B37408F36046E51C1A",
      "latest_app_hash": "99418B51E32845F2164BCBA0772D5D357F548804E66E226287981B61B9A406BD",
      "latest_block_height": "3",
      "latest_block_time": "2019-12-12T06:45:29.823953Z",
      "catching_up": false
    },
    "validator_info": {
      "address": "EE9DF712A0D9D09A79525ABF05E72D44F796EDD3",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BLwVPibHZJX8//8URR3THmIVSY9lNyuuhCPRjLm57dZP6AJM+XP6Y7nVd3lnZgR1qBOnEnPop8RFEvOUHgeN5X4="
      },
      "voting_power": "10"
    }
  }
}
```

The key called `catching_up` will show your sync status, if it's not catching up it means that you are fully synced!

#### 6.4: Initialise genesis block for Bor

```js
// go to bor-config directory that you'll find under 'public-testnets' 
$ cd bor-config

// Using genesis file of validator bor node
$ cp ../<testnet version>/bor-genesis.json genesis.json

// initialize Genesis Block
$ $GOPATH/src/github.com/maticnetwork/bor/build/bin/bor --datadir dataDir init genesis.json

```

#### 6.5: Configure peers for Bor

To sync blocks on the testnet, you need to add peers. The file `static-nodes.json` in your relevant public-testnets version folder contains information for all the availalble seed nodes. Let's copy this file to your datadir so that when you start your nodes you already have peers!

```js
$ cp static-nodes.json ../bor-config/dataDir/bor/
```

#### 6.6: Start Bor

```js
// You'll find the following in bor-config directory
$ bash start.sh

```

Your `bor-node` should be syncing now! Checkout `logs/bor.log` to get to the logs 🤩

#### 6.7: Query data

To see examples on how to query your full node and get network status, please refer here: https://api.matic.network/staking/cs1001/swagger-ui/


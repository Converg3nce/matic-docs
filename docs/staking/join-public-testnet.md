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

```

#### Step 2: Configure peers for Heimdall

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers separated by commas in file at `~/.heimdalld/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`

Refer to `seeds.txt` for peer info in your testnet folder.

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

Refer `seeds.txt` for the enode url to use in the `static-nodes.json` file.

```js
[
  "enode://15b76114a7949bb74e0db919cf34db7cec67902ba596c4b22e82502f60f5d21d0d10c61e0db6bf0b2bfa5a358356aba38107a4f533a908c4463a928047a3b83a@34.202.53.230:30303"
];
```

#### Step 6: Start Bor

```js
$ bash start.sh

```

Your `bor-node` should be syncing now! Checkout `logs/bor.log` to get to the logs 🤩

#### Step 7: Query data

To see examples on how to query your full node and get network status, please refer here: https://api.matic.network/staking/cs1001/swagger-ui/



---
id: binaries-validator-sentry-setup
title: Setup your Validator & Sentry Node using Binaries
sidebar_label: Setup Sentry + Validator (Binaries)
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## We strongly recommend not using a laptop if you are running a full node.

This guide will help you setup your **Validator Node** as well your **Sentry Node**. However, you will have to setup your nodes in parallel, as setting them both up successfully will require relay of information from your Sentry node to validator and vice versa. **Please follow the steps carefully**

Note that here onwards, each step would contain a legend (**Required for Sentry**) whenever a Step is required for setting your Sentry Node. This basically means that you will have to follow that step for Sentry. For setting your Validator node, all of the steps will be applicable albeit a few changes in the config files, which will be described in the steps below.

Also, note that your Sentry node needs to be a **separate** machine or VM when you're setting it up.


### Step 1: Install GO (**Required for Sentry Node**)



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

### Step 2: Install RabbitMq (**Required for Sentry Node**)

**Why do you need RabbitMq?**

**Required for Sentry**

RabbitMQ is a message-queueing software also known as a message broker or queue manager. Simply said; it is software where queues are defined, to which applications connect in order to transfer a message or messages.

A helper service called `bridge` which is embedded into heimdall codebase requires `rabbit-mq` to queue transactions to multiple networks. Installing it should be pretty straightforward. Checkout the download instructions here: https://www.rabbitmq.com/download.html.

```bash

$ rabbitmq-server

```

### Step 3: Install make (**Required for Sentry Node**)


You need to install `make` to run some commands. Using the below commands you can install `make` depending on your system.

**For Ubuntu**

```bash
$ sudo apt-get install build-essential
```

**For MacOS**

```bash
$ brew install make
```

Please note that if you do have a previous setup of Heimdall and Bor installed on your machine, you will have to remove it completely before you proceed. You can follow the instructions in this link to remove Heimdall and Bor completely: https://forum.matic.network/t/how-to-delete-previous-entries-of-heimdall-and-bor/163

### Step 4: Install Heimdall (**Required for Sentry Node**)

Next, let's install the latest version of Heimdall. Here, we'll use the master branch, which contains the latest stable release. If necessary, make sure you `git checkout` the correct [released version](https://github.com/maticnetwork/heimdall/releases)

```js
$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/heimdall
$ cd heimdall

// Checkout to a public-testnet version.
// For eg: git checkout v0.1.8
$ git checkout <TAG OR BRANCH>
$ make install
```

That will install the `heimdalld` and `heimdallcli` binaries. Verify that everything is OK:

```bash
$ heimdalld --help
```

**Set up a new node**

```bash
$ heimdalld init
$ echo "export HEIMDALLDIR=~/.heimdalld" >> ~/.bashrc
$ source ~/.bashrc
```

This will emit an output which shows your node id and chain id, these can be changed before starting a chain from the genesis file.

```json
{
  "chain_id": "heimdall-pldzov",
  "node_id": "ae8fd49c192f39a400c00b328d4fd109d5bcb71d"
}
```

### Step 5: Install Bor (**Required for Sentry Node**)

```js

$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/bor
$ cd bor
// Checkout to a public-testnet version.
// For eg: git checkout v0.1.8
$ git checkout <TAG OR BRANCH>
$ make all

```

Now you have `bor` installed on your local system and the binary is available in the path `build/bin/bor`

<!-- #CHECK following step is the same as in running-with-docker -->

### Step 6: Join public testnet 

`CONFIGPATH` for Validator Node and Sentry Node will be different. You will need to make sure that these `CONFIGPATH` is set correctly for your Validator and Sentry Node.

`Validator Node = .../CS-2008/sentry/validator`
`Sentry Node = .../CS-2008/sentry/sentry`

#### 6.1: Get Heimdall genesis config (**Required for Sentry Node**)

```js
$ git clone https://github.com/maticnetwork/public-testnets

//NOTE: Do make sure to join the relevant folder
$ cd public-testnets/<testnet version>
// Current testnet version is CS-2008
// Example: $ cd public-testnets/CS-2008

$ cd sentry/sentry

$ echo "export CONFIGPATH=$PWD" >> ~/.bashrc

$ source ~/.bashrc

// copy genesis file to config directory
$ cp $CONFIGPATH/heimdall/config/genesis.json  $HEIMDALLDIR/config/genesis.json

// copy heimdall-config file to config directory
$ cp $CONFIGPATH/heimdall/config/heimdall-config.toml $HEIMDALLDIR/config/heimdall-config.toml

// copy config file to config directory
$ cp $CONFIGPATH/heimdall/config/config.toml $HEIMDALLDIR/config/config.toml

```

> NOTE: In case you do not have a Goerli API key, generate one using: https://ethereumico.io/knowledge-base/infura-api-key-guide

You can use the same Infura key for both your Validator and Sentry node, however since Infura has a threshold limit for free accounts upto 100k/requests per day, it is recommended that you use different Infura Keys for both, Validator and Sentry node.

Add your API key in file `~/.heimdalld/config/heimdall-config.toml` under the key `"eth_RPC_URL"`.

**Generate Heimdall private key**

This step is only required for your **Validator Node**. The Sentry node does not require generating `validatorkey`.

If you have received Matic tokens as part of Counter-stake, you need to generate validator key on Heimdall to participate.

The private key required as the input is your Ethereum/Goerli wallet's Private key, where you received the test Matic tokens. You will be able to locate it in the wallet settings, depending on the Ethereum wallet you use.

    heimdallcli generate-validatorkey <Your Ethereum/Goerli wallet private key>

This will create **priv_validator_key.json** in the same folder.

Move this validator key file to heimdall config folder.

    mv ./priv_validator_key.json $HEIMDALLDIR/config

#### 6.2: Configure peers for Heimdall (**Required for Sentry Node**)

Configuring Peers for your Heimdall is slightly different when you're setting your Sentry node alongside your Validator node.

**Config changes for Sentry Node**

Open the `config.toml` file

```js
vi ~/.heimdalld/config/config.toml
```

* Now in this file, check for the parameter `pex`. The value for this parameter should be `true`.

* Check for the parameter `private_peer_ids`. You will need to add your Validator NodeID here. To get your Validator NodeID, **you will need to run this command on your Validator node instance**: `heimdalld tendermint show-node-id`. After you add your NodeID it should look something like this `private_peer_ids = "2170800c8a57c5e09b59992902f39ba350f1c0ff"`

* Check for the parameter `addr_book_strict`. This should also be set to `false`

* In the `persistent_peers`, you will need to add one peer from the `heimdall-seeds.txt` file and your Validator node id in the following format:

```js
persistent_peers = "<validator NodeID@validator_instance_ip:26656,one peer from heimdall-seeds.txt"
```

Note that peers are other nodes you want to sync to in order to maintain your full node. Peers are specified in the following format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`.

**Config changes for Validator Node**

Once you're done with the changes for your Sentry Node you can do the same on your Validator node. Open the `config.toml` file

```js
vi ~/.heimdalld/config/config.toml
```

* Now in this file, check for the parameter `pex`. The value for this parameter should be `false`.

* Check for the parameter `private_peer_ids`. This should be commented out or there should be a "#" at the start of the line.

* Check for the parameter `addr_book_strict`. This should also be set to `false`

* In the `persistent_peers`, you will need to add your Sentry NodeID here. To get your Sentry NodeID, **you will need run this command on the Sentry node instance**: `heimdalld tendermint show-node-id` and add it in the following format.

```js
persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"
```


#### 6.3: Start & sync Heimdall (Required for Sentry Node)

Before starting do verify you are on the correct version by running the below command

```bash
$ heimdallcli version --long
```

<!-- #CHECK following `run` commands are same as in deploy-your-own-testnet -->

**Run Heimdall**

Starting Heimdall is fairly easy, the below command will start Heimdall using the genesis file in `~/.heimdalld/config/genesis.json`. Make sure that you start Heimdall for your Sentry Node first and only then start it for your Validator Node.

```js

$ heimdalld start

```

In Binaries, running the above command will not create a log. In order to create a log for Heimdall you can run this command instead

```js

$ cd

$ mkdir logs

$ heimdalld start > logs/heimdalld.log 2>&1 &
```

**Run rest-server** (Required for Sentry Node)

The rest-server can be used by external services like explorer, faucets etc to connect to heimdall chain for fetching data and sending transactions.

```js
$ heimdalld rest-server
```

If you wish to write logs for `rest-server` you can run this command instead

```js
heimdalld rest-server > logs/heimdalld-rest-server.log 2>&1 &
```


**Run Bridge**

Bridge is a helper package that sends transactions to heimdall on behalf of validators. All interactions with other chains happens via this bridge. This need not be run for your Sentry Node.

```bash
$ bridge start --all
```

Similarly, for Heimdall bridge, you can run this command to write logs for it

```js
bridge start --all > logs/heimdalld-bridge.log 2>&1 &
```

> Note: Bridge won't run without `rabbitmq` and `rest-server` so ensure they are running before trying to run bridge.

**Reset Heimdall**

> NOTE: To be used only if you need to restart Heimdall and delete old data in the event of a crash or if there are changes in genesis files.

Use the following to delete blockchain data and reset everything.

```bash
$ heimdalld unsafe-reset-all
$ rm -rf $HEIMDALLDIR/bridge
```

**Check sync status**

To check the sync status you can run the follwing command on your node

```js
$ curl http://localhost:26657/status
```
```js
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

**Expected Output**

Your `heimdall-node` should be syncing now! You can check the logs by running the command

```js
tail -f ~/.heimdalld/logs/heimdall.log
```

If everything's well, then your logs should look something like this:

<img src={useBaseUrl("img/staking/expected-heimdall.png")} />

If you're running into any issues while setting up your Heimdall node, you can refer the [Technical FAQs](technical-faqs) for solutions

**You need to make sure that you let Heimdall node sync completely and only then move on to the next steps**


#### 6.4: Initialise genesis block for Bor (Required for Sentry Node)

```js

// Go to 'public-testnets' and testnet version
$ cd $CONFIGPATH/bor

// initialize Genesis Block and peers
$ bash setup.sh

$ echo "export BORDIR=~/.bor" >> ~/.bashrc
```

This will create Bor home directory at `~/.bor` and data directory at `~/.bor/dataDir`

#### 6.5: Configure peers for Bor

To sync blocks on the testnet, you need to add peers. The file `static-nodes.json` in your relevant public-testnets version folder contains information for all the available seed nodes. It will be already copied using `bash setup.sh` command.

**Configuring peers for Bor on Sentry Node**

* Run this command `bootnode -genkey ~/nodekey` command to generate the nodekey **on the Sentry node**.

* Run this command `mv ~/nodekey ~/.bor/dataDir/bor/`  to copy the nodekey to the Bor data directory.

* Run this command `bootnode -nodekey ~/.bor/dataDir/bor/nodekey -writeaddress` to get the enodeID which will be used in validator node static-nodes.json file. Keep the EnodeID handy with you as it will be required for your Validator node.

* Now you will need to update the `static-nodes.json` file on your Sentry node. To open the file run `sudo vi ~/.bor/dataDir/bor/static-nodes.json`. You should see an output like this:

```js
[
  "<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>",
  "enode://43b9003dd03cfe2032f52e72a27681904611e8b7f49879f4f314807f041c0009cb9058b3f1cc4d3daaa23d18d48fe7f16d03d2405089c938365617ccbb29730d@54.211.245.52:30303",
  "enode://5fd33505c51dc91f181875a0f8c9e5386ea1bec3d19a03b8ce8cb64dee18b5c511133a3d5de19dce11e7968808d8f2bcbcdc66e828a5b575a69de3b6b654f162@54.84.215.227:30303",
  "enode://0884422c6bea61259adfb47d05dc73d86e046b2556eb9ed3082301b4311b6c1b28d4a4ca9a9d38144f4e61005fe32c3a99e3c92d23794e01883434826a22d83d@34.197.83.153:30303",
  "enode://f7b2b98d411e8940cae3db8c23cd4288321b4309670feec870450e286c8a9b62b5ca95a7a20fe8d056ddae57e40c2a7a19851904f4231e0a9710e16ad71587e9@54.237.61.33:30303",
  "enode://e3f5a660b9bc633815ccf507a4eed53a96cdd2976dd951e0ac70fa0b4b803134a681801bb2a25ea8db1d39f90f4ab3684a905629e86fece7cccb1d7dd013c9e0@18.214.246.244:30303"
]
```

You will need your EnodeID of your **Validator node**. To get the enode for your validator follow the following steps:

* Run this command `bootnode -genkey ~/nodekey` command to generate the nodekey **on the Validator node**.

* Run this command `mv ~/nodekey ~/.bor/dataDir/bor/`  to copy the nodekey to the Bor data directory.

* Run this command `bootnode -nodekey ~/.bor/dataDir/bor/nodekey -writeaddress` to get the enodeID.

Once you get the EnodeID for your Validator Node, you can then add it to your `static-nodes.json` file **on the Sentry node**. Note, you can either keep all the other peers in the static-nodes.json file or your can keep just 1 along with your Validator EnodeID. If you don't keep your Validator EnodeID here, your validator will not sync correctly.

Once you're done adding your Validator EnodeID to the file, you're done with updating the config for your Sentry Node.

**Configuring peers for Bor on the Validator Node**

You will need to add the EnodeID of your Sentry Node to the validator node config. To get the EnodeID check the section above.

* Now you will need to update the `static-nodes.json` file on your Validator node. To open the file run `sudo vi ~/.bor/dataDir/bor/static-nodes.json`**on your Validator node**. You should see an output like this:

```js
[
  "<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"
]
```


**Adding additional peers (optional)**

If you have certain peers you always want to connect to, you can configure permanent static nodes by putting something like the following example into `~/.bor/dataDir/bor/static-nodes.json`

```bash
[
  "enode://f4642fa65af50cfdea8fa7414a5def7bb7991478b768e296f5e4a54e8b995de102e0ceae2e826f293c481b5325f89be6d207b003382e18a8ecba66fbaf6416c0@33.4.2.1:30303",
  "enode://ENODEID@ip:port"
]
```

For more info on how to connect to peers see [this](https://geth.ethereum.org/docs/interface/peer-to-peer).

#### 6.6 **Generate Bor keystore file**

> **Note this is only needed for the Validator Bor node, and not for the Sentry Bor node**

To generate a Bor keystore for your validator, you can run the following command. The private key required as the input is your Ethereum/Goerli's wallet Private key. This would be the same private key that you used for generating your `validator-key`. 

```bash
heimdallcli generate-keystore <Your Ethereum/>Goerli wallet private key>
```

Once you run this command you will be requested for a passphrase. A passphrase can be considered as password too. This passphrase will be used to encrypt the keystore file.

This will create a keystore file in UTC format. For example:

```
UTC--2020-02-10T10-11-48.027180000Z--6c468cf8c9879006e22ec4029696e005c2319c9d
```

Do `ls` here and you will see the file name in the above format.

Now you will have to move the keystore file to bor data directory.

```bash
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

**Add password.txt**

Add the password that you entered in the password.txt file

```
$ vim ~/.bor/password.txt
```

Add phrase you choose during generating key store file in `password.txt`

#### 6.7: Start Bor

You will need to start Bor on your Sentry Node first and only then on your Validator Node. 

To start Bor on your Sentry node run:

```js
$ bash sentry-bor-start.sh
```

To start Bor on your Validator Node run:

```js
// You'll find the following in bor-config directory
$ bash start.sh <Your address>
```

**Expected Output**

Your `bor-node` should be syncing now! Checkout `~/.bor/logs/bor.log` to get to the logs 🤩 or you could run the following command:

```js
tail -f ~/.bor/logs/bor.log
```

If everything's well, then your logs should look something like this:

<img src={useBaseUrl("img/staking/expected-bor.png")} />

If you're running into any issues while setting up your Bor node, you can refer the [Technical FAQs](technical-faqs) for solutions.

**Ta-Da**

You're now running a Sentry node along with your Validator node. In order to stake on Matic, you can go ahead follow the [Stake on Matic guide](stake-on-matic)

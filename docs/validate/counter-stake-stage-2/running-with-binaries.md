---
id: running-with-binaries
title: Setup Matic Validator Node
sidebar_label: Running with Binaries
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## We strongly recommend not using a laptop if you are running a full node.

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

### Step 2: Install RabbitMq

**Why do you need RabbitMq?**

RabbitMQ is a message-queueing software also known as a message broker or queue manager. Simply said; it is software where queues are defined, to which applications connect in order to transfer a message or messages.

A helper service called `bridge` which is embedded into heimdall codebase requires `rabbit-mq` to queue transactions to multiple networks. Installing it should be pretty straightforward. Checkout the download instructions here: https://www.rabbitmq.com/download.html.

```bash

$ rabbitmq-server

```

### Step 3: Install make

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

### Step 4: Install Heimdall

Next, let's install the latest version of Heimdall. Here, we'll use the master branch, which contains the latest stable release. If necessary, make sure you `git checkout` the correct [released version](https://github.com/maticnetwork/heimdall/releases)

```js
$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/heimdall
$ cd heimdall

// Checkout to a public-testnet version.
// For eg: git checkout cs-2007
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

### Step 5: Install Bor

```js

$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/bor
$ cd bor
// Checkout to a public-testnet version.
// For eg: git checkout v0.1.7
$ git checkout <TAG OR BRANCH>
$ make bor

```

Now you have `bor` installed on your local system and the binary is available in the path `build/bin/bor`

<!-- #CHECK following step is the same as in running-with-docker -->

### Step 6: Join public testnet

#### 6.1: Get Heimdall genesis config

```js
$ git clone https://github.com/maticnetwork/public-testnets

//NOTE: Do make sure to join the relevant folder
$ cd public-testnets/<testnet version>
// Current testnet version is CS-2007
// Example: $ cd public-testnets/CS-2007

$ echo "export CONFIGPATH=$PWD" >> ~/.bashrc

$ source ~/.bashrc

// copy genesis file to config directory
$ cp $CONFIGPATH/heimdall/config/genesis.json  $HEIMDALLDIR/config/genesis.json

// copy config file to config directory
$ cp $CONFIGPATH/heimdall/config/heimdall-config.toml $HEIMDALLDIR/config/heimdall-config.toml
```

> NOTE: In case you do not have a Goerli API key, generate one using: https://ethereumico.io/knowledge-base/infura-api-key-guide

Add your API key in file `~/.heimdalld/config/heimdall-config.toml` under the key `"eth_RPC_URL"`.

**Generate Heimdall private key**

If you have received Matic tokens as part of Counter-stake, you need to generate validator key on Heimdall to participate.

The private key required as the input is your Ethereum/Goerli wallet's Private key, where you received the test Matic tokens. You will be able to locate it in the wallet settings, depending on the Ethereum wallet you use.

    heimdallcli generate-validatorkey <Your Ethereum/Goerli wallet private key>

This will create **priv_validator_key.json** in the same folder.

Move this validator key file to heimdall config folder.

    mv ./priv_validator_key.json $HEIMDALLDIR/config

#### 6.2: Configure peers for Heimdall

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers in the file at `~/.heimdalld/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`

To see the list of peers, run the following command, you could do so by running the command `cat /public-testnets/CS-2007/heimdall/heimdall-seeds.txt`.

All you need to do is add 1 Peer from this list to your `persistent_peers` in the format mentioned above. Make sure that you add at least one peer from the list, else you will run into connection issues. Try to choose a peer randomly from between to ensure you don't overload specific peers.

```js
vi ~/.heimdalld/config/config.toml
```

#### 6.3: Start & sync Heimdall

Before starting do verify you are on the correct version by running the below command

```bash
$ heimdallcli version --long
```

<!-- #CHECK following `run` commands are same as in deploy-your-own-testnet -->

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

```bash
$ bridge start --all
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


#### 6.4: Initialise genesis block for Bor

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

**Adding additional peers (optional)**

If you have certain peers you always want to connect to, you can configure permanent static nodes by putting something like the following example into `~/.bor/dataDir/bor/static-nodes.json`

```bash
[
  "enode://f4642fa65af50cfdea8fa7414a5def7bb7991478b768e296f5e4a54e8b995de102e0ceae2e826f293c481b5325f89be6d207b003382e18a8ecba66fbaf6416c0@33.4.2.1:30303",
  "enode://ENODEID@ip:port"
]
```

For more info on how to connect to peers see [this](https://geth.ethereum.org/docs/interface/peer-to-peer).

**Generate Bor keystore file**

To generate a BOR keystore for your validator, you can run the following command. The private key required as the input is your Ethereum/Goerli's wallet Private key. This would be the same private key that yo used for generating your `validator-key`

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

If your `Heimdall` and `Bor` logs are fine, that your node setup is complete. Congratulations on reaching so far!

Once you are done checking the logs or querying the data, you may proceed to staking tokens. Here is you can stake on Matic: [How to Stake](stake-on-matic)

In case you encounter blockers or high severity bugs, you can report all such issues/bugs directly to Github issues of respective repositories.

For an issue you have encountered specifically with Heimdall or Heimdall related, you can create an issue in the Heimdall repository: https://github.com/maticnetwork/heimdall/issues

For issues, you have encountered specifically with Bor or Bor related, you can create an issue in the Bor repository: https://github.com/maticnetwork/bor/issues

For clear identification, you can also use labels to tag the issues reported.

Upon reporting an issue, the Matic Project team will review and update/comment on the status of the issue. Depending on the severity of the issue, the Matic project team may request you to create a PR to provide a fix. Bounties and incentives would be provided for such issues.

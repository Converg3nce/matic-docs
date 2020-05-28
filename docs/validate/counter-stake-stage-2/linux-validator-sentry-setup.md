---
id: linux-validator-sentry-setup
title: Setup your Validator & Sentry Node using Linux Packages
sidebar_label: Setup Sentry + Validator (Linux)
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';



> The following has been tested to work with: Ubuntu 16.04 or later, CentOS 7 or later, RHEL 7 or later,  Debian  8 or later.


Please note that if you do have a previous setup of Heimdall and Bor installed on your machine, you will have to remove it completely before you proceed. You can follow the instructions in this link to remove Heimdall and Bor completely: https://forum.matic.network/t/how-to-delete-previous-entries-of-heimdall-and-bor/163

## We strongly recommend not using a laptop if you are running a full node.

This guide will help you setup your **Validator Node** as well your **Sentry Node**. However, you will have to setup your nodes in parallel, as setting them both up successfully will require relay of information from your Sentry node to validator and vice versa. **Please follow the steps carefully**

Note that here onwards, each step would contain a legend (**Required for Sentry**) whenever a Step is required for setting your Sentry Node. This basically means that you will have to follow that step for Sentry. For setting your Validator node, all of the steps will be applicable albeit a few changes in the config files, which will be described in the steps below.

Also, note that your Sentry node needs to be a **separate** machine or VM when you're setting it up.

### Step 1: Install rabbit-mq (**Required for Sentry**)

You can ignore this step if you have RabbitMQ already installed.

**Why do you need RabbitMq?**

RabbitMQ is a message-queueing software also known as a message broker or queue manager. Simply said; it is software where queues are defined, to which applications connect in order to transfer a message or messages.

A helper service called `bridge` which is embedded into heimdall codebase requires `rabbit-mq` to queue transactions to multiple networks. Installing it should be pretty straightforward. Checkout the download instructions here: https://www.rabbitmq.com/download.html.

**For Ubuntu/Debian**

```js
$ sudo apt-get install rabbitmq-server

$ sudo service rabbitmq-server start
```
       
### Step 2: Download Heimdall And Bor (**Required for Sentry**)

**For Ubuntu/Debian**

```js
$ wget https://matic-public.s3.amazonaws.com/v0.1.8/matic-heimdall_0.1.8_amd64.deb
$ wget https://matic-public.s3.amazonaws.com/v0.1.8/matic-bor_0.1.8_amd64.deb
```

    
### Step 3: Install Heimdall And Bor (**Required for Sentry**)
    
This will setup needed services for the validator nodes - Heimdall and Bor

**For Ubuntu/Debian**
   
```js
$ sudo dpkg -i matic-heimdall_0.1.8_amd64.deb
$ sudo dpkg -i matic-bor_0.1.8_amd64.deb
```
   
### Step 4: Configure Heimdall (**Required for Sentry**)

**Add heimdalld alias**

```js
$ echo alias heimdalld='"sudo heimdalld --home /etc/heimdall"' >> ~/.bashrc
$ echo alias heimdallcli='"sudo heimdallcli --home /etc/heimdall"' >> ~/.bashrc

$ source ~/.bashrc
```

**Initiate heimdalld node**

```js
$ heimdalld init
```

**Get Heimdall genesis config**

`CONFIGPATH` for Validator Node and Sentry Node will be different. You will need to make sure that these `CONFIGPATH` is set correctly for your Validator and Sentry Node.

`Validator Node = .../CS-2008/sentry/validator`
`Sentry Node = .../CS-2008/sentry/sentry`

```js
$ git clone https://github.com/maticnetwork/public-testnets

//NOTE: Do make sure to join the relevant folder
$ cd public-testnets/<testnet version>
// Current testnet version is CS-2008
// Example: $ cd public-testnets/CS-2008

// For validator node the CONFIGPATH would be ../CS-2008/sentry/validator
// For sentry node the CONFIGPATH would be .../CS-2008/sentry/sentry

$ echo "export CONFIGPATH=$PWD" >> ~/.bashrc

$ source ~/.bashrc

// copy genesis file to config directory
$ sudo cp $CONFIGPATH/heimdall/config/genesis.json /etc/heimdall/config/genesis.json

// copy heimdall-config file to config directory
$ sudo cp $CONFIGPATH/heimdall/config/heimdall-config.toml /etc/heimdall/config/heimdall-config.toml

// copy config file to config directory
$ sudo cp $CONFIGPATH/heimdall/config/config.toml /etc/heimdall/config/config.toml
```

> NOTE: In case you do not have a Goerli API key, generate one using: https://ethereumico.io/knowledge-base/infura-api-key-guide

Add your API key in file `/etc/heimdall/config/heimdall-config.toml` under the key `"eth_RPC_URL"`.

``` js
$ sudo vi /etc/heimdall/config/heimdall-config.toml
```

    
### Step 5: Configure peers for Heimdall

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers at `/etc/heimdall/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`.

Configuring Peers for your Heimdall is slightly different when you're setting your Sentry node alongside your Validator node.

**Config changes for Sentry Node**

Open the `config.toml` file

```js
sudo vi /etc/heimdall/config/config.toml
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
sudo vi /etc/heimdall/config/config.toml
```

* Now in this file, check for the parameter `pex`. The value for this parameter should be `false`.

* Check for the parameter `private_peer_ids`. This should be commented out or there should be a "#" at the start of the line.

* Check for the parameter `addr_book_strict`. This should also be set to `false`

* In the `persistent_peers`, you will need to add your Sentry NodeID here. To get your Sentry NodeID, **you will need run this command on the Sentry node instance**: `heimdalld tendermint show-node-id` and add it in the following format.

```js
persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"
```


### Step 6: Generate Heimdall private key

Note: This is not required for Sentry Node

If you have received Matic tokens as part of Counter-stake, you need to generate validator key on Heimdall to participate.

The private key required as the input is your Ethereum/Goerli wallet's Private key, where you received the test Matic tokens. You will be able to locate it in the wallet settings, depending on the Ethereum wallet you use.

```js
$ heimdallcli generate-validatorkey <Your Ethereum/Goerli wallet private key>

$ sudo mv ./priv_validator_key.json /etc/heimdall/config/
```

### Step 7: Run Heimdall (Required for Sentry Node)

Make sure that you start Heimdall for your Sentry Node first and only then start it for your Validator Node.

**Start Heimdalld**
    
```js
$ sudo service heimdalld start 
``` 
      
**Start Heimdall rest-server**
    
```js
$ sudo service heimdalld-rest-server start
```
    
**Start Heimdall bridge-server**
    
```js
sudo service heimdalld-bridge start
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

Your `heimdall-node` should be syncing now! You can see view the logs by running this command:

```js
journalctl -u heimdalld.service -f 
```

To get logs for Heimdall rest-server, you can run this command:

```js
journalctl -u heimdalld-rest-server.service -f 
```

To get logs for Heimdall Bridge, you can this command:

```js
journalctl -u heimdalld-bridge.service -f 
```

Note: Running the Bridge is not required for Sentry Node.

If everything's well, then your logs should look something like this:

<img src={useBaseUrl("img/staking/expected-heimdall.png")} />

If you're running into any issues while setting up your Heimdall node, you can refer the [Technical FAQs](technical-faqs) for solutions.

Tip: If you are getting any errors during Heimdall start or logs, you can run the Unsafe Reset command and then start heimdall again

```js
heimdalld unsafe-reset-all
```

And then Heimdall start

```js
sudo service heimdalld start
```


**You need to make sure that you let Heimdall node sync completely and only then move on to the next steps**
    
### Step 8: Configure Bor (Required for Sentry Node)

**Initialise genesis block for Bor**
   
```js
$ sudo cp $CONFIGPATH/bor/genesis.json /etc/bor/

$ cd /etc/bor/

$ sudo bor --datadir /etc/bor/dataDir init genesis.json

$ sudo cp $CONFIGPATH/bor/static-nodes.json /etc/bor/dataDir/bor/static-nodes.json

   
```
### Step 10: Generate Bor keystore file

Note: This step is not required for your Sentry Node.

If you have received Matic tokens as part of Counter-stake. You need to generate a keystore for BOR here.

To generate a BOR keystore for your validator, you can run the following command. The private key required as the input is your Etherum/Goerli's wallet Private key. This would be the same private key that yo used for generating your `validator-key`

```js
 heimdallcli generate-keystore <Your Ethereum/Goerli wallet private key>
```

Once you run this command you will be requested for a passphrase. A passphrase can be considered as password too. This passphrase will be used to encrypt the keystore file.

Store the passphrase in file named  

```js 
password.txt
```

The previous step will create a keystore file in UTC format. For example:

```js 
 UTC--2020-02-10T10-11-48.027180000Z--6c468cf8c9879006e22ec4029696e005c2319c9d
```

Copy above generated file and passsword file to Bor Data Directory

```js
sudo mv ./UTC-<time>-<address> /etc/bor/dataDir/keystore/

sudo mv password.txt /etc/bor/dataDir/
```

### Step 11: Add NETWORK_ID and VALIDATOR_ADDRESS to `/etc/bor/metadata`

For your Validator Node you need to do the following changes:

```js
$ sudo vi  /etc/bor/metadata

// eg: add the NETWORK_ID and VALIDATOR_ADDRESS and NODE_TYPE in the following format:
NETWORK_ID=2008
VALIDATOR_ADDRESS=<your Ethereum/Goerli wallet address>
NODE_TYPE=validator
```

For your Sentry node you need to do the following changes:

```js
$ sudo vi  /etc/bor/metadata

// eg: add the NETWORK_ID and VALIDATOR_ADDRESS and NODE_TYPE in the following format:
NETWORK_ID=2008
VALIDATOR_ADDRESS=<your Ethereum/Goerli wallet address>
NODE_TYPE=sentry
```

### Step 12: Adding EnodeID to your Validator and Sentry Node

To sync blocks on the testnet, you need to add peers. The file `static-nodes.json` in your relevant public-testnets version folder contains information for all the available seed nodes. It will be already copied using `bash setup.sh` command.

**Configuring peers for Bor on Sentry Node**

* Run this command `bootnode -genkey ~/nodekey` command to generate the nodekey **on the Sentry node**.

* Run this command `mv ~/nodekey /etc/bor/dataDir/bor/`  to copy the nodekey to the Bor data directory.

* Run this command `bootnode -nodekey /etc/bor/dataDir/bor/nodekey -writeaddress` to get the enodeID which will be used in validator node static-nodes.json file. Keep the EnodeID handy with you as it will be required for your Validator node.

* Now you will need to update the `static-nodes.json` file on your Sentry node. To open the file run `sudo vi /etc/bor/dataDir/bor/static-nodes.json`. You should see an output like this:

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

* Run this command `mv ~/nodekey /etc/bor/dataDir/bor/`  to copy the nodekey to the Bor data directory.

* Run this command `bootnode -nodekey /etc/bor/dataDir/bor/nodekey -writeaddress` to get the enodeID.

Once you get the EnodeID for your Validator Node, you can then add it to your `static-nodes.json` file **on the Sentry node**. Note, you can either keep all the other peers in the static-nodes.json file or your can keep just 1 along with your Validator EnodeID. If you don't keep your Validator EnodeID here, your validator will not sync correctly.

Once you're done adding your Validator EnodeID to the file, you're done with updating the config for your Sentry Node.

**Configuring peers for Bor on the Validator Node**

You will need to add the EnodeID of your Sentry Node to the validator node config. To get the EnodeID check the section above.

* Now you will need to update the `static-nodes.json` file on your Validator node. To open the file run `sudo vi /etc/bor/dataDir/bor/static-nodes.json`**on your Validator node**. You should see an output like this:

```js
[
  "<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"
]
```


### Step 13: Start Bor

Make sure that you start Bor on your Sentry Node first and only then on your Validator Node.

```js
 sudo service bor start
```
**Expected Output**

You can run the following command:

```js
$ journalctl -u bor.service -f
```

If everything's well, then your logs should look something like this:

<img src={useBaseUrl("img/staking/expected-bor.png")} />

If you're running into any issues while setting up your Bor node, you can refer the [Technical FAQ's](technical-faqs) for solutions.

**Ta-Da**

You're now running a Sentry node along with your Validator node. In order to stake on Matic, you can go ahead follow the [Stake on Matic guide](stake-on-matic)

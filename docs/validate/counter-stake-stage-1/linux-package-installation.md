---
id: linux-package-installation
title: Setup Matic Validator Node
sidebar_label: Linux Package Installation
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Matic Validator Node

> The following has been tested to work with: Ubuntu 16.04 or later, CentOS 7 or later, RHEL 7 or later,  Debian  8 or later.

**TL;DR** - We have made a video demonstrating step by step on how to setup your Heimdall and Bor nodes


<center>
    <iframe width="700" height="480" src="https://matic-public.s3.amazonaws.com/CS-2001/mat-full-node-setup.mp4">
    </iframe>
</center>


Please note that if you do have a previous setup of Heimdall and Bor installed on your machine, you will have to remove it completely before you proceed. You can follow the instructions in this link to remove Heimdall and Bor completely: https://forum.matic.network/t/how-to-delete-previous-entries-of-heimdall-and-bor/163

### Step 1: Install rabbit-mq

**Why do you need RabbitMq?**

RabbitMQ is a message-queueing software also known as a message broker or queue manager. Simply said; it is software where queues are defined, to which applications connect in order to transfer a message or messages.

A helper service called `bridge` which is embedded into heimdall codebase requires `rabbit-mq` to queue transactions to multiple networks. Installing it should be pretty straightforward. Checkout the download instructions here: https://www.rabbitmq.com/download.html.

**For Ubuntu/Debian**

```js
$ sudo apt-get install rabbitmq-server

$ sudo service rabbitmq-server start
```
       
### Step 2: Download Heimdall And Bor

**For Ubuntu/Debian**

```js
$ wget https://matic-public.s3.amazonaws.com/cs-2004/matic-heimdall_0.1.4_amd64.deb
$ wget https://matic-public.s3.amazonaws.com/cs-2004/matic-bor_0.1.4_amd64.deb
```

    
### Step 3: Install Heimdall And Bor
    
This will setup needed service for the validator node; Heimdall and Bor

**For Ubuntu/Debian**
   
```js
$ sudo dpkg -i matic-heimdall_0.1.4_amd64.deb
$ sudo dpkg -i matic-bor_0.1.4_amd64.deb
```
   
### Step 4: Configure Heimdall

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

```js
$ git clone https://github.com/maticnetwork/public-testnets

//NOTE: Do make sure to join the relevant folder
$ cd public-testnets/<testnet version>
// Current testnet version is CS-2004
// Example: $ cd public-testnets/CS-2004

$ echo "export CONFIGPATH=$PWD" >> ~/.bashrc

$ source ~/.bashrc

// copy genesis file to config directory
$ sudo cp $CONFIGPATH/heimdall/config/genesis.json /etc/heimdall/config/genesis.json

// copy config file to config directory
$ sudo cp $CONFIGPATH/heimdall/config/heimdall-config.toml /etc/heimdall/config/heimdall-config.toml
```

> NOTE: In case you do not have a Goerli API key, generate one using: https://ethereumico.io/knowledge-base/infura-api-key-guide

Add your API key in file `/etc/heimdall/config/heimdall-config.toml` under the key `"eth_RPC_URL"`.

``` js
$ sudo vi /etc/heimdall/config/heimdall-config.toml
```

    
### Step 5: Configure peers for Heimdall

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers at `/etc/heimdall/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`.

Open the config.toml file from `$CONFIGPATH/heimdall/heimdall-seeds.txt`. All you need to do is add 1 Peer from this list to your `persistent_peers` in the format mentioned above. Make sure that you add at least one peer from the list, else you will run into connection issues. Try to choose a peer randomly from between to ensure you don't overload specific peers.


To see the list of peers, run the following command `cat $CONFIGPATH/heimdall/heimdall-seeds.txt`. Copy any 1 peer from the list and paste it in the `config.toml` file. You can open `config.toml` by running this command:

``` js
$ sudo vi /etc/heimdall/config/config.toml 
```

### Step 6: Generate Heimdall private key

If you have received Matic tokens as part of Counter-stake, you need to generate validator key on Heimdall to participate.

The private key required as the input is your Ethereum/Goerli wallet's Private key, where you received the test Matic tokens. You will be able to locate it in the wallet settings, depending on the Ethereum wallet you use.

```js
$ heimdallcli generate-validatorkey <Your Ethereum/Goerli wallet private key>

$ sudo mv ./priv_validator_key.json /etc/heimdall/config/
```

### Step 7: Run Heimdall

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
$ sudo service heimdalld-bridge start
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

Your `heimdall-node` should be syncing now! You can see logs of the above services under `/var/log/matic-logs/` 🤩 or you could also run the command

```js
tail -f /var/log/matic-logs/heimdalld.log
```

If everything's well, then your logs should look something like this:

<img src={useBaseUrl("img/staking/expected-heimdall.png")} />

If you're running into any issues while setting up your Heimdall node, you can refer the [Technical FAQs](technical-faqs) for solutions.


**You need to make sure that you let Heimdall node sync completely and only then move on to the next steps**
    
### Step 8: Configure Bor

**Initialise genesis block for Bor**
   
```js
$ sudo cp $CONFIGPATH/bor/genesis.json /etc/bor/

$ cd /etc/bor/

    
$ sudo bor --datadir /etc/bor/dataDir init genesis.json

$ sudo cp $CONFIGPATH/bor/static-nodes.json /etc/bor/dataDir/bor/static-nodes.json

   
```
### Step 9: Generate Bor keystore file

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

This will create a keystore file in UTC format. For example:

```js 
 UTC--2020-02-10T10-11-48.027180000Z--6c468cf8c9879006e22ec4029696e005c2319c9d
```

Copy above generated file and passsword file to Bor Data Directory

```js
sudo mv ./UTC-<time>-<address> /etc/bor/dataDir/keystore/

sudo mv password.txt /etc/bor/dataDir/
```

### Step 9: Add your address to `/etc/bor/metadata`

```js
$ sudo vi  /etc/bor/metadata

// eg: add the address in following format VALIDATOR_ADDRESS=0xasdasklhemwlmasdsad3ewwew 
```


### Step 9: Start Bor

```js
 sudo service bor start
```
**Expected Output**

You can see logs of Bor service under `/var/log/matic-logs/bor.log` 🤩 or you could run the following command:

```js
tail -f /var/log/matic-logs/bor.log
```

If everything's well, then your logs should look something like this:

<img src={useBaseUrl("img/staking/expected-bor.png")} />

If you're running into any issues while setting up your Bor node, you can refer the [Technical FAQ's](technical-faqs) for solutions.

**Ta-Da**

If your `Heimdall` and `Bor` logs are fine, that your node setup is complete. Congratulations on reaching so far!

Once you are done checking the logs or querying the data, you may proceed to staking tokens. Here is you can stake on Matic: [How to Stake](stake-on-matic)

<!-- #### Query data

To see examples on how to query your full node and get network status, please refer here: https://api.matic.network/staking/cs1001/swagger-ui/ -->

In case you encounter blockers or high severity bugs, you can report all such issues/bugs directly to Github issues of respective repositories.

For an issue you have encountered specifically with Heimdall or Heimdall related, you can create an issue in the Heimdall repository: https://github.com/maticnetwork/heimdall/issues

For issues, you have encountered specifically with Bor or Bor related, you can create an issue in the Bor repository: https://github.com/maticnetwork/bor/issues

For clear identification, you can also use labels to tag the issues reported.

Upon reporting an issue, the Matic Project team will review and update/comment on the status of the issue. Depending on the severity of the issue, the Matic project team may request you to create a PR to provide a fix. Bounties and incentives would be provided for such issues.
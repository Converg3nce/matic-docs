
# Setup Matic Validator Node

> The following has been tested to work with: Ubuntu 16.04 or later, CentOS 7 or later, RHEL 7 or later,  Debian  8 or later.

**TL;DR** - We have made a video demonstrating step by step on how to setup your Heimdall and Bor nodes


<center>
    <iframe width="700" height="480" src="https://matic-public.s3.amazonaws.com/CS-2001/mat-full-node-setup.mp4">
    </iframe>
</center>


### Step 1: Install rabbit-mq

**For Ubuntu/Debian**

```js
$ sudo apt-get install rabbitmq-server

$ sudo service rabbitmq-server start
```
       
### Step 2: Download Heimdall And Bor

**For Ubuntu/Debian**

```js
$ wget https://matic-public.s3.amazonaws.com/cs-2003/matic-heimdall_1.2.0_amd64.deb
$ wget https://matic-public.s3.amazonaws.com/CS-2003/matic-bor_1.2.0_amd64.deb
```

    
### Step 3: Install Heimdall And Bor
    
This will setup needed service for the validator node; Heimdall and Bor

**For Ubuntu/Debian**
   
```js
$ sudo dpkg -i matic-heimdall_1.2.0_amd64.deb
$ sudo dpkg -i matic-bor_1.2.0_amd64.deb
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
// Current testnet version is CS-2003
// Example: $ cd public-testnets/CS-2003

$ echo "export CONFIGPATH=$PWD" >> ~/.bashrc

$ source ~/.bashrc

// copy genesis file to config directory
$ sudo cp $CONFIGPATH/heimdall/config/genesis.json /etc/heimdall/config/genesis.json

// copy config file to config directory
$ sudo cp $CONFIGPATH/heimdall/config/heimdall-config.toml /etc/heimdall/config/heimdall-config.toml
```

> NOTE: In case you do not have a ropsten API key, generate one using: https://ethereumico.io/knowledge-base/infura-api-key-guide

Add your API key in file `/etc/heimdall/config/heimdall-config.toml` under the key `"eth_RPC_URL"`.

``` js
$ sudo vi /etc/heimdall/config/heimdall-config.toml
```

    
### Step 5: Add Peers

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers separated by commas at `/etc/heimdall/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`.

Open the config.toml file and copy paste the peer address from `$CONFIGPATH/heimdall/heimdall-seeds.txt`

``` js
$ sudo vi /etc/heimdall/config/config.toml 
```

### Step 6: Generate Heimdall private key

```js
$ heimdallcli generate-validatorkey <private-key>

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

**Expected Output**

Your `heimdall-node` should be syncing now! You can see logs of the above services under `/var/log/matic-logs/` 🤩

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

```js
 heimdallcli generate-keystore <private-key>
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

You can see logs of Bor service under `/var/log/matic-logs/bor.log` 🤩

**Ta-Da**

If your `Heimdall` and `Bor` logs are fine, that your node setup is complete. Congratulations on reaching so far!

Once you are done checking the logs or querying the data, you may proceed to staking tokens.

<!-- #### Query data

To see examples on how to query your full node and get network status, please refer here: https://api.matic.network/staking/cs1001/swagger-ui/ -->

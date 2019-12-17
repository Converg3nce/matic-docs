
# Setup Matic Validator Node

### Step 1: Install rabbit-mq

**For Ubuntu**

```js
$ sudo apt-get install rabbitmq-server
```
    
**For CentOS and Amazon Linux**

```js
$ curl -s https://packagecloud.io/install/repositories/rabbitmq/erlang/script.rpm.sh | sudo bash
    
$ curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.rpm.sh | sudo bash

$ sudo yum install rabbitmq-server
```
   
### Step 2: Dowload node setup package

**For Ubuntu**

```js
$ wget https://matic-public.s3.amazonaws.com/matic_node_1.0.0_amd64_ubuntu.deb
```

**For CentOS**
    
```js
$ wget https://matic-public.s3.amazonaws.com/matic_node-1.0.0-1.x86_64_CentOS.rpm
```
    
**For Amazon Linux**
    
```js
$ wget https://matic-public.s3.amazonaws.com/matic_node-1.0.0-1.x86_64_AmazonLinux.rpm
```
    
### Step 3: Install Matic node services
    
This will setup needed service for the validator node; Heimdall and Bor

**For Ubuntu**
   
```js
$ sudo dpkg -i matic_node_1.0.0_amd64_ubuntu.deb
```
   
**For CentOS**
   
```js
$ sudo rpm -i matic_node-1.0.0-1.x86_64_CentOS.rpm
```
   
**For Amazon Linux**
   
```js
$ sudo rpm -i matic_node-1.0.0-1.x86_64_AmazonLinux.rpm
```

### Step 4: Configure Heimdall

**Initiate heimdalld node**

```js
$ heimdalld init
```

**Get Heimdall genesis config**

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
    
    
### Step 5: Run Heimdall

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

Your `heimdall-node` should be syncing now! You can see logs of the above services under `~/matic-logs/` 🤩

If everything's well, then your logs should look something like this:

![Screenshot](../images/expected_heimdall.png)
    
### Step 6: Configure and run Bor

**Initialise genesis block for Bor**
   
```js
$ cd ~/bor/
    
$ bor --datadir dataDir init genesis.json

$ cd public-testnets/<testnet version>

$ cp static-nodes.json ~/bor/dataDir/bor/static-nodes.json
   
$ sudo service bor start
```

**Expected Output**

You can see logs of Bor service under ``~/matic-logs/bor.log`` 🤩

If everything's well, then your logs should look something like this:

![Screenshot](../images/expected_bor.png)

**Ta-Da**

If your `Heimdall` and `Bor` logs are fine, that your node setup is complete. Congratulations on reaching so far!

Once you are done checking the logs or querying the data, you may stop all services and restart again soon as we start staking in the next stage.

#### Query data

To see examples on how to query your full node and get network status, please refer here: https://api.matic.network/staking/cs1001/swagger-ui/
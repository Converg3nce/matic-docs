
# Setup Matic Validator Node

> The following has been tested to work with: Ubuntu 16.04 or later, CentOS 7 or later, RHEL 7 or later,  Debian  8 or later.

### Step 1: Install rabbit-mq

**For Ubuntu/Debian**

```js
$ sudo apt-get install rabbitmq-server

$ sudo service rabbitmq-server start
```
    
**For CentOS/RHEL/AmazonLinux**

```js
$ curl -s https://packagecloud.io/install/repositories/rabbitmq/erlang/script.rpm.sh | sudo bash
    
$ curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.rpm.sh | sudo bash

$ sudo yum install rabbitmq-server

$ sudo service rabbitmq-server start
```
   
### Step 2: Dowload node setup package

**For Ubuntu/Debian**

```js
$ wget https://matic-public.s3.amazonaws.com/matic_node_1.0.0_amd64_ubuntu.deb
```

**For CentOS/RHEL/AmazonLinux**
    
```js
$ wget https://matic-public.s3.amazonaws.com/matic_node-1.0.0-1.x86_64_centos.rpm
```
    
### Step 3: Install Matic node services
    
This will setup needed service for the validator node; Heimdall and Bor

**For Ubuntu/Debian**
   
```js
$ sudo dpkg -i matic_node_1.0.0_amd64_ubuntu.deb
```
   
**For CentOS/RHEL/AmazonLinux**
   
```js
$ sudo rpm -i matic_node-1.0.0-1.x86_64_centos.rpm
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
// Example: $ cd public-testnets/CS-1001

$ echo "export CONFIGPATH=$PWD" >> ~/.bashrc
$ echo "export HEIMDALLDIR=/etc/heimdall" >> ~/.bashrc

$ source ~/.bashrc

// copy genesis file to config directory
$ sudo cp $CONFIGPATH/heimdall-genesis.json $HEIMDALLDIR/config/genesis.json

// copy config file to config directory
$ sudo cp $CONFIGPATH/heimdall-config.toml $HEIMDALLDIR/config/heimdall-config.toml
```

> NOTE: In case you do not have a ropsten API key, generate one using: https://ethereumico.io/knowledge-base/infura-api-key-guide

Add your API key in file `$HEIMDALLDIR/heimdall-config.toml` under the key `"eth_RPC_URL"`.
    
### Step 5: Add Peers

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers separated by commas at `$HEIMDALLDIR/config/config.toml` under `persistent_peers` with the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`.

Open the config.toml file and copy paste the peer address from `public-testnets/<testnet version>/heimdall-seeds.txt`

``` js
$ sudo vi $HEIMDALLDIR/config/config.toml 
```

### Step 6: Run Heimdall

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

If everything's well, then your logs should look something like this:

![Screenshot](../images/expected_heimdall.png)
    
### Step 7: Configure and run Bor

**Initialise genesis block for Bor**
   
```js
$ echo "export BORDIR=/etc/bor" >> ~/.bashrc

$ source ~/.bashrc

$ cd $BORDIR
    
$ sudo bor --datadir $BORDIR/dataDir init genesis.json

$ sudo cp $CONFIGPATH/static-nodes.json $BORDIR/dataDir/bor/static-nodes.json
   
$ sudo service bor start
```

**Expected Output**

You can see logs of Bor service under `/var/log/matic-logs/bor.log` 🤩

If everything's well, then your logs should look something like this:

![Screenshot](../images/expected_bor.png)

**Ta-Da**

If your `Heimdall` and `Bor` logs are fine, that your node setup is complete. Congratulations on reaching so far!

Once you are done checking the logs or querying the data, you may stop all services and restart again soon as we start staking in the next stage.

#### Query data

To see examples on how to query your full node and get network status, please refer here: https://api.matic.network/staking/cs1001/swagger-ui/
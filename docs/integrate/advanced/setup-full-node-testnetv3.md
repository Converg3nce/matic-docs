---
id: setup-full-node-testnetv3
title: Setup Full Node TestnetV3
---
## 1. Install GO
```bash
$ mkdir -p $HOME/go/bin
$ echo "export GOPATH=$HOME/go" >> ~/.bash_profile
$ echo "export GOBIN=$GOPATH/bin" >> ~/.bash_profile
$ echo "export PATH=$PATH:$GOBIN" >> ~/.bash_profile
$ source ~/.bash_profile

$ sudo apt-get install build-essential
$ curl https://gist.githubusercontent.com/vaibhavchellani/cbe0fa947dc0a6557cb9583d081ff8ce/raw/d47b3df14ccffdd7a965e44c39fb5ec235360166/new.sh > install_go.sh
$ bash install_go.sh
```
## 2. Install heimdall 
```bash
$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/heimdall
$ cd heimdall
$ git checkout betav2
$ make install
```
That will install the `heimdalld` and `heimdallcli` binaries. Verify that everything is OK:
```bash
    $ heimdalld --help
```
## 3. Install Bor
```bash
$ mkdir -p $GOPATH/src/github.com/maticnetwork
$ cd $GOPATH/src/github.com/maticnetwork
$ git clone https://github.com/maticnetwork/bor
$ cd bor
$ git checkout beta-1.1-rc1
$ make bor
```
## 4. Configure Bor
```bash
$ mkdir ~/bor-config
$ cd ~/bor-config

// Download genesis files
$ wget https://static.matic.network/network/testnet/v3/genesis/bor/genesis.json
$ wget https://static.matic.network/network/testnet/v3/genesis/bor/static-nodes.json

// initialize Genesis Block
$ $GOPATH/src/github.com/maticnetwork/bor/build/bin/bor --datadir dataDir init genesis.json
$ mv static-nodes.json dataDir/

// genesis.json path -> ~/bor-config
// static-nodes.json path ->  ~/bor-config/dataDir
```
## 5. Start BOR

Save below code as a bash script(start.sh) and run to start the full node
```bash
#!/usr/bin/env sh
INSTANCE_DIR=~/bor-config/dataDir
BUILD_DIR=$GOPATH/src/github.com/maticnetwork/bor/build/bin

$BUILD_DIR/bor --datadir $INSTANCE_DIR init genesis.json
# set -x #echo on

touch $INSTANCE_DIR/bor/static-nodes.json

mkdir -p logs

$BUILD_DIR/bor --datadir $INSTANCE_DIR --port 30303 --rpc --rpcaddr '0.0.0.0' --rpcvhosts '*' --rpccorsdomain=* --rpcport 8545 --ipcpath geth.ipc --rpcapi 'personal,db,eth,net,web3,txpool,miner,admin,debug' --networkid '15001'   --gasprice '0' --ws --wsaddr '0.0.0.0' --syncmode 'full' --gcmode 'archive' --wsport 8546 --wsorigins '*' > logs/bor.log 2>&1 &

echo "Node started! Logs are being written to logs/bor.log"
```    
### Introduction to Heimdall

[Heimdall](https://github.com/maticnetwork/heimdall) is the Proof-of-Stake Validator node and layer for the Matic Network. It works in consonance with the [Staking contracts](https://github.com/maticnetwork/contracts/tree/master/contracts/staking) on Ethereum to enable the PoS mechanism on Matic. You can read up on it more [here](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

It comes with 2 main entrypoints:

* `heimdalld`: The heimdall Daemon, runs a full-node of the heimdall application.
* `heimdallcli`: The Heimdall command-line interface, which enables interaction with a heimdall full-node.

The core responsibility of Heimdall is to verify all state transitions happening on `Bor` and to periodically submit checkpoints on the Ethereum chain cementing the side-chain state.

> NOTE: To move forward, follow the below mentioned steps to install the dependencies first or [run](../heimdall/running-with-docker) using our docker containers.

### Install GO & DEP

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

### Install DEP

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
### Install make

You need to install `make` to run some commands. Using the below commands you can install `make` depending on your system.

**For Ubuntu**

```
$ sudo apt-get install build-essential
```

**For MacOS**

```
$ brew install make
```

### Install Heimdall

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

### Setting up a new node

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

Step by step instructions on how to create a single and multiple validator testnet

### Creating a single validator testnet

Running a testnet with a single validator is recommended if you want to understand how the system works. For ease of setup we have a package of configurations setup already. 

Before moving forward please ensure that you have the binaries for `heimdall` and bor created and are available in your path.

> You can view this post to install [Heimdall and its dependencies](https://docs.matic.network/staking/heimdall/install-heimdall/)

> Additionally, you can view this post to [Install Bor](https://docs.matic.network/staking/install-bor)

#### Step 1

```js

$ git clone https://github.com/maticnetwork/public-testnets

```

Check that your `heimdall` and `bor` commit id's match the ones given in `borversion.txt` and `heimdallversion.txt`.

#### Step 2: Deploy Root Contracts

To start a testnet you need to deploy your contracts and make changes to `heimdall-config.toml` . Follow [these steps](https://docs.matic.network/staking/validator-contracts/deploying-contracts/#step-1-deploy-root-contracts-on-base-chain) to deploy contracts on a base chain. 

#### Step 3: Deploy Heimdall

```js

$ cd $GOPATH/src/github.com/maticnetwork/public-testnets
$ cp -r heimdall-config/* ~/.heimdalld

```

Update `~/.heimdalld/config/heimdall-config.toml` with the root contract addresses and RPC links. 

You can start heimdall and other associated services now using the link below! 

> You can view this post to understand how to run Matic's [Validator layer](http://127.0.0.1:8000/staking/heimdall/run-heimdall)


#### Step-4: Deploy BOR  

```js

$ cd bor-config

```

This sample config package for bor contains the genesis file and keystore for a validator along with a script to start the node.

##### Clean & Stop bor 

```js

```

##### Start Bor

```js

```

Node started! Logs are being written to to `logs/bor.log` check them out! 

#### Step-5: Finish Deploying Contracts 

**Deploy child contracts on BOR**

Follow this [step](https://docs.matic.network/staking/validator-contracts/deploying-contracts/#step-2-deploy-contracts-on-bor) to deploy contracts on a bor chain. 

**Link child and base chain contracts**

Follow this [step](https://docs.matic.network/staking/validator-contracts/deploying-contracts/#step-3-link-contracts-on-bor-with-contracts-on-base-chain) to connect contracts on both chains. 


#### Step-6: Stake it

We need to stake some test tokens for your validator on our `rootChain` contract.

> You can read here on [How to become a Validator](https://docs.matic.network/staking/validator-contracts/become-a-validator) on Matic Network

#### Ta-Da

If you did everything correctly you should be able to see blocks being created on both `heimdall` and `bor` nodes. Full plasma safety guaranteed! 

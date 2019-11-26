Step by step instructions on how to create a single and multiple (soon to be added) validator testnet.

### Creating a single validator testnet

Running a testnet with a single validator is recommended if you want to understand how the system works. For ease of setup we have a package of configurations setup already. 

Before moving forward please ensure that you have the binaries for `heimdall` and `bor` created and are available in your path.

> You can view this post to install [Heimdall and its dependencies](../heimdall/install-heimdall/)

> Additionally, you can view this post to [Install Bor](../install-bor)

#### Step 1: 

```js

$ git clone https://github.com/maticnetwork/public-testnets

```

Check that your `heimdall` and `bor` commit id's match the ones given in `borversion.txt` and `heimdallversion.txt`.

#### Step 2: Deploy root contracts

```js

// (optional) If you are runnng testrpc to simulate base chain, run the below command to add your validator to testrpc instance
$ export MNEMONIC="257bc7bbb735c3cb39d0b809f9d95dc5e5385ba7444f0459d231cfd1f1f954ff"

```

Follow this step [Deploy root contracts on base chain](../validator-contracts/deploying-contracts/#step-1-deploy-root-contracts-on-base-chain)

#### Step 3: Deploy Heimdall

```js

// Run the following from your public-testnets repo.
$ cp -r heimdall-config/* ~/.heimdalld

```

Update the file `~/.heimdalld/config/heimdall-config.toml` with the root contract addresses and RPC links. Also update the file `~/.heimdalld/config/genesis.json` with the correct heimdall `chain_id`. 

You can start heimdall and other associated services now using the link below! 

> Click here to understand how you can [Run Heimdall](../heimdall/run-heimdall)


#### Step 4: Deploy Bor  

```js

// Run the following from your public-testnets repo.
$ cd bor-config

```

This sample config package for bor contains the genesis file and keystore for a validator along with a script to start the node.

##### Clean & Stop bor 

```js

$ bash clean.sh && bash stop.sh

```

##### Start Bor

```js

$ bash start.sh

```

Node started! Logs are being written to to `logs/bor.log` check them out! 

#### Step 5: Deploy child contracts on Bor 

Follow this step [Deploy contracts on Bor](../validator-contracts/deploying-contracts/#step-2-deploy-contracts-on-bor) 

#### Step 6: Link child and base chain contracts

Follow this step [Link contracts on Bor with contracts on base chain](../validator-contracts/deploying-contracts/#step-3-link-contracts-on-bor-with-contracts-on-base-chain)


#### Step 7: Stake It!

We need to stake some test tokens for your validator on our `rootChain` contract.

> You can read here on [Becoming a Validator](../validator-contracts/become-a-validator)

#### Ta-Da

If you did everything correctly you should be able to see blocks being created on both `heimdall` and `bor` nodes. Full plasma safety guaranteed! 

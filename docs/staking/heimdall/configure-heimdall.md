Here you would find all config related details about Heimdall

### Configuring Heimdall is fairly straight forward

Open the below file to edit various options and to tweak them

```js

$ cat ~/.heimdalld/config/heimdall-config.toml

```

### Example config 

```js

# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

##### RPC configrations #####

# Change this to point to parent chain
# RPC endpoint for ethereum chain
eth_RPC_URL = "https://ropsten.infura.io"

# Change this to point to bor chain
# RPC endpoint for bor chain
bor_RPC_URL = "https://testnet2.matic.network"

# RPC endpoint for tendermint
tendermint_RPC_URL = "http://0.0.0.0:26657"

##### Chain ID configration #####

# Bor chain ID
bor_chain_id = "15001" 

##### MQTT and Rest Server Config #####

# MQTT endpoint
amqp_url = "amqp://guest:guest@localhost:5672/" 

# Heimdall REST server endpoint
heimdall_rest_server = "http://0.0.0.0:1317" 

##### Contract Addresses #####

### Eth Chain Contracts 
stakemanager_contract = "0x0000000000000000000000000000000000000000" 
rootchain_contract = "0x0000000000000000000000000000000000000000" 
state_sender_contract = "0x0000000000000000000000000000000000000000" 

### Bor Chain Contracts
state_receiver_contract = "0000000000000000000000000000000000001001" 
validator_set_contract = "0000000000000000000000000000000000001000" 


##### Intervals #####
child_chain_block_interval = "10000" 

## Bridge Poll Intervals 
checkpoint_poll_interval = "60µs" 
syncer_poll_interval = "30µs"
noack_poll_interval = "16m50s"


##### Checkpoint Length Config #####
avg_checkpoint_length = "256"
max_checkpoint_length = "1024"

##### Timeout Config #####

no_ack_wait_time = "30m0s"
checkpoint_buffer_time = "16m40s"

##### Transaction Confirmations  #####

confirmation_blocks = "6"

```

> Update the config file to point to correct RPC url's and update the contract addresses.

Checkout Tendermint related configrations [here](https://github.com/tendermint/tendermint).

### Add peers

Peers are the other nodes you want to sync to in order to maintain your full node. You can add peers separated by commas at `~/.heimdalld/config/config.toml` under `persistent_peers` With the format `NodeID@IP:PORT` or `NodeID@DOMAIN:PORT`


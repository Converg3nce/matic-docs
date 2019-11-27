Step-by-step guide to run multiple services.

### Run Heimdall

Starting Heimdall is fairly easy, the below command will start heimdall using the genesis file in `~/.heimdalld/config/genesis.json`.

```js

$ heimdalld start

```

### Run rest-server

The rest server can be used by external services like explorer, faucets etc to connect to heimdall chain for fetching data and sending transactions.

```js

$ heimdalld rest-server

```

### Run Bridge

Bridge is a helper package that sends transactions to heimdall on behalf of validators. All interactions with other chains happens via this bridge.

> Only run bridge if you are planning to stake!

```js

$ bridge start --all

```

> Note: Bridge won't run without `rabbitmq` and `rest-server` so ensure they are running before trying to run bridge.

### Reset Heimdall

Use the following to delete blockchain data and reset everything.

```js

// NOTE: To be used only if you need to restart heimdall and delete old data.
$ heimdalld unsafe-reset-all

```

### What is Heimdall?

Heimdall is the name of the validator layer for  Matic Network. It comes with 2 main entrypoints:

* `heimdalld`: The heimdall Daemon, runs a full-node of the heimdall application.
* `heimdallcli`: The Heimdall command-line interface, which enables interaction with a heimdall full-node.

The core responsibility of heimdall is to verify all state transitions happening on `bor` and to submit a checkpoint on Ethereum chain cementing the side-chain state.

> To move forward you need to install Go or run using our docker containers. 


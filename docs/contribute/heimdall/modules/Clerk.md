---
id: clerk
title: Clerk
description: Clerk manages generic state-sync from Ethereum chain to Bor chain. Heimdall agrees on state sync, which is initiated on the Ethereum chain using this module.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
## Overview

Clerk manages generic state-sync from Ethereum chain to Bor chain. Heimdall agrees on state sync, which is initiated on the Ethereum chain using this module.

More details: [https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#4432e1c41a714c3da7dc4a7c3111c2ec](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#4432e1c41a714c3da7dc4a7c3111c2ec)

## Messages

### MsgEventRecord

`MsgEventRecord` transaction is responsible for validating events from `StateSender.sol`  and storing the state on Heimdall for Bor to use.

Handler for this transaction validates for any given `msg.TxHash` and `msg.LogIndex`. It throws `Older invalid tx found` error if trying to process the transaction more than once.

Here is the structure for the transaction message:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## CLI commands

### Send state record transaction

```bash
heimdallcli tx clerk record
	--log-index <log-index> 
	--tx-hash <transaction-hash> 
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### To query already validated state event record

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST APIs

[Query APIs](https://www.notion.so/2d5b344aeea8455b82cd6f001331f367)
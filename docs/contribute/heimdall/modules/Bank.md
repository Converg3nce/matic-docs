---
id: bank
title: Bank
description: Bank module handles account balance transfers for Heimdall. This module is from `bank` module from cosmos-sdk.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
## Overview

Bank module handles account balance transfers for Heimdall. This module is from `bank` module from cosmos-sdk.

## Messages

### MsgSend

`MsgSend` handles transfer between accounts in Heimdall. Here is a structure for transaction message:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend

`MsgMultiSend` handles multi transfer between account for Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## **Parameters**

The bank module contains the following parameters:

[Params](https://www.notion.so/9c2ec6793f34463e89cee1e658ebb55d)

## CLI commands

### Send balance

Following command will send 1000 matic tokens to mentioned `address`

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
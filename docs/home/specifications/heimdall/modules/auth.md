---
id: auth
title: Auth/Account
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

It manages address, coins and nonce for transactions. It also signs and validates transactions. 

Source: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

    type BaseAccount struct {
    	Address       types.HeimdallAddress `json:"address" yaml:"address"`
    	Coins         types.Coins           `json:"coins" yaml:"coins"`
    	PubKey        crypto.PubKey         `json:"public_key" yaml:"public_key"`
    	AccountNumber uint64                `json:"account_number" yaml:"account_number"`
    	Sequence      uint64                `json:"sequence" yaml:"sequence"`
    }

## **Show-account**
```bash
    heimdalld show-account
```
**Expected Result**:
```js
{
"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```
## **Account details**
```bash
    heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```
**Expected Result**:
```js
{
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
}
```    
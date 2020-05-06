---
id: demo-erc20
title: ERC20 (Ethereum ↔ Matic)
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

This is a demo for ERC20 token, where all the process are running step-by-step.
1. Deposit
  - approveERC20TokensForDeposit()
  - depositERC20ForUser()
2. Transfer
  - transferERC20Tokens()
3. Withdraw
  - startWithdraw()
  - withdraw()
  - processExits()

### demoErc20.js

- [Visit]((getting-started)) getting started of Maticjs and Setup the requirements for the demo. 
- Once you are prepared then create a file demoErc20.js. Add the shared code below in this file.

```js title="demoErc20.js"
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs").default;
const config = require("./config.json");

const network = new Network(config.network, config.version);
const MaticNetwork = network.Matic;
const MainNetwork = network.Main;

const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
const Matic_Erc20Address = config.Matic_Erc20Address;

const Ropsten_Erc721Address = config.Ropsten_Erc721Address;
const Matic_Erc721Address = config.Matic_Erc721Address;

const Ropsten_WEthAddress = config.Ropsten_WEthAddress;
const Matic_WEthAddress = config.Matic_WEthAddress;

const from = config.from; // from address

const matic = new Matic({
  maticProvider: MaticNetwork.RPC,
  parentProvider: MainNetwork.RPC,
  rootChain: MainNetwork.Contracts.RootChain,
  withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
  depositManager: MainNetwork.Contracts.DepositManagerProxy,
  registry: MainNetwork.Contracts.Registry
});

async function init() {
  await matic.initialize();
  await matic.setWallet(config.privateKey);
}

async function PromiseTimeout(delayms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delayms);
  });
}

async function demoErc20() {
  await init();
  const amount = "100000000000000000"; // amount in wei
  console.log("*****Deposit ERC20*****");

  let token = Ropsten_Erc20Address;

  await matic
    .approveERC20TokensForDeposit(token, amount, {
      from
    })
    .then(async logs => {
      console.log("Approve on Ropsten:" + logs.transactionHash);
      await PromiseTimeout(10000);
      await matic
        .depositERC20ForUser(token, from, amount, {
          from
        })
        .then(async logs => {
          console.log("Deposit on Ropsten:" + logs.transactionHash);
          await PromiseTimeout(10000);
          console.log("*****Transfer ERC20*****");
          token = Matic_Erc20Address;
          const recipient = "0xBDC6bb454C62E64f13FA2876F78cdAfA20089204"; // to address
          await matic
            .transferERC20Tokens(token, recipient, amount, {
              from
            })
            .then(async logs => {
              console.log("Transfer on Matic:" + logs.transactionHash);
              await PromiseTimeout(10000);
              console.log("*****Withdraw ERC20***");
              matic
                .startWithdraw(token, amount, {
                  from
                })
                .then(async logs => {
                  console.log(
                    "Start Withdraw on Matic:" + logs.transactionHash
                  );
                  console.log("Now waiting for 6 mins for the checkpoint");
                  const hash = logs.transactionHash;
                  await PromiseTimeout(360000);
                  //Wait for 6 mins till the checkpoint is submitted, then run the confirm withdraw
                  matic
                    .withdraw(hash, {
                      from
                    })
                    .then(async logs => {
                      console.log("Withdraw on Ropsten" + logs.transactionHash);
                      // action on Transaction success
                      // Withdraw process is completed, funds will be transfer to your account after challege period is over.
                      await PromiseTimeout(10000);
                      token = Ropsten_Erc20Address;
                      matic
                        .processExits(token, {
                          from
                        })
                        .then(logs =>
                          console.log(
                            "Process Exit on Ropsten:" + logs.transactionHash
                          )
                        );
                    });
                });
            });
        });
    });
}

demoErc20();
```

## config.json
Update the config.json file.

```json
{
    "network":"testnet",
    "version": "v3",

    "privateKey": "<enter your private key>",
    "from": "<enter the address>",

    "Ropsten_Erc20Address": "0x28C8713DDe7F063Fdc4cA01aB2A8856e0F243Fec",
    "Matic_Erc20Address": "0x9a93c912F4eFf0254d178a18ACD980C1B05b57b0",
    
    "Ropsten_Erc721Address": "0x07d799252cf13c01f602779b4dce24f4e5b08bbd",
    "Matic_Erc721Address": "0x8D5231e0B79edD9331e0CF0d4B9f3F30d05C47A5",

    "Ropsten_WEthAddress": "0x7BdDd37621186f1382FD59e1cCAE0316F979a866",
    "Matic_WEthAddress": "0x8567184E6F9b1B77f24AfF6168453419AD22f90e",

    "value": "1000000000000000000" 
}
```

## Expected Output
And then execute the file: ``` node demoErc20.js ```

```bash
*****Deposit ERC20*****
Approve on Ropsten: 0x77f0ec9d4d8ec50ea0e98f22332f2c70665955b9b81ed7ea45a9a3c2e3f0d6ea
Deposit on Ropsten: 0x74f97ddd616d67d6b25321ddd1d4a23f7591ed11ca771048cde9fdc4774e4d65
*****Transfer ERC20*****
Transfer on Matic: 0x9df9cc8282673a3df9098ba2d8b012fcb0d94980d66ec8f7db5c41a2b2d3aa2b
*****Withdraw ERC20*****
Start Withdraw on Matic: 0x75866df80c98633215b5c4af2f647f2d03bf7430cb2b8aa234ca692485b19c38
Now waiting for 6 mins for the checkpoint
{ start: '1', mid: '10234', end: '20468' }
{ start: '10235', mid: '15351', end: '20468' }
{ start: '15352', mid: '17910', end: '20468' }
{ start: '17911', mid: '19189', end: '20468' }
{ start: '19190', mid: '19829', end: '20468' }
{ start: '19830', mid: '20149', end: '20468' }
{ start: '20150', mid: '20309', end: '20468' }
{ start: '20310', mid: '20389', end: '20468' }
{ start: '20390', mid: '20429', end: '20468' }
{ start: '20430', mid: '20449', end: '20468' }
{ start: '20450', mid: '20459', end: '20468' }
{ start: '20460', mid: '20464', end: '20468' }
{ start: '20465', mid: '20466', end: '20468' }
{ start: '20467', mid: '20467', end: '20468' }
buildBlockProof... 6326576 6326831 6326669
fetching block 6326576
......................
......................
......................
fetching block 6326831
Withdraw on Ropsten: 0x8be64cfd9b72d5898d02a0285f7dd247edc779042699033f4fd49fb9c32f6162
processExits can be gas expensive, sending in 2000000 gas but even this might not be enough
Process Exit on Ropsten: 0x55e855abd423e40b3ddcee055d2b0d9870a6f31ad4942a0fe6f34c0d33983e2a
```

> Note: This is just an Example to have a better understanding of the expected output.
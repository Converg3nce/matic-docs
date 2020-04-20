---
id: demo-erc721
title: Erc721 (Ethereum ↔ Matic)
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

This is a demo for ether, where all the process are running step-by-step.
1. Deposit
  - safeDepositERC721Tokens()
2. Transfer
  - transferERC721Tokens()
3. Withdraw
  - startWithdrawNFT()
  - withdrawNFT()
  - processExits()

### demoErc721.js

- [Visit]((getting-started)) getting started of Maticjs and Setup the requirements for the demo. 
- Once you are prepared then create a file demoErc721.js. Add the shared code below in this file.

```js
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

async function demoErc721() {
  await init();
  const tokenId = "745"; // ERC721 token Id
  console.log("*****Deposit ERC721*****");

  let token = Ropsten_Erc721Address;

  await matic
    .safeDepositERC721Tokens(token, tokenId, {
      from
    })
    .then(async logs => {
      console.log("Deposit on Ropsten:" + logs.transactionHash);
      await PromiseTimeout(10000);          //-10sec
      console.log("*****Transfer ERC721*****");
      token = Matic_Erc721Address;
      const recipient = "0xBDC6bb454C62E64f13FA2876F78cdAfA20089204"; // to address
      await matic
        .transferERC721Tokens(token, recipient, tokenId, {
          from
        })
        .then(async logs => {
          console.log("Transfer on Matic:" + logs.transactionHash);
          await PromiseTimeout(10000);
          console.log("*****Withdraw ERC721*****");
          matic
            .startWithdrawForNFT(token, tokenId, {
              from
            })
            .then(async logs => {
              console.log("Start Withdraw on Matic:" + logs.transactionHash);
              console.log("Now waiting for 6 mins for the checkpoint");
              const hash = logs.transactionHash;
              await PromiseTimeout(360000);     //-6 minutes
              //Wait for 6 mins till the checkpoint is submitted, then run the confirm withdraw
              matic
                .withdrawNFT(hash, {
                  from
                })
                .then(async logs => {
                  console.log("Withdraw on Ropsten" + logs.transactionHash);
                  // action on Transaction success
                  // Withdraw process is completed, funds will be transfer to your account after challege period is over.
                  await PromiseTimeout(10000);
                  token = Ropsten_Erc721Address;
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
}
demoErc721();
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
*****Deposit ERC721*****
Deposit on Ropsten:0x38a25ba9f2ea1c3132c4a17d91972da394804de623904a2c893f7a07be59592e
*****Transfer ERC721*****
Transfer on Matic:0x45fb1ca99733089dc5933379351ee765af9712d667677203ab36d6f3c493447d
*****Withdraw ERC721***
Start Withdraw on Matic: 0x89966df80c98633215b5c4af2f647f2d03bf7430cb2b8aa234ca692485b19c38
Now waiting for 6 mins for the checkpoint
............................................
Withdraw on Ropsten: 0x9be64cfd9b67d5898d02a0285f7dd247edc779042699033f4fd49fb9c32f6162
processExits can be gas expensive, sending in 2000000 gas but even this might not be enough
Process Exit on Ropsten: 0x55755abd423e40b3ddcee055d2b0d9870a6f31ad4942a0fe6f34c0d33983e2a
```

> Note: This is just an Example to have a better understanding of the expected output.
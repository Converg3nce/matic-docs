---
id: eth
title: Ether (Ethereum→Matic)
---

This is a demo for ether, where all the process are running step-by-step.
1. Deposit
  - depositEther()
2. Transfer
  - transferERC20Tokens()
3. Withdraw
  - startWithdraw()
  - withdraw()
  - processExits()

### demoEth.js

- [Visit]((getting-started)) getting started of Maticjs and Setup the requirements for the demo. 
- Once you are prepared then create a file demoEth.js. Add the shared code below in this file.

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

async function demoEth() {
  await init();
  const amount = "10000000000000000"; // amount in wei
  console.log("*****Deposit ETH*****");

  let token = Ropsten_WEthAddress;

  await matic
    .depositEther(amount, {
      from
    })
    .then(async logs => {
      console.log("Deposit on Ropsten:" + logs.transactionHash);
      await PromiseTimeout(10000);          //-10sec
      console.log("*****Transfer ETH*****");
      token = Matic_WEthAddress;
      const recipient = "0xBDC6bb454C62E64f13FA2876F78cdAfA20089204"; // to address
      await matic
        .transferERC20Tokens(token, recipient, amount, {
          from
        })
        .then(async logs => {
          console.log("Transfer on Matic:" + logs.transactionHash);
          await PromiseTimeout(10000);
          console.log("*****Withdraw ETH*****");
          matic
            .startWithdraw(token, amount, {
              from
            })
            .then(async logs => {
              console.log("Start Withdraw on Matic:" + logs.transactionHash);
              console.log("Now waiting for 6 mins for the checkpoint");
              const hash = logs.transactionHash;
              await PromiseTimeout(360000);     //-6 minutes
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
                  token = Ropsten_WEthAddress;
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
demoEth();
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
*****Deposit ETH*****
Deposit on Ropsten:0x72e5fa43414d3865931a8c34f4f24c5457547247c9594708610c5454488adb67
*****Transfer ETH*****
Transfer on Matic:0x45fb1ca99733089dc5933379351ee765af9712d667677203ab36d6f3c493447d
*****Withdraw ETH***
Start Withdraw on Matic: 0x89966df80c98633215b5c4af2f647f2d03bf7430cb2b8aa234ca692485b19c38
Now waiting for 6 mins for the checkpoint
............................................
Withdraw on Ropsten: 0x9be64cfd9b67d5898d02a0285f7dd247edc779042699033f4fd49fb9c32f6162
processExits can be gas expensive, sending in 2000000 gas but even this might not be enough
Process Exit on Ropsten: 0x55755abd423e40b3ddcee055d2b0d9870a6f31ad4942a0fe6f34c0d33983e2a
```

> Note: This is just an Example to have a better understanding of the expected output.
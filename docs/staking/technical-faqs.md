
### 1. Are the private keys same for Heimdall and Bor keystore?
Yes, the private key used for generating Validator keys and Bor Keystore is the same. The private key used in this instance is your Wallet's ETH address where your Matic testnet tokens are stored.

### 2a. Basic Details of Stage 1

**Network Details**

**Heimdall Chain ID**: heimdall-cs2002 

**Bor Chain ID**: 2002
 
**Tag**: CS-2001

**Bor Block Time**: 5 secs

**Repo details**: [https://github.com/maticnetwork/public-testnets/](https://github.com/maticnetwork/public-testnets/)

**Ropsten Contract Details**

```js
{
      "root": {
        "tokens": {
          "TestToken": "0x6bAA90c411945C2fE93f1D336fb5787b6531a67C",
    			"Matic": "0xF1a4509105a888933C72464C5f5F8ED45f54f1b0"
        },
        "BytesLib": "0xdb596dA720dFc70545BaeC90FbFBf5220cEaba3E",
        "Common": "0x3816Dee51ED4AFb42f2D865177747b15A874884f",
        "ECVerify": "0x760F11060a15579F8dfF66f1b3f3bf956D46fF17",
        "Merkle": "0x6b898Fb688020217FC7a5a8941D5051aCb7cbA24",
        "MerklePatriciaProof": "0x9fcc0465469cC8F1648E56b64C5BE5A46154CAFC",
        "PriorityQueue": "0xA70af15BC10738DDaDE437aa276D93eB5D5886D4",
        "RLPEncode": "0x9134D1fFE4672aF4DBd965b6E822C086C7a539d8",
        "RLPReader": "0x109241f8fBF90BEF52ca3b860A4554db096383E5",
        "SafeMath": "0xCDA425e4B2E20b91B731B7A203e75e58A1655D84",
        "Governance": "0x7aa387ACB997E81008fFA7b1753165883bd9B627",
        "GovernanceProxy": "0x355558a09e8cD893E4d2f0A4AB1C153a2c69e911",
        "Registry": "0xa5C789F57A83623c0E6aFBeB1431e84499174c29",
        "RootChain": "0xB8d5548FF080fc99eec38B276B27d5CB2F020300",
    		// Use this
        "RootChainProxy": "0x12c1d34135bee2745AD930647F54D36c9dD6Cbe3",
        "ValidatorShareFactory": "0x4f72f033FFf36542fC183302282405a91fB57171",
        "StakingInfo": "0x4A77108eA2380217553dcc77C7Aa62f58C5b04a2",
        "StakingNFT": "0x99897ab637dE021EA5394295c59ae02d2054c440",
        "StakeManager": "0xDED60C3cD705cC9fa6FdE82277757843a7664F96",
    		// use this
        "StakeManagerProxy": "0x228DF261D960d48bDBF50BDC8dc00ba20358aCea",
        "SlashingManager": "0x90f2cB83e97223f97EE4B07553749a5Ce390d8c0",
        "StateSender": "0x061b9fE56513BBa078d509C2377e3E5be9219FeB",
        "DepositManager": "0x2B6514f3C883f61c2A13fF36401700C3467a1a83",
    		// Use this
        "DepositManagerProxy": "0x2e44c551376CD13f4EE0dBa330A47893f12F410D",
        "WithdrawManager": "0x93D5082f07a9334dcd08c6F161e70fb01C3fC8B3",
        "ExitNFT": "0xE360B8E5A69077dee2101C2E0778Be3a38a9122b",
    		// Use this
        "WithdrawManagerProxy": "0x6318313B42f81b0AEFF2Fb58dd467935561DfC47"
      },
    	"child": {
        "ChildChain": "0x4f9C5Abe93E48EA087a423aDcB38aF349b18dcdD",
        "tokens": {
          "TestToken": "0xd72A0495684fb7B489b8089EA2317c1d68e5a8c9",
    			"Matic": "0x0000000000000000000000000000000000001010"
        }
      }
    }
```

### 2b. List of Common Commands

We currently have an easy to dive-in list for you for the Linux packages. We will keep updating this list regularly for more convenience.

**For Linux packages**

####A. Where to find heimdall genesis file

`$CONFIGPATH/heimdall/config/genesis.json`

####B. Where to find heimdall-config.toml

`/etc/heimdall/config/heimdall-config.toml`

####C. Where to find config.toml

`/etc/heimdall/config/config.toml`

####D. Where to find heimdall-seeds.txt

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

####E. Start Heimdall

`$ sudo service heimdalld start`

####F. Start Heimdall rest-server

`$ sudo service heimdalld-rest-server start`

####G. Start Heimdall bridge-server

`$ sudo service heimdalld-bridge start`

####H. Heimdall logs

`/var/log/matic-logs/`

####I. Where to find Bor genesis file

`$CONFIGPATH/bor/genesis.json`

####J. Start Bor

`sudo service bor start`

####K Check heimdall logs

`tail -f heimdalld.log`

####L. Check Heimdall rest-server

`tail -f heimdalld-rest-server.log`

####M. Check Heimdall bridge logs

`tail -f heimdalld-bridge.log`

####N. Check bor logs

`tail -f bor.log`

####O. Kill Bor process

**For linux**:

1. `ps -aux | grep bor`. Get the PID for Bor and then run the following command.
2. `sudo kill -9 PID` 

**For Binaries**:

Go to `CS-2001/bor` and then run, `bash stop.sh`

### 3. Error: Failed to unlock account (0x...) No key for given address or file

This error occurs because the path for the password.txt file is incorrect. You can follow the below steps to rectify this:

This error occurs because the path for the password.txt and Keystore file is incorrect. You can follow the below steps to rectify this:

1. Copy the bor keystore file to 

    /etc/bor/dataDir/keystore

2. And password.txt to 

    /etc/bor/dataDir/

3. Make sure you have added correct address in `/etc/bor/metadata`

For Binaries:

1. Copy the Bor keystore file to:

    `~/.bor/keystore/`

2. And password.txt to

    `~/.bor/password.txt`


### 4. Error: Wrong Block.Header.AppHash. Expected xxxx

This usually occurs due to an incorrect installation of heimdall. You can follow the steps below to rectify this:

run 

    heimdalld unsafe-reset-all 

and start again.

### 5. From where do I create the API key?

You can access this link: [https://infura.io/register](https://infura.io/register) . Make sure that once you have setup your account and project, you copy the API key for Ropsten and not Mainnet.

Mainnet is selected by default.

### 6. Heimdall isn't working. I'm getting a Panic error

**Actual Error**: My heimdalld isn’t working. In the log the first line is:
panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb

Change the config to `goleveldb` in config.toml


### 7. How do I delete remnants of Heimdall and Bor?

If you want to delete remnants of Heimdall and Bor then you can run the following commands
Bor:

For Linux package:

```$ sudo dpkg -i matic-bor```

And delete Bor Directory:

```$ sudo rm -rf /etc/bor```

For Binaries:

```$ sudo rm -rf /etc/bor```

And

```$ sudo rm /etc/heimdall```


### 8. How many validators can be active concurrently?

There will be upto 100 active validators at a time. We will bring in more participants if the limit is reached mid-way through the event as well. Note that active validators is mostly those whose uptime is high. Participants with high downtime will be forced out.

### 9. How much should I stake?

<stake-amount> and <heimdall-fee-amount> - how much it should be?

A minimum of 10 Matic tokens is required for the stake amount whereas heimdall fee should be greater than 10. For example, your stake amount is 400 then the heimdall fee should be 20. We suggest to keep the Heimdall fee as 20.

However, please note that the values entered in stake amount and heimdal-fee-amount should be entered in 18 decimals

For example, 

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. I was selected to become a validator but my ETH address was incorrect. What do I do?

If you have access to the ETH address that you submitted earlier then you can transfer the Test tokens from that account to the current account. And then you can initiate your process of setting up your nodes.

If you don't have access to that ETH address, we won't be transferring you tokens separately. You can  re-register in the form again with the correct ETH address.

### 11. I'm getting an error starting the bridge

**Error**: Object "start" is unknown, try "bridge help". Is it still ok to ignore this?

Check "which bridge" - if it's `/usr/sbin/bridge` you're not running the right "bridge" program.

Try `~/go/bin/bridge` instead `(or $GOBIN/bridge)`


### 12. I'm getting dpkg error

**Error**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

This occurs mainly because of a previous installation of Matic on your machine. To resolve you can run:

`sudo dpkg -r matic-node`


### 13. I'm not clear on which Private Key should I add when I generate validator key

The Private key to be used is your Wallet's ETH address where your Matic testnet Tokens are stored. You can complete the setup with one public-private key pair tied to the address submitted on the form.


### 14. Is there a way to know if Heimdall is synced?

You can run the following command to check it:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Check the value of catching_up. If it is false then the node is all synced up.


### 15. What if someone become a Top 10 staker, how he will receive his MATIC reward at the end?

Stage 1 rewards are not based on stake. Please refer to https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ for the reward details. Participants with high stake don't automatically qualify for a reward in this stage.


### 16. What should be my heimdall version?

To check your Heimdall version you can simply run:

```heimdalld version```

The correct version of Heimdall for stage 1 should be `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. What values should I add in the stake amount and fee amount?

A minimum of 10 Matic tokens is required for the stake amount whereas heimdall fee should be greater than 10. For example, your stake amount is 400 then the heimdall fee should be 20. We suggest to keep the Heimdall fee as 20.

However, please note that the values entered in stake amount and heimdal-fee-amount should be entered in 18 decimals

For example, 

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Whats the difference between `~.heimsdall` and `/etc/heimsdall?`

`~/.heimsdall` is the heimdall dir when you use the binary installation method. `/etc/heimdall` is for the Linux package installation method.


### 19. When I make the stake transaction, I'm getting "Gas Exceeded" error

This error may occur because of the stake or fee amount format. The values entered during the stake command need to have 18 decimals.

However, please note that the values entered in stake amount and heimdal-fee-amount should be entered in 18 decimals

For example, 

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. When will I get a chance to become a Validator?

We are progressively adding validators throughout the course of Stage 1 event. We will be releasing a list of new external validators gradually. This list will be announced on the Discord channel.


### 21. Where can I find Heimdall account info location?

For binaries:

    ~/.heimdalld/config folder

For Linux package:

    /etc/heimdall/config


### 22. Which file do I add the API key in?

Once you have created the API key you need to add the API key in `heimdall-config.toml` file.


### 23. Which file do I add the persistent_peers?

You can add the persistent_peers in the following file:

    ~/.heimdalld/config/config.toml


### 24. “Did you reset Tendermint without resetting your application's data?”

In such a case you can reset heimdall config data and try running the installation again.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Error: Unable to unmarshall config Error 1 error(s) decoding

Error: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

This occurs mostly because when there are typos, or some missing parts or an old config file which is still a remnant. You will need to clear all the remnants and then try setting it up again.

### 26. To stop Heimdall and Bor services

**For Linux packages**:

Stop Heimdall: `sudo service heimdalld stop`

Stop Bor: `sudo service bor stop` or 

1. `ps -aux | grep bor`. Get the PID for Bor and then run the following command.
2. `sudo kill -9 PID`

**For Binaries**:

Stop Heimdall: `pkill heimdalld`

Stop Bridge: `pkill heimdalld-bridge`

Stop Bor: Go to CS-2001/bor and then run, `bash stop.sh`

### 27. To remove Heimdall and Bor directories

**For Linux packages**:
Delete Heimdall: `sudo rm -rf /etc/heimdall/*`

Delete Bor: `sudo rm -rf /etc/bor/*`

**For Binaries**:

Delete Heimdall: `sudo rm -rf ~/.heimdall/`

Delete Bor: `sudo rm -rf ~/.bor`






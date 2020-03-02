
### 1. Are the private keys same for Heimdall and Bor keystore?
Yes, the private key used for generating Validator keys and Bor Keystore is the same. The private key used in this instance is your Wallet's ETH address where your Matic testnet tokens are stored.

### 2a. Basic Details of Stage 1

**Network Details**

**Heimdall Chain ID**: heimdall-cs2003 

**Bor Chain ID**: 2003
 
**Tag**: CS-2003

**Bor Block Time**: 5 secs

**Repo details**: [https://github.com/maticnetwork/public-testnets/](https://github.com/maticnetwork/public-testnets/)

**Ropsten Contract Details**

```js
{
  "root": {
    "tokens": {
      "TestToken": "0xF256c3383c80117706efa018C07f31C6cf958fdF",
      "MaticWeth": "0x1dB33ceccA19d5EfF69a1353269443a543c56CD0"
    },
    "BytesLib": "0xB1b650e6E19a46b43C5D77071177B53b883ADB74",
    "Common": "0x23bdFf3322f5968171a879BCa57105b8b94147E6",
    "ECVerify": "0x9F34ebBB67389aa44fFdA98A44Ecc923DF8a5A2e",
    "Merkle": "0x144916dca029BfA6B3fB428c3e8CD8151c217EFe",
    "MerklePatriciaProof": "0xa1dedb7274785945119748b7cd545eC0D23508D6",
    "PriorityQueue": "0xf9eA7d0E7a78a3Af3e05D6217D04087969fEE50B",
    "RLPEncode": "0x3FDB54c1F71Dd29FF42218DC80c3700e26F98118",
    "RLPReader": "0x205DD96043283cc5280A54099f5ce0cD6089Ce50",
    "SafeMath": "0xe587833A653D2b628cC1EcB283037fF4111a7a0D",
    "Governance": "0x7fd27258D03e7bC8Abef97aD8a61C22deE3b050b",
    "GovernanceProxy": "0x483a67747bbB7A12cE9c209f5b15a92fE1728165",
    "Registry": "0xd5820A5D5252aA5a37bc518aE5fC2A9F499d9896",
    "RootChain": "0x93dDd2aEF930320eb53932a83FE9C6Ad72fB3591",
    "RootChainProxy": "0x7cc6b9556C5900cF990e0CE9eE733D44CcC3F62e",
    "ValidatorShareFactory": "0x888E368DDcA308a343b62CA21261Cb4D098AAa2D",
    "StakingInfo": "0xF1B137992B253dc8aB85C932cE06818a071461d7",
    "StakingNFT": "0xc3E6099b2d98CBfCD8543B8a6856701332135D2F",
    "StakeManager": "0x90b7B77c3Af6038cBb25A37361cF95C56BADFc93",
    "StakeManagerProxy": "0xf7Fc9C6003C24CD799117f26959a958C3093B8d0",
    "SlashingManager": "0xc60Fe54754d391d5812E885a3F89D7d968248AE7",
    "StateSender": "0x122c31B5Da88583420B07b8cbc69435bBdc1838C",
    "DepositManager": "0xf3c68898fB3a614F6DF4df2Cf923c04F1c79157a",
    "DepositManagerProxy": "0xFEafbcC92488D16a7D6B36151F80fC4d0Db67956",
    "WithdrawManager": "0x32eDFA67b4f4d128D26F2Bf44F2d138f623038c1",
    "ExitNFT": "0x31D999F6f02aB0e5D3745fBdc57b8948eB445539",
    "WithdrawManagerProxy": "0x87796c231cA7aB8dB93251BEb795F461B6Dd8F66"
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

Go to `CS-2003/bor` and then run, `bash stop.sh`

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

and start Heimdall services again. You can refer to Step 7 in the setup guide - https://docs.matic.network/staking/linux-package-installation/#step-7-run-heimdall

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






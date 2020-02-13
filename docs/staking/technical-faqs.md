
### 1. Are the private keys same for Heimdall and Bor keystore?
Yes, the private key used for generating Validator keys and Bor Keystore is the same. The private key used in this instance is your Wallet's ETH address where your Matic testnet tokens are stored.

### 2a. Basic Details of Stage 1

**Network Details**

**Heimdall Chain ID**: heimdall-lXaaU9

**Bor Chain ID**: 2001

**Tag**: CS-2001

**Bor Block Time**: 5 secs

**Heimdall version**: heimdalld version is beta-1.1-rc1-213-g2bfd1ac

**Repo details**: [https://github.com/maticnetwork/public-testnets/](https://github.com/maticnetwork/public-testnets/)

**Ropsten Contract Details**

```js
{
  "root": {
    "tokens": {
      "TestToken": "0xA68e9e5dde3f80057fe639952e4acfD28D6d871B"
    },
    "BytesLib": "0xD1177eC040bCEF1eab7c9d8fA92c296d63838184",
    "Common": "0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e",
    "ECVerify": "0x46eD7904137e6ABA7c879D8dD676A3f57191Fdac",
    "Merkle": "0xf52E92A81Ad4f242Df4E8426178c9Ddc0F2191C8",
    "MerklePatriciaProof": "0xd179E9A09Eb434A092dEB3EBcCB0dd6133A91712",
    "PriorityQueue": "0x224de567f24C111bF98b04Cb875682815aA9ED8A",
    "RLPEncode": "0x4f9C5Abe93E48EA087a423aDcB38aF349b18dcdD",
    "RLPReader": "0x2285aa1cdD3Ed51A1b052A17a58ab0F0aaf4a5Bc",
    "SafeMath": "0x25bdaA6Ff67014572Ba33b76a158c095B15DFcad",
    "Registry": "0x6eD25faaa5F38d626f2c2E93d683C09dD04d74e7",
    "RootChain": "0xb26C687D70Df7c463B4E6b459560E4c50734BeCf",
    "RootChainProxy": "0xe029642119840f4866F0A77B67e641AA3c20D764",
    "ValidatorShareFactory": "0xc6CbeA9CC9075eBD484F75DA79c3B1EFf246dfC0",
    "StakingInfo": "0xD0D89C9bc21b088e74fC9c7c7ff793a11498d316",
    "StakingNFT": "0x1851F36BA0C7F82FE5a9D32ECfb4834BBcF2547b",
    "StakeManager": "0xC4701aCE05B5D8A821D00f790f7Bee532d5F3C61",
    "SlashingManager": "0x45331b78Ecfe13C916842ae8b494A97F2db0F5cD",
    "StateSender": "0x0E4Bb4ed32D330FAd5EBDf185841047d88d3c409",
    "DepositManager": "0x7CC755B4e715d9d17e227365406771DC7F90fcd1",
    "DepositManagerProxy": "0xfE8e44e55714746Ef85Caa62DBE65A1F90535CF7",
    "WithdrawManager": "0x91c6868A8072740479175513d1CFd2cdd30e1118",
    "ExitNFT": "0x3849735A8049Cc89f0e2F0b04DFD4b2EcE2db091",
    "WithdrawManagerProxy": "0xD7963e35BdCbdFF9EB6fAD6fA8576610af182931"
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


### “Did you reset Tendermint without resetting your application's data?”

In such a case you can reset heimdall config data and try running the installation again.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge



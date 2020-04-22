---
id: signer-change
title: Changing your Signer Address
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Brief about Signer & Owner addresses

Each validator uses two keys to manage validator related activities on Matic:

1. **Signer Address**

    The signer address is an address that is used for signing Heimdall blocks, checkpoints, and other signing related activities. This key's private key will be on the Validator node for signing purposes. It cannot manage stake, rewards or delegations.

    The validator must keep two types of balances on this address:

    - Matic tokens on Heimdall to perform validator responsibilities.
    - ETH on Ethereum chain to send checkpoints on Ethereum.


2. **Owner Address**

    The owner address is an address that is used for staking, re-stake, changing the signer key, withdraw rewards and manage delegation related parameters on the Ethereum chain. The private key for this address must be secure at all cost.

    All transactions through this address will be performed on the Ethereum chain.

The signer address is kept on the node and is generally considered a `hot` wallet, whereas the owner address is supposed to kept very secure, is used infrequently, and is generally considered a `cold` wallet. The staked funds are controlled by the owner address. 

This separation of responsibilities has been done to ensure an efficient tradeoff between security and ease of use.

## How to Change Signer Address

**Pre-requisite**: You will need to make sure that you are already running a separate machine where Heimdall and Bor nodes are synced & working appropriately. You also need to run this new node with a different address, different than your current node.

For ease of this document, we will refer to your Current Node as Node 1 and your new node as Node 2

In order to change your Signer address, first you need to login to your validator profile on the Staking Dashboard with Node 1. Once you login you need to navigate to your profile page and there you would see a button for **Edit Profile**.

<img src={useBaseUrl("img/staking/edit-profile.png")} />

Clicking on Edit Profile will navigate you to a page which will show you all your basic details such as Validator Name, Signer Address and Signer Address Pubkey.

Here is where you can go ahead and change your Signer Address and Signer Address Pubkey.

In the Signer Address field, you can add the add the address that you used while setting up Node 2. Also you can also keep the Pubkey handy with your for Node 2.

In order to get the pubkey for Node 2, you run the following command, `heimdalld show-account`

Once you add the correct `address` and `pubkey` in the respective fields, you can then click on the `Save` button.

<img src={useBaseUrl("img/staking/signer-address.png")} />

**Note:** You need to make sure that you add the `address` & `pubkey` of Node 2 only.

Clicking on `Save` will then save your new details for your node. This essentially means that Node 1 will be your addres that controls the stake, where the rewards will be sent to, etc. And Node 2 will now be performing activities like `Signing Blocks`, `Signing Checkpoints`, etc.


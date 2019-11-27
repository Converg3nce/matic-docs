Hey everyone! Counter Stake is here - Get ready to run Validator nodes on the Matic testnet!

We have been working hard on enabling the Proof-of-Stake (PoS) layer on the Matic Network, and we are launching our public incentivized staking testnet event [Counter Stake](https://matic.network/counter-stake/). We had previously released the details of our Staking economics and updates [here](https://blog.matic.network/matic-network-staking-economics/) and [here](https://blog.matic.network/matic-network-staking-update-and-becoming-a-validator).

**Stage 0 of Counter Stake has officially started now**, with stages 1 and 2 to come [later](https://matic.network/counter-stake/). 

You can start with setting up the Validator nodes on the testnet from here - these are the set of steps that will help you get started.
 
> * **Step 1:** [Install Heimdall](../heimdall/install-heimdall)

> [Heimdall](https://github.com/maticnetwork/heimdall) is the Proof-of-Stake Validator node and layer for the Matic Network. It works in consonance with the [Staking contracts](https://github.com/maticnetwork/contracts/tree/master/contracts/staking) on Ethereum to enable the PoS mechanism on Matic. You can read up on it more [here](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

> * **Step 2:** [Install Bor](../install-bor)

> [Bor](https://github.com/maticnetwork/bor) is the Block producer node and layer for the Matic Network. Blocks produced on Bor are validated by Heimdall nodes, and a checkpoint consisting of the Merkle tree hash is committed on Ethereum periodically. You can get more details about Bor [here](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

> * **Step 3:** [Join the public testnet](../join-public-testnet)

> After you have installed Heimdall and Bor, the final step is join the public testnet that we have setup. Completing this step will ensure that you are ready to fully participate in later stages of Counter Stake.


If you face any trouble during installation or syncing, do share your queries in this forum [here](https://forum.matic.network/c/counter-stake) or on our Validator [Discord channel](https://discord.gg/6Dk9qDv).  

This will be useful for others to review as well. We’ll try to resolve things as soon as we can.

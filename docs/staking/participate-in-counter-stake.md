Hey everyone! Counter Stake is here - Get ready to run Validator nodes on the Matic testnet!

We have been working hard on enabling the Proof-of-Stake (PoS) layer on the Matic Network, and we are launching our public incentivized staking testnet event [Counter Stake](https://matic.network/counter-stake/). 

To participate in the public testnet event, you need to first setup your Full Node (Stage 0) and then become a Validator (Stage 1 & 2.) 
 
**Stage 0 - Setup (Currently on-going)**

This is mainly to help everyone setup their own nodes and understand the functioning of the network. 

Please note that in order to setup `Heimdall` and `Bor`, you have an option to either install its binaries or have the Docker Image (more resource-intensive) running as mentioned below.

> * **Step 1:** [Install Heimdall](../heimdall/install-heimdall)

> Heimdall is the Proof-of-Stake validator layer for Matic Network. The core responsibilities of Heimdall include verifying all state transitions happening on Bor and to periodically submit checkpoints on the Etehreum chain.

> **Alternatively**, if you do not wish to follow many installation steps, get the **Docker Image for Heimdall** running as mentioned [here](../heimdall/running-with-docker).

> * **Step 2:** [Install Bor](../install-bor)

> Bor is the Block Producer layer for the Matic Network. Blocks produced on Bor are validated by Heimdall nodes.

> **Alternatively**, get the **Docker Image for Bor** running as mentioned [here](../bor/running-with-docker).

> * **Step 3:** [Join the public testnet](../join-public-testnet)

> After you have installed Heimdall and Bor, the final step is to sync your node with the on-going testnet. 

Please note that this stage is only for you to setup your Full Node and checkout the network status. You may stop all services later and restart again to participate in later stages of Counter Stake.

**Stage 1 - Stake on the Beach (Will start sometime soon after the new year)**

> * **Step 1:** Setup your Full Node as mentioned under Stage 0.

> * **Step 2:** Stake tokens to become a validator - Contract addresses and other details will be released before the stage commences.

We will be testing all features incrementally here; rewards, slashing, replacement and more. You will need to maintain your uptime and earn rewards as per your performance.

**Stage 2 - The Grand Staking League**

Based on the performance of all nodes in the previous round, we will have a limited number of testnet validator slots (as per tendermint limit) in this stage. Every node begins with the same amount of stake. The one with the most power in the end wins!

**Advanced**

This is not required to participate in the Counter stake event. However, if you wish to deploy your own Matic Testnet and experiment with the code, please follow the steps mentioned [here](../deploy-your-own-matic-testnet).


**Queries, any?**
If you face any trouble during installation or syncing, do share your queries in this forum [here](https://forum.matic.network/c/counter-stake) or on our Validator [Discord channel](https://discord.gg/XvpHAxZ).  

This will be useful for others to review as well. We’ll try to resolve things as soon as we can. Good luck and looking forward to working together! 

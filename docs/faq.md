## What is Matic Network?

Matic Network is a sidechain scaling solution for public blockchains. It is an adapted implementation of Plasma framework which provides scalability and superior user experience for existing blockchains in a secured and decentralized manner. It has has a working implementation for Ethereum on Kovan Testnet. In future Matic intends to support other blockchains also which will enable it to provide interoperability features too apart from scalability to existing public blockchains.

## How is Matic different from other implementations of Plasma?

Matic Network's implementation of Plasma is built on state-based side chains which run on EVM, while the other implementations of Plasma primary use UTXOs which make them specific only to payments. Having state based side chains allows Matic to provide the scalability to generic smart contracts also in future.

Secondly, Matic Network uses a public checkpointing layer which publishes checkpoints after periodic intervals (unlike every block checkpoints in Plasma Cash) allowing the side chains to operate at high speeds and publishing the checkpoints as batches. The checkpoints and fraud proofs ensure that side chain operates in a secure manner and any fraudulent activity can be detected on Ethereum mainchain and be penalized by slashing the stakes of the bad actors. This mainchain security is supplementary to the PoS protocol security on the side chains.

## Your project provides scalability for Ethereum using plasma chains, is it a protocol or a native blockchain in itself?

Matic Network is a "side chain" solution where Ethereum mainchain assets, i.e all Dapps/Tokens/Protocols of the main chain can be moved/migrated to Matic Network side chain(s) and when needed, one can withdraw assets back to mainchain.

## What makes the competitive advantages of Matic over its competitor?

- L2 scaling solutions

Matic Network is committed to achieving scale with decentralization. Matic network uses periodic checkpoints and fraud proofs, as described in Plasma framework. When users want to withdraw their assets, they use the checkpoints to prove their assets on side-chain, while fraud proofs are needed to challenge fraud or any bad behavior and slash stakers.

Amongst L2 solutions there somewhat similar solutions like Loom. Loom recently announced plans of Zombiechain that may have similarities to Matic. But there two key pointers in that:

First and foremost, Focus is different. Loom is focusing on games and social apps with less decentralization while Matic needs security and decentralization as we are gearing for financial transactions/ trades as well as games and other casual Dapps. We also have plans for full-blown financial services like lending/trading DApps (token-sets swaps, margin trades and much more)

Secondly, Plasma Cash, which is what we believe Loom wants to use "in future", block times, will always be more than the Ethereum block times as you need to push every block of the sidechain to the main chain, while Matic uses checkpoints (with PoS layer) for 1-second block times (with PoS layer)

As Plasma Cash works with the NFT (Non-Fungible Token), it works great for game cards and social state changes where you have pre-defined fees (bundled as NFT - eg "20 tokens" to play game == 1 NFT coin on plasma cash). For normal tokens transfer, you may need to swap tokens (like normal currency notes change) on top of plasma cash which I think makes it difficult (more difficult for usability/users). It is still being discussed on plasma calls. While Matic uses state-based plasma (closer to Plasma MVP), this is not the problem for us.

- L1 scaling solutions

Apart from that, amidst other top scaling projects like Ziliqa and Quarkchain, who boast of high TPS like us, Matic stands out due to its ability to achieve scale while maintaining a great degree of decentralization.

More importantly, these scalability projects have a big problem. They are creating new blockchains where the new developer community, new product ecosystem, technical documentation and more importantly new businesses everything needs to build from "scratch". Matic on the other hand, since it is an EVM, all programming languages, developer documentation everything is off the shelf applicable to Matic Network. All the Dapps/assets built on Ethereum mainchain have scalability available at the click of a button in the form of Matic Network for it being EVM based side chain.

- Payments

In payments, Raiden Network can be a competitor. Raiden thas implemented Lightning network on Ethereum. An important issue is of capacity/liquidity on the hubs. But this issue gets further amplified for Raiden as Lightning network has only one asset (Bitcoin) for hubs to maintain liquidity while Raiden Network would have to achieve liquidity for the countless number of assets (Ether, ERC20 Tokens)

But we believe that Matic Network has an edge in terms of usability also because, in Raiden, both sender and receiver have to create their payment channels. This is very cumbersome for users. While with Matic's underlying technology there is no requirement of payment channels for users and they only need to have a valid Ethereum address to receive tokens. This is also in line with our long-term vision of improving the user experience for decentralized applications.

- Trading and Finance

Matic Network intends to enable DEX's (eg 0x), Liquidity pools (eg. Kyber Network) and other kinds of financial protocols like Lending protocols (Dharma Protocol) on its platform, which will allow Matic Network users to have facilities like DEXs, Interoperability, Lending and many other financial features

- Others

Also, Matic Network's core focus on creating enhanced user experience applications aims to contribute to the mass adoption of DApps. In the same league, we are intent on building ecosystem tools. Our products like Dagger (which is very famous amongst the Ethereum community) and Opensigner (implementation of Walletconnect protocol and complete Node.js implementation) are a testimony to the same -

[WalletConenct](https://github.com/WalletConenct/WalletConenct)

[Dagger](https://github.com/maticnetwork/eth-dagger.js)

[Sol-Trace](https://github.com/maticnetwork/sol-trace.js)

## How does Matic compare with other sidechain solutions like POA/Go-Chain?

Matic Network's biggest differentiator is Plasma Framework which ensures Decentralization and Security of side chain transactions.

Projects like POA use block producers notarised by Government and Go-Chain uses institution across various countries. Such public block producers have a big chance of getting influenced by powerful governments and even self-interests. Also, side chain transactions are secured only by side chain consensus in which the participants are very low in number 3-25 while on Matic Network, all side transactions are secured by multiple mechanisms on the side chain as well as mainchain.

On sidechain, any transactions done by Block producer layer are verified and checkpointed to the mainchain by a highly decentralized checkpointing layer. So if any fraudulent transaction happens on sidechain it can be detected and handled by the checkpointing layer. Even in extreme and highly unlikely scenario wherein the block producer layer as well as the checkpointing layer both collude, even then Mainchain has fraud proofs on which anyone from the public can come and challenge any transaction that they deem fraudulent on the sidechain. If the challenge is successful, there is a huge economic disincentive/financial punishment to the colluding parties as their stakes are forfeited. Also, the public challenger is rewarded with slashed stakes of the fraudulent sidechain actors.

All this makes Matic Network economically incentivized side chain network which has a high degree of decentralization and extremely high security of the sidechain transactions.

Secondly, capacity and TPS of Matic sidechains are much higher than that of POA and Go-chain. Especially when Matic Network can have thousands of transactions while POA and Go-chain are single sidechains which have a higher limit of a few thousand transactions.

## Your whitepaper are plain 8 pages, will you make it nicer and more presentable to explain it?

Yes. We are in process of putting more technical details by putting in the underlying research theories and concepts for the critical parts of the product, consensus mechanisms etc.

## When will the new version of the White Paper, website, and roadmap be published? Really curious to see them.

The new website (https://matic.network/) has been made live recently days back but we haven’t made a public announcement about it as we are curating a lot more content around it.
Plus we are ready to release an exciting feature on our product “Dagger” wherein we have provide easy integrations for Dapp Developers to deploy custom notifications (Emails, push notifications etc) by listening to smart contract events. So we wanted to make a big announcement with the product feature along with the go live of the website.

Whitepaper 2.0 has also been made live at https://whitepaper.matic.network/

Roadmap’s draft is here, there may be a few changes here and there but the draft is as below :

https://drive.google.com/file/d/1R-WICPWI_Qcb2_Ic2MYmybfVxRIpdath/view?usp=sharing

## How will Multi Chain Support work?

Matic Network uses Plasma framework which has few key principles. In simple words, proofs of the transactions happening off chain should be pushed on Mainchain, Fraud proofs on the mainchains and safe exit mechanisms in case of a fraudulent activity for ex. Exit queues.

The same mechanisms can be implemented on any mainchain to support side chains.

Basically any asset being deposited to Matic Network is deposited as a equivalent protocol contract. For example an ERC20 on Ethereum Mainchain is deployed as a ERC20 on the Matic sidechain. Similarly for ERC721 or any other standard. The same will go for say, a NEP5 standard. It will have an equivalent protocol contract on the Matic side chain.

Also, if by Multi Chain support you mean multiple side chains, then yes Matic checkpointing layer can support multiple side chains. A single side chain can have tens of thousands of TPS. Multiple side chains can provide a capacity of millions of transactions per second to Matic Network.

The Plasma whitepaper itself has made it very clear on how multiple sidechains can be implemented. The Plasma sidechain tree architecture is the best way to implement this. You can have a number of side-chains of arbitrary depth, with different use cases possible as you go up and down the tree. Sidechain exits are an important design consideration in Plasma, and therefore, we will need to implement multiple sidechains, because if exits happen in one child chain, users can easily shift to another side chain. The entire element of the Proof of Stake layer is to mitigate the possibility of such exits, so that user experience is not spoilt.

## Via what principles will new Side Chains be added? Will there be any special requirements for private companies' local Side Chains?

As mentioned above, sidechains for a single Layer 1 blockchain (say Ethereum) can be implemented using the Plasma framework. Relative to state channels, Plasma represents a superior alternative to scaling frameworks, chiefly due to the security guarantees provided by the framework - which basically say that users will never lose funds in any eventuality. Sure, there could be delays in getting back the money, but a Byzantine Plasma operator cannot create money out of thin air, or double spend a transaction.

Matic Network will strive to be a completely open and public blockchain infra in the future wherein the economic incentives/disincentives will primarily drive the security and stability of the system. So anyone should be able to join the system and participate in the consensus. In the network seeding stage however, initially Matic network will have to play a larger role to enable side chains.

Also, Matic side chains would be primarily public side chains i.e sidechains available for use for anyone in public just like other public blockchains. Although, Enterprise Matic chains will intend to provide dedicated side chains (non-privacy enabled) for particular organizations. The security and decentralization of such chains would still be kept intact using the checkpointing layer and fraud proofs on the mainchain. However, supporting privacy enabled sidechains with checkpoint validation and fraud proofs on the mainchain is still a research topic for us.

## How is Matic Network different than Celer Network?

Both Matic Network and Celer Network are different solutions to the same problem - low transaction throughput in current blockchains. Both utilise off-chain scaling techniques and rely on the main chain for final security; however the fundamental difference is in the approaches - Matic Network is based on a set of Plasma sidechain(s) backed by Proof-of-Stake consensus (see http://plasma.io/ for more details), whereas Celer Network is a state-channel based solution. Both projects aim for generalized state transitions off-chain, but in vastly different ways.

Matic Network is aiming to build a DApp developer ecosystem. Since it uses an account-based Plasma sidechain, and also employs a EVM-compatible runtime known as the Matic VM, it will be relatively easier for Ethereum based DApps to migrate to Matic Network once it is live. So in this respect as well, Celer Network is different in terms of developer interfacing.

## Will side chains also be synced with the Mainchain (Ethereum)?

Absolutely! As discussed previously, we are implementing the Matic Network infrastructure on the foundation of Plasma. The main way to incentivize Plasma operators (in our case, this is a 2-layer Delegate and Staker chain for added security and mitigation of block withholding) remain non-Byzantine during block generation, as it is an ever-running bounty campaign on the Plasma contract in the Ethereum mainchain.

For this, Plasma framework mandates proofs of the transactions/blocks produced on the side chains to be published on the mainchain. The public checkpointing layer will validate all the transactions happening on the side chains and publish the proofs to the mainchain. To ensure foolproof security of side chain transactions, the mainchain Plasma contract contains various kinds of Fraud Proofs where any sidechain transactions can be challenged for any fraudulent activity. If a challenger succeeds, the stakes of the side chain actors involved in the fraud are slashed and are provided to the challenger. A good diagram for understanding is as below:

![Arch](images/Architecture.png)

## Will you implement atomic swaps? If yes, how?

There are ways to do so - Swingyby protocol, Doge/ETH bridges [check this Medium article](https://medium.com/truebit/enter-the-rabbit-hole-the-doge-ethereum-art-project-31e8116043c4), hash time locked contracts or simple pegging. We will choose best suited with UI/UX and security as we go ahead. Once assets from multiple blockchains are available on the sidechain, DEXs will be able to provide exchange between assets which are originally from different base chains.

## At the end of the White Paper, there is a list of "Potential Use Cases" - will all of that be implemented? In what order?

Matic Network Foundation will enable and support ecosystem teams to develop these potential use cases. It is not our intention to implement all of these projects on our own - and we do not wish to give off that impression. We intend Matic to be a DApp platform, which will provide instant transactions at low costs. Once the Matic Network goes live, we will keep adding support to all these use cases. We will be leaning on community teams to work with us on our platform to create these apps.

The basic logic is - if there is a DApp/Protocol which is working on Ethereum, but is limited by low transaction throughput and high transaction fees - then we will be able to add support for these DApps/Protocols on Matic.

The ultimate objective is to come up with Generalized State Scaling - however, this will take time. We are already working with teams such as Parsec Labs, Truebit and Decentraland on this initiative - A are few mentions about Matic from other projects, [here](https://parseclabs.org/blog/Development-Update-May-2018/) and [here](https://blog.decentraland.org/blockchain-security-will-it-scale-5d82c5df4640).

But before that happens, we will add support for specific contracts and protocols. Once the contract is secured by Fraud proof guarantees, it can go live on Matic Network, and can be used by DApps.

Priority order would be DEX, Payments, Liquidity Providers, Lending & Credit Scoring, Atomic Swaps.

Although most of these features will run in parallel, we are in talks with various top teams to collaborate with us to deploy these protocols on Matic side chains.

## How is Matic Network different than Celer Network

Both Matic Network and Celer Network are different solutions to the same problem - low transaction throughput in current blockchains. Both utilise off-chain scaling techniques and rely on the main chain for final security; however the fundamental difference is in the approaches - Matic Network is based on a set of Plasma sidechain(s) backed by Proof-of-Stake consensus [see](http://plasma.io/ for more details), whereas Celer Network is a state-channel based solution. Both projects aim for generalized state transitions off-chain, but in vastly different ways.

Matic Network is aiming to build a dApp developer ecosystem. Since it uses an account-based Plasma sidechain, and also employs a EVM-compatible runtime known as the Matic VM, it will be relatively easier for Ethereum based dApps to migrate to Matic Network once it is live. So in this respect as well, Celer Network is different in terms of developer interfacing. There are other differences as well - let’s see if we can publish these in a long form blog post.

## Why no one else cannot replicate Matic’s plasma implementation?

Although with blockchain solutions its more about the network effect as to which network is able to scale/grow ecosystem better than others BUT more importantly with blockchain solutions they have to mandatorily be open source as it entails the actual assets being used in them.

Also it is the case with all the open source projects. It is equally applicable to us as well as the other rival implementations as we are going to have our GPL licence which mandates anyone using our implementation to mandatorily open source their code. But again, the point being, that copying of code is applicable to even to Bitcoin, Ethereum and any other projects, its more about the network effect that one project can achieve.

## What’s special about Matic Network’s Plasma implementation?

So Plasma Matic uses a state based system rather than the UTXO system used by Plasma Cash, Plasma MVP and Plasma XT. This provides us with a huge advantage of using an EVM on the matic chain which enables us to utilize the entire Ethereum ecosystem, developer tools, integration libraries etc for the Matic network.

The Dapps can easily use the the Matic system without making any changes to their ERC20 tokens. Also our checkpointing layer enables us to be magnitudes of times faster than the other Plasma implementations as we batch the proofs of the individual blocks in the checkpoints while other Plasma implementations have to submit every block proof to the mainchain

## How are you going to solve the issues with centralization?

Here is a diagram to give you some context:

![Centralization](images/Merkle.png)

So firstly, The PoA nodes that you saw, are going to be Delegates ( with Proof of Solvency i.e They have to deposit high amount of stake ) and KYC basically selected by the PoS layer just like a EOS style DPoS or DBFT nodes.

Secondly, let’s assume all of the Delegates (or 2/3rd of them) turn bad actors and produce faulty blocks, then you have PoS layer stakers who are going to validate all the blocks and if any frauds are committed the stakes of Delegates are slashed, the checkpointing is stopped for the corrective actions.

Thirdly, let's say even the Staker PoS layer (which would be a large number of nodes) also turns bad and collude to produce faulty checkpoints. I.e all the PoA are corrupt and PoS are corrupt Even then following Plasma philosophy we are writing one of the coveted things of side chain scaling, _Fraud proofs_ which is being watched by many big projects ( The watchers can be seen as our repository watchers on Github). This fraud proof mechanism enables any one in public to challenge any transaction on the Mainchain, succeeding which they stand to gain rewards from the slashing of stakes of all the stakeholders involved in the commited fraud.

## Why Matic Token is required?

We intend to build Matic as a general purpose scaling solution for public blockchains. As in future there can be multiple base chains like Ethereum, its not favourable to build the Staker ecosystem on any other asset than Matic itself.

Appcoin security model - i.e when the consensus participants have their stakes in Matic tokens, they have a strong economic disincentive to not act in the disinterest of the network

No dependency on Ethereum as if in future there’s some existential threat on Ethereum, Matic token holders and stakers can simply move to other blockchains like NEO and EOS. While if we allow people to stake only in Ether, then it makes us platform dependent.

Since the PoS ecosystem requires high value stakes to safeguard the network, Staking in Ethereum or any other base chain would make it financially not viable for us to setup the base blockchain infrastructure.

## Do you have prototype or demo to show to the public yet?

Yes. The demo is available [Here](https://www.youtube.com/watch?v=l1vb5pjezJ8)

## What is the transaction per seconds?

Currently “a single Matic side chain” can theoretically handle 2^16 (65000+) transactions per second

## Is token type ERC20?

Yes. And the same token will be applicable to Matic Chain too i.e no need to move to a native token in future

## Do you have a timeline on the mainnet launch?

Most likely Q3

## Could you outline your roadmap, How far are you with development and When do you expect a live implementation of Matic to be launched?

We already have a live implementation. We have recently put it on youtube. We also conducted Consensys BSIC in Mumbai where we demoed Matic network on Kovan Testnet.
In terms of the Roadmap, we are going to publish a detailed roadmap soon.

## What is the expected TPS you'll be able to bring to the Ethereum network? What are you running at now on testnet?

A single side chain has the capacity of 2^16 (65000+) transactions per second. Matic network has the capability to add multiple side chains without much effort. But currently, our focus would be on stabilizing the network with one side chain.

## "We have chosen Ethereum as the first platform to showcase our scalability" What other platforms are you aiming toward, and is there a timeline for implementation

Making our Mainnet live with Ethereum as basechain is the first priority as of now. For other platforms we will announce once we have a reliable implementation of Testnet ready.

## "We also intend to launch the alpha version of our Mainnet with working Dapps before the ICO"

The partner information is confidential as of now. We will soon make them public. We have 4 teams building their solutions on top of Matic. One of them is a banking wallet in India, 1 in gaming segment, 1 in referral marketing (who are going to publish about Matic Network in the Whitepaper) and 1 in the ad network. There are others in pipeline/pre-final stages but not confirmed yet.

## Do you have a timeline on the ICO? Any information on these DApps?

ICO related details are again confidential as of now

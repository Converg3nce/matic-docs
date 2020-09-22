---
id: mapping-assets
title: Mapping Assets using POS
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

### intro

Assets can be transferred in between root chain & child chain. Let me be first clear regarding nomenclature

- **Root chain/ Base chain/ Parent chain/ Layer 1** :: all are same, referring to either Goerli or Ethereum Mainnet
- **Child chain/ Layer 2** :: refers to either Matic Mumbai or Matic Matic Mainnet

For assets i.e. ERC20, ERC721, ERC1155 to be transferrable in between chains, we need to be following certain guidelines

- Assets must have required predicate contracts deployed
- Asset contract need to deployed on root chain
- Modified version of asset contract needs to be deployed on child chain
- Then they need to be mapped by calling [`RootChainManager.mapToken(...)`](https://github.com/maticnetwork/pos-portal/blob/c50e4144d90fcd63aa3d5600b11ccfff9b395fcf/contracts/root/RootChainManager/RootChainManager.sol#L165), which can only be performed by certain accounts

> For mapping i.e. the final step, make sure you check [below](#request-submission)


### request-submission

Please go through [this](/docs/develop/ethereum-matic/submit-mapping-request).

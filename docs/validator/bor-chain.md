---
id: bor-chain
title: What is BOR Chain?
sidebar_label: BOR Chain
---

The Bor node or the Block Producer implementation is basically the sidechain operator. The sidechain VM is EVM-compatible. Currently, it is a basic Geth implementation with custom changes done to the consensus algorithm. However, this will be built from the ground up to make it lightweight and focused.

Block producers are chosen from the Validator set and are shuffled using historical Ethereum block hashes for the same purpose. However, we are exploring sources of randomness for this selection.
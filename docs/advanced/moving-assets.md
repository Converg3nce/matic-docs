---
id: moving-assets
title: Moving Assets
---

Moving assets to and fro matic chain involves first depositing tokens onto matic's plasma contract on mainchain (Ethereum), the token is then minted onto Matic chain into the user's address. Once the user wants to withdraw tokens, the process is to burn tokens on matic chain, submit a proof of burn on main chain, and claim deposited tokens on the main chain.

### Supported Tokens

- ERC20
- ERC721

> Note: To move a custom token from main chain to matic chain, the token contract is supposed to be mapped on root chain plasma contracts. To use mapped tokens, request TEST ERC20/721 from: https://faucet.matic.network. You can also submit a mapping request for a custom token here: http://bit.ly/matic-technical-group

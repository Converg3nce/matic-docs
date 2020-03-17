---
id: flow-of-token
title: Flow of Tokens on Matic
---

## Workflow
Here is the whole process with the deployement of your contracts on Matic and Support for Ethereum↔Matic. 

1. User deploys a new ERC-20 token to Ethereum - XToken

2. Now deploy the ChildERC-20 token contract to the Matic side-chain(we will provide you with the contract which can be flexible based on the requirements). Deployement on Matic Network requires it native token Matic, which can be deposit from Ethereum to Matic or can be bought at Secondary Market Place.

3. It's time to map your tokens Ethereum ↔ Matic, Please provide us with the addresses of your  XToken on Ethereum and ChildXToken on Matic. We will map it for you.( You can contact us on Telegram or other available channels.)

4. User can mint the Xtokens and Transfer on Ethereum. For example let's say 100XToken are mint and then transfer to other another account.

5. To avail these tokens on Matic Chain, Call function deposit which will call for two transactions first approve and then depositERC20. 

6. Now 100XTokens are available on Matic Chain at the same address.

7. You can transfer 50 XToken from YourAddress to NewAddress. Again for transactions on Matic similiar to ethereum, Matic network uses it own Native token.

8. If the users want to get back these Xtoken on Etheruem Chain, then call StartWithdraw which will withdraw from childTokenContract and Burn these tokens on Matic Chain. To avoid any bad participation, A set of validation will take place. Once it is done the tokens will be available at Ethereum Chain.

9. Call processExits() to recieve those tokens back to your EOA or your account address.

10. You should see the 50 XToken on the Ethereum mainnet at you Account Address.

## Integrating with Matic within 2 Steps:

1. Deploy your contracts on Matic Chain

- Matic Chain is EVM supported, therefore ethereum-based blockchain are completly supported on Matic.
- You can start with deploying your contracts on Testnet (https://testnetv3.matic.network).

2. Flow of tokens from Ethereum<->Matic (if required)

- Deploy a child contract on Matic chain to Map the token.
- Follow this 10 minutes guide to use Matic.js and enable the flow of tokens from Ethereum<->Matic.
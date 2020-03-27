---
id: ethereum-matic
title: Ethereum ↔️ Matic
---

Plasma Secured Solution to transfer your assets from Ethereum to Matic and vice-versa.

1. Deposit assets from root chain to Matic [(Ethereum → Matic)](deposit)
2. Transfer assets between accounts on Matic [(Matic ↔ Matic)](transfer)
3. Withdraw assets from Matic on to root chain [(Matic → Ethereum)](withdraw)

* Use [matic.js](https://github.com/maticnetwork/matic.js) to interact with the Matic Plasma contracts. Go to  the [maticjs walkthrough](https://docs.matic.network/matic-js-tutorial/).

## Flow
Here is the Flow with the deployement of your contracts on Matic and Support for Ethereum↔Matic. 

1. User deploys ERC-20 token to Ethereum - XToken

2. Now share your contract address with [Matic](https://t.me/joinchat/HkoSvlDKW0qKs_kK4Ow0hQ). Here is an example request...

>Hello everyone, We are AwesomeDApp deployed on Matic Network. Looking for a solution to transfer my assets from Ethereum to Matic and vice-versa. <br/><br/>
A short description on my AwesomeDApp...<br/><br/>
Token_Address on Ropsten-> "0x.."<br/>
Token_Name-> "XToken"<br/>
Token_Symbol-> "X"<br/>
Token_Decimals-> "18"<br/><br/>
Requesting you to Map these tokens to Matic Testnet Version.<br/>

We will deploy a Child Contract for you on Matic which can be flexible based on the requirements and Mapped to your tokens Ethereum ↔ Matic.(Deployement on Matic Network requires it native token Matic, which can be deposit from Ethereum to Matic or can be bought at Secondary Market Place.)

3. User can mint the Xtokens and Transfer on Ethereum. For example let's say 100XToken are mint and then transfer to other another account.

4. To avail these tokens on Matic Chain, Call function deposit which will call for two transactions first approve and then depositERC20. 

5. Now 100XTokens are available on Matic Chain at the same address.

6. You can transfer 50 XToken from YourAddress to NewAddress. Again for transactions on Matic similiar to ethereum, Matic network uses it own Native token.

7. If the users want to get back these Xtoken on Etheruem Chain, then call StartWithdraw which will withdraw from childTokenContract and Burn these tokens on Matic Chain. To avoid any bad participation, A set of validation will take place. Once it is done the tokens will be available at Ethereum Chain.

8. Call processExits() to recieve those tokens back to your EOA or your account address.

9. You should see the 50 XToken on the Ethereum mainnet at you Account Address.

---
id: custom-tokens
title: Config Custom Tokens
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This page demonstrates the process of configuring/adding custom tokens to Metamask. Specifically, we have demonstrated adding the example `TEST` token to the Ropsten testnet as well as the Matic testnet. 

You can use this process to add any custom ERC20 tokens to any network on Metamask.

**Adding the `TEST` token (ERC20) to your Metamask account on Ropsten Network**

To display `TEST` tokens on your account on the Ropsten Network, you can click on the Add Tokens option in Metamask. It will then navigate you to a screen. You then click on Custom Token tab and copy-paste the address below in the Token Address field.

The `TEST` token contract address on Ropsten is `0x28C8713DDe7F063Fdc4cA01aB2A8856e0F243Fec`. Note that the `TEST` token is an example ERC20 token contract that is used throughout the Matic Network developer docs for illustration purposes.

The other fields will auto-populate. Click on Save and then click on Add Tokens. The `TEST` token should now be displayed on your account on Metamask.

**Configuring `Matic TEST` tokens to Metamask**

You will also need to configure the `TEST` tokens to Matic’s Testnet for visualization if you are following the introductory Matic.js tutorial. **Switch the network on Metamask to point to the Matic testnet - https://rpc-mumbai.matic.today **. On Metamask, this will be shown as `Private Network`.

The corresponding `TEST` token address on Matic testnet is `0x3f152B63Ec5CA5831061B2DccFb29a874C317502`. Note that this token contract address is different from that of Goerli - since this is the `TEST` token on the Matic Network. A detailed, screen-by-screen guide to add custom tokens is shown here:

You can open Metamask and then click on the option for Add Token.

<img src={useBaseUrl("img/metamask/configure-custom-token-1.png")} />

You will see a screen to either search from a list of already available tokens or add a custom token. Click on Custom Token.

You will see a field to add the Token Address. Paste the token address in the form, and configure the token name as `TEST`.

<img src={useBaseUrl("img/metamask/configure-custom-token-2.png")} />

You can then click on Next.

<img src={useBaseUrl("img/metamask/configure-custom-token-3.png")} />

And then click on Add Tokens. You will be navigated back to the home screen and the new token will be displayed in the token list.
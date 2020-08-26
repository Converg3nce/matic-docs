---
id: arkane
title: Arkane
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

Arkane allows you to easily integrate your app with Matic, whether you already have an app integrated with web3 or are building a new application from scratch. Arkane provides a smooth and delightful experience for you, your users on both web and mobile.

Their products will not only help you to interact with Matic but also create wallets, create different asset types such as fungible (ERC20), and non-fungible tokens (ERC721, and ERC1155) and interact with Matic smart contracts. Next to a superior developer experience, Arkane can give your users a user-friendly interface.

## Getting Started
>Already have support for Web3? GREAT 🎉, this is the place to start.

If you already support Web3-technology, you can improve the UX within your application by integrating the Arkane Web3 provider, a smart wrapper around the existing Web3 Ethereum JavaScript API.

By making use of our Web3 provider you are able to leverage the full potential of Arkane with minimal effort and you will be able to onboard users that are less tech savvy without making them leave your application or download third party plugins. Integrating just takes 2 steps and 5 minutes


**Don't support Web3 yet?**
Don't worry we've got you covered with our 📦 [Widget - Arkane Connect](https://arkane.gitbook.io/widget/).





### Step 1: Add the library to your project 
Install the library by downloading it to your project via NPM

```
npm i @arkane-network/web3-arkane-provider
```

followed by adding the script to the head of your page.

```
<script src="/node_modules/@arkane-network/web3-arkane-provider/dist/web3-arkane-provider.js"></script>
```

After adding the javascript file to your page, a global Arkane object is added to your window. This object is the gateway for creating the web3 wrapper and fully integrates the widget - Arkane Connect.

### Step 2: Initialize the web3 provider
Add the following lines of code to your project, it will load the Arkane web3 provider.

```
Arkane.createArkaneProviderEngine({clientId: ‘Arketype’}).then(provider => {
    web3 = new Web3(provider);
});
```
The web3 instance now works as if it was injected by parity or metamask. You can fetch wallets, sign transactions, and messages.
### Congratulations, your dapp now supports Arkane 🎉
>🧙 To connect to our production environment and mainnet, you will need to register your app and request your Client ID.

Want to know more about the wonderful world Arkane has to offer, [check out their documentation](https://arkane.gitbook.io/widget/)

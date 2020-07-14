---
id: torus
title: Torus
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

Torus is a user-friendly, secure, and non-custodial key management system for DApps. We're focused on providing mainstream users a gateway to the decentralized ecosystem.

**Type**: Non-custodial/HD <br/>
**Private Key Storage**: User’s local browser storage / Encrypted and stored on torus’ servers <br/>
**Communication to Ethereum Ledger**: Infura <br/>
**Private key encoding**: Mnemonic/Social-Auth-login <br/>

Depending on your applications needs Torus can be integrated via the Torus Wallet, or through interacting directly with the Torus Network via DirectAuth. [For more...](https://docs.tor.us/getting-started)

## 1. [Torus Wallet integration](https://docs.tor.us/torus-wallet/quick-start)

If your application is already compatible with Metamask/other web3 providers, integrating the Torus Wallet would give you a provider to wrap the same web3 interface. You can install via a npm package or ipfs. or jsdelivr or unpkg. [For more...](https://docs.tor.us/getting-started#torus-wallet-integration)

1. Integrte via:
```bash
npm i @toruslabs/torus-embed
```

2. Script
```js
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});
await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});
await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## 2. DirectAuth integration

If you're looking to control your own UX, from logins to every interaction DirectAuth is the integration for you. You can integrate via one of our SDKs depending on the platform/s you are building on. [For more...](https://docs.tor.us/getting-started#directauth-integration)

[Please read here](https://docs.tor.us/direct-auth/quick-start)
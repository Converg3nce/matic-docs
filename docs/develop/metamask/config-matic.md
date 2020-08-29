---
id: config-matic
title: Config Matic on Metamask
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In order to view the flow of funds in your accounts, on the Matic Network, you will need to configure Matic’s `{testnet, mainnet}` URL on Metamask.

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'Matic-Mainnet', value: 'mainnet', },
    { label: 'Mumbai-Testnet', value: 'mumbai', },
  ]
}>

<TabItem value="mumbai">
To add Matic’s Mumbai-Testnet, click on the Network selection dropdown and then click on Custom RPC.

<img src={useBaseUrl("img/metamask/select-network.png")} />

It will open up a form with 2 tabs on the top, Settings and Info. In the Settings tab you can add the URL `https://rpc-mumbai.matic.today`.

<img src={useBaseUrl("img/metamask/metamask-settings.png")} />

Once you’ve added the URL in the New Network field, click on Save. You will be directly switched to Matic’s Mumbai-Testnet now in the network dropdown list. You can now close the dialog.
</TabItem>

<TabItem value="mainnet">
To add Matic’s Mainnet, click on the Network selection dropdown and then click on Custom RPC. 

<img src={useBaseUrl("img/metamask/select-network.png")} />

It will open up a form with 2 tabs on the top, Settings and Info. In the Settings tab you can add the URL `https://rpc-mainnet.matic.network`.

<img src={useBaseUrl("img/metamask/metamask-settings-mainnet.png")} />

Once you’ve added the URL in the New Network field, click on Save. You will be directly switched to Matic’s Mainnet now in the network dropdown list. You can now close the dialog.
</TabItem>

</Tabs>

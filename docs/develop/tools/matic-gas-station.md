---
id: matic-gas-station
title: Matic Gas Station
sidebar_label: Matic Gas Station
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

_Matic Gas Station_ aims to help dApp developers with gas price recommendations, so that they can use it before sending transaction off to _Matic_ network.

## origin

At _Matic_, we were receiving request from dApp developers for building a gas price recommendation service. So we took some inspiration from _Eth Gas Station_, and built one.

## availability

_Matic Gas Station_ has been deployed both on Matic Mumbai Testnet & Matic Mainnet, where it analyzes recent 500 transactions and recommends gas price.

## usage

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'Matic-Mainnet', value: 'mainnet', },
    { label: 'Mumbai-Testnet', value: 'mumbai', },
  ]
}>
<TabItem value="mumbai">

# Mumbai-Testnet

For getting gas price recommendation from this oracle, send GET request to [https://gasstation-mumbai.matic.today](https://gasstation-mumbai.matic.today)

### cURL

```bash
curl https://gasstation-mumbai.matic.today
```

### JavaScript

```javascript
fetch('https://gasstation-mumbai.matic.today')
  .then(response => response.json())
  .then(json => console.log(json))
```

### Python

```python
import requests
requests.get('https://gasstation-mumbai.matic.today').json()
```

</TabItem>
<TabItem value="mainnet">

# Matic-Mainnet

For getting gas price recommendation from this oracle, send GET request to [https://gasstation-mainnet.matic.network](https://gasstation-mainnet.matic.network)

### cURL

```bash
curl https://gasstation-mainnet.matic.network
```

### JavaScript

```javascript
fetch('https://gasstation-mainnet.matic.network')
  .then(response => response.json())
  .then(json => console.log(json))
```

### Python

```python
import requests
requests.get('https://gasstation-mainnet.matic.network').json()
```

</TabItem>
</Tabs>

## interpretation

- Example JSON response will look like this.

```json
{
    "safeLow": 1.0,
    "standard": 9.0,
    "fast": 29.0,
    "fastest": 45.0,
    "blockTime": 2,
    "blockNumber": 2650006
}
```

- {'safelow', 'standard', 'fast', 'fastest'} are gas prices in GWei, you can use these prices before sending transaction off to Matic, depending upon your need
- _'blockNumber'_ tells what was latest block mined when recommendation was made
- _'blockTime'_ in second, which gives average block time of network

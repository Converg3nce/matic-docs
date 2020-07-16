---
id: maticGasStation
title: Matic Gas Station
sidebar_label: Matic Gas Station
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

_Matic Gas Station_ aims to help dApp developers with gas price recommendations, so that they can use recommended gas prices before sending transaction off to _Matic_ network.

## origin

At _Matic_, we were receiving request from dApp developers for building a gas price recommendation oracle. So we took some inspiration from _Eth Gas Station_, and built one.

## availability

_Matic Gas Station_ has been deployed both on Matic Mumbai Testnet & Matic Mainnet, where it analyzes last 200 non-empty mined blocks and recommends gas price. As soon as new non-empty block gets mined, that's taken under consideration for updating recommendation.

## usage

For getting gas price recommendation from this oracle, send GET request to

- Matic Mumbai Testnet [ https://gasstation-mumbai.matic.today ]
- Matic Mainnet [ https://gasstation-mainnet.matic.network ]

### cURL

```bash
$ curl https://gasstation-mumbai.matic.today
```

### JavaScript

```javascript
fetch('https://gasstation-mumbai.matic.today')
  .then(response => response.json())
  .then(json => console.log(json))
```

### Python

```python3
>>> import requests
>>> import json
>>> json.loads(requests.get('https://gasstation-mumbai.matic.today').content)
```

## interpretation

- Example JSON response will look like this.

```json
{
    "safeLow": 1.0,
    "standard": 9.0,
    "fast": 29.0,
    "fastest": 45.0,
    "block_time": 2.1,
    "blockNum": 1876116
}
```

- {'safelow', 'standard', 'fast', 'fastest'} are gas prices in GWei, you can use these prices before sending transaction off to Matic, depending upon your need
- _blockNum_ gives non-empty block identifier when recommendation was made
- _block\_time_ in second, which gives average block time of network _[ Note: As of now, don't rely on block\_time, this will be healed as network starts becoming crowded ]_

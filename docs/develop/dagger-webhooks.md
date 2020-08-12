---
id: dagger-webhooks
title: Dagger Webhooks
sidebar_label: Dagger Webhooks
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Dagger provides your applications with realtime data feed from blockchain. It's a simple client that you use to connect to dagger endpoint, maintained by us & get data feed on subscribed topics using industry standard MQTT protocol. 

But we were receiving lots of request for incorporating webhooks support in dagger, and we did it. Now you can request data feed from dagger while specifying HTTP endpoint where we will send all events for your subscribed topic. Then you can do a lot of interesting things with that data feed. Read more about webhooks [here](https://zapier.com/blog/what-are-webhooks/).

Now we're going to walk you through a simple NodeJS application which is running on your machine & we'll create webhook subscriptions for different topics. For that we're also going to use [ngrok](https://ngrok.com/), for tunneling purpose. 

## example

### obtain access token

As dagger webhook uses JWT based authentication mechanism, we need to first obtain a JWT token, which needs to be passed along with all of subsequent requests.

Sending a HTTP POST request [here](https://webhooks.dagger.matic.network/api/token), generates a JWT token for you. 

From now on we'll referring to it as **JWT-TOKEN**. _And please keep it secret._

<Tabs
  defaultValue="curl"
  values={[
    { label: 'cURL', value: 'curl', },
    { label: 'Python', value: 'python', },
  ]
}>
<TabItem value="curl">

```bash
curl -H 'Content-Type: application/json' -X POST https://webhooks.dagger.matic.network/api/token
```

</TabItem>
<TabItem value="python">

```python
import requests
requests.post('https://webhooks.dagger.matic.network/api/token').json()
```

</TabItem>
</Tabs>

### backend

Now we're going to write one simple NodeJS application, where dagger will send HTTP POST requests, for subscribed topics.

```bash
mkdir dagger-webhooks
cd dagger-webhooks
npm init -y
npm install express
touch index.js
```

Open `index.js` using your favourite text editor & put following code snippet there.

```javascript
const express = require('express')
const app = express()
const http = require('http')

// JSON payload data parser
app.use(express.json())

// listening for POST requests on this endpoint
app.post('/webhooks', (req, res) => {
    console.log(req.body)

    res.status(200).send('Received')
})

// starting http server on localhost
http.createServer(app).listen(8000, 'localhost', () => {
    console.log('[+]Express Application running on http://localhost:8000\n')
})
```

Time to install *ngrok* on your machine. 

```bash
npm install -g ngrok
```

Now we can start our express application & expose port 8000 to outer world for interacting with our application.

```
node index.js
ngrok http 8000
```

<img src={useBaseUrl("img/dagger-webhooks/ngrok-dagger-webhooks.png")} />

Lets send a HTTP POST request to ngrok provided public URL.

```bash
curl -H 'Content-Type: application/json' -X POST -d '{"msg": "Working"}' https://cf2672650fe7.ngrok.io/webhooks
```

Now check ngrok console for new incoming request, if it's there, then our application is working as expected. Keep it running.

### networks

Currently dagger supports webhook based realtime notifications for following networks.

<Tabs
  defaultValue="homestead"
  values={[
    { label: 'Ethereum Main Network', value: 'homestead', },
    { label: 'Ethereum Kovan Network', value: 'kovan', },
  ]
}>
<TabItem value="homestead">

```json
{
    "networkId": 1
}
```

</TabItem>
<TabItem value="kovan">

```json
{
    "networkId": 42
}
```

</TabItem>
</Tabs>

`networkId` will be required for subscribing to topics.

### events over webhook

#### eth-block-numbers

##### subscribe

By sending a HTTP POST request to following endpoint, along with required params, you can obtain a subscription for newly mined blocks.

JSON payload needs to carry following data

- `url`: your public URL where events to be POST-ed
- `networkId`: Network for which events to be received

End Point: `https://webhooks.dagger.matic.network/api/v1/eth-block-numbers/subscriptions`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X POST -d '{"url": "URL", "networkId": 1}' https://webhooks.dagger.matic.network/api/v1/eth-block-numbers/subscriptions
```

After successful subscription you'll receive a JSON response like this

```json
{
    "active":true,
    "id":14,
    "subscriptionId":"ecf21d77-a077-4cff-a938-d03ea9b8ffb6",
    "url":"https://cf2672650fe7.ngrok.io/webhooks",
    "networkId":1,
    "updatedAt":"2020-08-12T06:00:41.092Z",
    "createdAt":"2020-08-12T06:00:41.092Z"
}
```

Please note `subscriptionId` will be required for unsubscribing from this event.

Now if you check your running express application's console, you'll see output like below

```json
{ networkId: 1, blockNumber: 10643419 }
```

_**Note**: We're delivering very small chunks of data over webhook, because we don't want to bombard your application. If you need detailed information, you can always fetch that using other means._

##### unsubscribe

For unsubscribing from this topic, we can send a HTTP DELETE request to following endpoint. `subscriptionId` will be different for you. Replace **JWT-TOKEN** with yours.

End Point: `https://webhooks.dagger.matic.network/api/v1/eth-block-numbers/subscriptions/{subscriptionId}`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X DELETE https://webhooks.dagger.matic.network/api/v1/eth-block-numbers/subscriptions/ecf21d77-a077-4cff-a938-d03ea9b8ffb6
```

If you receive response like below, then you've successfully unsubscribed from this topic.

```json
{
    "success":true
}
```

Now if you check your express application console, you'll see you're no more receiving any data.

#### erc20-transfers

##### subscribe

By sending a HTTP POST request to following endpoint, along with required params, you can obtain a subscription for transfer events for specified ERC20 token address.


JSON payload will look like below

- `url`: Events to be POST-ed here
- `networkId`: ERC20 transfer events on this network
- `transferType`: Takes any of these possible values {'receive', 'send', 'both'}
- `tokenAddress`: ERC20 token for which you want to receive Transfer events _( topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef)_
- `addresses` : An array of addresses or a single address string, for each of them any Transfer events, to be notified to POST url. **At max 20 addresses can be tracked.**

End Point: `https://webhooks.dagger.matic.network/api/v1/erc20-transfers/subscriptions`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X POST -d '{"url": "URL", "networkId": 42, "transferType": "both", "tokenAddress": "0x0e21734a042e33b01f738fe29de44f7efc331d85", "addresses": ["0xdac17f958d2ee523a2206206994597c13d831ec7", "0xf89154d7a42c5e9f77884511586a9db4618683c5"]}' https://webhooks.dagger.matic.network/api/v1/erc20-transfers/subscriptions

```

After successful subscription you'll receive a JSON response like this

```json
{
    "subscriptionId":"fe94e3c6-fb08-4537-83a6-999a5d4e5f7f"
}
```

Please note `subscriptionId` will be required for unsubscribing from this event.

Now if you check your running express application's console, you'll see output like below

```json
{
  networkId: 42,
  token: '0x0e21734a042e33b01f738fe29de44f7efc331d85',
  tokenType: 'ERC20',
  event: 'transfer',
  symbol: 'TOKEN',
  decimals: 18,
  txHash: '0x3c0176dd352cad5d3a347ed1d66fd9a599d96d29175a6a2417687511a72615bc',
  amount: '1000000000',
  formattedAmount: '0.0000',
  from: '0xf89154d7a42c5e9f77884511586a9db4618683c5',
  to: '0xe19b9eb3bf05f1c8100c9b6e8a3d8a14f6384bfb'
}
```

##### unsubscribe

For unsubscribing from this topic, we can send a HTTP DELETE request to following endpoint. `subscriptionId` will be different for you.

End Point: `https://webhooks.dagger.matic.network/api/v1/erc20-transfers/subscriptions/{subscriptionId}`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X DELETE https://webhooks.dagger.matic.network/api/v1/erc20-transfers/subscriptions/fe94e3c6-fb08-4537-83a6-999a5d4e5f7f
```

If you receive response like below, then you've successfully unsubscribed from this topic.

```json
{
    "success":true
}
```

Now if you check your express application console, you'll see you're no more receiving any data.

#### eth-transactions

##### subscribe

By sending a HTTP POST request to following endpoint, along with required params, you can obtain a subscription for transaction events for each of specified addresses.

JSON payload needs to carry these informations

- `url`: HTTP endpoint where to POST data on occurance of event
- `networkId`: Listen to events on this network
- `transferType`: Can take any one of these {'incoming', 'outgoing', 'both'}
- `addresses`: An array of addresses or a single address string, for each of them any transaction event happening, to be notified to our POST url. **At max 20 addresses can be tracked.**

End Point: `https://webhooks.dagger.matic.network/api/v1/eth-transactions/subscriptions`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X POST -d '{"url": "URL", "networkId": 1, "transferType": "both", "addresses": ["0xdac17f958d2ee523a2206206994597c13d831ec7", "0x514910771af9ca656af840dff83e8264ecf986ca"]}' https://webhooks.dagger.matic.network/api/v1/eth-transactions/subscriptions
```

After successful subscription you'll receive a JSON response like this

```json
{
    "subscriptionId":"fe94e3c6-fb08-4537-83a6-999a5d4e5f7f"
}
```

Please note `subscriptionId` will be required for unsubscribing from this event.

Now if you check your running express application's console, you'll see output like below

```json
{
  networkId: 1,
  blockHash: '0x13b40679d8f49da93e0d157c691f587287e5f02425b6b8fc6c2b698460bab26a',
  blockNumber: 10644733,
  from: '0x183f6DE8a3BCF67EeA2dA1dD64738DD937125D63',
  gas: 60000,
  gasPrice: '208000000000',
  hash: '0xf754e94c6a20347d069e5763edbe4bc52c10991e6a447f77c00b40e684234bab',
  input: '0xa9059cbb0000000000000000000000004597a8206978c5de22173432b2f0cb899eef9fa3000000000000000000000000000000000000000000000000000000000157c583',
  nonce: 22,
  r: '0x28baad215c87203bb8d9d13b4a0c90ebf3d914239affe2751b6e3fdc6f42996d',
  s: '0x265fe3493b3cb994b37ff430c3a03f32c20dbb104a9bd2a941f677a4d68c7224',
  to: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  transactionIndex: 126,
  v: '0x25',
  value: '0',
  receipt: {
    blockHash: '0x13b40679d8f49da93e0d157c691f587287e5f02425b6b8fc6c2b698460bab26a',
    blockNumber: 10644733,
    contractAddress: null,
    cumulativeGasUsed: 6928970,
    from: '0x183f6de8a3bcf67eea2da1dd64738dd937125d63',
    gasUsed: 26209,
    logs: [ [Object] ],
    logsBloom: '0x0000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000001000000000000000020000000000000000000000000000000000000000000000000010000000000000000000000000008000000000000000000200000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    transactionHash: '0xf754e94c6a20347d069e5763edbe4bc52c10991e6a447f77c00b40e684234bab',
    transactionIndex: 126
  },
  formattedAmount: '0.0000'
}
```

##### unsubscribe

For unsubscribing from this topic, we can send a HTTP DELETE request to following endpoint. `subscriptionId` will be different for you.

End Point: `https://webhooks.dagger.matic.network/api/v1/eth-transactions/subscriptions/{subscriptionId}`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X DELETE https://webhooks.dagger.matic.network/api/v1/eth-transactions/subscriptions/fe94e3c6-fb08-4537-83a6-999a5d4e5f7f
```

If you receive response like below, then you've successfully unsubscribed from this topic.

```json
{
    "success":true
}
```

Now if you check your express application console, you'll see you're no more receiving any data.

#### eth-logs

##### subscribe

By sending a HTTP POST request to following endpoint, along with required params, you can subscribe to various transaction logs.

JSON payload must have these fields

- `url`: URL for sending data as HTTP POST request
- `networkId`: Obtain events for this network
- `contractAddress`: Catch emitted events from this contract
- `eventSchema`: Signature of event that needs to be caught i.e. for ERC20 approval `Approval(address,address,uint256)`
- `topics`: An array of EVM log topics, where first element is keccak256 hash of `eventSchema`. If only one topic is given, it must be hashed `eventSchema`

End Point: `https://webhooks.dagger.matic.network/api/v1/eth-logs/subscriptions`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X POST -d '{"url": "URL", "networkId": 1, "contractAddress": "0x0E21734A042e33b01f738Fe29De44f7eFc331d85", "eventSchema": "Approval(address,address,uint256)", "topics": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"}' https://webhooks.dagger.matic.network/api/v1/eth-logs/subscriptions
```

After successful subscription you'll receive a JSON response like this

```json
{
    "subscriptionId":"fe94e3c6-fb08-4537-83a6-999a5d4e5f7f"
}
```

Please note `subscriptionId` will be required for unsubscribing from this event. Check your console for received data, on occurance of event.

##### unsubscribe

For unsubscribing from this topic, we can send a HTTP DELETE request to following endpoint. `subscriptionId` will be different for you.

End Point: `https://webhooks.dagger.matic.network/api/v1/eth-logs/subscriptions/{subscriptionId}`

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X DELETE https://webhooks.dagger.matic.network/api/v1/eth-logs/subscriptions/fe94e3c6-fb08-4537-83a6-999a5d4e5f7f
```

If you receive response like below, then you've successfully unsubscribed from this topic.

```json
{
    "success":true
}
```

Now if you check your express application console, you'll see you're no more receiving any data.

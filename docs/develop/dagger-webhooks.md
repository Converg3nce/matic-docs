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

Sending a HTTP POST request [here](https://webhooks.dagger.matic.network/api/token), generates a JWT token for you. _Please keep it secret._

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

`networkId` will be required for subscribing for event notifications over webhook.

### events over webhook

#### eth-block-numbers

##### subscribe

By sending a HTTP POST request to following endpoint, along with required params, you can obtain a subscription for newly mined blocks.

Please replace **JWT-TOKEN** with your dagger-webhook token & **URL** with your public URL, where data to be POST-ed. Also make sure you set **networkId** as per your requirement.

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

We delivering very small chunks of data over webhook, because we don't want to bombard your application. If you need detailed information, you can always fetch that using other means.

##### unsubscribe

For unsubscribing from this topic, we can send a HTTP DELETE request to following endpoint. `subscriptionId` will be different for you. Replace **JWT-TOKEN** with yours.

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

Please replace **JWT-TOKEN** with your dagger-webhook token & **URL** with your public URL, where data to be POST-ed. Also make sure you set **networkId** as per your requirement.

- `transferType` can take any of these possible values : `{'receive', 'send', 'both'}`
- Set `tokenAddress` as per the token for which you want to receive transfer events.
- `addresses` will be an array of addresses or a single address string, for each of them any transfer event happening, to be notified to our POST url. **At max 20 addresses can be tracked.**

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: JWT-TOKEN' -X POST -d '{"url": "URL", "networkId": 1, "transferType": "both", "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7", "addresses": ["0xdac17f958d2ee523a2206206994597c13d831ec7", "0xacd1f7958d2ee523a2206209694597c13d831ec7"]}' https://webhooks.dagger.matic.network/api/v1/erc20-transfers/subscriptions

```

After successful subscription you'll receive a JSON response like this

```json
{
    "subscriptionId":"fe94e3c6-fb08-4537-83a6-999a5d4e5f7f"
}
```

Please note `subscriptionId` will be required for unsubscribing from this event.

Now if you check your running express application's console, you'll see output like below

```bash
# not received yet
```

##### unsubscribe

For unsubscribing from this topic, we can send a HTTP DELETE request to following endpoint. `subscriptionId` will be different for you.

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

- `JWT-TOKEN` is your dagger-webhook token
- `URL` is your public URL, where data to be POST-ed
- `transferType` can take any of these possible values : `{'incoming', 'outgoing', 'both'}`
- `addresses` will be an array of addresses or a single address string, for each of them any transaction event happening, to be notified to our POST url. **At max 20 addresses can be tracked.**
- Make sure you set `networkId` as per your requirement.

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

```bash
# not received yet
```

##### unsubscribe

For unsubscribing from this topic, we can send a HTTP DELETE request to following endpoint. `subscriptionId` will be different for you.

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


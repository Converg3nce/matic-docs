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

Lets send a HTTP POST request to ngrok provided public URL

```bash
curl -H 'Content-Type: application/json' -X POST -d '{"msg": "Working"}' https://cf2672650fe7.ngrok.io/webhooks
```

Now check ngrok console for new incoming request, if it's there, then our application is working as expected.


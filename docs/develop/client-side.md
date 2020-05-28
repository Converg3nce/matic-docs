<!-- ---
id: client-side
title: Client Side
sidebar_label: client side
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

```jsx live
import Web3 from 'web3';

  function wss(props) {
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://testnetv3-wss.matic.network'));
    const [block, setBlock] = useState("");

    function getLatestBlock() {
    web3.eth.getBlockNumber(function(error, result){
        setBlock((new Date).toUTCString(), result);
    })
    }
    
    let i = setInterval( getLatestBlock, 1000);
  

  return (
    <div>
      <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
      <h2>This is {block}</h2>

    </div>
  );
}
``` -->
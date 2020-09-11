---
id: matic-widget
title: Matic Widget
sidebar_label: Matic Widget
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Matic widget is an instance of Matic wallet that anyone can integrate to their website. The widget has been designed to support Matic wallet as well as Matic token bridge functionalities as part of any website. This simply means that integrating the widget gives a better user expereince and users do not have to navigate to another page to use the Matic functionalities.

## Widget Developer dashboard

Widget developer dashboard is used to manage the widget. Developer can create, remove and customize the widget.

- Developer dashboard: [https://wallet.matic.today/widgets/](https://wallet.matic.today/widgets/)
- Create new widget: [https://wallet.matic.today/widgets/settings](https://wallet.matic.today/widgets/settings)

For creating a widget, DApp Name, RPC, Widget type have to be given as input.

<img src={useBaseUrl("img/matic-widget/create-widget.png")} />

Next step will be to adjust the widget settings based on the requirements which will appear after the widget is created.
The last step will be to copy the embed code and use it on your website

- On the widget settings, scroll to bottom or select **embed** from left menu
- Select your widget button type
- Click to copy `<code>` area and paste it to your website

<img src={useBaseUrl("img/matic-widget/widget-settings.png")} />

**Example**:

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Matic Widget Demo</title>
  </head>

  <body>
    <!-- widget embed code -->
    <button
      class="matic-widget-button"
      data-default-page="home"
      data-wapp-id="kiLV4NOqXgk346wibvG4">
      Matic Widget
    </button>
    <script
      src="https://wallet.matic.today/embeds/widget-button.min.js"
      data-script-name="matic-embeds">
    </script>
    <!-- widget embed code -->
  </body>
</html>
```

<img src={useBaseUrl("img/matic-widget/widget.png")} />

## Events

Widget will emit events when user performs certain actions on widget. These events will be helpful to listen to the users interaction with the widget and can be then used to perform some action based on these events. The events can be listened as mentioned below.

1. **closeWidget**

   widget will emit this event whenever user closes the widget.

2. **Transfer Events**

   a. **onTransferTxHash**

   Widget will emit this event when a transfer transaction is fired. This event is useful to get the transaction hash before the transaction gets confirmed.

   b. **onTransfer**

   Widget will emit this event when the transfer transaction is confirmed on the network.

   c. **onTransferError**

   Widget will emit this event when transfer transaction fails.

3. **Deposit Events**

   a. **onDepositTxHash**

   Widget will emit this event when deposit transaction is initiated.

   b. **onDeposit**

   Widget will emit this event when a deposit transaction is confirmed on the network.

   c. **onDepositError**

   Widget will emit this event when a deposit transaction fails.

4. **Withdraw Init Events**

   a. **onWithdrawInitTxHash**

   Widget will emit this event when initiate withdraw transaction is fired.

   b. **onWithdrawInit**

   Widget will emit this event when an intiaite withdraw transaction is confirmed on the network.

   c. **onWithdrawInitError**

   Widget will emit this event when an initiate withdraw transaction fails.

5. **Withdraw Confirm Events**

   a. **onWithdrawConfirmTxHash**

   Widget will emit this event when a confirm withdraw transaction is fired.

   b. **onWithdrawConfirm**

   Widget will emit this event when a confirm transaction is confirmed on the network.

   c. **onWithdrawConfirmError**

   Widget will emit this event when a confirm withdraw transaction fails.

6. **Withdraw Exit Events**

   a. **onWithdrawExitTxHash**

   Widget will emit this event a withdraw exit transaction is fired.

   b. **onWithdrawExit**

   Widget will emit this event when a withdraw exit transaction is confirmed on the network.

   c. **onWithdrawExitError**

   Widget will emit this event when a withdraw exit transaction fails.

```jsx
// Listen to the events from widget
function maticWidgetEventsListener(event) {
  console.log(event.data.type, event);
  if (event.data && event.data.type === event.eventTypes.TRANSFER.onReceipt) {
    // ...TODO
  }
}

// close widget
function closeWidgetOnTransaction(event) {
  // this is not an event listener
  const iframeId = event.data.iframeId;
  document.body.removeChild(document.getElementById(iframeId));
  document.body.removeChild(document.getElementById("matic-iframe-backdrop"));
}
```

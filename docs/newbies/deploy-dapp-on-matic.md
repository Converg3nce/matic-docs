# Deploying a DApp on Matic

## What this tutorial covers

This tutorial covers an overview of web interaction with Solidity - making use of an extension called Metamask. We'll be using a pre-written Ethereum smart contract and would be deploying it on a local blockchain using ganache-cli and Remix.

To get a snippet on Solidity you can read this post: https://docs.matic.network/newbies/getting-started-solidity/

This ĐApp uses Nuxt.js, but we'd only be focusing on the pieces that help us build. In reality, any JS framework can be used.

## Installation and Prerequisites

### Installation

#### NodeJS 8.10+

```js
node version
> 8.10+
```

If you need to update node:

```js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install --lts
nvm use lts
```

#### Metamask

You can download the Metamask extension by using this link: https://metamask.io/

#### Ganache-cli

```js
npm install -g ganache-cli
```

### Setup

We will be using existing solidity contract called Airbnb.sol - a decentralized Airbnb. The smart contract has three main functionalities:

* Rent out a space
* View available spaces
* Rent a space  

We'll be building a UI that corresponds to these three functionalities and gives a clean looking interface for users to find or rent their spaces.

Clone the template ([https://github.com/maticnetwork/ethindia-workshop](https://github.com/maticnetwork/ethindia-workshop)) into a new directory

```js
git clone https://github.com/maticnetwork/ethindia-workshop.git
cd ethindia-workshop
cd dapp-ui
npm install

```

Start test blockchain using ganache-cli

```js
ganache-cli -p 8545
```

Now that we have a local blockchain running on localhost port 8545, we'd like to connect our metamask to the same. 

For this:

- Open Metamask and select Custom RPC from the networks dropdown

![](images/dapp-tutorial/metamask-custom-rpc.png?raw=true)<br/><br/>

- Put in a Network name - "Localhost 8545"
- In URL field you can add the URL as - "http://localhost:8545"
- Go ahead and click save

Add one of the test accounts generated on ganache on Metamask - to get test ether

- Copy one of the private keys generated with ganache

![](images/dapp-tutorial/ganache-private-key.png?raw=true)<br/><br/>

- Select Import account on Metamask

![](images/dapp-tutorial/metamask-import-account.png?raw=true)<br/><br/>

- Paste the private key and you should get an account with 100 test ether to use

![](images/dapp-tutorial/metamask-import-account.png?raw=true)<br/><br/>

## Deploying the Smart Contract

For this, we use the Remix IDE - an online IDE to develop smart contracts.

-   Head over to https://remix.ethereum.org
    If you're new to Remix, You'll first need to activate two modules: Solidity Compiler and Deploy and Run Transactions. 

![](images/dapp-tutorial/remix-ethereum.png?raw=true)<br/><br/>

![](images/dapp-tutorial/remix-plugin-manager.png?raw=true)<br/><br/>

If not already activated, you will need to activate plugins such as `Deploy & Run Transactions` and `Solidity Complier`

Your left menu should look something like this:

![](images/dapp-tutorial/remix-left-menu.png?raw=true)<br/><br/>

- Create a new file, Airbnb.sol. To understand the details of the smart contract you can read this article: https://docs.matic.network/newbies/getting-started-solidity/#setting-up-data-structures

- Copy the entire smart contract code and paste it in the editor

```js
pragma solidity ^0.5.7;

contract Airbnb {

  // Property to be rented out on Airbnb
  struct Property {
    string name;
    string description;
    bool isActive; // is property active
    uint256 price; // per day price in wei (1 ether = 10^18 wei)
    address owner; // Owner of the property
    // Is the property booked on a particular day,
    // For the sake of simplicity, we assign 0 to Jan 1, 1 to Jan 2 and so on
    // so isBooked[31] will denote whether the property is booked for Feb 1
    bool[] isBooked;
  }

  uint256 public propertyId;

  // mapping of propertyId to Property object
  mapping(uint256 => Property) public properties;

  // Details of a particular booking
  struct Booking {
    uint256 propertyId;
    uint256 checkInDate;
    uint256 checkoutDate;
    address user;
  }

  uint256 public bookingId;

  // mapping of bookingId to Booking object
  mapping(uint256 => Booking) public bookings;

  // This event is emitted when a new property is put up for sale
  event NewProperty (
    uint256 indexed propertyId
  );

  // This event is emitted when a NewBooking is made
  event NewBooking (
    uint256 indexed propertyId,
    uint256 indexed bookingId
  );

  /**
   * @dev Put up an Airbnb property in the market
   * @param name Name of the property
   * @param description Short description of your property
   * @param price Price per day in wei (1 ether = 10^18 wei)
   */
  function rentOutproperty(string memory name, string memory description, uint256 price) public {
    Property memory property = Property(name, description, true /* isActive */, price, msg.sender /* owner */, new bool[](365));

    // Persist `property` object to the "permanent" storage
    properties[propertyId] = property;

    // emit an event to notify the clients
    emit NewProperty(propertyId++);
  }

  /**
   * @dev Make an Airbnb booking
   * @param _propertyId id of the property to rent out
   * @param checkInDate Check-in date
   * @param checkoutDate Check-out date
   */
  function rentProperty(uint256 _propertyId, uint256 checkInDate, uint256 checkoutDate) public payable {
    // Retrieve `property` object from the storage
    Property storage property = properties[_propertyId];

    // Assert that property is active
    require(
      property.isActive == true,
      "property with this ID is not active"
    );

    // Assert that property is available for the dates
    for (uint256 i = checkInDate; i < checkoutDate; i++) {
      if (property.isBooked[i] == true) {
        // if property is booked on a day, revert the transaction
        revert("property is not available for the selected dates");
      }
    }

    // Check the customer has sent an amount equal to (pricePerDay * numberOfDays)
    require(
      msg.value == property.price * (checkoutDate - checkInDate),
      "Sent insufficient funds"
    );

    // send funds to the owner of the property
    _sendFunds(property.owner, msg.value);

    // conditions for a booking are satisfied, so make the booking
    _createBooking(_propertyId, checkInDate, checkoutDate);
  }

  function _createBooking(uint256 _propertyId, uint256 checkInDate, uint256 checkoutDate) internal {
    // Create a new booking object
    bookings[bookingId] = Booking(_propertyId, checkInDate, checkoutDate, msg.sender);

    // Retrieve `property` object from the storage
    Property storage property = properties[_propertyId];

    // Mark the property booked on the requested dates
    for (uint256 i = checkInDate; i < checkoutDate; i++) {
      property.isBooked[i] = true;
    }

    // Emit an event to notify clients
    emit NewBooking(_propertyId, bookingId++);
  }

  function _sendFunds (address beneficiary, uint256 value) internal {
    // address(uint160()) is a weird solidity quirk
    // Read more here: https://solidity.readthedocs.io/en/v0.5.10/050-breaking-changes.html?highlight=address%20payable#explicitness-requirements
    address(uint160(beneficiary)).transfer(value);
  }

  /**
   * @dev Take down the property from the market
   * @param _propertyId Property ID
   */
  function markPropertyAsInactive(uint256 _propertyId) public {
    require(
      properties[_propertyId].owner == msg.sender,
      "THIS IS NOT YOUR PROPERTY"
    );
    properties[_propertyId].isActive = false;
  }
}

```

- Select `0.5.7+commit.6da8b019` as the compiler and compile the smart contract

- Once compiled, the smart contract is ready to be deployed onto the testnet/mainnet. For this tutorial 

- Copy the generated ABI - we would be needing that for our next steps

![](images/dapp-tutorial/remix-abi.png?raw=true)<br/><br/>

- Select Injected Web3 in the Environment dropdown and your contract - this should connect Remix to the local blockchain running on port 8545

![](images/dapp-tutorial/remix-injected-web3.png?raw=true)<br/><br/>

![](images/dapp-tutorial/remix-metamask-connect-request.png?raw=true)<br/><br/>

Once Metamask is connected to Remix, the 'Deploy' transaction would generate another metamask popup that requires transaction confirmation.

![](images/dapp-tutorial/remix-metamask-tx-confirm.png?raw=true)<br/><br/>

- Click Deploy

- And once the contract is deployed you can test the functions

## Setting up our DApp

Inside the cloned repository, navigate to `plugins` directory inside `dapp-ui` 

Paste the contract address copied in previous step to the `airbnbContractAddress` variable present in `utils.js`.

Get the ABI copied from the previous step

- navigate to `dapp-ui/plugins/airbnbABI.json` and add the following:

```js
{
	"abi": 
}

```

- Paste the ABI as the value of the "abi" key just defined

- It should look something like this:

```js
{
	"abi": [
	{
		"constant": true,
		"inputs": [],
		"name": "bookingId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
		...........
		...........
		...........
	]
}

```

## Connect UI to Metamask

Next, we’d like the UI to be connected with Metamask. For this we follow the following two steps:

First, add the `setProvider()` method inside `mounted()` method in `dapp-ui/pages/index.vue`

Note: You might face indentation issues after pasting it.

```js
// init Metamask
await setProvider()
// fetch all properties
const properties = await fetchAllProperties()
this.posts = properties

```

Next we’d like to inject metamask instance - for this we define the `setProvider()` method in `dapp-ui/plugins/utils.js`

```js
if (window.ethereum) {
    metamaskWeb3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
    } catch (error) {
      // User denied account access...
    }
  }
  else if (window.web3) {
    metamaskWeb3 = new Web3(web3.currentProvider);
  }
  account = await metamaskWeb3.eth.getAccounts()

```

### Defining components and functions

Once we have connected metamask, we’d next want to be able to communicate with the deployed contract. For this, we’ll create a new contract object - that represents our airbnb smart contract

Inside `dapp-ui/plugins/utils.js` create the following function that instantiates and returns the `airbnbContract`

```js
function getAirbnbContract() {
  airbnbContract = airbnbContract || new metamaskWeb3.eth.Contract(AirbnbABI.abi, airbnbContractAddress)
  return airbnbContract
}

```
the above function checks for an already defined contract object, if not, it creates and defines a new one.

With metamask connected and contract initiated we can go forward with interacting with our contract

The `dapp-ui` folder structure looks something like this:

![](images/dapp-tutorial/folder-structure.png?raw=true)<br/><br/>

Inside the `dapp-ui/components` directory, we have the separate components that make up our app interface.

The three main functions we’d like our app to support are:

- Post a new property - or rent out space
- View all available properties
- Rent a new property from all available spaces

We’ll first set up our property form - which is used to rent out a property - on the backend it interacts with the `rentOutProperty` function of our Airbnb smart contract

Navigate to `dapp-ui/components/propertyForm.vue` and add the following code inside `postAd()` method. The `postAd()` method should look something like this:

```js
// convert price from ETH to Wei
const weiValue = web3().utils.toWei(this.price, 'ether');

// call utils.postProperty
postProperty(this.title, this.description, weiValue)

```

We first convert price from `ether` to `wei`. Wei is the smallest transferrable unit of ether on Ethereum. You can keep this simple calculation in mind: `1 ether` is equal to `10^18 wei`.

The `postProperty` function is to be defined inside `dapp-ui/plugins/utils.js`. Which should look something like this:

```js
const prop = await getAirbnbContract().methods.rentOutproperty(name, description, price).send({
    from: account[0]
  })
  alert('Property Posted Successfully')

```
Here, we are simply calling the `rentOutProperty` method in the Airbnb contract we deployed in the [previous](https://docs.matic.network/newbies/getting-started-solidity/) tutorial.

Next, to incorporate booking of a new property, we’ll define the `book()` function in `dapp-ui/components/detailsModal.vue`. Copy the code snippet inside the `book()`

```js
  // get Start date
  const startDay = this.getDayOfYear(this.startDate)
  // get End date
  const endDay = this.getDayOfYear(this.endDate)
  // price calculation
  const totalPrice = web3().utils.toWei(this.propData.price, 'ether') * (endDay - startDay)
  // call utils.bookProperty
  bookProperty(this.propData.id, startDay, endDay, totalPrice)
```

The `bookProperty()` function is to be defined inside `utils.js` and should look something like this:

```js
const prop = await getAirbnbContract().methods.rentProperty(spaceId, checkInDate, checkOutDate).send({
    from: account[0],
    value: totalPrice,
  })
  alert('Property Booked Successfully')

```

Again, we are simply calling the `rentProperty` method in the Airbnb contract we deployed in the [previous](https://docs.matic.network/newbies/getting-started-solidity/) tutorial.

Copy the code snippet inside the `bookProperty()`

The next and final functionality to add is fetching and displaying all available spaces. `fetchAllProperties()` function is invoked inside `index.vue` and defined inside `utils.js`

Navigate to `dapp-ui/plugins/utils.js` and add the following code to the `fetchAllProperties()` method:

```js
 const propertyId = await getAirbnbContract().methods.propertyId().call()
  // iterate till property Id
  const properties = []
  for (let i = 0; i < propertyId; i++) {
    const p = await airbnbContract.methods.properties(i).call()
    properties.push({
      id: i,
      name: p.name,
      description: p.description,
      price: metamaskWeb3.utils.fromWei(p.price)
    })
  }
  return properties
    
```
The above code queries our deployed smart contract, first, for the total number of properties till date, and next loops to retrieve each property from its `id` and stores details in an array.

## Run and Test!

Aaand this marks the end of our DApp tutorial! We know it's been a long one.

Execute `npm run dev` to view and interact with your decentralized application!

![](images/dapp-tutorial/rent-your-property.png?raw=true)<br/><br/>

Click on 'Rent your Property' button on top right, it displays a dialogue box requiring title, description and price. The submit button sends these values to the function `rentOutProperty` on the smart contract in the form of a transaction. Since it 'transacts' with the blockchain it would create a metamask popup requiring you to sign the transaction, shown below.

![](images/dapp-tutorial/dapp-metamask-tx-confirm.png?raw=true)<br/><br/>

The Metamask popup displays the gas price for the transaction.

![](images/dapp-tutorial/rent-out-success.png?raw=true)<br/><br/>

![](images/dapp-tutorial/dapp-rent-success.png?raw=true)<br/><br/>

After the transaction is confirmed, the property lives on the blockchain and since it is available to be booked, it is displayed on the homepage.

![](images/dapp-tutorial/dapp-property-details.png?raw=true)<br/><br/>

![](images/dapp-tutorial/dapp-2-tx-request.png?raw=true)<br/><br/>
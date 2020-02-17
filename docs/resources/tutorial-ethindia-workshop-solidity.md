---
id: tutorial-ethindia-workshop-solidity
title: Getting Started with Solidity
---

## What this tutorial covers

This tutorial is a brief introduction to Programming with Solidity. We first cover a very brief overview about the language where and how it fits into the Ethereum ecosystem and the way it interacts with the various aspects of it. Then we cover a brief introduction to the two main components of Ethereum: Accounts and Transactions, and finally we discuss the Ethereum mental models that will prove to be helpful to understand before you start your journey into solidity programming.

Having sufficient introduction of the ecosystem we’ll start with the tutorial and build a decentralized Airbnb smart contract.

To understand how you could deploy a DApp on Matic Network you can read this post: https://docs.matic.network/newbies/deploy-dapp-on-matic/

## Building a Decentralized Airbnb

### What are we building?

We plan to build a Decentralized Airbnb that incorporates three main functionalities:

- Rent out a space
- View available spaces
- Rent a space

Go ahead and clone the [repository](https://github.com/maticnetwork/ethindia-workshop) and install dependencies and then run `npm install`

### Setting up Data Structures

We’d like a property with a name, description, owner and a price to be rented.

So we’d like a structure named ‘property’ that would include a name, description, price, owner, boolean flag denoting if its active or not, and a boolean array denoting the booked days of the property.

    struct Property {string name;string description;bool isActive; // is property activeuint256 price; // per day price in wei (1 ether = 10^18 wei)address owner; // Owner of the property// Is the property booked on a particular day,// For the sake of simplicity, we assign 0 to Jan 1, 1 to Jan 2 and so on// so isBooked[31] will denote whether the property is booked for Feb 1bool[] isBooked;}

We’d also like to keep track of the Property object we just created by mapping a unique property id to each new Property object.

For this, we first declare a variable propertyId followed by a mapping of propertyId to property, called properties.

    uint256 public propertyId;// mapping of propertyId to Property object
    mapping(uint256 => Property) 
    public properties;

Having a property we’d also like to keep track of all the bookings made till date.

We can do that by creating another structure for a Booking with properties such as: propertyId, check in and check out date and the user who made the booking.

    struct Booking {
    uint256 propertyId;
    uint256 checkInDate;
    uint256 checkoutDate;
    address user;
    }

Similar to what we did to keep track of each property, we can do to keep track of each booking - by mapping each booking id to a particular booking object.

    uint256 public bookingId;// mapping of bookingId to Booking object
    mapping(uint256 => Booking) 
    public bookings;

### Defining events

Next, we would want to add some logic to the flow of data and the working of the smart contract. For this, we add functions.

On the whole, we require three basic functions:

- To put up a property for rent on Airbnb market - `rentOutproperty`
- To make a booking - `rentProperty`
- To take down a property from the market - `markPropertyAsInactive`

### Defining functions

1. `renOutProperty`

        function rentOutproperty(string memory name, string memory description, uint256 price) public {
             Property memory property = Property(name, description, true /* isActive */, price, msg.sender /* owner */, new bool[](365));
        
             // Persist `property` object to the "permanent" storage
             properties[propertyId] = property;
        
             // emit an event to notify the clients
             emit NewProperty(propertyId++);

2. `rentProperty`

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

3. `markPropertyAsInactive`

        function markPropertyAsInactive(uint256 _propertyId) public {
             require(
               properties[_propertyId].owner == msg.sender,
               "THIS IS NOT YOUR PROPERTY"
             );
             properties[_propertyId].isActive = false;
           }

We used two functions `_sendFunds` and `_createBooking` in the `rentProperty` function. These two functions are internal functions and as the naming convention in Solidity goes, they are prefixed with an underscore. We require these to be internal for we won’t want anyone to be able to send funds to their own account or create a booking on an inactive property.

These two functions are defined as:

1. `_sendFunds` You can read more about the particular transfer function we’ve used [here](https://solidity.readthedocs.io/en/v0.5.10/050-breaking-changes.html?highlight=address%20payable#explicitness-requirements).

        function _sendFunds (address beneficiary, uint256 value) internal {
           address(uint160(beneficiary)).transfer(value);
         }

2. `_createBooking`

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

You can view the entire code [here](https://github.com/maticnetwork/ethindia-workshop/blob/master/contracts/Airbnb.sol).

Once you have the contract code ready, next steps would be to deploy the code on a testnet and test its working.

## Deploy and Test!

For this, we use the Remix IDE - an online IDE to develop smart contracts.

- Head over to https://remix.ethereum.org If you’re new to Remix, You’ll first need to activate two modules: Solidity Compiler and Deploy and Run Transactions.

![../static/img/solidity/remix-ethereum.png](../static/img/solidity/remix-ethereum.png)

![../static/img/solidity/remix-plugin-manager.png](../static/img/solidity/remix-plugin-manager.png)

If not already activated, you will need to activate plugins such as `Deploy & Run Transactions` and `Solidity Complier`

Your left menu should look something like this:

![../static/img/solidity/remix-left-menu.png](../static/img/solidity/remix-left-menu.png)

- Create a new file, Airbnb.sol
- Copy the entire smart contract code and paste it in the editor

```
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

![../static/img/solidity/remix-abi.png](../static/img/solidity/remix-abi.png)

- Select Javascript VM as the environment in the dropdown -  this connects remix to a simple blockchain environment via your browser - we'll learn more about deploying on Matic's test network in the next tutorial [link]

![../static/img/solidity/remix-contract-test-functions.png](../static/img/solidity/remix-contract-test-functions.png)

![../static/img/solidity/remix-metamask-connect-request.png](../static/img/solidity/remix-metamask-connect-request.png)

Once Metamask is connected to Remix, the ‘Deploy’ transaction would generate another metamask popup that requires transaction confirmation.

![../static/img/solidity/remix-metamask-tx-confirm.png](../static/img/solidity/remix-metamask-tx-confirm.png)

- Click Deploy
- And once the contract is deployed you can test the functions
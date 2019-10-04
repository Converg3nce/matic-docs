# Tutorial - Getting started with Solidity

## What this tutorial covers

This tutorial is a brief introduction to Programming with Solidity. We first cover a very brief overview about the language where and how it fits into the Ethereum ecosystem and the way it interacts with the various aspects of it. Then we cover a brief introduction to the two main components of Ethereum: Accounts and Transactions, and finally we discuss the Ethereum mental models that will prove to be helpful to understand before you start your journey into solidity programming. 

Having sufficient introduction of the ecosystem we'll start with the tutorial and build a decentralized Airbnb smart contract.

To understand how you could deploy a DApp on Matic Network you can read this post: https://docs.matic.network/newbies/deploy-dapp-on-matic/

### What is Solidity?

Solidity is an object oriented, high-level programming language for implementing smart contracts. Smart contracts are programs which govern the behavior of accounts within the Ethereum state. To familiarize with Ethereum it is important to discuss about the two main components of the ecosystem: Accounts and Transactions.

### What are accounts?

The global state of Ethereum is comprised of accounts that interact with one another through a message-passing framework. The most basic interaction is that of sending some value - like ether - the native cryptocurrency of Ethereum blockchain.

Each account is identified by a 20 byte identifier which is called an address - this is the public key of the account.

There exist two types of accounts:

1. Externally owned account - the private key to which is owned by a person (eg., you'd own the private key and be responsible to keep it safe)
2. Contract owned account - has an associated code with it and is not owned by a person

These can be differentiated as follows:

| Contract accounts                                                                                     |
| :-----------                                                                                          |
| **A Contract**:                                                                                       |
| 1. has an ether balance,                                                                              |
| 2. has associated code,                                                                               |
| 3. code execution is triggered by transactions or messages (calls) received from other contracts,     |
| 4. when executed - perform operations of arbitrary complexity (Turing completeness) - manipulate its  | own persistent storage, i.e., can have its own permanent state - can call other contracts.    

| Externally Owned Account (EOA)                                                                        |
| :-----------                                                                                          |
| **An externally controlled account**:                                                                 |
| 1. has an ether balance,                                                                              |
| 2. can send transactions (ether transfer or trigger contract code),                                   |
| 3. is controlled by private keys                                                                      |
| 4. has no associated code.                                                                            |

[Source](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)

### What are Transactions?

The term "transaction" is used in Ethereum to refer to the signed data package that stores a message to be sent from an externally owned account to another account on the blockchain.

Can be categorised into two main categories:

**Value Transfer**

-   A value (in Ether) is transferred between two externally owned accounts

**Execution of Contracts**

-   Here, a function/method call is made from an externally owned account to a contract account. These types of transactions can be further chained eg., the contract account can make several internal transactions before calling another contract account or returning back.

Any type of transaction execution on Ethereum costs money - or gas. Which brings us to the next question: What is Gas?

You can read this really [good explanation](https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas/62#62) on Gas.

Gas is the name for the execution fee that senders of transactions need to pay for every operation made on an Ethereum blockchain. The name gas is inspired by the view that this fee acts as cryptofuel, driving the motion of smart contracts. Gas is purchased for ether from the miners that execute the code. Gas and ether are decoupled deliberately since units of gas align with computation units having a natural cost, while the price of ether generally fluctuates as a result of market forces. [Source](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#what-is-gas)

### Solidity

Solidity is just like any other programming language. Comprised of:
- loops
- conditionals
- variables
- functions
- objects and types
- and handles money transactions!

Before we get to coding with Solidity it is important to familiarize oneself with Ethereum mental models - these are essential because of the contrasting difference in a blockchain application architecture and a common web application architecture.

Where we want to go is Web 3.0, where servers and databases are as decentralized as the clients. In other words, clients can also act as servers or databases or both (aka, peer-to-peer). With many-to-many relationships at all levels of the stack, there are no concentrations of control and a single point of failure. The network is maximally distributed.

Essentially the following points need to be kept in mind always:

- Memory is limited - each memory element requires all nodes on the blockchain to confirm and store that element
- Computation complexity is limited
- Reading data is free
- Each write operation has a cost associated with it - you pay it with ether. The cost is measured in gas.

Now that we have a strong foundation of the concepts we can go forward with building our very first
smart contract

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

```js
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

```

We’d also like to keep track of the Property object we just created by mapping a unique property id to each new Property object.

For this, we first declare a variable propertyId followed by a mapping of propertyId to property, called properties.

```js
uint256 public propertyId;
  // mapping of propertyId to Property object
  mapping(uint256 => Property) public properties;
```

Having a property we’d also like to keep track of all the bookings made till date.

We can do that by creating another structure for a Booking with properties such as: propertyId, check in and check out date and the user who made the booking.

```js
struct Booking {
  uint256 propertyId;
  uint256 checkInDate;
  uint256 checkoutDate;
  address user;
}

```
Similar to what we did to keep track of each property, we can do to keep track of each booking - by mapping each booking id to a particular booking object.

```js
uint256 public bookingId;
  // mapping of bookingId to Booking object
  mapping(uint256 => Booking) public bookings;
```

### Defining events

Next, we would want to add some logic to the flow of data and the working of the smart contract. For this, we add functions.

On the whole, we require three basic functions:

- To put up a property for rent on Airbnb market - `rentOutproperty`
- To make a booking - `rentProperty`
- To take down a property from the market - `markPropertyAsInactive`

### Defining functions

1. `renOutProperty`

```js
function rentOutproperty(string memory name, string memory description, uint256 price) public {
    Property memory property = Property(name, description, true /* isActive */, price, msg.sender /* owner */, new bool[](365));

    // Persist `property` object to the "permanent" storage
    properties[propertyId] = property;

    // emit an event to notify the clients
    emit NewProperty(propertyId++);

```

2. `rentProperty`

```js
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

```

3. `markPropertyAsInactive`

```js
function markPropertyAsInactive(uint256 _propertyId) public {
    require(
      properties[_propertyId].owner == msg.sender,
      "THIS IS NOT YOUR PROPERTY"
    );
    properties[_propertyId].isActive = false;
  }

```

We used two functions `_sendFunds` and `_createBooking` in the `rentProperty` function. These two functions are internal functions and as the naming convention in Solidity goes, they are prefixed with an underscore. We require these to be internal for we won’t want anyone to be able to send funds to their own account or create a booking on an inactive property.

These two functions are defined as:

4. `_sendFunds`

You can read more about the particular transfer function we’ve used [here](https://solidity.readthedocs.io/en/v0.5.10/050-breaking-changes.html?highlight=address%20payable#explicitness-requirements).

```js
function _sendFunds (address beneficiary, uint256 value) internal {
address(uint160(beneficiary)).transfer(value);
  }
```

5. `_createBooking`

```js
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

```

You can view the entire code [here](https://github.com/maticnetwork/ethindia-workshop/blob/master/contracts/Airbnb.sol).

Once you have the contract code ready, next steps would be to deploy the code on a testnet and test its working.

## Deploy and Test!

For this, we use the Remix IDE - an online IDE to develop smart contracts.

- Head over to https://remix.ethereum.org
If you're new to Remix, You'll first need to activate two modules: Solidity Compiler and Deploy and Run Transactions. 


![](images/dapp-tutorial/remix-ethereum.png?raw=true)<br/><br/>

![](images/dapp-tutorial/remix-plugin-manager.png?raw=true)<br/><br/>

If not already activated, you will need to activate plugins such as `Deploy & Run Transactions` and `Solidity Complier`

Your left menu should look something like this:

![](images/dapp-tutorial/remix-left-menu.png?raw=true)<br/><br/>

- Create a new file, Airbnb.sol

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



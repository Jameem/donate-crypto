# DonateCrypto

Donation campaign for patients suffering from severe diseases on the blockchain

User is allowed to create campaigns on the blockchain and people can donate to the campaign. 
Each donator will be marked as  an approver. The manager of the campaign can withdraw funds by creating withdraw requests and 
approvers can vote on the requests by verifying the genuinity of the withdrawal request. 
Manager can withdraw money if half of the approvers vote on the request and the money is transfered to the provided hospital wallet address.

Smart contract is developed in solidity, compiled by solc and deployed to Rinkeby network using web3.js. NodeJs is used on the server, ReactJs on the front-end and NextJs is used for routing. 

## Dependencies

Install these prerequisites to follow along

- NPM: https://nodejs.org
- Metamask: https://metamask.io/

### Step 1. Clone the project

```
git clone https://github.com/Jameem/donate-crypto.git
```
### Step 2. Install dependencies

```
$ cd donate-crypto
$ npm install
```
### Step 3. Configure metamask and select Rinkeby Test Network

### Step 4. Run the Front End Application

```
$ node server.js Visit this URL in your browser: http://localhost:3000
```


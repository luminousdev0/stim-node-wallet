
Stim NodeJS Web Wallet
=======================


Node Stim Wallet - A NodeJS/MongoDB powered stimd Web Wallet.

Send and Receive Funds, Create new addresses, View Transactions, Edit your account, and more!


2FA Authentication is included as well as QR Codes for addresses and 2FA!

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Stim Daemon Setup](#stim-daemon-setup)
- [License](#license)

Features
--------

- Send and Receive STM
- Wallet Addresses, Create new ones
- View all transactions
- Two Factor Authentication
- Mobile Ready Responsive Design
- **Local Authentication** using Email and Password
- **OAuth 1.0a Authentication** via Twitter
- **OAuth 2.0 Authentication** via Facebook, Google, GitHub
- Flash notifications
- **User Account Management**
 - Gravatar
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
 - Link multiple OAuth strategies to one account
 - Delete Account
 - 2FA (MFA) Enable/Disable
- CSRF protection
- XSS protection

-More features will be coming!

Prerequisites
-------------

- [stimd](https://github.com/Stim-Community/stim)
- [MongoDB](https://www.mongodb.org/downloads)
- [Node.js 6.0+](http://nodejs.org)
- Command Line Tools (Optional)


Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone --depth=1 https://github.com/STM0x0/stim-node-wallet.git stim-node-wallet

# Change directory
cd denariuswallet

# Install NPM dependencies
npm install

# Or, if you prefer to use `yarn` instead of `npm`
yarn install

# Then simply start your app
node app.js

# Or, if you are using nodemon
nodemon app.js
```

**Note:** I highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.

Stim Daemon Setup
------------------

You must have a Stim daemon running on a local server or remote server (highly recommend using SSL)

Your configuration options should be set within your .env file, you can check the .env.example for examples

In your stim.conf file (The stimd/QT configuration file) add the following to allow use of the web wallet.

```bash

enableaccounts=1
staking=0
server=1
rpcuser=yourusername
rpcpassword=yourpassword

```

License
-------

The MIT License (MIT)

Copyright (c) 2018 Stim Community

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

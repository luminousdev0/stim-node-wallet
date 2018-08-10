'use strict';

const passport = require('passport');
const User = require('../models/User');
const bitcoin = require('bitcoin');
const WAValidator = require('wallet-address-validator');
const QRCode = require('qrcode');
const express = require('express');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// all config options are optional
var client = new bitcoin.Client({
    host: process.env.STMHOST,
    port: process.env.STMPORT,
    user: process.env.STMUSER,
    pass: process.env.STMPASS,
    timeout: 30000
});

/**
 * GET /withdraw
 * Withdraw page.
 */
exports.getWithdraw = (req, res) => {
  var username = req.user.email;
  client.getBalance(`stmw(${username})`, 10, function (error, balance, resHeaders) {
      if (error) return console.log(error);

      if (balance <= 0) {
        balance = 0;
      }
    res.render('account/withdraw', {
        title: 'Send STM',
        balance: balance
    });
  });
};

exports.addresses = function (req, res) {
  var username = req.user.email;

  //List All Addresses
  client.getAddressesByAccount(`stmw(${username})`, function (err, addresses, resHeaders) {
      if (err) return console.log(err);

      var addy = addresses.slice(-1)[0];

      client.dumpPrivKey(`${addy}`, function (err, privkey, resHeaders) {
        if (err) return console.log(err);

      res.render('account/addresses', { title: 'My Addresses', user: req.user, addy: addy, addresses: addresses, privkey: privkey });

  });
});

}

exports.wallet = function (req, res) {
    var username = req.user.email;

    //List Balances
    client.getBalance(`stmw(${username})`, 10, function (error, balance, resHeaders) {
        if (error) return console.log(error);
        if (balance <= 0) {
          balance = 0;
        }

        //List Transactions
        client.listTransactions(`stmw(${username})`, 5, function (err, transactions, resHeaders) {
            if (err) return console.log(err);

        //List Account Address
        //client.getAccountAddress(`stmw(${username})`, function (error, address, resHeaders) {
        client.getAddressesByAccount(`stmw(${username})`, function (err, addresses, resHeaders) {
            if (error) return console.log(error);

            var address = addresses.slice(-1)[0];

            if (typeof address == 'undefined') {
                client.getNewAddress(`stmw(${username})`, function (error, addr, resHeaders) {
                  if (error) return console.log(error);
                  address = addr;
                });
            }

            var qr = 'stim:'+address;
            //https://api.coinmarketcap.com/v1/ticker/stim-stm/
            app.get("https://graviex.net/api/v2/tickers/xhmbtc")
              .headers({'Accept': 'application/json'})
              .end(function (result) {
                //var usdprice = result.body[0]['price_usd'] * balance;
                //var btcprice = result.body['buy'] * balance;

            QRCode.toDataURL(qr, function(err, qrcode) {

            res.render('account/wallet', { title: 'My Wallet', user: req.user, usd: '0', btc: '0', address: address, qrcode: qrcode, balance: balance.toFixed(8), transactions: transactions });

            });
          });
          });
        });
    });
    /**
    var batch = [];
    for (var i = 0; i < 10; ++i) {
        batch.push({
            method: 'getbalance',
            params: [`stmw(${username})`],
            method: 'getaddressesbyaccount',
            params: [`stmw(${username})`]
        });
    }
    client.cmd(batch, function (err, balance, addresses, resHeaders) {
        if (err) return console.log(err);

        console.log(`${username}`, 'Addresses:', addresses, 'Balance:', balance);
    });
    */
};

//POST GET NEW ADDRESS

exports.address = function (req, res) {
    var username = req.user.email;

    client.getNewAddress(`stmw(${username})`, function (error, address, resHeaders) {
        if (error) return console.log(error);

        var qr = 'stim:'+address

        QRCode.toDataURL(qr, function(err, data_url) {

        res.render('account/newaddress', { title: 'New STM Address', user: req.user, address: address, data_url: data_url });
    });
  });
};

/**
 * POST /withdraw
 * Send Stim funds
 */
exports.withdraw = (req, res, next) => {
	  var fee = 0.0001;
    var username = req.user.email;
    var sendtoaddress = req.body.sendaddress;
    var amount = req.body.amount;

    client.getBalance(`stmw(${username})`, 10, function (error, balance, resHeaders) {
        if (error) return console.log(error);

    var valid = WAValidator.validate(`${sendtoaddress}`, 'STM');

    if (parseFloat(amount) - fee > balance) {

        req.flash('errors', { msg: 'Withdrawal amount exceeds your STM balance'});
        return res.redirect('/withdraw');

    } else {

    if (valid) {

        client.sendFrom(`stmw(${username})`, `${sendtoaddress}`, parseFloat(`${amount}`), 10, function (error, sendFromtx, resHeaders) {
            if (error) {

                req.flash('errors', { msg: 'Insufficient Funds or Invalid Amount!' });
                return res.redirect('/withdraw');

            } else {

                var sendtx = sendFromtx;
                var vamount = parseFloat(`${amount}`);

                req.flash('success', { msg: `Your ${vamount} STM was sent successfully! TX ID: ${sendtx}` });
                return res.redirect('/withdraw');
            }
        });

    } else {

        req.flash('errors', { msg: 'You entered an invalid Stim (STM) Address!' });
        return res.redirect('/withdraw');
    }
  }
  });
};

exports.transactions = function (req, res) {
      var username = req.user.email;

      //List Transactions
      client.listTransactions(`stmw(${username})`, 10000, function (err, transactions, resHeaders) {
          if (err) return console.log(err);

        res.render('account/tx', { title: 'Transactions', user: req.user, transactions: transactions });
        });

};

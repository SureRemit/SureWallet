"use strict";
const express = require('express');
const app = express();
const path = require('path');


const portNumber = process.env.PORT || process.argv[2] || 8080;

var StellarLedger = require('stellar-ledger-api');
var bip32Path = "44'/148'/0'";

app.use(express.static(__dirname + '/dist'));

// StellarLedger.comm.create_async(Number.MAX_VALUE).then(function(comm) {
//   var api = new StellarLedger.Api(comm);
//   api.connect(function() { console.log('connected'); } , function(err) { console.error('error - ' + err); });
// });


app.get('/api/ledger/address', function (req, res) {

  StellarLedger.comm.create_async().then(function(comm) {

    // var api = new StellarLedger.Api(comm);
    // api.connect(
    //   function() {
    //   console.log('connected');
    //   res.status(200).send(
    //     {status: "OK"});
    //   } ,
    //   function(err) {
    //   console.error('error - ' + err);
    //     res.status(200).send(
    //       {status: "Error",
    //       error: err.toJSON()});
    //   });
    var api = new StellarLedger.Api(comm);
    return api.getPublicKey_async(bip32Path).then(function (result) {
      var publicKey = result['publicKey'];
      res.status(200).send(
        {
          status: "OK",
          publicKey: publicKey
        });

    }).catch(function (err) {
      console.error(err);
      res.status(200).send(
        {
          status: "Error",
          error: err
        });
    });
  });
});

app.get('*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(portNumber, function () {
  console.log("Listening on port " + portNumber);
});

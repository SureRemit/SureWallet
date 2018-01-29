import {Injectable} from '@angular/core';

import {IStellarKeyPair} from './stellar-key-pair';
import StellarSdk from 'stellar-sdk'
import StellarLedger from 'stellar-ledger-api'


import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import {AccountBalance} from '../../account/account-balance/account-balance.model';
import {forEach} from '@angular/router/src/utils/collection';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {AccountBalance} from "../models/account-balance.model";
import {StellarResponse} from "../models/stellar-response.model";


@Injectable()
export class StellarService {

  public server: any;

  constructor() {
    this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    //StellarSdk.Network.usePublicNetwork();
    StellarSdk.Network.useTestNetwork();
  }


  getAccountKeys(): IStellarKeyPair {
    let pair: any = StellarSdk.Keypair.random();
    let stellarKeys: IStellarKeyPair = new IStellarKeyPair();
    stellarKeys.publicKey = pair.publicKey();
    stellarKeys.secretKey = pair.secret();
    return stellarKeys;
  }

  createAccount(publicKey): Observable<any> {

    var secretString = "SCFWL73PAU6NQVTWEU57XLOIORBFSZ7EFEGCONTLPOCDTG3ZBEWH5FIG";
    let accountSource: any = StellarSdk.Keypair.fromSecret(secretString);
    let server = this.server;

    let obs = Observable.fromPromise(
      this.server.loadAccount(accountSource.publicKey())
        .then(function (spoonAccount) {
          let transaction = new StellarSdk.TransactionBuilder(spoonAccount)
            .addOperation(StellarSdk.Operation.createAccount({
              destination: publicKey,
              startingBalance: '2'
            }))
            .addMemo(StellarSdk.Memo.text('courtesy SureRemit'))
            .build();
          transaction.sign(accountSource);
          return server.submitTransaction(transaction);
        })
        .catch(function (error) {
          this.HandleError(error);
          return;
        })
    );
    return obs;

  }

  createTrust(receivingAccountSecretKey: string): Observable<{}>  {

    let receivingKeys = StellarSdk.Keypair
      .fromSecret(receivingAccountSecretKey);

    let rmtIssuingPublicKey = "GCVWTTPADC5YB5AYDKJCTUYSCJ7RKPGE4HT75NIZOUM4L7VRTS5EKLFN";

    let server = this.server; // WTF
    let RMT = new StellarSdk.Asset('RMT', rmtIssuingPublicKey);

    let obs = Observable.fromPromise(this.server.loadAccount(receivingKeys.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        throw new Error('The destination account does not exist!');
      })
      .then(function (receiver) {

        var transaction = new StellarSdk.TransactionBuilder(receiver)
          .addOperation(StellarSdk.Operation.changeTrust({
            asset: RMT,
          }))
          .build();
        transaction.sign(receivingKeys);
        return server.submitTransaction(transaction);

      })
      .then(function (result) {
        return result;
      })
      .catch(function (error) {
        console.log(error);
        this.HandleError(error);
      })
    );
    return obs;
  }

  getPublicKey(secretKey: string): Observable<{}> {
    return Observable.of(StellarSdk.Keypair.fromSecret(secretKey).publicKey())
      .map((res: any) => res)
      .catch((e: any) => Observable.throw(this.HandleError(e)));
  }

  validateKey(secretKey: string){
    return StellarSdk.StrKey.isValidEd25519SecretSeed(secretKey);
  }

  getAccount(publicKey: string):Observable<{}>{

    let obs = Observable.fromPromise(
      this.server.loadAccount(publicKey)
        .then(function(account) {

          return account;
        })
        .catch(function (error) {
          let res = {
            "balances": "none"
          };
          return res
        })
    );
    return obs;
  }

  HandleError(error: {}) {
    console.log("Error here" + error);
    return Observable.throw(error || 'Server error');
  }

}

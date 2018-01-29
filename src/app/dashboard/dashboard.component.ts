import { Component, OnInit } from '@angular/core';
import {StellarService} from "../services/stellar.service";
import {IStellarKeyPair} from "../services/stellar-key-pair";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import StellarLedger from 'stellar-ledger-api'
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  publicKey: string;
  secretKey: string;
  hasKeyPair: boolean = false;
  isLoading:boolean = false;
  isGenerating: boolean = false;
  isActivating: boolean = false;

  hasPublicKey: boolean;
  ledgerEnabled: boolean = false;


  loggedInWithLedger = false;

  activatedAccount = false;
  enabledRMT = false;
  loggedIn = false;

  constructor(
    private stellarService: StellarService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    let publicKey = sessionStorage.getItem('publicKey');
    if (publicKey == ""){
      this.hasPublicKey = false;
    }else{
      this.hasPublicKey = true;
      this.publicKey = publicKey;
    }
  }

  enableRMTTrust(){
    this.isActivating = true;
    let sk = sessionStorage.getItem("secretKey");
    this.stellarService.createTrust(sk)
      .subscribe(res => {
          this.isActivating = false;
          console.log("Navigate to Balance page");
          this.router.navigate(['/balance']);
        },
        error => {
          this.isActivating = false;
          this.toastr.error("There was an error enabling trust now, please try again later", 'Error');
        });
  }

  activateAccount(){
    this.isActivating = true;
    let pk = sessionStorage.getItem("publicKey");
    console.log(pk);
    return this.stellarService.createAccount(pk)
      .subscribe((data: any) => {
          this.isActivating = false;
          console.log(data);
          this.toastr.success("Account Successfully activated", 'Great!');
          this.activatedAccount = true;
          return;
        },
        error => {
          this.isActivating = false;
          this.toastr.error("Something went wrong", 'Error!');
        });
  }

  retrieveAccount(publicKey) {
    this.enabledRMT = false;
    return this.stellarService.getAccount(publicKey)
      .subscribe(account => {
          this.loggedIn = true;
          if (account["balances"] && account["balances"] === "none"){
            console.log("account not activated");
            //this.toggleLoading();
            this.isActivating= false;
            this.activatedAccount = false;
            this.enabledRMT = false;
            return;

          }else{
            //console.log(account["balances"].length);
            this.isActivating = false;
            this.activatedAccount = true;
            if (account["balances"].length > 1){
              for (let i = 0; i < account['balances'].length; i++) {
                if (account['balances'][i]["asset_code"] == "RMT"){
                  this.enabledRMT = true;
                  return this.router.navigate(['/balance']);
                }
              }
            }else{
              this.enabledRMT = false;
            }
            this.isActivating = false;
          }
          //console.log(data);
          return;
        },
        error => {
          this.isActivating = false;
          this.toastr.error("Something went wrong", 'Error!');
          return;
        })
  }

  loginWithSecretKey(secretKey:string):void{
    this.isActivating = true;
    let pk = "";

    if (this.stellarService.validateKey(secretKey) === false){
      this.isActivating = false;
      this.toastr.error("Please enter a valid secret key", 'Error!');
    }else{
      sessionStorage.setItem("secretKey", secretKey);
      this.stellarService.getPublicKey(secretKey)
        .subscribe((data: any) => {
          console.log(data);
          sessionStorage.setItem("publicKey", data);
          return this.retrieveAccount(data);
        },(error: any) => {
        this.isActivating = false;
        console.log(error);
      });
    }
  }

  onLoginWithSecret(form: NgForm):void{
    const secret = form.value.secretKey;
    return this.loginWithSecretKey(secret);
  }

  generateKeyPairs():void {

    this.isGenerating = true;
    let response: any;
    this.getAccountKeys();
    this.stellarService.createAccount(this.publicKey)
      .subscribe(res => {
          response = res;
          //console.log(res);
          this.isGenerating = false;

          sessionStorage.setItem("secretKey", this.secretKey);
          sessionStorage.setItem("publicKey", this.publicKey);

          // this.userService.updatedUserAddress(localStorage.getItem("email"), this.publicKey).subscribe( response => {
          //   console.log(response);
          //   this.toastr.success("Wallet Created Successfully", 'Great!',
          //     {
          //       timeOut: 5000,
          //     });
          //   this.hasKeyPair = true;
          // });
          this.hasKeyPair = true;
          //this.router.navigate(['/balance']);
        },
        error => {
          this.isGenerating = false;
          this.toastr.error("Something went wrong", 'Error!',
            {
              timeOut: 5000,
            });
        });
  }

  getLedgerAddress() {

    let bip32Path = "44'/148'/0'";
    let returnSignature = true;
    let returnChainCode = true;
    var _this = this;
    let timeout = 0;
    let debug = true;

    _this.isLoading = true;

    return StellarLedger.comm.create_async(timeout, debug)
      .then(function (comm) {
        let api = new StellarLedger.Api(comm);
        api.getPublicKey_async(bip32Path, returnSignature, returnChainCode)
          .then(function (result) {
            console.log(this);
            console.log('publicKey: ' + result['publicKey']);
            sessionStorage.setItem("publicKey",result['publicKey']);
            console.log('chainCode: ' + result['chainCode']);
            _this.loggedInWithLedger = true;
            _this.isLoading = false;
            return _this.retrieveAccount(result['publicKey']);
            //console.log(this);
          }).catch(function (err) {
          console.log(err);
          console.log(this);
          _this.toastr.error("Please unlock your device to continue", 'Error!');
          _this.isLoading = false;
        }).catch(function (err) {
          _this.isLoading = false;
          _this.toastr.error("Please unlock your device to continue", 'Error!');
        })
      });

  }

  getAccountKeys(): void {
    let accountKeys: IStellarKeyPair;
    accountKeys = this.stellarService.getAccountKeys();
    this.publicKey = accountKeys.publicKey;
    this.secretKey = accountKeys.secretKey;
  }



}

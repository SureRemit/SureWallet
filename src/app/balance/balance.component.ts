import { Component, OnInit } from '@angular/core';
import {StellarService} from "../services/stellar.service";

import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  publicKey: string = "";
  secretKey: string = "";
  balances = [];
  isFetchingBalances: boolean = false;

  isEnabling: boolean = false;

  trustsRMT: boolean = false;

  constructor(
    private stellarService: StellarService,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    this.publicKey = sessionStorage.getItem("publicKey");
    this.secretKey = sessionStorage.getItem("secretKey");

    //console.log(this.publicKey);
    this.fetchBalance();

  }

  toggleEnabling() {
    this.isEnabling = !this.isEnabling;
  }


  fetchBalance(): void {
    this.isFetchingBalances = true;
    this.balances = [];
    let assetName = "Custom";
    this.stellarService.getAccount(this.publicKey)
      .subscribe(res => {
          //console.log(res);
          //console.log(res['balances'].length);
          this.isFetchingBalances = false;
          if (res['balances'].length == 1){
            //credit account with RMT
            //this.trustsRMT = false;
            for (let i = 0; i < res['balances'].length; i++) {
              if (res['balances'][i]["asset_type"] && res['balances'][i]["asset_type"] == "native") {
                let tmp = {
                  asset_code: "XLM",
                  asset_name: "Stellar Network",
                  img_name: "/assets/images/XLM.png",
                  asset_issuer: "native",
                  balance: res['balances'][i]["balance"]
                };
                this.balances.push(tmp);
              }
            }
          }else{
            for (let i = 0; i < res['balances'].length; i++) {
              if (res['balances'][i]["asset_type"] && res['balances'][i]["asset_type"] == "native") {
                let tmp = {
                  asset_code: "XLM",
                  asset_name: "Stellar Network",
                  img_name: "/assets/images/XLM.png",
                  asset_issuer: "native",
                  balance: res['balances'][i]["balance"]
                };
                this.balances.push(tmp);
              }else {
                if (res['balances'][i]["asset_code"] == "RMT"){
                  this.trustsRMT = true;
                  assetName = "SureRemit"
                }else{
                  assetName = "Custom"
                }
                let tmp = {
                  asset_code: res['balances'][i]["asset_code"],
                  asset_name: assetName,
                  asset_issuer: res['balances'][i]["asset_issuer"],
                  img_name: '/assets/images/' + res['balances'][i]["asset_code"]+'.png',
                  balance: res['balances'][i]["balance"]
                };
                this.balances.push(tmp);
              }
            }
          }
          return;
        },
        error => {
          this.isFetchingBalances = false;
        return;
        });
  }


  enableRMTTrust(): void {

    this.toggleEnabling();
    this.stellarService.createTrust(this.secretKey)
      .subscribe(res => {
          //console.log(res);
          this.toggleEnabling();
          //this.isFetchingBalances = false;
        window.location.reload();
        },
        error => {
          //this.isFetchingBalances = false;
          this.toggleEnabling();
          this.toastr.error("There was an error enabling trust now, please try again later", 'Error');
        });
  }


}

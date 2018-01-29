import {CanActivate, Router} from "@angular/router";

import {Injectable} from "@angular/core";

@Injectable()
export class BalanceGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(){

    //return true;
    // if (!localStorage.getItem('email')){
    //   this.router.navigate(['/login']);
    //   return false;
    // }else if (localStorage.getItem('email') && !sessionStorage.getItem('publicKey')){
    //   this.router.navigate(['/dashboard']);
    //   return false;
    // }else{
    //   return true;
    // }
    if (!sessionStorage.getItem('publicKey')){
      this.router.navigate(['/dashboard']);
      return false;
    }else{
      return true;
    }
  }
}

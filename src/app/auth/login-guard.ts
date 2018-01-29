import {CanActivate, Router} from "@angular/router";

import {Injectable} from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(){

    //return true;
    if (localStorage.getItem('email') && !sessionStorage.getItem('sk')){
      this.router.navigate(['/dashboard']);
      return false;
    }else if (localStorage.getItem('email') && sessionStorage.getItem('sk')){
      this.router.navigate(['/balance']);
      return false;
    }else{
      return true;
    }
    // if (localStorage.getItem('email') && sessionStorage.getItem('sk') && sessionStorage.getItem('pk')){
    //   this.router.navigate(['/balance']);
    //   return false;
    //
    // }
    // else {
    //   //this.router.navigate(['/balance']);
    //   return true;
    // }
  }
}

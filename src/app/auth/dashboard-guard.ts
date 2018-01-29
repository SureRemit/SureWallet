import {CanActivate, Router} from "@angular/router";

import {Injectable} from "@angular/core";

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(){

    return true;
    //
    // if (!localStorage.getItem('email')){
    //   this.router.navigate(['/']);
    //   return false;
    // }
    // else{
    //   return true;
    // }
  }
}

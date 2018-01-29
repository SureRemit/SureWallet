import {CanActivate, Router} from "@angular/router";

import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(){
    //console.log(firebase.auth().currentUser);
    if (sessionStorage.getItem('sk') && sessionStorage.getItem('pk')){
      this.router.navigate(['/balance']);
      return true;

    } else {
      // start a new navigation to redirect to login page
      this.router.navigate(['/dashboard']);
      // abort current navigation
      return false;
    }
  }
}

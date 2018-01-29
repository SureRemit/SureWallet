import {CanActivate, Router} from "@angular/router";

import {Injectable} from "@angular/core";

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(){
    //console.log(firebase.auth().currentUser);
    if (localStorage.getItem('email')){
      return true;
    } else {
      // start a new navigation to redirect to login page
      this.router.navigate(['/']);
      // abort current navigation
      return false;
    }
  }
}

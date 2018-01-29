import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  //email: string = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log("here");
    console.log(sessionStorage.getItem('publicKey'));
    let pk = sessionStorage.getItem('publicKey');
    if (pk != null){
      this.isLoggedIn = true;
    }
  }

  onLogOut() {
    this.userService.destroy();
    this.isLoggedIn = false;
  }

}

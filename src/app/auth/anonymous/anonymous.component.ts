import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css']
})
export class AnonymousComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  onSubmit(form: NgForm) {
    this.toggleLoading();

    const email = form.value.email;
    const password = form.value.password;

    let found = false;
    //console.log(email);

    if (email == "" || password == ""){
      this.toastr.error("Email Address/Password is required", 'Error');
    } else {
      this.userService.getRMTHolders(email, password).subscribe( response => {
        //console.log(data);
        if (response.status == false){
            this.toastr.error("Please enter a valid email address and password", 'Error');
            this.toggleLoading();
        }else{
          console.log(response.data.walletAddress);
          localStorage.setItem("email", response.data.email);
          sessionStorage.setItem("publicKey", response.data.walletAddress);
          this.router.navigate(['/dashboard']);
        }
      });
    }





    // firebase.auth().signInAnonymously()
    //   .then(userData => {
    //     console.log(userData)
    //   })
      // .then( userDataFromDatabase => {
      //   if (userDataFromDatabase){
      //     this.userService.set(userDataFromDatabase);
      //     this.toggleLoading();
      //     this.router.navigate(['/dashboard']);
      //   }
      // })
      // .catch(err => {
      //   this.toggleLoading();
      //   this.toastr.error(err.message, 'Error',
      //     {
      //       timeOut: 40000,
      //     });
      // });
  }

}

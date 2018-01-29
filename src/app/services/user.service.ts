import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  statusChange: any = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  getRMTHolders(email, password): Observable<any> {
    return this.http.post("https://sureremittokensale-staging.azurewebsites.net/api/account/?username=" + email + "&password=" + password ,
      {
      });
  }

  updatedUserAddress(email, wallet): Observable<any> {
    return this.http.post("https://sureremittokensale-staging.azurewebsites.net/api/account/ConfirmAddress?email=" + email + "&walletAddress=" + wallet ,
      {
      });
  }

  destroy(){
    sessionStorage.removeItem('sk');
    sessionStorage.removeItem('pk');
    sessionStorage.removeItem('secretKey');
    sessionStorage.removeItem('publicKey');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    this.statusChange.emit(null);
  }
}

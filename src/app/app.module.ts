import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { ThemeComponent } from './theme/theme.component';
import {LaddaModule} from "angular2-ladda";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {UserService} from "./services/user.service";
import {StellarService} from "./services/stellar.service";
import {HttpClientModule} from "@angular/common/http";
import {QRCodeModule} from "angular2-qrcode";
import {AccountQrCodeComponent} from "./shared/account-qr-code/account-qr-code.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AnonymousComponent } from './auth/anonymous/anonymous.component';
import { BalanceComponent } from './balance/balance.component';
import {LoginGuard} from "./auth/login-guard";
import {DashboardGuard} from "./auth/dashboard-guard";
import {BalanceGuard} from "./auth/balance-guard";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AccountQrCodeComponent,
    ThemeComponent,
    AnonymousComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LaddaModule,
    QRCodeModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule.forRoot()
  ],
  providers: [
    LoginGuard,
    DashboardGuard,
    BalanceGuard,
    UserService,
    StellarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AnonymousComponent} from "./auth/anonymous/anonymous.component";
import {BalanceComponent} from "./balance/balance.component";
import {LoginGuard} from "./auth/login-guard";
import {DashboardGuard} from "./auth/dashboard-guard";
import {BalanceGuard} from "./auth/balance-guard";

const appRoutes: Routes = [
 // {path: '', component: AnonymousComponent, canActivate: [LoginGuard] },
  {path: '', component: DashboardComponent, canActivate: [DashboardGuard]},
  {path: 'balance', component: BalanceComponent, canActivate: [BalanceGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

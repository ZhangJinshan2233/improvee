import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "./services/auth-guard.service";
import { UserType } from './model/userType';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule',
  },
  {
    path: 'coachee',
    loadChildren: './pages/coachee-tabs/coachee-tabs.module#CoacheeTabsPageModule',
    data: { allowUserType: [UserType.coachee] },
    canActivateChild: [AuthGuardService],
    canLoad: [AuthGuardService],
  },
  {
    path: 'coach',
    loadChildren: './pages/coach-tabs/coach-tabs.module#CoachTabsPageModule',
    data: { allowUserType: [UserType.coach] },
    canActivateChild: [AuthGuardService],
    canLoad: [AuthGuardService]
  },
  {
    path: 'adminCoach',
    loadChildren: './pages/coach-admin-tabs/coach-admin-tabs.module#CoachAdminTabsPageModule',
    data: { allowUserType: [UserType.admin] },
    canActivateChild: [AuthGuardService],
    canLoad: [AuthGuardService]
  },
 
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
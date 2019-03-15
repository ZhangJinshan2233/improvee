import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachAdminTabsPage } from './coach-admin-tabs.page';
import { UserType } from "../../model/userType";
const routes: Routes = [
    {
      path: '',
      component: CoachAdminTabsPage,
      children: [
        {
          path: 'coach-admin-home',
          data:{allowUserType:[UserType.admin]}, 
          children: [
            {
              path: '',
              loadChildren: '../coach-admin-tabs/coach-admin-home/coach-admin-home.module#CoachAdminHomePageModule',
            }
          ]
        },
        {
          path: '',
          redirectTo: '/adminCoach/coach-admin-home',
          pathMatch: 'full'
          
        }
      ]
    }
  ]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminCoachTabsPageRoutingModule {
}

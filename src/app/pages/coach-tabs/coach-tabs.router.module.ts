import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachTabsPage } from './coach-tabs.page';
import { UserType } from "../../model/userType";
const routes: Routes = [
    {
      path: '',
      component: CoachTabsPage,
      children: [
        {
          path: 'coach-home',
          data:{allowUserType:[UserType.coach]},
          children: [
            {
              path: '',
              loadChildren: '../coach-tabs/coach-home/coach-home.module#CoachHomePageModule',
            }
          ]
        },
        {
          path: '',
          redirectTo: '/coach/coach-home',
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
export class CoachTabsPageRoutingModule {
}

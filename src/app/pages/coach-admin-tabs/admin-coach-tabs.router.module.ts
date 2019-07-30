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
        data: { allowUserType: [UserType.admin] },
        children: [
          {
            path: '',
            loadChildren: '../coach-admin-tabs/coach-admin-home/coach-admin-home.module#CoachAdminHomePageModule',
          },
          {
            path: 'habit-items',
            loadChildren: '../coach-admin-tabs/habit-items/habit-items.module#HabitItemsPageModule'
          },
          {
            path: 'coach-list',
            loadChildren: '../coach-admin-tabs/coach-list/coach-list.module#CoachListPageModule'
          },
          { path: 'manage-coachee',
           loadChildren: '../coach-admin-tabs/manage-coachee/manage-coachee.module#ManageCoacheePageModule' },
        ]
      },
      {
        path: 'profile',
        data: { allowUserType: [UserType.admin] },
        children: [
          {
            path: '',
            loadChildren: '../coach-tabs/coach-profile/coach-profile.module#CoachProfilePageModule',
          },
          {
            path: 'changePassword',
            loadChildren: '../coachee-tabs/change-password/change-password.module#ChangePasswordPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/adminCoach/coach-admin-home',
        pathMatch: 'full'

      }
    ]
  },
  {
    path: '',
    redirectTo: '/adminCoach/coach-admin-home',
    pathMatch: 'full'

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

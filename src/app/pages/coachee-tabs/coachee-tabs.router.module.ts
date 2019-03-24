import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoacheeTabsPage } from "./coachee-tabs.page";
import { UserType } from "../../model/userType";
const routes: Routes = [
  {
    path: '',
    component: CoacheeTabsPage,
    children: [
      {
        path: 'timeline',
        data: { allowUserType: [UserType.free, UserType.premium] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/timeline/timeline.module#TimelinePageModule',
          }
        ]
      },
      {
        path: 'dashboard',
        data: { allowUserType: [UserType.free, UserType.premium] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/dashboard/dashboard.module#DashboardPageModule',
          }
        ]
      },
      {
        path: 'message',
        data: { allowUserType: [UserType.free, UserType.premium] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/profile/profile.module#ProfilePageModule',
          }
        ]
      },
      {
        path: 'profile',
        data: { allowUserType: [UserType.free, UserType.premium] },
        children: [
          {
            path: '',
            loadChildren: '../coachee-tabs/profile/profile.module#ProfilePageModule',
          }
        ]
      },
      {
        path: '',
        redirectTo: '/coachee/timeline',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/coachee/timeline',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoacheeTabsPageRoutingModule { }
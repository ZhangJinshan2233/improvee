import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoacheeTabsPage } from './coachee-tabs.page';
import { ShareDirectiveModule } from "../../directives/share-directive.module";
import { UserType } from "../../model/userType";
const routes: Routes = [
  {
    path: '',
    component: CoacheeTabsPage,
    children: [

      {
        path: 'timeline',
        loadChildren: '../coachee-tabs/timeline/timeline.module#TimelinePageModule',
        data:{allowUserType:[UserType.free,UserType.premium]},
      },
      {
        path: 'dashboard',
        loadChildren: '../coachee-tabs/dashboard/dashboard.module#DashboardPageModule',
        data:{allowUserType:[UserType.free,UserType.premium]},
      },
      {
        path: 'message',
        loadChildren: '../coachee-tabs/message/message.module#MessagePageModule',
        data:{allowUserType:[UserType.premium]},
      },
      {
        path: 'profile',
        loadChildren: '../coachee-tabs/profile/profile.module#ProfilePageModule',
        data:{allowUserType:[UserType.free,UserType.premium]},
      },
      {
        path: '',
        redirectTo: '/coachee/timeline',
        pathMatch: 'full'
      }
    ]

  },
  {
    path: 'coachee',
    redirectTo: '/coachee/timeline',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareDirectiveModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoacheeTabsPage]
})
export class CoacheeTabsPageModule { }

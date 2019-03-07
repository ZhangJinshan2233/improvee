import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoacheeTabsPage } from './coachee-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CoacheeTabsPage,
    children: [

      { path: 'timeline', loadChildren: '../coachee-tabs/timeline/timeline.module#TimelinePageModule' },
      { path: 'dashboard', loadChildren: '../coachee-tabs/dashboard/dashboard.module#DashboardPageModule' },
      { path: 'message', loadChildren: '../coachee-tabs/message/message.module#MessagePageModule' },
      { path: 'profile', loadChildren: '../coachee-tabs/profile/profile.module#ProfilePageModule' },
      {
        path: '',
        redirectTo: '/coachee-tabs/timeline',
        pathMatch: 'full'
      }
    ]
    
  },
  // {
  //   path: '',
  //   redirectTo: '/coachee-tabs/timeline',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoacheeTabsPage]
})
export class CoacheeTabsPageModule { }

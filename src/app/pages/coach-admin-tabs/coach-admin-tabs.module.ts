import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoachAdminTabsPage } from './coach-admin-tabs.page';
import { UserType } from "../../model/userType";
const routes: Routes = [
  {
    path: '',
    component: CoachAdminTabsPage,
    children:[
      { 
        path: 'coach-admin-home', 
        loadChildren: '../coach-admin-tabs/coach-admin-home/coach-admin-home.module#CoachAdminHomePageModule',
        data:{allowUserType:[UserType.admin]}, 
      },
    {
      path: '',
      redirectTo: '/adminCoach/coach-admin-home',
      pathMatch: 'full'
    }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoachAdminTabsPage]
})
export class CoachAdminTabsPageModule {}

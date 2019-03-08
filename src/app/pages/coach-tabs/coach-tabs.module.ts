import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoachTabsPage } from './coach-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CoachTabsPage,
    children: [
      {
        path: 'coach-home',
        loadChildren: '../coach-tabs/coach-home/coach-home.module#CoachHomePageModule'
      },
      {
        path: '',
        redirectTo: '/coach-tabs/coach-home',
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
  declarations: [CoachTabsPage]
})
export class CoachTabsPageModule { }

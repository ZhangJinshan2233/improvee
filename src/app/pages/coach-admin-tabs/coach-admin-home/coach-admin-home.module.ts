import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoachAdminHomePage } from './coach-admin-home.page';

const routes: Routes = [
  {
    path: '',
    component: CoachAdminHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoachAdminHomePage]
})
export class CoachAdminHomePageModule {}

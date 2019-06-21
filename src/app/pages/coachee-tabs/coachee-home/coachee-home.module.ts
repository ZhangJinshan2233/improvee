import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoacheeHomePage } from './coachee-home.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
const routes: Routes = [
  {
    path: '',
    component: CoacheeHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCircleProgressModule.forRoot({
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [CoacheeHomePage]
})
export class CoacheeHomePageModule {}

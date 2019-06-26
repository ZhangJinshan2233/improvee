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
      "backgroundPadding": -18,
      "radius": 50,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#FF6347",
      "innerStrokeColor": "#32CD32",
      "innerStrokeWidth": 2,
      "backgroundColor": "#F1F1F1",
      "maxPercent": 100,
      "subtitleColor": "#61A9DC",
      "showSubtitle": true,
      "showInnerStroke": false,
      "lazy": false,
      'subtitle':'Today completed'
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [CoacheeHomePage]
})
export class CoacheeHomePageModule { }

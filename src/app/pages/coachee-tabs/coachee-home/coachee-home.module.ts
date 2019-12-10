import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FoodjournalPostDetailsPageModule } from "../foodjournal-post-details/foodjournal-post-details.module";
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
    FoodjournalPostDetailsPageModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding": 7,
      "radius": 40,
      "space": -2,
      "outerStrokeWidth": 2,
      "outerStrokeColor": "#FF6347",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 2,
      // "backgroundColor": "#F1F1F1",
      "maxPercent": 100,
      "subtitleColor": "#61A9DC",
      "showSubtitle": true,
      // "showInnerStroke": false,
      "lazy": false,
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [CoacheeHomePage]
})
export class CoacheeHomePageModule { }

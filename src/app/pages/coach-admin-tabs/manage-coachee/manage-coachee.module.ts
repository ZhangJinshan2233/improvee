import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageCoacheePage } from './manage-coachee.page';
import { CoachesPageModule } from "../coaches/coaches.module";
const routes: Routes = [
  {
    path: '',
    component: ManageCoacheePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachesPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageCoacheePage]
})
export class ManageCoacheePageModule {}

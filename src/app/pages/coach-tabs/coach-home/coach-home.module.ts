import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoachHomePage } from './coach-home.page';
import { ShareModule } from "../../share/share.module";
const routes: Routes = [
  {
    path: '',
    component: CoachHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoachHomePage]
})
export class CoachHomePageModule {}

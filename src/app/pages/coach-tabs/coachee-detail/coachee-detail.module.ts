import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoacheeDetailPage } from './coachee-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CoacheeDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoacheeDetailPage]
})
export class CoacheeDetailPageModule {}

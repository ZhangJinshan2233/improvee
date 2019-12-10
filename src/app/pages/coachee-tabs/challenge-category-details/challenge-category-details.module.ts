import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChallengeCategoryDetailsPage } from './challenge-category-details.page';

const routes: Routes = [
  {
    path: '',
    component: ChallengeCategoryDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChallengeCategoryDetailsPage]
})
export class ChallengeCategoryDetailsPageModule {}

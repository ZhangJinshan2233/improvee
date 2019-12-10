import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChallengeHistoryPage } from './challenge-history.page';

const routes: Routes = [
  {
    path: '',
    component: ChallengeHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChallengeHistoryPage]
})
export class ChallengeHistoryPageModule {}

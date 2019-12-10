import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CoachListPage } from './coach-list.page';
import { CoachInfoPageModule } from "../coach-info/coach-info.module";
const routes: Routes = [
  {
    path: '',
    component: CoachListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachInfoPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoachListPage]
})
export class CoachListPageModule {}

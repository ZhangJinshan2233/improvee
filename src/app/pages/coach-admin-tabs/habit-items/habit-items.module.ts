import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HabitItemsPage } from './habit-items.page';
import { HabitItemDetailPageModule } from "../habit-item-detail/habit-item-detail.module";
const routes: Routes = [
  {
    path: '',
    component: HabitItemsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitItemDetailPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HabitItemsPage]
})
export class HabitItemsPageModule {}

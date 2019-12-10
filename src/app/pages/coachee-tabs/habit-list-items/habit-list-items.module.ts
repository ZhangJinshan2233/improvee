import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HabitListItemsCreatePageModule } from "../habit-list-items-create/habit-list-items-create.module";
import { HabitListItemsPage } from './habit-list-items.page';


const routes: Routes = [
  {
    path: '',
    component: HabitListItemsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitListItemsCreatePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HabitListItemsPage]
})
export class HabitListItemsPageModule {}

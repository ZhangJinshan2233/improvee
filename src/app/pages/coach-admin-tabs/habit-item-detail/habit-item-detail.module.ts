import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HabitItemDetailPage } from './habit-item-detail.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [HabitItemDetailPage],
  entryComponents:[HabitItemDetailPage]
})
export class HabitItemDetailPageModule {}

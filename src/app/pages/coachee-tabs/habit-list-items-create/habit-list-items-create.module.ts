import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HabitListItemsCreatePage } from './habit-list-items-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [HabitListItemsCreatePage],
  entryComponents: [HabitListItemsCreatePage]

})
export class HabitListItemsCreatePageModule { }

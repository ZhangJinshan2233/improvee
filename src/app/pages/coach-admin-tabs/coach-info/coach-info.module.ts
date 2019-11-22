import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CoachInfoPage } from './coach-info.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [CoachInfoPage],
  entryComponents:[CoachInfoPage],
  
})
export class CoachInfoPageModule {}

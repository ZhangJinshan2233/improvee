import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndicatorRecordPage } from './indicator-record.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [IndicatorRecordPage],
  entryComponents: [IndicatorRecordPage]
})
export class IndicatorRecordPageModule {}

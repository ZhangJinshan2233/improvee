import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndicatorRecordDetailPage } from './indicator-record-detail.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [IndicatorRecordDetailPage],
  entryComponents:[IndicatorRecordDetailPage]
})
export class IndicatorRecordDetailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IndicatorRecordDetailPageModule } from "../indicator-record-detail/indicator-record-detail.module";
import { IonicModule } from '@ionic/angular';

import { IndicatorRecordsPage } from './indicator-records.page';

const routes: Routes = [
  {
    path: '',
    component: IndicatorRecordsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndicatorRecordDetailPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndicatorRecordsPage]
})
export class IndicatorRecordsPageModule {}

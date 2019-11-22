import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IndicatorRecordHistoryPage } from './indicator-record-history.page';
import{IndicatorRecordDetailPageModule}from '../indicator-record-detail/indicator-record-detail.module'
const routes: Routes = [
  {
    path: '',
    component: IndicatorRecordHistoryPage
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
  declarations: [IndicatorRecordHistoryPage]
})
export class IndicatorRecordHistoryPageModule {}

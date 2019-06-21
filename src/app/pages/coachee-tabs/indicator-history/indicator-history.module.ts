import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IndicatorRecordPageModule } from "../indicator-record/indicator-record.module";
import { IndicatorHistoryPage } from './indicator-history.page';
const routes: Routes = [
  {
    path: '',
    component: IndicatorHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndicatorRecordPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndicatorHistoryPage]
})
export class IndicatorHistoryPageModule {}

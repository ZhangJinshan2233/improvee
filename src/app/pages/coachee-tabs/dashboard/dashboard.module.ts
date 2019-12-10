import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IndicatorRecordDetailPageModule } from "../indicator-record-detail/indicator-record-detail.module";
import { DashboardPage } from './dashboard.page';
import { IndicatorRecordDetailPage } from '../indicator-record-detail/indicator-record-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
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
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

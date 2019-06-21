import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IndicatorRecordPageModule } from "../indicator-record/indicator-record.module";
import { IonicModule } from '@ionic/angular';
import { IndicatorDetailsPage } from './indicator-details.page';

const routes: Routes = [
  {
    path: '',
    component: IndicatorDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndicatorRecordPageModule,
    RouterModule.forChild(routes),
  ],
  declarations: [IndicatorDetailsPage]
})
export class IndicatorDetailsPageModule { }

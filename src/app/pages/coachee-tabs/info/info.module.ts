import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ShareDirectiveModule } from "../../../directives/share-directive.module";
import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareDirectiveModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {}

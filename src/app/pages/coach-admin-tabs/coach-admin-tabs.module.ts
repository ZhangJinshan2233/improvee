import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCoachTabsPageRoutingModule } from "./admin-coach-tabs.router.module";

import { IonicModule } from '@ionic/angular';

import { CoachAdminTabsPage } from './coach-admin-tabs.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCoachTabsPageRoutingModule
  ],
  declarations: [CoachAdminTabsPage]
})
export class CoachAdminTabsPageModule { }

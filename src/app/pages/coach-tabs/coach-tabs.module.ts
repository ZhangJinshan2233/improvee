import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoachTabsPageRoutingModule } from "./coach-tabs.router.module";
import { IonicModule } from '@ionic/angular';
import { CoachTabsPage } from './coach-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachTabsPageRoutingModule
   
  ],
  declarations: [CoachTabsPage]
})
export class CoachTabsPageModule { }

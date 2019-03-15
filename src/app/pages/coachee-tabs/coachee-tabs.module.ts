import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoacheeTabsPage } from './coachee-tabs.page';
import { ShareDirectiveModule } from "../../directives/share-directive.module";
import { CoacheeTabsPageRoutingModule } from "./coachee-tabs.router.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareDirectiveModule,
    CoacheeTabsPageRoutingModule
  ],
  declarations: [CoacheeTabsPage]
})
export class CoacheeTabsPageModule { }

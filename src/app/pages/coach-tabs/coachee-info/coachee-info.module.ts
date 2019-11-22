import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoacheeInfoPage } from './coachee-info.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [CoacheeInfoPage],
  schemas:[NO_ERRORS_SCHEMA],
  exports:[CoacheeInfoPage]
})
export class CoacheeInfoPageModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoacheeInfoPage } from "../coach-tabs/coachee-info/coachee-info.page";
@NgModule({
  declarations: [CoacheeInfoPage],
  imports: [
    CommonModule
  ],
  exports:[CoacheeInfoPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule { }

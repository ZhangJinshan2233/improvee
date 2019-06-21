import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from "./has-role.directive";
import { ScrollVanishDirective } from './scroll-vanish.directive';
import { RulerPage } from "../pages/coachee-tabs/ruler/ruler.page";
@NgModule({
  declarations: [HasRoleDirective, ScrollVanishDirective,RulerPage],
  imports: [
    CommonModule
  ],
  exports:[HasRoleDirective,ScrollVanishDirective,RulerPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareDirectiveModule { }

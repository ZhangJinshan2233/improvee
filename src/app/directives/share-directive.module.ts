import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from "./has-role.directive";
import { ScrollVanishDirective } from './scroll-vanish.directive';
@NgModule({
  declarations: [HasRoleDirective, ScrollVanishDirective],
  imports: [
    CommonModule
  ],
  exports:[HasRoleDirective,ScrollVanishDirective],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareDirectiveModule { }

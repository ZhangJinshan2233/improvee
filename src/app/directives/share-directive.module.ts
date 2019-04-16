import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from "./has-role.directive";
import { ScrollVanishDirective } from './scroll-vanish.directive';

@NgModule({
  declarations: [HasRoleDirective, ScrollVanishDirective],
  imports: [
    CommonModule
  ],
  exports:[HasRoleDirective,ScrollVanishDirective]
})
export class ShareDirectiveModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgetPasswordPage } from './forget-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [ForgetPasswordPage],
  entryComponents:[ForgetPasswordPage]
})
export class ForgetPasswordPageModule {}

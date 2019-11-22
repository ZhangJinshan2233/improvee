import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  forgetPasswordForm: FormGroup;
  isSubmitted = false;
  constructor(private formBilder: FormBuilder,
    private modalCtrl: ModalController,
    private authService: AuthService,
    
  ) { }

  ngOnInit() {
    this.create_forget_password_form()
  }

  create_forget_password_form() {
    this.forgetPasswordForm = this.formBilder.group({
      email: ["", [Validators.required,Validators.email]]
    })
  }

  get f() {
    return this.forgetPasswordForm.controls
  }

  close_modal() {
    this.modalCtrl.dismiss()
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.forgetPasswordForm.invalid) return
    this.authService.forgot_password(this.forgetPasswordForm.value).subscribe(sucess => {
      this.modalCtrl.dismiss()
    })
  }
}

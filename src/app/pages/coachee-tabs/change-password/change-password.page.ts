import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchValidator } from "../../../_helper/match-validator";
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  passwordForm: FormGroup;
  isSubmitted = false;
  isCoachee=true
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.isCoachee= this.router.url.split('/').includes('coachee')
    this.createPasswordForm()
  }

  createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      retypePassword: ['', Validators.required],
    },
      {
        validator: MatchValidator('newPassword', 'retypePassword')
      })
  }

  submitPasswordForm() {
    this.isSubmitted = true;
    if (this.passwordForm.invalid) return
    this.auth.changePassword(this.passwordForm.value).subscribe(res => {
      if(this.isCoachee){
        this.router.navigateByUrl('coachee/menu')
      }else{
        this.router.navigateByUrl('coach/profile')
      }
    })
  }
}

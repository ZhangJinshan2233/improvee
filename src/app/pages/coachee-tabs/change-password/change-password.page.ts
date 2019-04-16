import { Component, OnInit } from '@angular/core';
import { MenuService } from "../../../services/menu.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchValidator } from "../../../_helper/match-validator";
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  passwordForm:FormGroup;
  isSubmitted=false
  constructor(private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.createPasswordForm()
  }

  createPasswordForm(){
    this.passwordForm=this.formBuilder.group({
      currentPassword:['',Validators.compose([Validators.required,Validators.minLength(6)])],
      newPassword:['',Validators.compose([Validators.required,Validators.minLength(6)])],
      retypePassword:['',Validators.required],
    },
    {
      validator:MatchValidator('newPassword','retypePassword')
    })
  }
  submitPasswordForm(){
    this.isSubmitted=true;
    if(this.passwordForm.invalid) return
    this.router.navigateByUrl('coachee/menu/profile')
    
  }
}

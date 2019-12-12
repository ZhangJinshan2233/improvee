import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { addYears, compareAsc } from "date-fns";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import { MatchValidator } from "../../_helper/match-validator";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;
  isCompanyUser=false
  termsAndConditionsUrl = "http://improvee.strikingly.com/terms-and-conditions"
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private iab: InAppBrowser,
    private alertController: AlertController,
    private authService: AuthService) { }
  ngOnInit() {
    this.create_register_form_group();
  }

  get f() {
    return this.registerForm.controls
  }
  goto_terms_and_conditions() {
    let browser = this.iab.create(this.termsAndConditionsUrl,'_system');
  }
  create_register_form_group() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ["", [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
        height: ['', [Validators.required, Validators.min(100), Validators.max(230), Validators.pattern(/^\d*\.?\d*$/)]],
        weight: ['', [Validators.required, Validators.min(30), Validators.max(200), Validators.pattern(/^\d*\.?\d*$/)]],
        gender: ['male', Validators.required],
        companyCode:[""],
        dateOfBirth: [new Date().toISOString(), Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MatchValidator("password", "confirmPassword")
      }
    );
  }

  /**
   * register
   * @function onSubmit
   * @param firstName lastName email phoneNumber password
   */
  async onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return
    if(this.isCompanyUser&&!this.registerForm.controls['companyCode'].value) return
    if(!this.isCompanyUser){
      this.registerForm.patchValue({
        companyCode:""
      })
    }
    let date = new Date(addYears(new Date(this.registerForm.controls['dateOfBirth'].value), 10))
    if (compareAsc(date, new Date()) === 1) {
      this.show_alert("choose right date of birth")
      return
    }
    this.authService.register(this.registerForm.value).subscribe(success => {
      if (success) {
        this.router.navigateByUrl('/coachee/info');
        this.isSubmitted=false
      }
    })

  }

  async show_alert(msg) {
    let alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}

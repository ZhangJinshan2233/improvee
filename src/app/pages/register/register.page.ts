import { Component, OnInit,ViewChild,ElementRef} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import { MatchValidator } from "../../_helper/match-validator";
import { Router } from "@angular/router";
import anime from "animejs";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  @ViewChild('registerFormCtrls') registerFormCtrls:ElementRef;
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router:Router) {}

  ngOnInit() {
    this.registerFormCtrls.nativeElement.classList.add('zoomInUp')
    this.createFormGroup();
  }

  createFormGroup() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MatchValidator("password", "confirmPassword")
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return
    this.registerFormCtrls.nativeElement.classList.add('zoomOutRight')
   setTimeout(() => {
     this.router.navigateByUrl('/login')
   }, 500);
    console.log(this.registerForm.value);
  }

  
}

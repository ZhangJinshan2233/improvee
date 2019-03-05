import { Component, OnInit, OnChanges } from "@angular/core";
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
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router:Router) {}

  ngOnInit() {
    this.createFormGroup();
  }
  createFormGroup() {
    this.registerForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MatchValidator("password", "confirmPassword")
      }
    );
  }

  // convenience getter for easy access to form fields
//  ngOnChanges(){
//    this.registerForm.reset({
//     email: "",
//     password: "",
//     confirmPassword: ""
//    })
//  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return
    this.callAnime();
   setTimeout(() => {
     this.router.navigateByUrl('/login')
   }, 1500);
    console.log(this.registerForm.value);
  }

  callAnime() {
    let basicTimeline = anime.timeline({
      
    });
    basicTimeline
      .add({
        targets: 'ion-button[type="submit"]',
        duration: 500,
        opacity:0
      })
      .add({
        targets: ".progress-bar",
        duration: 1000,
        width: '100%',
        easing: "linear"
      })
     

    basicTimeline.play();
  }
}

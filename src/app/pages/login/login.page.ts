import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import anime from "animejs";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  xMax = 16;
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private router:Router) {}

  ngOnInit() {
    this.createLoginForm();
    anime ({
      targets: ['.logo'],
      rotate: 180,
      duration: 1500,
      loop: true,
      elasticity: 600,
      easing: 'easeOutElastic',
      delay: function(el, index) {
        return index * 80;
      },
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      this.callAnime();
    }
  }

  signup(){
    this.router.navigateByUrl('/register')
  }
  callAnime() {
    let shake=anime({
      targets: "form",
      easing: "easeInOutSine",
      duration: 550,
      translateX: [
        {
          value: this.xMax * -1
        },
        {
          value: this.xMax
        },
        {
          value: this.xMax / -2
        },
        {
          value: this.xMax / 2
        },
        {
          value: 0
        }
      ]
    });
  }

}

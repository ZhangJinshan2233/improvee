import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import anime from "animejs";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  xMax = 16;
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createLoginForm();
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
    
    // shake.restart()
  }

}

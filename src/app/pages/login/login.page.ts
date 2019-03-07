import { Component, OnInit ,ViewChild,ElementRef} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import anime from "animejs";
import { Router } from "@angular/router";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

const SHAKE_DISTANCE = 16;
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
@ViewChild('logo') logo:ElementRef
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private nativePageTransitions: NativePageTransitions) { }

  ngOnInit() {
    this.createLoginForm();
    this.logo.nativeElement.classList.add('lightSpeedIn')
  }
  ionViewDidEnter(){
    setTimeout(() => {
     
    }, 500);  
  }
  ionViewWillLeave() {

    /** set transtition when page leave */

    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 1000,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    }

    this.nativePageTransitions.curl(options)
      .then(() => {
        console.log("successed")
      })
      .catch(() => {
        console.log("error")
      });

  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      this.shakeForm();
    } else {
      this.router.navigateByUrl('/slides')
    }
  }

  signup() {
    this.router.navigateByUrl('/register')
  }
  /*
     * make logo rorate
  */
  roateLogo() {
    anime({
      targets: ['.logo'],
      rotate: 180,
      duration: 1500,
      loop: true,
      elasticity: 600,
      easing: 'easeOutElastic',
      delay: function (el, index) {
        return index * 80;
      },
    });
  }

  /*
   * shake form when form has error
  */

  shakeForm() {
    let shake = anime({
      targets: "form",
      easing: "easeInOutSine",
      duration: 550,
      translateX: [
        {
          value: SHAKE_DISTANCE * -1
        },
        {
          value: SHAKE_DISTANCE
        },
        {
          value: SHAKE_DISTANCE / -2
        },
        {
          value: SHAKE_DISTANCE / 2
        },
        {
          value: 0
        }
      ]
    });
  }

}

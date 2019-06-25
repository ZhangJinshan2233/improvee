import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import anime from "animejs";
import { Router } from "@angular/router";
// import {
//   NativePageTransitions,
//   NativeTransitionOptions
// } from '@ionic-native/native-page-transitions/ngx';

import { AuthService } from "../../services/auth.service";
import { User } from 'src/app/model/user';

const SHAKE_DISTANCE = 16;

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user: User
  loginForm: FormGroup;

  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    // private nativePageTransitions: NativePageTransitions,
    private authService: AuthService) { }

  ngOnInit() {
    this.createLoginForm();

  }

  ionViewWillLeave() {

    /** set transtition when page leave */

    // let options: NativeTransitionOptions = {
    //   direction: 'up',
    //   duration: 500,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   fixedPixelsBottom: 60
    // }

    // this.nativePageTransitions.curl(options)
    //   .then(() => {
    //     console.log("successed")
    //   })
    //   .catch(() => {
    //     console.log("error")
    //   });

  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  /**
   * login
   * @function onSubmit
   */
  onSubmit() {

    this.isSubmitted = true;

    if (!this.loginForm.valid) {

      this.shakeForm(); return

    } else {


      this.authService.login(this.loginForm.value).subscribe(res => {

        this.authService.currentUser.subscribe(user => {

          this.loginForm.setValue({ 'email': '', 'password': '' })
          this.isSubmitted = false
          
          if (user != null) {

            if (user.userType === 'freeCoachee' || user.userType === 'premiumCoachee') {
              
              this.router.navigateByUrl('/coachee/info')

            } else if (user.userType === 'coach') {

              this.router.navigateByUrl('/coach')

            } else if (user.userType === 'adminCoach') {

              this.router.navigateByUrl('/adminCoach')
            }
          }

        })
      });
    }
  }

  register() {
    this.router.navigateByUrl('/register')
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

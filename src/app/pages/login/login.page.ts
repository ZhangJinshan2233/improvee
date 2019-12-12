import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from 'src/app/model/user';
import { ModalController } from '@ionic/angular';
import { customModalEnterAnimation } from 'src/app/_helper/customModalEnter';
import { customModalLeaveAnimation } from 'src/app/_helper/customModalLeave';
import { ForgetPasswordPage } from "../forget-password/forget-password.page";

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
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.create_login_form();
  }

  get f() {
    return this.loginForm.controls
  }

  create_login_form() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  /**
   * login
   * @function onSubmit
   * @param email password
   */
  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return
    this.authService.login(this.loginForm.value).subscribe(user => {
      if (user) {
        if (user.firstTimeLogin) {
          this.router.navigateByUrl('/coachee/info')
          this.isSubmitted = false
          this.loginForm.setValue({ 'email': '', 'password': '' })
          return;
        }
        switch (user.userType) {
         
          case 'Coachee':
            this.router.navigateByUrl('/coachee');
            break;
          case 'CommonCoach':
            this.router.navigateByUrl('/coach')
            break;

          case 'AdminCoach':
            this.router.navigateByUrl('/adminCoach')
            break;

          default:
            console.log("No  exists!");
            break;
        }
      }

    });

  }

  goto_register_page() {

    this.router.navigateByUrl('/register')
  }

  async create_forget_password_modal() {

    let forgetPasswordModal = await this.modalCtrl.create({
      component: ForgetPasswordPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
    })

    await forgetPasswordModal.present()
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { CameraOptionsSetting } from "../../../_helper/cameraOptionsSetting";
import { Camera } from "@ionic-native/Camera/ngx"
import { AlertController, LoadingController } from '@ionic/angular';
import { CoachService } from '../../../services/coach.service'
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.page.html',
  styleUrls: ['./coach-profile.page.scss'],
})
export class CoachProfilePage implements OnInit {
  nameForm: FormGroup;
  isNameFormShow = false;
  enrolledNumber = 0;
  expiredNumber = 0
  isAdmin = false
  coach = {}
  coachProfile = "";
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private actionSheet: ActionSheet,
    private camera: Camera,
    private coachService: CoachService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.auth.get_user_profile().subscribe(res => {
      this.coach = res['currentUser']
      if (this.coach['imgData']) {
        this.coachProfile = `data:image/jpeg;base64,${this.coach['imgData']}`
      } else {
        this.coachProfile = "/assets/img/noavatar.png"
      }
    })
    this.coachService.get_enrolled_and_expired_members().subscribe(res => {
      console.log(res)
      this.enrolledNumber = res['enrolledNumber']
      this.expiredNumber = res['expiredNumber']
    })
    this.createFormGroup();
  }

  cancle() {
    this.isNameFormShow = !this.isNameFormShow
  }
  /**
   * 
   */
  togglerNameForm() {
    this.isNameFormShow = !this.isNameFormShow
    if (this.isNameFormShow) {
      this.nameForm.patchValue({
        firstName: this.coach['firstName'],
        lastName: this.coach['lastName']
      })
    }
  }

  /**
   * 
   */
  createFormGroup() {
    this.nameForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    })
  }

  /**
   * 
   */
  submitNameForm() {
    this.isNameFormShow = !this.isNameFormShow
    this.auth.updateProfile(this.nameForm.value).subscribe(res => {
      if (res) {
        this.auth.get_user_profile().subscribe(res => {
          this.coach = res['currentUser']
        })
      }
    })
  }

  logout() {
    this.auth.logout()
    this.router.navigateByUrl('/')
  }

  /**
   * 
   */
  update_profileImage() {
    let buttonLabels = ['Take picture', 'Select picture'];
    const options: ActionSheetOptions = {
      title: 'Profile picture',
      buttonLabels: buttonLabels,
      addCancelButtonWithLabel: 'Cancel',
      destructiveButtonLast: true
    }
    this.actionSheet.show(options).then((buttonIndex: number) => {
      let isCamera = false
      if (buttonIndex === 1) {
        isCamera = true;
        this.get_picture(isCamera)
      } else if (buttonIndex === 2) {
        isCamera = false;
        this.get_picture(isCamera)
      } else {
        return
      }
    });
  }


  /**
 * @function getPicture
 * @param {isCamera }:Boolbean
 * @returns Observable
 */
  async get_picture(isCamera) {
    let caremaOptions = CameraOptionsSetting(isCamera, this.camera)
    try {
      let imgData = await this.camera.getPicture(caremaOptions);
      let imageSizeInByte = 4 * Math.ceil((imgData.length) / 3) * 0.5624896334383812;
      if (imageSizeInByte / (1024 * 1024) >= 8)
        this.showAlert("the size of image is too big")
      let loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'crescent',
      })
      await loading.present()
      this.auth.updateProfile({ imgData: imgData }).subscribe(res => {
        this.auth.get_user_profile().subscribe(res => {
          this.loadingCtrl.dismiss()
          this.coach = res['currentUser']
          this.coachProfile = `data:image/jpeg;base64,${this.coach['imgData']}`
        })
      })
    } catch (err) {
      return
    }
  }



  /**
   * @function showAlert
   * @param msg 
   * @returns void
   */
  showAlert(msg) {
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }


}

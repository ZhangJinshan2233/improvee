import { Component, OnInit } from '@angular/core';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { CameraOptionsSetting } from "../../../_helper/cameraOptionsSetting";
import { Camera } from "@ionic-native/Camera/ngx"
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from "../../../services/auth.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Router } from '@angular/router';
import { CategoryService } from "../../../services/category.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  currentUser = {};
  coacheeProfile = '';
  isImageLoaded = false;
  appUrlAddress = "";
  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private actionSheet: ActionSheet,
    private camera: Camera,
    private platform: Platform,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
    private emailComposer: EmailComposer,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit() {
    this.categoryService.get_challenge_categories("AppCategory").subscribe(res => {
      let UrlAddress = []
      if (this.platform.is('android')) {
        UrlAddress = res['categories'].filter(item => {
          return item.name = "android"
        })
      } else {
        UrlAddress = res['categories'].filter(item => {
          return item.name = "ios"
        })
      }
     this.appUrlAddress=UrlAddress[0].storeUrl
      console.log( this.appUrlAddress)
    })
  }
  ionViewWillEnter() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'flex';
    this.authService.get_user_profile().subscribe(res => {
      this.currentUser = res['currentUser'];
      this.isImageLoaded = true
      if (this.currentUser['imgData']) {
        this.coacheeProfile = `data:image/jpeg;base64,${this.currentUser['imgData']}`
      } else {
        this.coacheeProfile = "/assets/img/noavatar.png"
      }
    })
  }

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
      this.authService.updateProfile({ imgData: imgData }).subscribe(res => {
        this.authService.get_user_profile().subscribe(res => {
          this.loadingCtrl.dismiss()
          this.currentUser = res['currentUser']
          this.coacheeProfile = `data:image/jpeg;base64,${this.currentUser['imgData']}`
        })
      })
    } catch (err) {
      return
    }
  }

  rate_app() {
    const browser = this.iab.create(this.appUrlAddress);
  }
  send_email() {
    let email = {
      to: 'support@uphealth.sg',
      subject: 'Feedback',
      isHtml: true
    }
    // Send a text message using default options
    this.emailComposer.open(email);
  }

  log_out() {

    this.authService.logout()
    this.router.navigateByUrl('/')
  }
  /**
   * @function showAlert
   * @param msg 
   * @returns void
   */
  async showAlert(msg) {
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

}

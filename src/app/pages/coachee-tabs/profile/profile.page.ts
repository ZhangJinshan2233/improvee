import { Component, OnInit } from '@angular/core';
import { MenuService } from "../../../services/menu.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from "../../../services/auth.service";
import { Router } from '@angular/router';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { CameraOptionsSetting } from "../../../_helper/cameraOptionsSetting";
import { Camera } from "@ionic-native/Camera/ngx"
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  nameForm: FormGroup;
  isNameFormSubmitted = false;
  isNameFormShow = false;
  profileImage = {
    imgType: 'image/jpeg',
    data: ''
  }
  currentUser: {}
  constructor(private menuService: MenuService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private actionSheet: ActionSheet,
    private camera: Camera,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    this.menuService.getUserInfo().subscribe(res => {
      this.currentUser = res['currentUser']
      this.createNameForm();
    })
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none'
  }

  createNameForm() {
    this.nameForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  togglerNameForm() {
    this.isNameFormShow = !this.isNameFormShow
    if (this.isNameFormShow)
      this.nameForm.setValue({ 'firstName': this.currentUser['firstName'], 'lastName': this.currentUser['lastName'] })
  }

  submitNameForm() {
    this.isNameFormSubmitted = true
    this.auth.updateProfile(this.nameForm.value).subscribe(res => {
      this.menuService.getUserInfo().subscribe(res => {
        this.currentUser['firstName'] = res['currentUser']['firstName'];
        this.currentUser['lastName'] = res['currentUser']['lastName']
      })
      this.isNameFormShow = !this.isNameFormShow
    })
  }

  cancle() {
    this.isNameFormShow = !this.isNameFormShow
  }

  logout() {
    this.auth.logout()
    this.router.navigateByUrl('/')
  }

  updateProfileImage() {
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
        this.getPicture(isCamera)
      } else if(buttonIndex===2){
        isCamera = false;
        this.getPicture(isCamera)
      }else{
        return
      }
    });
  }

  async getPicture(isCamera) {

    let caremaOptions = CameraOptionsSetting(isCamera, this.camera)

    try {
      this.profileImage.data = await this.camera.getPicture(caremaOptions);
      let imageSizeInByte = 4 * Math.ceil((this.profileImage.data.length) / 3) * 0.5624896334383812;
      if (imageSizeInByte / (1024 * 1024) >= 8){
        this.showAlert("the size of image is too big")
      }else{
        this.auth.updateProfile(this.profileImage).subscribe(res=>{
          this.menuService.getUserInfo().subscribe(res=>{
            this.currentUser['profileImage'] = res['currentUser']['profileImage']
          })
        })
      }
      

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ActionSheet, ActionSheetOptions} from '@ionic-native/action-sheet/ngx';
import { CameraOptionsSetting } from "../../../_helper/cameraOptionsSetting";
import { Camera } from "@ionic-native/Camera/ngx"
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.page.html',
  styleUrls: ['./coach-profile.page.scss'],
})
export class CoachProfilePage implements OnInit {
  coachProfile = '/assets/img/coach-profile.jpeg'
  nameForm: FormGroup;
  isNameFormSubmitted = false;
  isNameFormShow = false;
  profileImage = {
    imgType: 'image/jpeg',
    data: ''
  }
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private actionSheet: ActionSheet,
    private camera: Camera,
    private alertCtrl: AlertController
    ) { }
  ngOnInit() {
    this.createFormGroup()
  }
  cancle() {
    this.isNameFormShow = !this.isNameFormShow
  }
  togglerNameForm() {
    this.isNameFormShow = !this.isNameFormShow
    if (this.isNameFormShow)
      this.nameForm.setValue({ 'firstName': 'Ruby', 'lastName': 'Teo' })
  }

  createFormGroup() {

    this.nameForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    })
  }

  submitNameForm() {
    this.isNameFormSubmitted = true
    this.isNameFormShow = !this.isNameFormShow
  }

  logout(){
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

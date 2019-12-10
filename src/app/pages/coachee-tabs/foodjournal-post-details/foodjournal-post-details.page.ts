import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { Camera } from '@ionic-native/Camera/ngx';
import { CameraOptionsSetting } from '../../../_helper/cameraOptionsSetting';
import { customAlertEnter } from '../../../_helper/customAlertEnter';
import { ChallengeService } from "../../../services/challenge.service";

@Component({
  selector: 'app-foodjournal-post-details',
  templateUrl: './foodjournal-post-details.page.html',
  styleUrls: ['./foodjournal-post-details.page.scss'],
})
export class FoodjournalPostDetailsPage implements OnInit {
  isSubmitted=false
  foodJournalForm: FormGroup;
  isCamera: boolean;
  challengeId:string;
  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private alertController: AlertController,
    private navParams:NavParams,
    private challengeService:ChallengeService) { }

  ngOnInit() {
    this.create_foodjournal_post_form();
    this.challengeId=this.navParams.get('challengeId')
  }

  create_foodjournal_post_form() {
    this.foodJournalForm = this.formBuilder.group({
      mealCategory: ['breakfast'],
      description: [],
      createDate: [new Date().toISOString()],
      imgType: ['image/jpeg'],
      imgData: ['',Validators.required],
    }) 
  }

  get f() {
    return this.foodJournalForm.controls
  }

  colse_modal() {
    this.modalCtrl.dismiss()
  }
  select_picture() {
    this.isCamera = false;
    this.get_picture(this.isCamera)
  }

  take_picture() {
    this.isCamera = true;
    this.get_picture(this.isCamera)
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
      this.foodJournalForm.patchValue({
        imgData: imgData
      })
      let imageSizeInByte = 4 * Math.ceil((imgData.length) / 3) * 0.5624896334383812;
      if (imageSizeInByte / (1024 * 1024) >= 8)
        this.showAlert("the size of image is too big")
    } catch (err) {
      return
    }
  }
/**
 * 
 */
  submit_foodJournalForm() {
    this.isSubmitted=true
    if(this.foodJournalForm.invalid) return
    
    this.challengeService.create_foodjournal_post(this.challengeId,this.foodJournalForm.value).subscribe(res=>{
     
      this.modalCtrl.dismiss({
       newPost:res['newPost']
     })
    })
  }

  /**
  * @function showAlert
  * @param msg 
  * @returns void
  */
  async showAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
      enterAnimation: customAlertEnter
    });
    alert.present()
  }
}

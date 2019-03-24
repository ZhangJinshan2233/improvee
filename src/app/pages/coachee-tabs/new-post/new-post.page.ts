import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { TimmelineService } from "../../../services/timmeline.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  newPost = {
    description: '',
    imgData: ''
  }
  constructor(private camera: Camera,
    private timelineService: TimmelineService,
    private router:Router,
    private alertController:AlertController
  ) { }

  isCamera: boolean;

  ngOnInit() {
    this.selectPicture()
  }

  selectPicture() {
    this.isCamera = false;
    this.getPicture(this.isCamera)
  }

  takePicture() {
    this.isCamera = true;
    this.getPicture(this.isCamera)
  }

  async getPicture(isCamera) {

    let sourceType = this.camera.PictureSourceType.CAMERA;

    if (!isCamera)

      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;

    const caremaOptions: CameraOptions = {
      quality: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetHeight:2000,
      targetWidth:2000,
      destinationType: this.camera.DestinationType.DATA_URL,//
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourceType,
      mediaType: this.camera.MediaType.PICTURE

    }
    
    try {
      this.newPost.imgData = await this.camera.getPicture(caremaOptions);
      let imageSizeInByte =4*Math.ceil((this.newPost.imgData.length)/3)* 0.5624896334383812;
      if(imageSizeInByte/(1024*1024)>=8)
      this.showAlert("the size of image is too big")
      
    } catch (err) {
      return
    }


  }

  cancel() {
    this.newPost = {
      description: '',
      imgData: ''
    }
  }
  createNewPost(newPost) {
    
    this.timelineService.createNewPost(newPost).subscribe(res=>{
      this.router.navigateByUrl('/coachee/timeline')
    })
    
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}

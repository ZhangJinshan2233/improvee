import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild('content')
  content: ElementRef;
  imgbase64: any
  constructor(private camera: Camera) { }

  ngOnInit() {

  }

  openCam() {

    const options: CameraOptions = {
      quality: 80,
      targetWidth: 2500,
      targetHeight: 2000,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,//FILE_URL
      encodingType: this.camera.EncodingType.JPEG,
      sourceType:this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgbase64 = imageData;
    }, (err) => {
      // Handle error
      alert("error " + JSON.stringify(err))
    });

  }

}


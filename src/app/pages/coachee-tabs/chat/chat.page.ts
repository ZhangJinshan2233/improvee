import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonContent, AlertController, IonGrid, IonList } from '@ionic/angular';
import { ChatService } from "../../../services/chat.service";
import { Camera } from '@ionic-native/Camera/ngx';
import { CameraOptionsSetting } from '../../../_helper/cameraOptionsSetting';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) messagesContent: IonContent;
  @ViewChild(IonGrid, { read: ElementRef }) grid: ElementRef;
  mutationObserver: MutationObserver
  currentUser = 'simon';
  newMsg: any;
  imgData: any;
  isCamera: boolean;
  opoenCarema = false;
  messages = []
  constructor(private chatService: ChatService,
    private camera: Camera,
    private alertController: AlertController, ) { }

  ionViewDidEnter() {
    setTimeout(() => {
      this.messagesContent.scrollToBottom(0);
    },400);
    this.mutationObserver = new MutationObserver((mutations) => {
      setTimeout(() => {
        this.messagesContent.scrollToBottom(0);
      },400);
    });

    if (this.messages.length >= 1) {
      this.mutationObserver.observe(this.grid.nativeElement, {
        childList: true,
        subtree: true
      });
    }
  }

  ngOnInit() {
    this.messages = this.chatService.getAllMessages()
  }


  selectPicture() {
    this.isCamera = false;
    this.getPicture(this.isCamera)
  }

  takePicture() {
    this.isCamera = true;
    this.getPicture(this.isCamera)
  }
  sendMessage() {
    this.messages.push({
      user: 'simon',
      isImage: false,
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';
  }
  sendImage() {
    this.opoenCarema = !this.opoenCarema
  }
  /**
  * @function getPicture
  * @param {isCamera }:Boolbean
  * @returns Observable
  */
  async getPicture(isCamera) {
    let caremaOptions = CameraOptionsSetting(isCamera, this.camera)
    try {
      this.imgData = await this.camera.getPicture(caremaOptions);
      let imageSizeInByte = 4 * Math.ceil((this.imgData.length) / 3) * 0.5624896334383812;
      if (imageSizeInByte / (1024 * 1024) >= 8) this.showAlert("the size of image is too big")
      this.uploadImage(this.imgData);
      setTimeout(() => {
        this.messagesContent.scrollToBottom(0);
      },400);
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
    let alert = this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  uploadImage(imgData) {
    this.messages.push({
      user: 'simon',
      isImage: true,
      createdAt: new Date().getTime(),
      imgData: imgData
    });
    this.imgData = ''
  }
}

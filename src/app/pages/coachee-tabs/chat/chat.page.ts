import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, AlertController, PopoverController, LoadingController, IonRefresher } from '@ionic/angular';
import { ChatService } from "../../../services/chat.service";
import { Camera } from '@ionic-native/Camera/ngx';
import { CameraOptionsSetting } from '../../../_helper/cameraOptionsSetting';
import { AttachmentPopoverPage } from "../../share/attachment-popover/attachment-popover.page";
import { AuthService } from '../../../services/auth.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: true }) messagesContent: IonContent;
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher
  mutationObserver: MutationObserver;
  coachProfile = ""
  currentUser: any
  newMsg = "";
  isCamera: boolean;
  opoenCarema = false;
  messages = []
  chatRoom: any;
  isCoachee = false;
  skipNum = 0;
  isImageLoaded = false
  canSendMessage: boolean = true;
  constructor(private chatService: ChatService,
    private camera: Camera,
    private authSertvice: AuthService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private popContrl: PopoverController,
  ) {
  }
  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
    this.chatService.refresh_message().subscribe(message => {
      this.messages.push(message);
      this.skipNum += 1;
      this.messagesContent.scrollToBottom()
    })
    this.authSertvice.get_user_profile().subscribe(res => {
      this.currentUser = res['currentUser'];
      this.isImageLoaded = true
      if (this.currentUser._coach.imgData) {
        this.coachProfile = `data:image/jpeg;base64,${this.currentUser._coach.imgData}`
      } else {
        this.coachProfile = 'http://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/88884/145502_842983.png'
      }
      if (!this.currentUser.isMember) {
        this.canSendMessage = false
      }
      this.chatService.goto_chat_room(this.currentUser._id).subscribe(res => {
        this.chatRoom = res['chatRoom'];
        this.chatService.join_chat_room(this.chatRoom._id)
        this.first_loading_messages(this.chatRoom._id)
      })
    })
  }
  /**
   * 
   * @param chat Room Id 
   */
  async first_loading_messages(chatRoomId) {
    let first_loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await first_loading.present();
    this.chatService.get_messages_pagination(chatRoomId, 0).subscribe(res => {
      let messagesArrayLength = res['messages'].length
      if (messagesArrayLength > 0)
        this.skipNum += messagesArrayLength;
      this.messages = res['messages']
      this.messagesContent.scrollToBottom()
      first_loading.dismiss()
    })
  }

  /**
   * 
   * @param $refreshEvent 
   */
  load_more_messages($refreshEvent) {
    this.chatService.get_messages_pagination(this.chatRoom._id, this.skipNum).subscribe(res => {
      if (res['messages'].length >= 1) {
        this.skipNum += res['messages'].length
        this.messages = res['messages'].concat(this.messages)
        $refreshEvent.target.complete();
      } else {
        $refreshEvent.target.complete();
        this.refresher.disabled = true
      }
    })
  }
  select_picture() {
    this.isCamera = false;
    this.send_image(this.isCamera)
  }

  take_picture() {
    this.isCamera = true;
    this.send_image(this.isCamera)
  }

  send_text_message() {
    this.send_message(false)
  }
  /**
   * 
   * @param isImage 
   */
  send_message(isImage) {
    let messageInfo = {
      chatRoomId: this.chatRoom._id,
      name: this.currentUser.firstName + " " + this.currentUser.lastName,
      isImage: isImage,
      recipientId: this.currentUser._coach._id,
      content: this.newMsg,
      author: this.currentUser._id,
      authorModel: 'Coachee',
      createdAt: new Date()
    }
    this.chatService.send_message(messageInfo);
    this.messages.push({
      author: messageInfo.author,
      name: messageInfo.name,
      isImage: isImage,
      content: messageInfo.content,
      createdAt: messageInfo.createdAt
    })
    this.skipNum += 1;
    this.messagesContent.scrollToBottom()
    this.newMsg = '';
    this.chatService.create_new_message({
      chatRoomId: messageInfo.chatRoomId,
      isImage: isImage,
      content: messageInfo.content,
      author: messageInfo.author,
      authorModel: messageInfo.authorModel
    }).subscribe(res => {
    })
  }
  /**
  * @function send picture
  * @param {isCamera }:Boolbean
  * @returns Observable
  */
  async send_image(isCamera) {
    let caremaOptions = CameraOptionsSetting(isCamera, this.camera)
    try {
      this.newMsg = await this.camera.getPicture(caremaOptions);
      let imageSizeInByte = 4 * Math.ceil((this.newMsg.length) / 3) * 0.5624896334383812;
      if (imageSizeInByte / (1024 * 1024) >= 8) this.showAlert("the size of image is too big")
      this.send_message(true);
      setTimeout(() => {
        this.messagesContent.scrollToBottom(0);
      }, 400);
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

  async send_attachement(event) {
    let popover = await this.popContrl.create({
      component: AttachmentPopoverPage,
      translucent: true,
      event: event,
      cssClass: 'custom-popover'
    })
    await popover.present();
    let { data } = await popover.onWillDismiss()
    if (data) {
      if (data.method === "gallery") {
        this.select_picture()
      }

      if (data.method === "carema") {
        this.take_picture()
      }
    }

  }
  /**
   * 
   */
  ngOnDestroy() {
    this.chatService.leave_chat_room(this.chatRoom._id)
  }
}

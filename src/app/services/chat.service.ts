import { Injectable } from '@angular/core';
import { mapTo, catchError, tap, merge, map, } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

export class ChatService {
  loading: any
  userId:any
  url = `${environment.url}/api`;
  constructor(private socket: Socket,
    private http: HttpClient,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
  ) {
    this.socket.connect()
  }

  goto_chat_room(roomName) {
    this.show_loading()
    return this.http.get(`${this.url}/chat/rooms/${roomName}`).pipe(
      tap(()=>{
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        this.loading.then(loading => {
          loading.dismiss()
        })
        let error = e.error.message;
        throw error;
      })
    )
  }

  close() {
    this.socket.disconnect()
  }

  join_chat_room(chatRoom) {
    this.socket.emit('enter chatRoom', chatRoom)
  };

  leave_chat_room(chatRoom) {
    this.socket.emit('leave chatRoom', chatRoom)
  }

  send_message(messageInfo) {
    this.socket.emit('new message',messageInfo)
  }

  refresh_message() {
    return this.socket.fromEvent('refresh message')
  }

  create_new_message(message){
    return this.http.post(`${this.url}/chat/messages`,message).pipe(
      mapTo(true),
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }
  
  get_messages_pagination(chatRoomId,skipNum){
    return this.http.get(`${this.url}/chat/messages/${chatRoomId}/?skipNum=${skipNum}`).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
   } 
   remove_unread_messages(author,type="message") {
    return this.http.delete(`${this.url}/unreadNotifications/?author=${author}&type=${type}`).pipe(
      mapTo(true),
      catchError(e => {
        let error = e.error;
        if (!e.error) {
          this.show_alert("internet error")
          throw error;
        }
        this.show_alert(e.error);
        throw error;
      })
    )
  }

  async show_alert(msg) {
    let alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  show_loading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
    })
    this.loading.then(loading => {
      loading.present()
    })
  }
}

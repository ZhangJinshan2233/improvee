import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
private  messages = [
    {
      user: 'simon',
      createdAt: 1554090856000,
      isImage:false,
      msg: 'Hey whats up mate?',
      imgData:""
    },
    {
      user: 'max',
      createdAt: 1554090956000,
      isImage:false,
      msg: 'Working on the Ionic mission, you?',
      imgData:""
    },
    {
      user: 'simon',
      createdAt: 1554091056000,
      isImage:false,
      msg: 'Doing some new tutorial stuff',
      imgData:""
    }
  ];
  constructor() { }
  getAllMessages(){
    return this.messages
  }
}

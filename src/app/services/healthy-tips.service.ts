import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HealthyTipsService {

  private healthyTips=[
    {
      title:'sleep',
      abstract:'You know exercise isn\'t about perfact abs,but moving more might be key to feeling good.',
      imgUrl:'../../assets/img/image2.jpg',
      url:"https://ionicframework.com/docs/native/in-app-browser"
    }
  ]
  
  constructor() { }
  getAllTips(){
    return this.healthyTips
  }
}

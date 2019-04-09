import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  constructor() { }

  ngOnInit() {
    let tabBar=document.querySelector('ion-tab-bar');
    tabBar.style.display='none'
  }
 

}

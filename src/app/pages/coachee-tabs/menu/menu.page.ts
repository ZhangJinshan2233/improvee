import { Component, OnInit } from '@angular/core';
import { MenuService } from "../../../services/menu.service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  currentUser={}
  noavatar='/assets/img/noavatar.png'
  constructor(private menuService: MenuService) { 
   
  }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    let tabBar=document.querySelector('ion-tab-bar');
    tabBar.style.display='flex';
    this.menuService.getUserInfo().subscribe(res => {
      this.currentUser = res['currentUser']
    })
  }
}

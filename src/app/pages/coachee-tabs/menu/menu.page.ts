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
    this.menuService.getUserInfo().subscribe(res => {
      this.currentUser = res['currentUser']
    })
  }

  ngOnInit() {
   
  }

}

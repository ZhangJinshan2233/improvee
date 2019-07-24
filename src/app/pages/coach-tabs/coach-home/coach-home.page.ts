import { Component, OnInit } from '@angular/core';
import { CoachService } from "../../../services/coach.service";
@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.page.html',
  styleUrls: ['./coach-home.page.scss'],
})
export class CoachHomePage implements OnInit {

  coachees = []
  unreadMessages = 5;
  searchTerm = "";
  searching = false;
  filtedTerm=""
  customAlertOptions: any = {
    header: 'Filter'
  };
  constructor(private coachHomeService: CoachService) { }

  ngOnInit() {
    this.coachees = this.coachHomeService.getAllUsers()
  }

  ionViewWillEnter(){
    let tabBar=document.querySelector('ion-tab-bar');
    tabBar.style.display='flex'
  }
  ionViewDidLoad() {
    this.filterItems()
  }
  onSearchInput() {
    this.searching = true
  }

  filterItems() {
    this.searching = false
    this.coachees = this.coachHomeService.filterItems(this.searchTerm)
    this.coachees.sort((item1, item2) => {
      return item1[this.filtedTerm] - item2[this.filtedTerm]
    })
  }

  filterByOption(event) {
    this.filtedTerm = event.target.value
    this.coachees.sort((item1, item2) => {
      return item1[this.filtedTerm ] - item2[this.filtedTerm]
    })
  }

}


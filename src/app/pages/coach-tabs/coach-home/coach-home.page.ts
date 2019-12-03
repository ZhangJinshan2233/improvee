import { Component, OnInit, ViewChild } from '@angular/core';
import { CoachService } from "../../../services/coach.service";
import { compareAsc } from 'date-fns'
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.page.html',
  styleUrls: ['./coach-home.page.scss'],
})
export class CoachHomePage implements OnInit {
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher
  coachProfile = ""
  isImageLoaded = false
  coachees = []
  currentUser: any
  unreadMessages = 5;
  searchTerm = "";
  searching = false;
  skipNum = 0;
  filtedTerm = "";
  allCoachees = [];
  customAlertOptions: any = {
    header: 'Filter'
  };
  constructor(private coachService: CoachService) { }

  ngOnInit() {
    this.coachService.initialize_data().subscribe(res => {
      this.currentUser = res[0]['currentUser'];
      if (this.currentUser.imgData) {
        this.coachProfile = `data:image/jpeg;base64,${this.currentUser.imgData}`
      } else {
        this.coachProfile = "/assets/img/noavatar.png"
      }
      this.isImageLoaded = true
      this.coachees = res[1]['coachees']
      this.skipNum += res[1]['coachees'].length
      this.allCoachees = res[1]['coachees']
    })
  }

  /**
   * 
   * @param infiniteScrollEvent 
   */
  load_more_coachees(infiniteScrollEvent) {
    this.coachService.get_coachees(this.skipNum).subscribe(res => {
      if (res['coachees'].length >= 1) {
        this.skipNum += res['coachees'].length
        this.allCoachees = this.allCoachees.concat(res['coachees'])
        this.coachees = this.coachees.concat(res['coachees'])
        infiniteScrollEvent.target.complete();
      } else {
        infiniteScrollEvent.target.disabled = true;
      }
    })
  }

  ionViewWillEnter() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'flex'
  }

  ionViewDidLoad() {
    this.filterItems()
  }

  onSearchInput() {
    this.searching = true
  }

  /**
   * filter items
   */
  filterItems() {
    this.searching = false
    if (this.searchTerm === "") {
      this.coachees = this.allCoachees
    }
    this.coachees = this.allCoachees.filter((item) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
  }

  /**
   * 
   * @param event 
   */
  filterByOption(event) {
    this.filtedTerm = event.target.value
    console.log(this.filtedTerm)
    this.coachees.sort((item1, item2) => {
      if (this.filtedTerm === 'unreadMessageEarliestDate' || this.filtedTerm === 'unreadPostEarliestDate') {
        return compareAsc(new Date(item1[this.filtedTerm]), new Date(item2[this.filtedTerm]))
      } else {
        return item1[this.filtedTerm] - item2[this.filtedTerm]
      }
    })
  }

  /**
   * refresh
   */
  refresh_coachees(refreshEvent) {
    this.coachees = [];
    this.skipNum = 0;
    this.allCoachees = [];
    this.searchTerm = "";
    this.searching = false;
    this.coachService.get_coachees(this.skipNum).subscribe(res => {
      if (res['coachees'].length >= 1) {
        this.skipNum += res['coachees'].length
        this.allCoachees = this.allCoachees.concat(res['coachees'])
        this.coachees = this.coachees.concat(res['coachees'])
        refreshEvent.target.complete();;
        this.coachees.sort((item1, item2) => {
          if (this.filtedTerm === 'unreadMessageEarliestDate' || this.filtedTerm === 'unreadPostEarliestDate') {
            return compareAsc(new Date(item1[this.filtedTerm]), new Date(item2[this.filtedTerm]))
          } else {
            return item1[this.filtedTerm] - item2[this.filtedTerm]
          }
        })
      } else {
        refreshEvent.target.complete();
        this.refresher.disabled = true
      }
    })
  }
}


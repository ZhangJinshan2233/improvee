import { Component, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeService } from "../../../services/challenge.service";
import { HealthyTipsService } from "../../../services/healthy-tips.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CoacheeService } from "../../../services/coachee.service";
import * as _ from "lodash";
import { HabitlistRecordService } from '../../../services/habitlist-record.service'
import {
  format
} from 'date-fns';
@Component({
  selector: 'app-coachee-home',
  templateUrl: './coachee-home.page.html',
  styleUrls: ['./coachee-home.page.scss'],
})
export class CoacheeHomePage implements OnInit {
  coachProfile = ""
  unReadMessageNumber: number;
  //get from challenges collections, result may be empty 
  ionViewWillEnter() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'flex';
  }
  //get from habits collections-undefined or number
  todayCompoletedHabitList: number = 2;
  completedHabitPercent: any;
  //get from records collections
  currentUser: any
  skipNum = 0;
  healthyTips = []
  activeChallenges = []
  constructor(private router: Router, private render: Renderer2,
    private challengeService: ChallengeService,
    private tipsService: HealthyTipsService,
    private coacheeService: CoacheeService,
    private habitrecordService: HabitlistRecordService,
    private iab: InAppBrowser) {
  }

  ngOnInit() {
    this.coacheeService.initialize_data().subscribe(res => {
      this.currentUser = res[0]['currentUser'];
      if (this.currentUser._coach.imgData) {
        this.coachProfile = `data:image/jpeg;base64,${this.currentUser._coach.imgData}`
      } else {
        this.coachProfile = 'http://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/88884/145502_842983.png'
      }
      if (res[1]['habitsOfScheduleDay']) {
        let todayHabitlist = res[1]['habitsOfScheduleDay'].habits;
        let todayCompoletedHabitList = _.filter(todayHabitlist, (item) => {
          return item.status
        })
        this.completedHabitPercent = (100 * todayCompoletedHabitList.length) / todayHabitlist.length
      } else {
        this.completedHabitPercent = 0;
      }
      this.activeChallenges = res[2]['activeChallenges'];
      this.healthyTips = res[3]['healthyTips']
      this.skipNum += res[3]['healthyTips'].length
      this.coacheeService.get_unread_messages(this.currentUser._coach._id).subscribe(res => {
        this.unReadMessageNumber = res['unreadNotifications'].length
      })
    })
    this.challengeService.newChallengeSubject.subscribe(res => {
      if (res) {
        this.activeChallenges.push(res)
      }
    })

    this.habitrecordService.updateHabitlistObservable.subscribe(res => {
      console.log(res)
      if (res) {
        this.habitrecordService.get_habitlist_record_by_date(format(new Date(), 'MM/DD/YYYY')).subscribe(res => {
          let todayHabitlist = res['habitsOfScheduleDay'].habits;
          let todayCompoletedHabitList = _.filter(todayHabitlist, (item) => {
            return item.status
          })
          if (!todayHabitlist) {
            this.completedHabitPercent = 0;
          } else {
            this.completedHabitPercent = (100 * todayCompoletedHabitList.length) / todayHabitlist.length
          }
        })
      }
    })
  }



  goto_challenge_detail(activeChallengeId) {
    this.router.navigateByUrl(`coachee/coachee-home/activeChallenges/${activeChallengeId}`)
  }

  load_more_healthyTips(infiniteScrollEvent) {
    this.tipsService.get_healthyTips_pagination(this.skipNum).subscribe(res => {
      if (res['healthyTips'].length >= 1) {
        this.skipNum += res['healthyTips'].length
        this.healthyTips = this.healthyTips.concat(res['healthyTips'])
        infiniteScrollEvent.target.complete();
      } else {
        infiniteScrollEvent.target.disabled = true;
      }
    })
  }

  goto_healthy_tip(url) {
    console.log(url)
    const browser = this.iab.create(url);
  }

  goto_chat() {
    this.coacheeService.remove_unread_nmessages(this.currentUser._coach._id).subscribe(res => {
      this.unReadMessageNumber = 0;
      this.router.navigateByUrl(`coachee/coachee-home/chat/${this.currentUser._id}`)
    })

  }
}

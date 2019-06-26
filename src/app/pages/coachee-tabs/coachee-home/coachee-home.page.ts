import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeService } from "../../../services/challenge.service";
import { HealthyTipsService } from "../../../services/healthy-tips.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-coachee-home',
  templateUrl: './coachee-home.page.html',
  styleUrls: ['./coachee-home.page.scss'],
})
export class CoacheeHomePage implements OnInit {
  breakfast = true;
  lunch = false;
  dinner: false;
  noReadMessageNumber:number;
  //get from challenges collections, result may be empty 
  ionViewWillEnter() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'flex';
  }
  //get from habits collections-undefined or number
  todayCompoletedHabitList: number = 2;
  totalHabitList = 6
  completedHabitPercent: any;
  //get from records collections
  weight = 60;
  BMI = 25

  healthyTips = [];
  activeChallenges = []
  constructor(private router: Router, private render: Renderer2,
     private challengeService: ChallengeService,
     private tipsService:HealthyTipsService,
     private iab:InAppBrowser) {
    this.completedHabitPercent = (100 * this.todayCompoletedHabitList / this.totalHabitList)
  }

  ngOnInit() {
    this.noReadMessageNumber=2
    this.activeChallenges = this.challengeService.getActiveChallenges();
    this.healthyTips=this.tipsService.getAllTips()
  }
  ionViewDidEnter() {
   
  }
  gotoChallenges() {
    this.router.navigateByUrl('/coachee/challenges')
  }

  gotoRecords() {
    this.router.navigateByUrl('/tabs/tab3')
  }
  async gotoActiveChallenge(title:string){
    let activeChallenge=await this.challengeService.findActiveChallenge(title)
    if(activeChallenge.title=='food journal'){
      this.router.navigateByUrl(`coachee/coachee-home/activeChallenges/${activeChallenge.title}`)
    }
   }
   gotoHealthyTip(url){
    const browser = this.iab.create(url);
   }

   gotoChatPage(){
     this.noReadMessageNumber=0;
     this.router.navigateByUrl('/chat')
   }
}

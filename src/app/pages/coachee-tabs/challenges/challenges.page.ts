import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ChallengeService}from '../../../services/challenge.service'
@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
})
export class ChallengesPage implements OnInit {

  allChallenges = [];
  activeChallenges = [];
  constructor(
    private challengeService:ChallengeService,
     private router: Router) { }

  ngOnInit() {
    this.challengeService.get_categories_and_active_categories().subscribe(res=>{
      this.allChallenges = res[1]['categories'];
      this.activeChallenges=res[0]['activeChallenges']
    })
    this.challengeService.newChallengeSubject.subscribe(res=>{
      if(res){
       this.activeChallenges.push(res)
      }
    })
  }
  ionViewWillEnter() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'flex';
   
  }

  goto_challenge_detail(activeChallengeId){
    this.router.navigateByUrl(`coachee/challenges/activeChallenges/${activeChallengeId}`)
  }
  logRatingChange($event) {

  }
}

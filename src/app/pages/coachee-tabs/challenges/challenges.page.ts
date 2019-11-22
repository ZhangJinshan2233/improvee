import { Component, OnInit } from '@angular/core';
import { ChallengeCategoryService } from 'src/app/services/challenge-category.service';
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
  constructor(private categoryService: ChallengeCategoryService,
    private challengeService:ChallengeService,
     private router: Router) { }

  ngOnInit() {
    this.challengeService.get_categories_and_active_categories().subscribe(res=>{
     console.log(res)
      this.allChallenges = res[1]['challengeCategories'];
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

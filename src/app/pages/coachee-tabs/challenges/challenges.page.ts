import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/services/challenge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
})
export class ChallengesPage implements OnInit {

  allChallenges = [];
  activeChallenges = []
  constructor(private challengeService: ChallengeService,private router:Router) { }

  ngOnInit() {
    this.allChallenges = this.challengeService.getAllChallenges();
    this.activeChallenges = this.challengeService.getActiveChallenges()
  }
  ionViewWillEnter() {
    let tabBar=document.querySelector('ion-tab-bar');
    tabBar.style.display='flex'
  }
async gotoActiveChallenge(title:string){
 let activeChallenge=await this.challengeService.findActiveChallenge(title)
 if(activeChallenge.title=='food journal'){
   this.router.navigateByUrl(`coachee/challenges/activeChallenges/${activeChallenge.title}`)
 }
}
}

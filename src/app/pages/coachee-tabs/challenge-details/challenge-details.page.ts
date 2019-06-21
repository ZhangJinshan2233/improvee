import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from 'src/app/services/challenge.service';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.page.html',
  styleUrls: ['./challenge-details.page.scss'],
})
export class ChallengeDetailsPage implements OnInit {

  challenge: any

  constructor(private activatedRouter: ActivatedRoute, private challengeService: ChallengeService) { }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar')
    tabBar.style.display = 'none'
    let id = this.activatedRouter.snapshot.params['challengeId']
    console.log(id)
    this.challenge = this.challengeService.findChallenge(id)
  }

}

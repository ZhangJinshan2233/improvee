import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challenge-history',
  templateUrl: './challenge-history.page.html',
  styleUrls: ['./challenge-history.page.scss'],
})
export class ChallengeHistoryPage implements OnInit {

  nonactiveChallenges = [];
  challengeCategoryId = '';
  constructor(
    private challengeService: ChallengeService,
    private activateRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.challengeCategoryId = this.activateRouter.snapshot.params['challengeCategoryId']
    this.challengeService.get_nonactiveChallenge_by_challengeCategoryId(this.challengeCategoryId).subscribe(res => {
      this.nonactiveChallenges = res['nonactiveChallenges']
      console.log(this.nonactiveChallenges)
    })
  }
}

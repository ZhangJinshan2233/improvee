import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../../../services/challenge.service'
import { MenuService } from "../../../services/menu.service";
import {
  addDays
} from 'date-fns';
@Component({
  selector: 'app-challenge-category-details',
  templateUrl: './challenge-category-details.page.html',
  styleUrls: ['./challenge-category-details.page.scss'],
})
export class ChallengeCategoryDetailsPage implements OnInit {
  challengeCategory: any;
  isActive = false
  activeChallenges = [];
  isMember=false;
  currentUser:any
  constructor(private activatedRouter: ActivatedRoute,
    private challengeService: ChallengeService,
    private router: Router,
    private menuService:MenuService
  ) { }
  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar')
    tabBar.style.display = 'none'
    let id = this.activatedRouter.snapshot.params['challengeCategoryId']
    this.menuService.getUserInfo().subscribe(res=>{
      this.currentUser=res['currentUser']
      this.isMember=this.currentUser.isMember
    })

    this.challengeService.get_categories_by_id_and_active_challenges(id).subscribe(res => {
      this.activeChallenges = res[1]['activeChallenges']
      this.challengeCategory = res[0]['category']
      for (let i = 0; i < this.activeChallenges.length; i++) {
        if (this.activeChallenges[i].categoryName === this.challengeCategory.name) {
          this.isActive = true;
          break
        }
      }
    })
  }
  create_new_challenge() {
    let { _id: challengeCategoryId, duration } = this.challengeCategory
    let startDate = new Date();
    let endDate = addDays(new Date(), duration)
    this.challengeService.create_challenge({ challengeCategoryId, duration, startDate, endDate }).subscribe(res => {
      this.challengeService.newChallengeSubject.next(res['activeChallenge'])
      this.router.navigateByUrl('/coachee/challenges')
    })
  }
}



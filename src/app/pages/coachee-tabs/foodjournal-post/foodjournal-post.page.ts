import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodjournalPostDetailsPage } from "../foodjournal-post-details/foodjournal-post-details.page";
import { ModalController, IonInfiniteScroll, LoadingController, } from '@ionic/angular';
import { customModalEnterAnimation } from 'src/app/_helper/customModalEnter';
import { customModalLeaveAnimation } from 'src/app/_helper/customModalLeave';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodjournalPostCommentsPage } from "../foodjournal-post-comments/foodjournal-post-comments.page";

import {
  compareDesc
} from 'date-fns';
import * as _ from 'lodash'
import { ChallengeService } from "../../../services/challenge.service";
@Component({
  selector: 'app-foodjournal-post',
  templateUrl: './foodjournal-post.page.html',
  styleUrls: ['./foodjournal-post.page.scss'],
})
export class FoodjournalPostPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll
  challengeId: string;
  nonActive = false;
  skipNum: number = 0;
  foodJournalPosts = []
  isCoachee = false;
  isReadonly = "true";
  constructor(
    private modalCtrl: ModalController,
    private activateRouter: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private challengeService: ChallengeService,
    private router: Router
  ) {
    if (this.router.url.includes('coachee')) {
      this.isCoachee = true;
      this.isReadonly = "true";
    } else {
      this.isCoachee = false;
      this.isReadonly = "false";
    }
  }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';

    this.challengeId = this.activateRouter.snapshot.params['challengeId']
    if (this.router.url.search('histories') > 0) this.nonActive = true
    this.first_loading_foodJournals()
  }

  async first_loading_foodJournals() {
    let first_loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await first_loading.present();
    this.challengeService.get_posts_pagination(this.challengeId, this.skipNum).subscribe(res => {
      let postLength = res['foodJournalPosts'].length
      if (postLength <= 0 && !this.nonActive && this.isCoachee) this.add_post()
      if (postLength > 0) this.skipNum += postLength;
      this.foodJournalPosts = res['foodJournalPosts']
      first_loading.dismiss()
    })
  }

  /**
  * get more posts when scroll down 
  * @function load more posts
  * @param infiniteScrollEvent 
  * @returns Array
  */
  load_more_posts(infiniteScrollEvent) {
    this.challengeService.get_posts_pagination(this.challengeId, this.skipNum).subscribe(res => {
      if (res['foodJournalPosts'].length >= 1) {
        this.skipNum += res['foodJournalPosts'].length
        this.foodJournalPosts = this.foodJournalPosts.concat(res['foodJournalPosts'])
        infiniteScrollEvent.target.complete();
      } else {
        infiniteScrollEvent.target.disabled = true;
      }
    })
  }
  async add_post() {
    const postModal = await this.modalCtrl.create({
      component: FoodjournalPostDetailsPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: { challengeId: this.challengeId }
    });
    await postModal.present();
    let isEarlier = 0;
    let foodJournalPostsLength = this.foodJournalPosts.length
    let { data } = await postModal.onDidDismiss();
    if (data) {
      if (data.newPost) {
        switch (true) {
          //first time load three posts
          case (foodJournalPostsLength < 3):
            this.foodJournalPosts.push(data.newPost);
            this.skipNum += 1;
            this.foodJournalPosts.sort((item1, item2) => {
              return compareDesc(new Date(item1.createDate), new Date(item2.createDate))
            })
            break;
          case (foodJournalPostsLength >= 3):
            isEarlier = compareDesc(new Date(this.foodJournalPosts[foodJournalPostsLength - 1].createDate), new Date(data['newPost'].createDate))
            if (isEarlier === 1) {
              this.foodJournalPosts.push(data.newPost);
              this.skipNum += 1;
              this.foodJournalPosts.sort((item1, item2) => {
                return compareDesc(new Date(item1.createDate), new Date(item2.createDate))
              })
            } else {
              if (this.infiniteScroll.disabled)
                this.infiniteScroll.disabled = false
            }
            break;
          default:
            break;
        }
      }
    }
  }
  logRatingChange(postId, rating) {
    console.log(postId)
    this.challengeService.rate_post(postId, rating).subscribe(res => {
      console.log(res)
    })
  }

  async add_comment(postId, i) {
    const commentModal = await this.modalCtrl.create({
      component: FoodjournalPostCommentsPage,
      componentProps: { postId: postId }
    });
    await commentModal.present();
    let { data } = await commentModal.onDidDismiss();
    if (data.commentsArrayLength) {
      this.foodJournalPosts[i].comments.length = data.commentsArrayLength
    }
  }
}


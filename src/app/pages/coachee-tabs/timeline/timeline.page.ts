import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimelineService } from "../../../services/timeline.service";
import { IonContent } from '@ionic/angular';
import { ModalController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { TimelineCreatePage } from '../timeline-create/timeline-create.page'
import { TimelineCommentPage } from "../timeline-comment/timeline-comment.page";
import { format, isYesterday, isToday } from 'date-fns';
import {customModalEnterAnimation} from "../../../_helper/customModalEnter";
import { customModalLeaveAnimation} from "../../../_helper/customModalLeave";
import * as _ from 'lodash';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll
  skipNum: number;
  timelinePosts: any;
  constructor(
    private timelineService: TimelineService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) {
    this.timelinePosts = [];
    this.skipNum = 0;
  }

  ngOnInit() {
    this.loadPosts();
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
    let fab = document.querySelector('ion-fab');
    this.content.ionScrollStart.subscribe(() => {
      fab.style.display = 'none'
    })

    this.content.ionScrollEnd.subscribe(() => {
      // tabBar.style.display = 'flex';
      fab.style.display = 'flex';
    })

  }

  /**
   * first time load timeine posts
   */
  async loadPosts() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await loading.present();

    this.timelineService.getTimelinePost(this.skipNum).subscribe(res => {
      if (res.timelinePosts.length >= 1) {
        this.skipNum += res.timelinePosts.length
        let convertedTimelinePosts = this.convertTimelinePosts(res.timelinePosts)
        this.timelinePosts = _.concat(this.timelinePosts, convertedTimelinePosts);
      }

      loading.dismiss();
    })
  }
  /**
   * get more posts when scroll down 
   * @function loadMorePosts
   * @param infiniteScrollEvent 
   * @returns Array
   */
  loadMorePosts(infiniteScrollEvent) {
    this.timelineService.getTimelinePost(this.skipNum).subscribe(res => {
      if (res.timelinePosts.length >= 1) {
        this.skipNum += res.timelinePosts.length
        let convertedTimelinePosts = this.convertTimelinePosts(res.timelinePosts)
        let length = this.timelinePosts.length
        for (let i of convertedTimelinePosts) {

          if (i.createdDate === this.timelinePosts[length - 1].createdDate) {
            this.timelinePosts[length - 1].posts = _.concat(this.timelinePosts[length - 1].posts, i.posts)
          } else {
            this.timelinePosts = _.concat(this.timelinePosts, i);
          }
        }
        infiniteScrollEvent.target.complete();
      } else {
        infiniteScrollEvent.target.disabled = true;
      }

    })
  }

  /**
   * @function doRefresh
   * @param refreshEvent 
   */
  doRefresh(refreshEvent) {
    this.skipNum = 0;
    this.timelinePosts = [];
    this.timelineService.getTimelinePost(this.skipNum).subscribe(res => {
      if (res.timelinePosts.length >= 1) {
        this.skipNum += res.timelinePosts.length
        let convertedTimelinePosts = this.convertTimelinePosts(res.timelinePosts)
        this.timelinePosts = _.concat(this.timelinePosts, convertedTimelinePosts);
      }
      refreshEvent.target.complete()
      this.infiniteScroll.disabled = false;
    })
  }
  /**
   * show modal to add new post
   * @function gotoNewPostPage
   * @returns void
   */
  async gotoNewPostPage() {

    const postModal = await this.modalCtrl.create({
      component: TimelineCreatePage,
      enterAnimation:customModalEnterAnimation,
      leaveAnimation:customModalLeaveAnimation
    });

    await postModal.present();

    let { data } = await postModal.onWillDismiss();
    if (data.timelinePost) {
      this.skipNum += 1;
      let createdDate = format(data.timelinePost.createdDate, 'ddd,MMM Do YYYY')
      if (isToday(data.timelinePost.createdDate)) {
        createdDate = "Today"
      }
      if (isYesterday(data.timelinePost.createdDate)) {
        createdDate = "Yesterday"
      }
      let { _id, description, _coachee, postImage, rating, comments } = data.timelinePost
      let tempPost = { createdDate: createdDate, posts: [{ _id, description, _coachee, postImage, rating, comments }] }

      if (this.timelinePosts.length === 0) {
        this.timelinePosts.push(tempPost)
      } else {
        if (this.timelinePosts[0].createdDate === tempPost.createdDate) {
          this.timelinePosts[0].posts.unshift(tempPost.posts[0])
        } else {
          this.timelinePosts.unshift(tempPost)
        }
      }

      this.content.scrollToTop()
    }

  }

  /**
   * convert timelineposts to special format
   * @param originalTimelinePosts :array
   * @retuens Array
   */
  convertTimelinePosts(originalTimelinePosts) {

    if (originalTimelinePosts.length === 0) return

    let posts = originalTimelinePosts.map(post => {

      let createdDate = format(post.createdDate, 'ddd,MMM Do YYYY')
      if (isToday(post.createdDate)) {
        createdDate = "Today"
      }
      if (isYesterday(post.createdDate)) {
        createdDate = "Yesterday"
      }
      let { _id, description, _coachee, postImage, rating, comments } = post
      let tempPost = { _id, description, _coachee, postImage, rating, comments, createdDate }
      return tempPost
    })

    posts = _.chain(posts)
      .groupBy('createdDate')
      .toPairs()
      .map(item => _.zipObject(['createdDate', 'posts'], item))
      .value()
    return posts

  }
  /**
   * 
   */
  async gotoCommentPage(postId, i, j) {
    const commentModal = await this.modalCtrl.create({
      component: TimelineCommentPage,
      componentProps: { postId: postId }
    });

    await commentModal.present();
    let { data } = await commentModal.onWillDismiss();
    if (data.comments)
      this.timelinePosts[i].posts[j].comments = data.comments
  }
}


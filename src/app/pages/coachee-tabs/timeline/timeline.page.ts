import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimelineService } from "../../../services/timeline.service";
import { IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TimelineCreatePage } from '../timeline-create/timeline-create.page'
import { TimelineCommentPage } from "../timeline-comment/timeline-comment.page";
import { format, isYesterday, isToday } from 'date-fns';
import * as _ from 'lodash';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  skipNum: number;
  orignalTimelinePosts: any
  timelinePosts: any;

  constructor(private timelineService: TimelineService,
    private modalCtrl: ModalController) {
    this.orignalTimelinePosts = [];
    this.timelinePosts = [];
    this.skipNum = 0;
  }

  ngOnInit() {

    this.timelineService.getTimelinePost(this.skipNum).subscribe(res => {
      this.skipNum += res.timelinePosts.length
      this.orignalTimelinePosts = _.concat(this.orignalTimelinePosts, res.timelinePosts);
      this.timelinePosts = this.convertTimelinePosts(this.orignalTimelinePosts);
    })

    let tabBar = document.querySelector('ion-tab-bar');
    let fab = document.querySelector('ion-fab');
    this.content.ionScrollStart.subscribe(() => {
      tabBar.style.display = 'none';
      fab.style.display = 'none'
    })

    this.content.ionScrollEnd.subscribe(() => {
      tabBar.style.display = 'flex';
      fab.style.display = 'flex';
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
      
      infiniteScrollEvent.target.complete();
      if (res.timelinePosts.length >= 1) {
        this.skipNum += res.timelinePosts.length
        this.orignalTimelinePosts = _.concat(this.orignalTimelinePosts, res.timelinePosts);
        this.timelinePosts = this.convertTimelinePosts(this.orignalTimelinePosts);
        this.content.scrollToBottom(100);
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

  }
  /**
   * show modal to add new post
   * @function gotoNewPostPage
   * @returns void
   */
  async gotoNewPostPage() {

    const postModal = await this.modalCtrl.create({
      component: TimelineCreatePage
    });

    await postModal.present();

    let { data } = await postModal.onWillDismiss();

    if (data.timelinePost) {
      this.orignalTimelinePosts.push(data.timelinePost);
      this.skipNum += 1;

      this.orignalTimelinePosts = _.sortBy(this.orignalTimelinePosts, function (timelinePost) {
        return -new Date(timelinePost.createdDate)
      })
      this.timelinePosts = this.convertTimelinePosts(this.orignalTimelinePosts)

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


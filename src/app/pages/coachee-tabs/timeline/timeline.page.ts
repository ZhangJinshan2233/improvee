import { Component, OnInit, ViewChild} from '@angular/core';
import { TimelineService } from "../../../services/timeline.service";
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewPostPage } from '../new-post/new-post.page'
import * as moment from 'moment'
import * as _ from 'lodash';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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

    this.getPosts(this.skipNum);
    this.content.scrollEvents = true

    // hid tab bar when user scroll
    let tabBar = document.querySelector('ion-tab-bar')
    this.content.ionScrollStart.subscribe(() => {
      tabBar.style.display = 'none'
    })

    this.content.ionScrollEnd.subscribe(() => {
      tabBar.style.display = 'flex'
    })

  }

  /**
   * @function getPosts
   * @param skipNum 
   * @param infiniteScroll 
   * @return void
   */
  getPosts(skipNum: number, infiniteScroll?) {

    this.timelineService.getTimelinePost(skipNum).subscribe(res => {

      if (res.timelinePosts.length >= 1) {

        this.skipNum += res.timelinePosts.length
        this.orignalTimelinePosts = _.concat(this.orignalTimelinePosts, res.timelinePosts);
        this.timelinePosts = this.convertTimelinePosts(this.orignalTimelinePosts);
        if (!infiniteScroll.disabled) {
          infiniteScroll.complete();
        }
        this.content.scrollToBottom()
      } else {

        infiniteScroll.disabled = true
        this.content.scrollToBottom();
      }

    })
  }
  /**
   * get more posts when scroll down 
   * @function loadMorePosts
   * @param infiniteScrollEvent 
   * @returns Array
   */
  loadMorePosts(infiniteScrollEvent) {

    this.getPosts(this.skipNum, this.infiniteScroll);

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
      component: NewPostPage
    });

    await postModal.present();

    let { data } = await postModal.onWillDismiss();

    if (data.timelinePost) {
      this.orignalTimelinePosts.push(data.timelinePost);


      this.orignalTimelinePosts = _.sortBy(this.orignalTimelinePosts, function (timelinePost) {
        return -new Date(timelinePost.createdDate)
      })
      this.timelinePosts = this.convertTimelinePosts(this.orignalTimelinePosts)
      this.skipNum += 1;
      this.infiniteScroll.disabled = false
      this.content.scrollToTop();
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
      let tempPost = {
        _id: post._id,
        description: post.description,
        _coachee: post._coachee,
        postImage: post.postImage,
        rating: post.rating,
        comments: post.comments,
        createdDate: moment(post.createdDate).format('ddd,MMM Do YYYY')
      }
      return tempPost
    })

    posts = _.chain(posts)
      .groupBy('createdDate')
      .toPairs()
      .map(item => _.zipObject(['createdDate', 'posts'], item))
      .value()
    return posts
  }
}


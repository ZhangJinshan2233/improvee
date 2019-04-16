import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController, NavParams } from "@ionic/angular";
import { TimelineService } from "../../../services/timeline.service";
import { IonContent, IonList } from '@ionic/angular';

@Component({
  selector: 'app-timeline-comment',
  templateUrl: './timeline-comment.page.html',
  styleUrls: ['./timeline-comment.page.scss'],
})
export class TimelineCommentPage implements OnInit {
  @ViewChild(IonContent) modalContent: IonContent;
  @ViewChild(IonList, { read: ElementRef }) commentList: ElementRef;
  mutationObserver: MutationObserver
  comments: any[]
  postId: string;
  comment = {
    isCoach: false,
    _coach: null,
    content: ''
  }
  noavatar = '/assets/img/improvee.png'
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private timelineService: TimelineService
  ) {
    this.postId = '';
  }
  ionViewDidEnter() {
    this.modalContent.scrollToBottom()//scroll to bottom after loading data for first time 

    this.mutationObserver = new MutationObserver((mutations) => {
      this.modalContent.scrollToBottom();
    });
  
    if (this.comments.length >= 1) {
      this.mutationObserver.observe(this.commentList.nativeElement, {
        childList: true,
        subtree: true
      });
    }
  }

  ngOnInit() {
    this.getComments()
    this.modalContent.scrollEvents = true;
    this.postId = this.navParams.get('postId')
  }

  getComments() {
    this.timelineService.getComments(this.postId).subscribe(res => {
      this.comments = res['comments']
      console.log(this.comments)
    })
  }

  closeCommentModal() {
    this.modalCtrl.dismiss({
      comments: this.comments
    })
  }

  createComment() {
    if (this.comment.content) {
      this.timelineService.createComment(this.postId, this.comment).subscribe(res => {
        console.log(res['comment'])
        this.comments.push(res['comment'])
        this.comment.content = "";
      })
    }

  }
}

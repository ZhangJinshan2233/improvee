import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from "@ionic/angular";
import { TimelineService } from "../../../services/timeline.service";
@Component({
  selector: 'app-timeline-comment',
  templateUrl: './timeline-comment.page.html',
  styleUrls: ['./timeline-comment.page.scss'],
})
export class TimelineCommentPage implements OnInit {
  comments: any
  postId: string;
  comment = {
    isCoach: false,
    _coach: null,
    content: ''
  }
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private timelineService: TimelineService
  ) {
    this.comments = []
    this.postId = '';
  }

  ngOnInit() {
    this.postId = this.navParams.get('postId')
    this.getComments()
  }

  getComments() {
    this.timelineService.getComments(this.postId).subscribe(res => {
      this.comments = res['comments']
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
        this.comments = res['comments']
        this.comment.content = ""
      })
    }

  }
}

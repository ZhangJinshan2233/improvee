import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonContent, IonList, ModalController, NavParams } from '@ionic/angular';
import { ChallengeService } from "../../../services/challenge.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-foodjournal-post-comments',
  templateUrl: './foodjournal-post-comments.page.html',
  styleUrls: ['./foodjournal-post-comments.page.scss'],
})
export class FoodjournalPostCommentsPage implements OnInit {
  commentForm: FormGroup
  @ViewChild(IonContent, { static: true }) modalContent: IonContent;
  @ViewChild(IonList, { static: true, read: ElementRef }) commentList: ElementRef;
  mutationObserver: MutationObserver
  comments: any[]
  postId: string;
  comment = {
    isCoach: false,
    _coach: null,
    content: ''
  }
  noavatar = '/assets/img/noavatar.png'
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private challengeService: ChallengeService

  ) {
    this.postId = '';
  }
  ionViewDidEnter() {

    this.modalContent.scrollToBottom()

    //scroll to bottom after loading data for first time 

    // this.mutationObserver = new MutationObserver((mutations) => {
    //   this.modalContent.scrollToBottom();
    // });

    // if (this.comments.length >= 1) {
    //   this.mutationObserver.observe(this.commentList.nativeElement, {
    //     childList: true,
    //     subtree: true
    //   });
    // }
  }

  create_comment_form() {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.create_comment_form()
    this.get_comments()
    this.modalContent.scrollEvents = true;
    this.postId = this.navParams.get('postId')
  }

  get_comments() {
    this.challengeService.get_comments(this.postId).subscribe(res => {
      this.comments = res['comments']
    })
  }
  submit_comment_form() {
    this.challengeService.create_new_comment(this.postId, this.commentForm.value).subscribe(res => {
      this.comments.push(res['comment'])
      this.commentForm.patchValue({
        content: ''
      })
    })
  }

  async close_comment_modal() {
    this.modalCtrl.dismiss({
      commentsArrayLength: this.comments.length
    })
  }

}

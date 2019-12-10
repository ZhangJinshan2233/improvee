import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from "../../../services/chat.service";
import * as _ from 'lodash'
import {
  transition,
  style,
  animate,
  trigger,
  state,
  keyframes
} from "@angular/animations";
@Component({
  selector: 'app-coachee-info',
  templateUrl: './coachee-info.page.html',
  styleUrls: ['./coachee-info.page.scss'],
  animations: [
    trigger('moveout', [
      state('origal', style({
        opacity: 1
      })),
      transition('origal=>move',
        animate('500ms', keyframes([
          style({ transform: 'rotateX(0)', opacity: 1, offset: 0 }),
          style({ transform: 'rotateX(90deg)', opacity: 0.5, offset: 0.5 }),
          style({ transform: 'rotateX(180deg)', opacity: 0, offset: 1.0 }),
        ])
        )),

    ])
  ],
})
export class CoacheeInfoPage implements OnInit {
  @Input('coachee') coachee: any
  @Input('bgColor') bgColor: any
  status: any
  changedWeight = 0
  unreadMessageItems = 0
  unreadMessageEarliestDate: any;
  unreadPostEarliestDate: any;
  unreadPostItems = 0;
  completedHabitPercent = 0
  remainingDaysOfMembership = 0
  constructor(private router: Router,
    private chatService: ChatService) { }

  coacheeProfileImg = ''
  ngOnInit() {
    this.status = 'origal'
    if (this.coachee.imgData) {
      this.coacheeProfileImg = `data:image/jpeg;base64,${this.coachee['imgData']}`
    } else {
      this.coacheeProfileImg = "/assets/img/noavatar.png"
    }
  }
  /**
   * 
   * @param coachee id 
   */
  goToCoacheeDetails(id) {
    this.status = 'move'
    this.chatService.remove_unread_messages(this.coachee._id, "post").subscribe(res => {
      if (res) {
        this.coachee.unreadPostItems = 0;
        this.router.navigateByUrl(`/coach/home/${id}`)
      }
    })
    // setTimeout(() => {
    //   this.router.navigateByUrl(`/coach/home/${id}`)
    //   this.status = 'origal'
    // }, 500);
  }

  /**
   * 
   * @param coachee id 
   */
  chat_with_coachee(id) {
    this.chatService.remove_unread_messages(this.coachee._id, "message").subscribe(res => {
      if (res) {
        this.coachee.unreadMessageItems = 0;
        this.router.navigateByUrl(`/coach/home/chat/${id}`)
      }
    })

  }
}

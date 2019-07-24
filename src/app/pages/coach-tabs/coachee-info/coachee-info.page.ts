import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) { }

  ngOnInit() {
    this.status = 'origal'
    console.log(this.coachee)
  }
  goToCoacheeDetails(id) {
    this.status = 'move'
    setTimeout(() => {
      this.router.navigateByUrl(`/coach/coach-home/${id}`)
      this.status = 'origal'
    }, 500);
  }
}

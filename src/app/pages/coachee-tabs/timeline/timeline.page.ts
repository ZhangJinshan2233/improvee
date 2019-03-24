import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild('content')
  content: ElementRef;
  constructor(private router:Router) { }

  ngOnInit() {

  }

  gotoNewPostPage(){
    this.router.navigateByUrl('coachee/timeline/new-post')
  }
}


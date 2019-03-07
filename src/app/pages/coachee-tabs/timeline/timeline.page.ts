import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild('content')
  content: ElementRef;
  constructor() { }

  ngOnInit() {
  
  }
}

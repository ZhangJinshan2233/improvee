import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habitlist',
  templateUrl: './habitlist.page.html',
  styleUrls: ['./habitlist.page.scss'],
})
export class HabitlistPage implements OnInit {

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
  }
  ngAfterViewChecked() {

    this.cd.detectChanges();

  }

  constructor(private cd: ChangeDetectorRef, private router:Router) { }
  viewTitle: string
  eventSource = []
  calendar = {
    mode: 'week',
    currentDate: new Date()
  }
  onCurrentDateChanged($event) {

  }
  reloadSource(startTime, endTime) {

  }
  onEventSelected($event) {

  }
  onViewTitleChanged($event) {
    this.viewTitle = $event.replace('\,', '\ |')
  }
  onTimeSelected($event) {

  }
  getCustomClass(someParameter) {
    return 'red';
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  public form = [
    { val: 'drink 8 glasses water', isChecked: true },
    { val: 'eat vegetables', isChecked: false },
    { val: 'fast dinner', isChecked: false }
  ];

  gotoHabitListItemsPage(){
    this.router.navigateByUrl('')
  }
}

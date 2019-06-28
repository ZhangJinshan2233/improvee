import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger,state,style,animate,transition, query, stagger, animateChild } from "@angular/animations";
import {
  format,
  lastDayOfWeek,
  getDay,
  subDays
} from 'date-fns';
@Component({
  selector: 'app-habitlist',
  templateUrl: './habitlist.page.html',
  styleUrls: ['./habitlist.page.scss'],
  animations:[
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate(800)),
      transition('* => void', animate(300)),
    ])
  ]
})
export class HabitlistPage implements OnInit {

  lists=[]
  ngOnInit() {
    this.lists=this.form1
    this.getCurrentWeek()
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
  }
  constructor(private router: Router) { }
  currentDay: any;
  currentDate: any;
  isLastWeek = true
  week = {
    Sun: '',
    Mon: '',
    Tue: '',
    Wed: '',
    Thu: '',
    Fri: '',
    Sat: ''
  }
  currentWeek: any;
  lastDayOfWeek: any;

  getPreWeek() {
    this.isLastWeek = false;
    this.currentDate = format(new Date(subDays(new Date(this.currentDate), 7)), 'MM/DD/YYYY');
    this.getWeek(this.currentDate)
    console.log(this.currentDate)
  }

  getNextWeek() {

    this.currentDate = format(new Date(subDays(new Date(this.currentDate), -7)), 'MM/DD/YYYY');
    if (this.currentDate == format(new Date(), 'MM/DD/YYYY')) {
      this.isLastWeek = true
    }
    this.getWeek(this.currentDate)
    console.log(this.currentDate)
  }

  getCurrentWeek() {
    this.getWeek(new Date());
  }

  getWeek(currentDate) {
    this.currentDate = new Date(currentDate);
    this.currentDay = getDay(this.currentDate).toString()
    this.lastDayOfWeek = format(lastDayOfWeek(currentDate), 'MM/DD/YYYY');
    this.week.Sat = this.lastDayOfWeek
    this.week.Sun = format(subDays(new Date(this.lastDayOfWeek), 6), 'MM/DD/YYYY');
    this.week.Mon = format(subDays(new Date(this.lastDayOfWeek), 5), 'MM/DD/YYYY');
    this.week.Tue = format(subDays(new Date(this.lastDayOfWeek), 4), 'MM/DD/YYYY');
    this.week.Wed = format(subDays(new Date(this.lastDayOfWeek), 3), 'MM/DD/YYYY');
    this.week.Thu = format(subDays(new Date(this.lastDayOfWeek), 2), 'MM/DD/YYYY');
    this.week.Fri = format(subDays(new Date(this.lastDayOfWeek), 1), 'MM/DD/YYYY');

  }
  getCurrentDate(date) {
    console.log(date)
    this.lists==this.form1?this.lists=this.form2:this.lists=this.form1
  }
  public form1 = [
    { val: 'drink 8 glasses water', isChecked: true },
    { val: 'eat vegetables', isChecked: false },
    { val: 'fast dinner', isChecked: false }
  ];
  public form2 = [
    { val: 'drink 8 glasses water', isChecked: true },
    { val: 'eat vegetables', isChecked: false },
    { val: 'fast dinner', isChecked: false }
  ];

  gotoHabitListItemsPage() {
    this.router.navigateByUrl('')
  }
}

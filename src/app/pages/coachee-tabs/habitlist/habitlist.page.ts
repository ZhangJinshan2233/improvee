import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, query, stagger, animateChild } from "@angular/animations";
import {
  format,
  lastDayOfWeek,
  getDay,
  subDays,
  addDays,
  compareAsc,
} from 'date-fns';
import { HabitlistRecordService } from "../../../services/habitlist-record.service";
@Component({
  selector: 'app-habitlist',
  templateUrl: './habitlist.page.html',
  styleUrls: ['./habitlist.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', animate(1000)),

    ])
  ]
})
export class HabitlistPage implements OnInit {
  isSubmitted=false //prevent user double clicking 
  habitlistRecord: any;
  currentDay: any
  currentDate: any;
  isLastWeek = true;
  lastTimeDay: any
  week = {
    Sun: '',
    Mon: '',
    Tue: '',
    Wed: '',
    Thu: '',
    Fri: '',
    Sat: ''
  }
  //judge date is bigger than today 
  weekdayStatus = {
    Sun: true,
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: true
  }
  //deal with ionSelect method execute two times in the first loading
  isInitialized = true

  ngOnInit() {

    this.get_current_week()

    let tabBar = document.querySelector('ion-tab-bar');

    tabBar.style.display = 'none';
  }

  constructor(private router: Router,
    private habitRecordService: HabitlistRecordService
  ) {
  }


  get_pre_week() {
    this.isSubmitted=true
    this.isLastWeek = false;
    //judge current day is eaqule to today and prevent exectue two time in the fist loading
    let preWeekDay = format(new Date(subDays(new Date(this.currentDate), 7)), 'MM/dd/yyyy');
    this.get_week(preWeekDay)
    if (this.currentDay === getDay(new Date()).toString() && this.lastTimeDay === getDay(new Date()).toString()) {
      this.get_current_date_habits(format(this.currentDate, 'MM/dd/yyyy'))
    }
  }

  get_next_week() {
    this.isSubmitted=true
    let nextWeekDay = format(new Date(addDays(new Date(this.currentDate), 7)), 'MM/dd/yyyy');
    if (nextWeekDay == format(new Date(), 'MM/dd/yyyy')) {
      this.isLastWeek = true
    }
    this.get_week(nextWeekDay)
    if (this.currentDay === getDay(new Date()).toString() && this.lastTimeDay === getDay(new Date()).toString()) {
      this.get_current_date_habits(format(this.currentDate, 'MM/dd/yyyy'))
    }
  }

  get_current_week() {
    this.isLastWeek = true
    this.get_week(new Date());
    // if (!this.isInitialized) {
    //   this.get_current_date_habits(format(this.currentDate, 'MM/dd/yyyy'))
    //   this.isInitialized = true
    // }
    // this.isInitialized = false
  }
  /**
   * set date of week
   * @param currentDate 
   */
  get_week(currentDate) {
    this.currentDate = new Date(currentDate);
    this.currentDay = getDay(new Date(this.currentDate)).toString()
    let lastDayWeek = format(new Date(lastDayOfWeek(new Date(this.currentDate))), 'MM/dd/yyyy');
    this.week.Sat = lastDayWeek
    this.week.Sun = format(subDays(new Date(lastDayWeek), 6), 'MM/dd/yyyy');
    this.week.Mon = format(subDays(new Date(lastDayWeek), 5), 'MM/dd/yyyy');
    this.week.Tue = format(subDays(new Date(lastDayWeek), 4), 'MM/dd/yyyy');
    this.week.Wed = format(subDays(new Date(lastDayWeek), 3), 'MM/dd/yyyy');
    this.week.Thu = format(subDays(new Date(lastDayWeek), 2), 'MM/dd/yyyy');
    this.week.Fri = format(subDays(new Date(lastDayWeek), 1), 'MM/dd/yyyy');

    //prevent click the day which bigger than today and diasbled ion select
    for (let day in this.week) {
      if (compareAsc(new Date(this.week[day]), new Date()) >= 0) {
        this.weekdayStatus[day] = true
      } else {
        this.weekdayStatus[day] = false
      }
    }
  }

  get_current_date_habits(date) {
    this.lastTimeDay = getDay(new Date(date)).toString()
    this.habitRecordService.get_habitlist_record_by_date(date).subscribe(res => {
      if (res['habitsOfScheduleDay']) {
        this.habitlistRecord = res['habitsOfScheduleDay']
        this.isSubmitted=false
      } else {
        this.habitRecordService.create_habitlist_record({ createDate: date }).subscribe(res => {
          this.habitlistRecord = res['habitsOfScheduleDay']
          this.isSubmitted=false
        })
      }
    })
  }
  update_habit_item(habit) {
    console.log(this.isInitialized)
    this.habitRecordService.update_habitlist_item_status(this.habitlistRecord._id, habit).subscribe(res => {
      console.log(res)
    })
  }
  gotoHabitListItemsPage() {
    this.router.navigateByUrl('')
  }
}

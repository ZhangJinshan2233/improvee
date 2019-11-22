import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoachService } from "../../../services/coach.service";
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Chart, ChartOptions } from 'chart.js';
import * as _ from 'lodash'
import {
  format,
  subDays
} from "date-fns";
import { get_record_status } from 'src/app/_helper/indicatorRecordStatus';
@Component({
  selector: 'app-coachee-detail',
  templateUrl: './coachee-detail.page.html',
  styleUrls: ['./coachee-detail.page.scss'],
})
export class CoacheeDetailPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides
  @ViewChild('habistListCanvas', { static: true }) habistListCanvas: ElementRef;
  habitListChart: Chart
  coachee: any;
  segmentValue = 0;
  habitListAxisData = ['Sun', 'Mon', 'Thu', 'Wed', 'Tue', 'Fri', 'Sat']
  items = [];
  isHabitsSegmentLoaded = false;
  isChallengeSegmentLoaded = false;
  isIndicatorSegmentLoaded = false;
  isMoreLoaded = false;
  habitListDataset = [0, 0, 0, 0, 0, 0, 0];
  habitList = [];
  activeChallenges = [];
  nonactiveChallenges = [];
  indicatorRecords = [];
  constructor(private coachService: CoachService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none'
    let coacheeId = this.activatedRoute.snapshot.params.coacheeId
    this.coachService.coachee_details_get_coachee_and__week_habitlist(coacheeId).subscribe(res => {
      this.coachee = res[0]['coachee'];
      this.habitList = res[1]['weekHabitlist'];
      this.isHabitsSegmentLoaded = true
      for (let i = 0; i < this.habitList.length; i++) {
        let completedHabitPercent = 0
        if (this.habitList[i].habits.length > 0) {
          let todayCompoletedHabitList = _.filter(this.habitList[i].habits, (item) => {
            return item.status
          })
          completedHabitPercent = (100 * todayCompoletedHabitList.length) / this.habitList[i].habits.length
        } else {
          completedHabitPercent = 0
        }
        this.habitListDataset[i] = completedHabitPercent
      }
      this.create_habitList_chart(this.habistListCanvas.nativeElement, this.habitListAxisData, this.habitListDataset)
    })
  }

  async segment_change($event) {
    switch ($event.target.value) {
      case '0':
        break;
      case '1':
        this.segmentValue = 1
        if (!this.isChallengeSegmentLoaded) {
          this.coachService.coachee_details_get_activechallenges_and__nonactivechallenges(this.coachee._id).subscribe(res => {
            this.isChallengeSegmentLoaded = true;
            this.activeChallenges = res[0]['activeChallenges'];
            this.nonactiveChallenges = res[1]['nonactiveChallenges']
          })
        }
        break;
      case '2':
        this.segmentValue = 2
        if (!this.isIndicatorSegmentLoaded) {
          this.coachService.coachee_details_get_indicators_record(this.coachee._id).subscribe(res => {
            this.isIndicatorSegmentLoaded = true
            let changedStatusRecord = res['indicatorRecordByName'].map(item => {
              return get_record_status(item, this.coachee)
            })
            this.indicatorRecords =
              _.chain(changedStatusRecord)
                .groupBy('group')
                .toPairs()
                .map(item => _.zipObject(['group', 'indicators'], item))
                .orderBy('group', 'desc')
                .value();
            this.indicatorRecords[0].open = true;
          })
        }
        break;
      case '3':
        this.segmentValue = 3
        console.log(3)
        break;
    }
    await this.slides.slideTo(this.segmentValue)
  }

  async slideChanged($event) {
    this.segmentValue = await this.slides.getActiveIndex();
  }

  create_habitList_chart(chartview, axisData, dataset) {
    this.habitListChart = new Chart(chartview, {
      type: 'bar',
      data: {
        labels: axisData,
        datasets: [{
          backgroundColor: ["#0ec254", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#8e5ea2"],
          data: dataset,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
          display: true,
          text: 'Completion rate in last 7 days'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  /**
    * toggle section
    * @param index 
    */
  toggle_section(index) {
    this.indicatorRecords[index].open = !this.indicatorRecords[index].open
    if (this.indicatorRecords[index].open) {
      for (let i = 0; i < this.indicatorRecords.length; i++) {
        if (i != index) {
          this.indicatorRecords[i].open = false;
        }
      }
    }
  }

  /**
  * go to indicator record page
  * @param indicator 
  * @param i =>which group
  * @param j =>which indicator
  */
  goto_indicator_details(indicator, i, j) {

    this.router.navigateByUrl(`/coach/home/${this.coachee._id}/indicators/history/${indicator.name}`)

  }
  goto_challenge_detail(challenge) {
    let challengeCategoryName = challenge.categoryName
    if (challengeCategoryName === "Food Journal") {
      this.router.navigateByUrl(`coach/home/${this.coachee._id}/challenges/foodJournal/${challenge._id}`)
    }
    console.log(challenge)
  }
  gotoIndicatorPage(indicator) {

  }
  toggleSection(index) {
    this.items[index].open = !this.items[index].open
    if (this.items[index].open) {
      for (let i = 0; i < this.items.length; i++) {
        if (i != index) {
          this.items[i].open = false;
        }
      }
    }
  }

  gotoIndicatorDetails(indicatorName) {
    this.router.navigateByUrl(`coach/home/${this.coachee.id}/indicators/${indicatorName}`)
  }

  getStateOfIndicator(state) {
    if (state === 'over') {
      return 'primary'
    } else if (state === 'server') {
      return 'danger'
    } else {
      return undefined
    }

  }
}

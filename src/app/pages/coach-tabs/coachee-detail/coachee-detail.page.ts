import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoachService } from "../../../services/coach.service";
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Chart, ChartOptions } from 'chart.js';
import {
  format,
  subDays
} from "date-fns";
@Component({
  selector: 'app-coachee-detail',
  templateUrl: './coachee-detail.page.html',
  styleUrls: ['./coachee-detail.page.scss'],
})
export class CoacheeDetailPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides
  @ViewChild('habistListCanvas') habistListCanvas: ElementRef;
  habitListChart: Chart
  coachee: any;
  segmentValue = 0;
  habitListAxisData: any;
  items = [];
  
  habitListDataset = [50, 60, 90, 100, 20, 50, 60];

  habitList = [];
  allChallenges = [];
  constructor(private coachService: CoachService, 
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.coacheeId
    this.coachee = this.coachService.findOne(id)
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none'
    this.habitList = this.coachService.getAllHabits();
   
  }
  async segmentChanged($event) {
    switch ($event.target.value) {
      case '0':
        if (!this.habitList.length) {
          console.log(0)
          this.habitList = this.coachService.getAllHabits()
        }
        break;
      case '1':
        if (!this.allChallenges.length) {
          console.log(1)
          this.allChallenges = this.coachService.getChallenges();
        }
        break;
      case '2': 
        if (!this.items.length) {
          this.items = this.items1;
          this.items[0].open = true;
        }
        break;
      case '3':
        break;
    }
    await this.slides.slideTo(this.segmentValue)
  }

  async slideChanged($event) {
    this.segmentValue = await this.slides.getActiveIndex();
  }

  ionViewDidEnter() {

    this.habitListAxisData = new Array(7).fill('').reduce((pre, cur, index) => {
      cur = format(subDays(new Date(), index), 'ddd')
      return [...pre, cur]
    }, [])

    this.createHabitListChart(this.habistListCanvas.nativeElement, this.habitListAxisData, this.habitListDataset)

  }
  createHabitListChart(chartview, axisData, dataset) {

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

  updateMonthChart(monthViewXaxis, monthData) {
    this.habitListChart.data.labels = monthViewXaxis
    this.habitListChart.data.datasets.forEach((dataset) => {
      dataset.data = monthData
    });
    this.habitListChart.update();
  }

  gotoIndicatorPage(indicator) {

  }
  items1: any[] = [
    {
      groupName: 'Wellness',
      indicators: [
        {
          indicatorName: 'weight',
          value: '68',
          unit: 'kg',
          createDate: '7/12/2019',
          state: 'normal'

        },
        {
          indicatorName: 'height',
          value: '171',
          unit: 'cm',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'BMI',
          value: '25',
          unit: '',
          createDate: '7/12/2019',
          state: 'over'
        },
        {
          indicatorName: 'waist',
          value: '89',
          unit: 'cm',
          createDate: '7/12/2019',
          state: 'server'
        }
      ]
    },
    {
      groupName: 'Medical',
      indicators: [
        {
          indicatorName: 'HDL',
          value: '4.5',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'BP-sys',
          value: '110',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'BP-dys',
          value: '89',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'LDL',
          value: '4.5',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'server'
        }
      ]
    }
  ]

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
  this.router.navigateByUrl(`coach/coach-home/${this.coachee.id}/indicators/${indicatorName}`)
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

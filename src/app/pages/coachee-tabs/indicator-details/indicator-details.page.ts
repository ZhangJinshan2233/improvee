import { IonSlides, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { IndicatorRecordPage } from "../indicator-record/indicator-record.page";
import {
  format,
  startOfWeek,
  lastDayOfWeek,
  subWeeks,
  subMonths,
  subYears,
  startOfMonth,
  lastDayOfMonth,
  getDaysInMonth
} from 'date-fns';

@Component({
  selector: 'app-indicator-details',
  templateUrl: './indicator-details.page.html',
  styleUrls: ['./indicator-details.page.scss'],
})
export class IndicatorDetailsPage implements OnInit {
  indicator = {
    indicatorName: '',
    value: null,
    unit: '',
    createDate: new Date()
  }
  constructor(private activateRouter: ActivatedRoute, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
    this.indicator.indicatorName = this.activateRouter.snapshot.params['indicatorName'];
    this.indicator.unit = 'kg'
    this.currentDate = format(new Date(), 'MM/DD/YYYY');
    this.startDayOfWeek = format(startOfWeek(new Date()), 'MM/DD/YYYY');
    this.lastDayOfWeek = format(lastDayOfWeek(new Date()), 'MM/DD/YYYY');
    this.currentMonth = format(new Date(), 'MM/DD/YYYY');
    this.currentYear = format(new Date(), 'MM/DD/YYYY');
  }
  currentDate: any;
  //set week chart parameters
  @ViewChild('weekChartCanvas') weekChartCanvas: ElementRef;
  weekLineChart: Chart;
  startDayOfWeek: any;
  lastDayOfWeek: any;
  weekViewXaxis = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekChartSet = null
  weekData: any

  //month chart 
  @ViewChild('monthChartCanvas') monthChartCanvas: ElementRef;
  monthLineChart: Chart
  currentMonth: any;
  monthViewXaxis: number[] = [];
  monthData = [];
  firstDayOfCurrentMonth: any;
  lastDayOfCurrentMonth: any;

  //year chart
  @ViewChild('yearChartCanvas') yearChartCanvas: ElementRef;
  currentYear: any;
  yearLineChart: Chart;
  yearData: any
  yearViewXaxis = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  @ViewChild(IonSlides) slide: IonSlides;
  segmentValue = 0;
  ngAfterViewInit() {

    this.weekData = [67, 67.6, null, 68, 68, 68, 68];
    this.weekChartSet = this.weekData
    this.createWeekChart(this.weekChartCanvas.nativeElement, this.weekViewXaxis, this.weekData);

  }

  getPreWeek() {
    this.startDayOfWeek = format(new Date(subWeeks(new Date(this.startDayOfWeek), 1)), 'MM/DD/YYYY');
    this.lastDayOfWeek = format(new Date(subWeeks(new Date(this.lastDayOfWeek), 1)), 'MM/DD/YYYY');
    let data = [67, 67.6, 67, 68, 68, 68, 68];
    this.updateWeekChart(data)
  }

  getNextWeek() {
    this.startDayOfWeek = format(new Date(subWeeks(new Date(this.startDayOfWeek), -1)), 'MM/DD/YYYY');
    this.lastDayOfWeek = format(new Date(subWeeks(new Date(this.lastDayOfWeek), -1)), 'MM/DD/YYYY');
    let data = [69, 67.6, 67, 67, 68, 68, 67.8]
    this.updateWeekChart(data)
  }

  getPreMonth() {
    this.currentMonth = format(new Date(subMonths(new Date(this.currentMonth), 1)), 'MM/DD/YYYY');
    this.monthData = [68, 67.6, null, null, null, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67.6, 67, 67, 68, 68, 67.89, 67.6, 67, 67, 68, 68, 67.8, 68, 69]
    let days = getDaysInMonth(new Date(this.currentMonth))
    for (let i = 0; i < days; i++) {
      this.monthViewXaxis[i] = i + 1
    }
    this.updateMonthChart(this.monthViewXaxis, this.monthData)

  }
  getNextMonth() {
    this.currentMonth = format(new Date(subMonths(new Date(this.currentMonth), -1)), 'MM/DD/YYYY')
    this.monthData = [69, 67.6, 67, null, 67, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67.6, 67, 67, 68, 68, 67.89, 67.6, 67, 67, 68, 68, 67.8, 68, 69]
    let days = getDaysInMonth(new Date(this.currentMonth))
    for (let i = 0; i < days; i++) {
      this.monthViewXaxis[i] = i + 1
    }
    this.updateMonthChart(this.monthViewXaxis, this.monthData)
  }

  getPreYear() {
    this.currentYear = format(new Date(subYears(new Date(this.currentYear), 1)), 'MM/DD/YYYY');
    let data = [67, 67.6, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67]
    this.updateYearChart(data)
  }
  getNextYear() {
    this.currentYear = format(new Date(subYears(new Date(this.currentYear), -1)), 'MM/DD/YYYY');
    let data = [67, 67.6, null, null, null, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67.6, 67, 67, 68, 68, 67.89, 67.6, 67, 67, 68, 68, 67.8, 68, 69]
    this.updateYearChart(data)
  }
  gotoDetails(_id) {
    this.router.navigateByUrl(`/challenge-category-details/${_id}`)
  }

  async segmentChanged() {
    await this.slide.slideTo(this.segmentValue);
  }

  async slideChanged() {
    this.segmentValue = await this.slide.getActiveIndex();
    if (this.segmentValue == 1) {
      let days = getDaysInMonth(new Date(this.currentMonth))
      for (let i = 0; i < days; i++) {
        this.monthViewXaxis[i] = i + 1
      }
      this.monthData = [67, 67.6, null, null, null, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67.6, 67, 67, 68, 68, 67.89, 67.6, 67, 67, 68, 68, 67.8, 68, 69]
      this.createMonthChart(this.monthChartCanvas.nativeElement, this.monthViewXaxis, this.monthData)
    } else if (this.segmentValue == 2) {

      this.yearData = [67, 67.6, null, 68, 68, 68, 68, 69, null, null, null, null,];
      this.createYearChart(this.yearChartCanvas.nativeElement, this.yearViewXaxis, this.yearData);
    }

  }
  createWeekChart(chartview, viewXaxis, dataset) {
    this.weekLineChart = new Chart(chartview, {
      type: 'line',
      data: {
        labels: viewXaxis,
        datasets: [{
          label: 'Unit:Kg',
          pointRadius: 3,
          fill: false,
          backgroundColor: '#0ec254',
          borderColor: '#0ec254',
          data: dataset,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#0ec254',
          }
        },
      }
    });
  }

  updateWeekChart(data) {
    this.weekLineChart.data.datasets.forEach((dataset) => {
      dataset.data = data
    });
    this.weekLineChart.update();
  }

  createMonthChart(chartview, monthViewXaxis, dataset) {
    this.monthLineChart = new Chart(chartview, {
      type: 'line',
      data: {
        labels: monthViewXaxis,

        datasets: [{
          label: 'Unit:Kg',
          pointRadius: 3,
          fill: false,
          backgroundColor: '#0ec254',
          borderColor: '#0ec254',
          data: dataset,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#0ec254',
          }
        },
      }
    });
  }

  updateMonthChart(monthViewXaxis, monthData) {
    this.monthLineChart.data.labels = monthViewXaxis
    this.monthLineChart.data.datasets.forEach((dataset) => {
      dataset.data = monthData
    });
    this.monthLineChart.update();
  }

  createYearChart(chartview, viewXaxis, dataset) {
    this.yearLineChart = new Chart(chartview, {
      type: 'line',
      data: {
        labels: viewXaxis,
        datasets: [{
          label: 'Unit:Kg',
          pointRadius: 3,
          fill: false,
          backgroundColor: '#0ec254',
          borderColor: '#0ec254',
          data: dataset,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#0ec254',
          }
        },
      }
    });
  }

  updateYearChart(data) {
    this.yearLineChart.data.datasets.forEach((dataset) => {
      dataset.data = data
    });
    this.yearLineChart.update();
  }

  getHistory() {
    this.router.navigateByUrl(`/coachee/dashboard/indicator-details/indicator-history/${this.indicator.indicatorName}`)
  }

  async addRecord() {

    const indicatorModal = await this.modalCtrl.create({
      component: IndicatorRecordPage,
      componentProps: { indicator: this.indicator, mode: "Add record" }
    });

    await indicatorModal.present();
  }
}

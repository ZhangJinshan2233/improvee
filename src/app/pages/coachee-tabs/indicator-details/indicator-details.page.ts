import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { IndicatorRecordPage } from "../indicator-record/indicator-record.page";
import { customModalEnterAnimation } from "../../../_helper/customModalEnter";
import { customModalLeaveAnimation } from "../../../_helper/customModalLeave";
import {
  format,
  subMonths,
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
  isLastMonth = true
  currentDate: any

  //month chart 
  @ViewChild('monthChartCanvas') monthChartCanvas: ElementRef;
  monthLineChart: Chart
  currentMonth: any;
  firstDayOfCurrentMonth: any;
  lastDayOfCurrentMonth: any;
  isCoachee = true
  constructor(private activateRouter: ActivatedRoute, private router: Router, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
    this.indicator.indicatorName = this.activateRouter.snapshot.params['indicatorName'];
    this.isCoachee = this.router.url.split('/').includes('coachee')
    this.indicator.unit = 'kg'
    this.currentMonth = format(new Date(), 'MM/DD/YYYY');
  }

  ngAfterViewInit() {
    let monthViewXaxis = []
    let monthData = []
    monthData = [68, 67.6, null, null, null, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67.6, 67, 67, 68, 68, 67.89, 67.6, 67, 67, 68, 68, 67.8, 68, 69]
    let days = getDaysInMonth(new Date(this.currentMonth))
    console.log(days)
    for (let i = 0; i < days; i++) {
      monthViewXaxis[i] = i + 1
    }
    this.createMonthChart(this.monthChartCanvas.nativeElement, monthViewXaxis, monthData)
  }
  getPreMonth() {
    this.isLastMonth = false;
    let monthViewXaxis = []
    let monthData = []
    this.currentMonth = format(new Date(subMonths(new Date(this.currentMonth), 1)), 'MM/DD/YYYY');
    monthData = [68, 67.6, null, null, null, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67.6, 67, 67, 68, 68, 67.89, 67.6, 67, 67, 68, 68, 67.8, 68, 69]
    let days = getDaysInMonth(new Date(this.currentMonth))
    for (let i = 0; i < days; i++) {
      monthViewXaxis[i] = i + 1
    }
    this.updateMonthChart(monthViewXaxis, monthData)

  }
  getNextMonth() {
    let monthData = []
    let monthViewXaxis = []

    this.currentMonth = format(new Date(subMonths(new Date(this.currentMonth), -1)), 'MM/DD/YYYY')

    if (this.currentMonth === format(new Date(), 'MM/DD/YYYY')) {
      this.isLastMonth = true
    }

    monthData = [69, 67.6, 67, null, 67, 68, 68, 67, 67.6, 67, 68, 68, 68, 68, 69, 67.6, 67, 67, 68, 68, 67.89, 67.6, 67, 67, 68, 68, 67.8, 68, 69]
    let days = getDaysInMonth(new Date(this.currentMonth))
    for (let i = 0; i < days; i++) {
      monthViewXaxis[i] = i + 1
    }
    this.updateMonthChart(monthViewXaxis, monthData)
  }
  gotoDetails(_id) {
    this.router.navigateByUrl(`/challenge-category-details/${_id}`)
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
        responsive: true,
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

  getHistory() {
    this.router.navigateByUrl(`/coachee/dashboard/indicator-details/indicator-history/${this.indicator.indicatorName}`)
  }

  async addRecord() {

    const indicatorModal = await this.modalCtrl.create({
      component: IndicatorRecordPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: { indicator: this.indicator, mode: "Add record" }
    });

    await indicatorModal.present();
  }
}

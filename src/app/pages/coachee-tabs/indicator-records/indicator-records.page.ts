import { ModalController, IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { set_weight_status } from "../../../_helper/indicatorRecordStatus";
import { IndicatorRecordDetailPage } from "../indicator-record-detail/indicator-record-detail.page";
import { customModalEnterAnimation } from "../../../_helper/customModalEnter";
import { customModalLeaveAnimation } from "../../../_helper/customModalLeave";
import { IndicatorRecordService } from "../../../services/indicator-record.service";
import { CoachService } from '../../../services/coach.service'
import {
  format,
  subMonths,
  isSameMonth,
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  subYears,
  isSameYear,
  startOfYear,
  lastDayOfYear,
  compareDesc,
} from 'date-fns';
import { set_month_record_value, set_year_record_value } from "../../../_helper/setIndicatorRecordFormatOfChart";
import { IndicatorService } from "../../../services/indicator.service";
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-indicator-records',
  templateUrl: './indicator-records.page.html',
  styleUrls: ['./indicator-records.page.scss'],
})

export class IndicatorRecordsPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  @ViewChild('monthChartCanvas', { static: false }) monthChartCanvas: ElementRef;
  @ViewChild('yearChartCanvas', { static: false }) yearChartCanvas: ElementRef;

  indicator = {
    name: '',
    value: null,
    unit: '',
    createDate: null
  }
  isLastMonth = true;
  isLastYear = true;
  BMI: any;
  BMIStatus = "Normal"
  monthLineChart: Chart;
  yearLineChart: Chart;
  currentUser: any;
  currentMonth: any;
  latestRecord: any
  isCoachee = true;
  changedValue: any;
  selectedSegment = 0;
  currentYear: any;
  isShowMonthChart = false;
  isShowYearChart = false;
  yearViewXaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  constructor(private activateRouter: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private indicatorRecordService: IndicatorRecordService,
    private indicatorService: IndicatorService,
    private coachService: CoachService,
    private authService: AuthService) {
    if (this.router.url.split('/').includes('coachee')) {
      this.isCoachee = true
    } else {
      this.isCoachee = false
    }
  }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
    this.slides.lockSwipes(true);
    if (this.isCoachee) {
      this.authService.get_user_profile().subscribe(res => {
        this.currentUser = res['currentUser']
      })
    } else {
      let coacheeId = this.activateRouter.snapshot.params['coacheeId']
      this.coachService.get_coachee_by_id(coacheeId).subscribe(res => {
        this.currentUser = res['coachee']
        console.log(this.currentUser)
      })
    }

    this.indicator.name = this.activateRouter.snapshot.params['name'];
    this.indicatorService.get_indicator_info_by_name(this.indicator.name).subscribe(res => {
      this.indicator.unit = res['indicators'][0].unit
    })
  }

  ionViewWillEnter() {
    this.currentMonth = format(new Date(), 'MM/DD/YYYY');
    this.currentYear = format(new Date(), 'MM/DD/YYYY');
    let monthViewXaxis = []
    let recordValues = []
    this.indicatorRecordService.get_indicator_records_of_current_month(this.indicator.name, startOfMonth(this.currentMonth), endOfMonth(this.currentMonth)).subscribe(res => {
      recordValues = set_month_record_value(res['indicatorRecords'], this.currentMonth)
      if (res['indicatorRecords'].length > 0) {
        this.isShowMonthChart = true;
        //set latest record
        if (this.indicator.name === "weight") {
          this.indicatorRecordService.coachee_get_indiator_latest_record("weight").subscribe(res => {
            this.latestRecord = res['indicatorRecord'];
            this.BMIStatus = set_weight_status(this.latestRecord.value, this.currentUser.height)
            this.BMI = (this.latestRecord.value * 10000 / (this.currentUser.height * this.currentUser.height)).toFixed(0)
            this.changedValue = (+this.latestRecord.value) - this.currentUser.weight
          })
        }
      }
      let days = getDaysInMonth(new Date(this.currentMonth))
      for (let i = 0; i < days; i++) {
        monthViewXaxis[i] = i + 1
      }
      this.create_month_chart(this.monthChartCanvas.nativeElement, monthViewXaxis, recordValues)
    })
  }

  /**
   * listen segment changeing
   * @param event 
   */
  async segmentChanged(event) {
    this.selectedSegment = event.target.value
    this.slides.lockSwipes(false);
    await this.slides.slideTo(this.selectedSegment);
    this.slides.lockSwipes(true);
    if (this.selectedSegment == 1 && !this.yearLineChart) {
      let recordValues = []
      this.indicatorRecordService.get_indicator_records_of_current_year(this.indicator.name, startOfYear(this.currentYear), lastDayOfYear(this.currentYear)).subscribe(res => {
        if ((res['indicatorRecords']).length > 0) this.isShowYearChart = true
        recordValues = set_year_record_value((res['indicatorRecords']));
        this.create_year_chart(this.yearChartCanvas.nativeElement, this.yearViewXaxis, recordValues);
      })
    }
  }

  /**
   * draw graph based on data of previous month
   */
  get_pre_month() {
    this.isLastMonth = false;
    let monthViewXaxis = []
    let recordValues = []
    this.currentMonth = format(new Date(subMonths(new Date(this.currentMonth), 1)), 'MM/DD/YYYY');
    this.setMonthChart(monthViewXaxis, recordValues)
  }
  /**
   * draw graph based on data of next month
   */
  get_next_month() {
    let recordValues = []
    let monthViewXaxis = []
    this.currentMonth = format(new Date(subMonths(new Date(this.currentMonth), -1)), 'MM/DD/YYYY')
    if (this.currentMonth === format(new Date(), 'MM/DD/YYYY')) {
      this.isLastMonth = true
    }
    this.setMonthChart(monthViewXaxis, recordValues)
  }
  /**
   * create chart for indicator records of one month
   * @param chartview 
   * @param monthViewXaxis 
   * @param dataset 
   */

  create_month_chart(chartview, monthViewXaxis, dataset) {
    this.monthLineChart = new Chart(chartview, {
      type: 'bar',
      data: {
        labels: monthViewXaxis,
        datasets: [{
          label: `Unit:${this.indicator.unit}`,
          pointRadius: 3,
          fill: false,
          backgroundColor: '#3880ff',
          borderColor: '#3880ff',
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
              min: 10
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#3880ff',
          }
        },
      }
    });
  }

  /**
   * draw graph based on data of  previous yesr
   */
  get_pre_year() {
    this.isLastYear = false;
    let recordValues = [];
    this.currentYear = format(new Date(subYears(new Date(this.currentYear), 1)), 'MM/DD/YYYY');

    this.setYearChart(recordValues)
  }

  /**
   * draw graph based on data of next year
   */
  get_next_year() {
    let recordValues = []
    this.currentYear = format(new Date(subYears(new Date(this.currentYear), -1)), 'MM/DD/YYYY')
    if (this.currentYear === format(new Date(), 'MM/DD/YYYY')) {
      this.isLastYear = true
    }
    this.setYearChart(recordValues)
  }

  /**
  * create chart for indicator records of one year
  * @param chartview 
  * @param yearViewXaxis 
  * @param dataset 
  */

  create_year_chart(chartview, yearViewXaxis, dataset) {

    this.yearLineChart = new Chart(chartview, {
      type: 'bar',
      data: {
        labels: yearViewXaxis,
        datasets: [{
          label: `Unit:${this.indicator.unit}`,
          pointRadius: 3,
          fill: false,
          backgroundColor: '#3880ff',
          borderColor: '#3880ff',
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
              min: 10
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#3880ff',
          }
        },
      }
    });
  }


  /**
   * go to history page
   */
  get_history() {
    this.router.navigateByUrl(`/coachee/dashboard/indicator-record-history/${this.indicator.name}`)
  }

  /**
   * invoke modal 
   */
  async add_record() {
    const indicatorModal = await this.modalCtrl.create({
      component: IndicatorRecordDetailPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: { indicator: this.indicator, mode: "add" }
    });

    await indicatorModal.present();
    let { data } = await indicatorModal.onDidDismiss();
    if (data) {
      if (data.indicatorRecord) {
        this.indicatorRecordService.newIndicatorRecordSubject.next(this.indicator.name)
        //reset latest record
        if (this.indicator.name === "weight") {
          let isLatestRecord = 1
          if (this.latestRecord) {
            isLatestRecord = compareDesc(new Date(this.latestRecord.createDate), new Date(data.indicatorRecord.createDate))
          }
          if (isLatestRecord === 1) {
            this.latestRecord = data.indicatorRecord
            this.BMI = (+this.latestRecord.value * 10000 / (this.currentUser.height * this.currentUser.height)).toFixed(0)
            this.BMIStatus = set_weight_status(this.latestRecord.value, this.currentUser.height)
            this.changedValue = (+this.latestRecord.value) - this.currentUser.weight
          }
        }
        //judge which segment is active and then update chart
        if (this.selectedSegment == 0) {
          let monthViewXaxis = []
          let monthRecordValues = []
          let isDateSameMonth = isSameMonth(data.indicatorRecord.createDate, this.currentMonth)
          if (isDateSameMonth) {
            this.setMonthChart(monthViewXaxis, monthRecordValues)
          }
        } else {
          let isDateSameYear = isSameYear(data.indicatorRecord.createDate, this.currentMonth)
          if (isDateSameYear) {
            let yearRecordCValues = []
            this.setYearChart(yearRecordCValues)
          }
        }
      }
    }
  }

  /**
   * update chart view
   * @param lineChart 
   * @param viewXaxis 
   * @param recordValues 
   */
  update_chart(lineChart, viewXaxis, recordValues) {
    lineChart.data.labels = viewXaxis
    lineChart.data.datasets.forEach((dataset) => {
      dataset.data = recordValues
    });
    lineChart.update();
  }

  /**
   *  update month chart view
   * @param monthViewXaxis 
   * @param recordValues 
   */
  setMonthChart(monthViewXaxis, recordValues) {
    this.indicatorRecordService.get_indicator_records_of_current_month(this.indicator.name, startOfMonth(this.currentMonth), endOfMonth(this.currentMonth)).subscribe(res => {
      recordValues = set_month_record_value(res['indicatorRecords'], this.currentMonth)
      if (res['indicatorRecords'].length <= 0) {
        this.isShowMonthChart = false
      } else {
        this.isShowMonthChart = true
      }
      let days = getDaysInMonth(new Date(this.currentMonth))
      for (let i = 0; i < days; i++) {
        monthViewXaxis[i] = i + 1
      }
      this.update_chart(this.monthLineChart, monthViewXaxis, recordValues)
    })
  }

  /**
   *  update year chart view
   * @param recordValues 
   */
  setYearChart(recordValues) {
    this.indicatorRecordService.get_indicator_records_of_current_year(this.indicator.name, startOfYear(this.currentYear), lastDayOfYear(this.currentYear)).subscribe(res => {
      if (res['indicatorRecords'].length <= 0) {
        this.isShowYearChart = false
      } else {
        this.isShowYearChart = true
      }
      recordValues = set_year_record_value(res['indicatorRecords']);
      this.update_chart(this.yearLineChart, this.yearViewXaxis, recordValues)
    })
  }
}

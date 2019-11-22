import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild
} from "@angular/animations";
import { get_record_status } from "../../../_helper/indicatorRecordStatus";
import * as _ from 'lodash'
import { IndicatorRecordService } from '../../../services/indicator-record.service'
import { IndicatorRecordDetailPage } from "../indicator-record-detail/indicator-record-detail.page";
import { ModalController } from '@ionic/angular';
import { customModalEnterAnimation } from 'src/app/_helper/customModalEnter';
import { customModalLeaveAnimation } from 'src/app/_helper/customModalLeave';
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@indicatorRecords', stagger(200, animateChild()))
      ]),
    ]),
    trigger('indicatorRecords', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('500ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})

export class DashboardPage implements OnInit {
  indicatorRecords = [];
  currentUser: any;
  constructor(private router: Router,
    private indicatorRecordService: IndicatorRecordService,
    private modalCtrl: ModalController,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.get_user_profile().subscribe(res => {
      this.currentUser = res['currentUser']
      this.indicatorRecordService.get_all_indicator_records().subscribe(res => {
        let changedStatusRecord = res['indicatorRecordByName'].map(item => {
          return get_record_status(item, this.currentUser)
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
      this.indicatorRecordService.newIndicatorRecordSubject.subscribe(res => {
        let group = 0;
        let indicator = 0
        for (let i = 0; i < this.indicatorRecords.length; i++) {
          for (let j = 0; j < this.indicatorRecords[i].indicators.length; j++) {
            if (this.indicatorRecords[i].indicators[j].name === res) {
              group = i;
              indicator = j
              break
            }
          }
        }
        this.indicatorRecordService.get_records_by_pagination(res, 0).subscribe(res => {
          this.indicatorRecords[group].indicators[indicator] = res['onePageRecords'][0]
          let newRecord = get_record_status(this.indicatorRecords[group].indicators[indicator], this.currentUser)
          this.indicatorRecords[group].indicators[indicator].status = newRecord.status
        })
      })
    })

  }

  ionViewWillEnter() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'flex';
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
    if (!indicator.value) {
      this.add_record(indicator, i, j)
    } else {
      if (indicator.group === "wellness") {
        this.router.navigateByUrl(`/coachee/dashboard/indicator-records/${indicator.name}`)
      } else {
        this.router.navigateByUrl(`/coachee/dashboard/indicator-record-history/${indicator.name}`)
      }
    }
  }

  /**
   * add  new record
   * @param indicator 
   * @param i =>which group
   * @param j =>which indicator
   */
  async add_record(indicator, i, j) {
    const indicatorModal = await this.modalCtrl.create({
      component: IndicatorRecordDetailPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: { indicator: indicator, mode: "add" }
    });

    await indicatorModal.present();
    let { data } = await indicatorModal.onDidDismiss();
    if (data) {
      this.indicatorRecords[i].open = true;
      this.indicatorRecords[i].indicators[j] = data.indicatorRecord;
      let newRecord = get_record_status(this.indicatorRecords[i].indicators[j], this.currentUser)
      this.indicatorRecords[i].indicators[j].status = newRecord.status
    }
  }
}

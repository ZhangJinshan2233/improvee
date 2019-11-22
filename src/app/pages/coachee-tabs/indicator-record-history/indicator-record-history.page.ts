import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorRecordDetailPage } from "../indicator-record-detail/indicator-record-detail.page";
import { ModalController, IonInfiniteScroll, LoadingController, } from '@ionic/angular';
import { IndicatorRecordService } from "../../../services/indicator-record.service";
import { customModalEnterAnimation } from 'src/app/_helper/customModalEnter';
import { customModalLeaveAnimation } from 'src/app/_helper/customModalLeave';
import { IndicatorService } from 'src/app/services/indicator.service';
import {
  compareDesc
} from 'date-fns';
import { get_record_status } from "../../../_helper/indicatorRecordStatus";
import { AuthService } from 'src/app/services/auth.service';
import { CoachService } from "../../../services/coach.service";
@Component({
  selector: 'app-indicator-record-history',
  templateUrl: './indicator-record-history.page.html',
  styleUrls: ['./indicator-record-history.page.scss'],
})
export class IndicatorRecordHistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  skipNum = 0;
  records = [];
  currentUser: any
  indicatorGroup: any;
  isCoachee = true;
  indicator = {
    name: '',
    value: null,
    unit: '',
    createDate: null
  };
  constructor(private activateRouter: ActivatedRoute,
    private router: Router,
    private coachService:CoachService,
    private modalCtrl: ModalController,
    private indicatorRecordService: IndicatorRecordService,
    private indicatorService: IndicatorService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) {
    this.isCoachee = this.router.url.split('/').includes('coachee')
  }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
    this.indicator.name = this.activateRouter.snapshot.params['name'];
    this.first_loading_records()
  }

  async first_loading_records() {
    let first_loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await first_loading.present();
    this.indicatorService.get_indicator_info_by_name(this.indicator.name).subscribe(res => {
      this.indicator.unit = res['indicators'][0].unit
      this.indicatorGroup = res['indicators'][0].group;
      if(this.isCoachee){
        this.authService.get_user_profile().subscribe(res => {
          this.currentUser = res['currentUser'];
          this.indicatorRecordService.get_records_by_pagination(this.indicator.name, this.skipNum,this.currentUser._id).subscribe(res => {
            let changedStatusRecord = res['onePageRecords'].map(item => {
              return get_record_status(item, this.currentUser)
            })
            this.records = this.records.concat(changedStatusRecord)
            first_loading.dismiss()
            this.skipNum = 1
          })
        })
      }else{
        let coacheeId=this.activateRouter.snapshot.params['coacheeId']
        this.coachService.get_coachee_by_id(coacheeId).subscribe(res => {
          this.currentUser = res['coachee'];
          this.indicatorRecordService.get_records_by_pagination(this.indicator.name, this.skipNum,this.currentUser._id).subscribe(res => {
            
            let changedStatusRecord = res['onePageRecords'].map(item => {
              return get_record_status(item, this.currentUser)
            })
            this.records = this.records.concat(changedStatusRecord)
            first_loading.dismiss()
            this.skipNum = 1
          })
        })
      }
    })
  }
  /**
   * load records
   */
  async load_records() {
    this.indicatorRecordService.get_records_by_pagination(this.indicator.name, this.skipNum,this.currentUser._id).subscribe(res => {
      let changedStatusRecord = res['onePageRecords'].map(item => {
        return get_record_status(item, this.currentUser)
      })
      this.records = this.records.concat(changedStatusRecord)
      this.skipNum = 1
    })
  }

  /**
   * load more records
   * @param infiniteScrollEvent 
   */
  load_more_records(infiniteScrollEvent) {
    this.indicatorRecordService.get_records_by_pagination(this.indicator.name, this.skipNum,this.currentUser._id).subscribe(res => {
      if (res['onePageRecords'].length >= 1) {
        let changedStatusRecord = res['onePageRecords'].map(item => {
          return get_record_status(item, this.currentUser)
        })
        this.skipNum += 1
        this.records = this.records.concat(changedStatusRecord)
        infiniteScrollEvent.target.complete();
      }
      else {
        infiniteScrollEvent.target.disabled = true;
      }

    })
  }

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
        //compare records array last one with new one code
        //if big push 
        this.records.push(get_record_status(data.indicatorRecord, this.currentUser));
        this.records.sort((item1, item2) => {
          return compareDesc(new Date(item1.createDate), new Date(item2.createDate))
        })
      }
    }
  }

  async update_record(record, i) {
    const indicatorModal = await this.modalCtrl.create({
      component: IndicatorRecordDetailPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: { indicator: record, mode: "update" }
    })
    await indicatorModal.present();
    let { data } = await indicatorModal.onDidDismiss();
    if (data) {
      this.indicatorRecordService.newIndicatorRecordSubject.next(this.indicator.name)
      if (data.method === 'update') {
        this.records[i].value = data.changedFields.value;

        this.records[i].createDate = data.changedFields.createDate

        this.records[i] = get_record_status(this.records[i], this.currentUser)
      } else {
        this.records.splice(i, 1)
      }
    }
  }

}

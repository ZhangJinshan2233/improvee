import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicatorRecordPage } from "../indicator-record/indicator-record.page";
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-indicator-history',
  templateUrl: './indicator-history.page.html',
  styleUrls: ['./indicator-history.page.scss'],
})
export class IndicatorHistoryPage implements OnInit {
  indicatorName: any
  constructor(private activateRouter: ActivatedRoute,private modalCtrl:ModalController) { }

  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none';
    this.indicatorName = this.activateRouter.snapshot.params['indicatorName'];
  }
  items: any[] = [
    {
      indicatorName: 'weight',
      value: '68.3',
      unit: 'kg',
      createDate: '06/05/2019'
    },
    {
      indicatorName: 'weight',
      value: '68',
      unit: 'kg',
      createDate: '06/06/2019'

    },
    {
      indicatorName: 'weight',
      value: '68.2',
      unit: 'kg',
      createDate: '06/07/2019'

    },
    {
      indicatorName: 'weight',
      value: '68.1',
      unit: 'kg',
      createDate: '06/08/2019'

    },
    {
      indicatorName: 'weight',
      value: '68.2',
      unit: 'kg',
      createDate: '06/09/2019'
    },
  ]
async showMOdal(indicator){
  
  const indicatorModal=await this.modalCtrl.create({
   component:IndicatorRecordPage,
    componentProps: { indicator: indicator, mode: "Update record" }
  })

  await indicatorModal.present()
}
}

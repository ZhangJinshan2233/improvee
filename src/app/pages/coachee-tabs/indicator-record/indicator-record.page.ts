import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-indicator-record',
  templateUrl: './indicator-record.page.html',
  styleUrls: ['./indicator-record.page.scss'],
})
export class IndicatorRecordPage implements OnInit {
  isUpdate = false;
  indicator:any;
  mode = "Add record"
  unit: any;
  date: any;
  time: any;
 
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }
 
  ngOnInit() {
    this.indicator = this.navParams.data['indicator']
    this.mode = this.navParams.data['mode']
    if (this.mode == "Update record") {

      this.isUpdate = true
    }
    this.date = new Date(this.indicator.createDate).toISOString()
    this.time = new Date(this.indicator.createDate).toISOString()
  }
  colse() {
    this.modalCtrl.dismiss()
  }

  async addRecord(form) {
    console.log(form)
    this.colse()
  }
  async updateRecord(form) {
    console.log(form)
    this.colse()
  }

  async deleteRecord(form) {
    console.log(form)
    this.colse()
  }
}
